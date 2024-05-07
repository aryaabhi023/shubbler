import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../Connection/auth";
import { login as storeLogin } from "../Store/authSlice";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signup logic (e.g., send data to server)
    const user = await registerUser({ fullName, username, email, password });
    localStorage.setItem("accessToken", user.data.accessToken);
    localStorage.setItem("refreshToken", user.data.refreshToken);
    if (user) {
      dispatch(storeLogin(user.data.loggedUser));
    }
    console.log("Full Name:", fullName);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200 pt-10">
      <div className="w-2/3 max-w-md p-4 space-y-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-zinc-900"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-zinc-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-zinc-900"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-zinc-900"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
