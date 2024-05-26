import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import {
  Home,
  Login,
  Signup,
  AuthLayout,
  AddPost,
  GetPost,
  ForgetPassword,
  Profile,
} from "./Component/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "signup",
        element: (
          <AuthLayout>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "profile/:username",
        element: (
          <AuthLayout>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "add-post",
        element: (
          <AuthLayout>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "get-post/:id",
        element: (
          <AuthLayout>
            <GetPost />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
