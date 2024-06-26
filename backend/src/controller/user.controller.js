import { User } from "../model/user.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../util/cloudinary.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw error;
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const otp = Math.floor(Math.random() * 1000000);

    async function main() {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email, // list of receivers
        subject: "OTP Verification",
        text: "Dear Sir/Mam", // plain text body
        html: `<b>Your email verification code is: ${otp}</b>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
    }

    await main();

    res.status(200).json(otp);
  } catch (error) {
    res.status(200).json(error.message);
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
  const existUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existUser) {
    return res.status(400).json({ error: "Username or Email already exist" });
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
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
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

  if (user.refreshToken !== incomingRefreshToken) {
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
  if (newPassword === "") {
    return res.status(400).json("Enter new password");
  }
  user.password = newPassword;
  user.save({ validateBeforeSave: false });
  res.status(200).json("Password is changed");
};

const verifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(false);
  }
  return res.status(200).json(true);
};

const ForgetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (newPassword === "") {
    return res.status(400).json("Enter new password");
  }
  user.password = newPassword;
  user.save({ validateBeforeSave: false });
  res.status(200).json("Password is changed");
};

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username }).select(
      "-password -refreshToken"
    );
    if (!user) return res.status(400).json("username is not Exists");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const updateAvatar = async (req, res) => {
 try {
   let avatar = req.file?.path;
   if (!avatar) {
     return res.status(400).json("Avatar path not found...");
   }
   avatar = await uploadOnCloudinary(avatar);
   avatar = avatar?.url;
   const user = await User.findByIdAndUpdate(
     req.user?._id,
     {
       $set: {
         avatar,
       },
     },
     {
       new: true,
     }
   );
   await user.save({validateBeforeSave:false});
   return res.status(200).json(user?.avatar);
 } catch (error) {
   console.log(error.message);
   return res.status(500).json(error.message);
 }
  
};

export {
  registerUser,
  login,
  logout,
  refreshAccessToken,
  getCurrentUser,
  sendOtp,
  verifyEmail,
  ForgetPassword,
  getUserByUsername,
  updateAvatar,
};
