import React, { useState } from "react";
import { forgetPassword, verifyEmail, send } from "../Connection/auth";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(undefined);
  const [sendedOtp, setSendedOtp] = useState(undefined);
  const [newPassword, setNewPassword] = useState("");
  const [emailExist, setEmailExist] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    console.log(otp, sendedOtp);
    if (otp === sendedOtp) {
      forgetPassword(email, newPassword)
        .then(() => {
          setEmail("");
          setOtp(undefined);
          setSendedOtp(undefined);
          setNewPassword("");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("OTP did not match!");
      setSendedOtp(undefined);
      setOtp(undefined);
      setEmailExist(false);
      setNewPassword("");
    }
  };
  const handleVerifyEmail = () => {
    setError(null);
    verifyEmail(email).then((res) => {
      if (res) {
        send(email)
          .then((res) => {
            setSendedOtp(Number(res.data));
          })
          .catch((err) => {
            console.log(err.message);
          });
        setEmailExist(true);
      } else {
        setError("Email does not exist!");
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="w-2/3 max-w-md p-4 space-y-4 bg-white rounded-lg shadow-lg">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-2" onSubmit={handleSubmit}>
          {!emailExist && (
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
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
          )}
          {emailExist && (
            <div>
              <label
                htmlFor="Otp"
                className="block mb-2 text-sm font-medium text-zinc-900"
              >
                OTP
              </label>
              <input
                type="number"
                id="otp"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(Number(e.target.value));
                }}
                required
              />
            </div>
          )}
          {emailExist && (
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-zinc-900"
              >
                Password
              </label>
              <input
                type="text"
                id="newPassword"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="********"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                required
              />
            </div>
          )}
          {emailExist && (
            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Change Password
            </button>
          )}
        </form>
        {!emailExist && (
          <button
            onClick={handleVerifyEmail}
            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Verify Email
          </button>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
