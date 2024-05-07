import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout({ children }) {
  const [loading, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!authStatus) {
      if (location?.pathname === "/signup") navigate("/signup");
      else navigate("/login");
    } else {
      if (
        location === null ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      )
        navigate("/");
      else navigate(location.pathname);
    }
    setLoader(false);
  }, [authStatus, navigate]);
  return loading ? <h1>...Loading</h1> : <>{children}</>;
}

export default AuthLayout;
