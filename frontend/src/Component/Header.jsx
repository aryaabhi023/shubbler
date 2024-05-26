import React from "react";
import { LogoutBtn, Logo } from "./index";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <header className="grid grid-cols-2 rounded-lg max-w-4xl bg-stone-800 text-white py-2 px-2 fixed z-10 top-2 left-0 right-0 mx-auto mb-10">
      <div className="">
        <Link to="/">
          <Logo width="75px" />
        </Link>
      </div>
      <div className="container mx-auto pr-5">
        <nav className="flex justify-end">
          <ul className="flex list-none gap-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-3 py-1 rounded-full transition-colors duration-300 hover:bg-orange-200 hover:text-neutral-500 focus:text-orange-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li key="logout">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
