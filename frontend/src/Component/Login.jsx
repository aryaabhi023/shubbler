import React, { useState } from "react";
import { login } from "../Connection/auth";
import { login as storeLogin } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic (e.g., send data to server)
    const user = await login({ username, password });
    if (user) {
      dispatch(storeLogin(user.data.loggedUser));
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="w-2/3 max-w-md p-4 space-y-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-2" onSubmit={handleSubmit}>
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
          <div className="mb-4 text-right">
            <Link
              to="/forget-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
