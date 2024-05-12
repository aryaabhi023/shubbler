import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refressToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(400, "Error generating tokens");
  }
};

const registerUser = async (req, res) => {
  const { username, fullName, email, password } = req.body;

  if (
    [fullName, username, email, password].some(
      (field) => field?.trim() === "" || field === undefined
    )
  ) {
    return res.status(400).json("All field are manditory...");
  }
  const user = new User({
    username,
    fullName,
    email,
    password,
  });

  await user.save();
  res.status(201).json(user);
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (!user) {
      return res.status(400).json("Invalid credentials");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(400).json("Invalid credentials");
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    const loggedUser = await User.findById(user.id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ loggedUser, accessToken, refreshToken });
  } catch (error) {
    return res.status(400).json("Invalid credentials");
  }
};

const logout = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refressToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json("User Logged Out Successfully");
};

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingRefreshToken || incomingRefreshToken === "undefined") {
    return res.status(401).json("Unauthorized request...");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id);
  if (!user) {
    return res.status(400).json("Invalid refresh Token");
  }

  if (user.refressToken !== incomingRefreshToken) {
    return res.status(400).json("Invalid refresh Token");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ message: "Token created Successfully", data: accessToken });
};

const getCurrentUser = async (req, res) => {
  res
    .status(200)
    .json({ data: req.user, message: "Fetched user profile successfully" });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    return res.status(400).json("Old Password is not correct");
  }
  if ((newPassword = "")) {
    return res.status(400).json("Enter new password");
  }
  user.password = newPassword;
  user.save({ validateBeforeSave: false });
  res.status(200).json("Password is changed");
};

export { registerUser, login, logout, refreshAccessToken, getCurrentUser };
