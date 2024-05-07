import React from "react";
import { logout as storeLogout } from "../Store/authSlice";
import { logout } from "../Connection/auth";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await logout();
    dispatch(storeLogout());
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-3 py-1 rounded-full transition-colors duration-300 hover:bg-orange-200 hover:text-neutral-500 focus:text-orange-300"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
