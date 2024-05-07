import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header } from "./Component";
import { login as storeLogin } from "./Store/authSlice";
import { getCurrentUser, refreshAccessToken } from "./Connection/auth";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const currentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data) {
        dispatch(storeLogin(res.data.data));
        return res.data.data;
      }
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const regenerateToken = async () => {
    try {
      const res = await refreshAccessToken();
      if (res) currentUser();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const start = async () => {
    let user = await currentUser();
    if (!user) {
      user = regenerateToken();
    }
  };
  start();

  useEffect(() => {}, []);

  return !loading ? (
    <div className="w-full">
      <div className="mx-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  ) : null;
}

export default App;
