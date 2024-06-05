import React, { useState, useEffect, useRef } from "react";
import { logout as storeLogout } from "../Store/authSlice";
import { getCurrentUser, logout } from "../Connection/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", closeDropdown);
    } else {
      document.removeEventListener("click", closeDropdown);
    }

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [isOpen]);

  const logoutHandler = async () => {
    await logout();
    dispatch(storeLogout());
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none"
      >
        <img src={userData?.avatar} alt="avatar" className="w-14 h-8 md:w-8 md:h-8 rounded-lg md:rounded-full" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 z-10 bg-white shadow-md rounded-lg">
          <ul className="py-1">
            <li>
              <Link
                to={`/profile/${userData.username}`}
                className="block px-4 py-2 text-zinc-800 hover:bg-zinc-200"
                onClick={() => setIsOpen(false)}
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 text-zinc-800 hover:bg-zinc-200"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default LogoutBtn;
