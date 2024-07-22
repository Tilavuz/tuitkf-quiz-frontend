import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layouts/root-layout";
import Auth from "@/pages/auth/auth";

import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "@/features/auth/auth-slice";

// Pages
import Home from "@/pages/home/home";
import Profile from "@/pages/profile/profile";
import PrivateRoute from "@/private/private-route";
import Controllers from "@/pages/controllers/controllers";
import User from "@/pages/user";
import Science from "@/pages/science";
import TestWork from "@/pages/test-work";
import Session from "@/pages/session";
import News from "@/pages/news";

export default function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute roles={["teacher", "admin", "user"]}>
          <RootLayout />
        </PrivateRoute>
      ),
      errorElement: <p>Error page</p>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/controllers",
          element: (
            <PrivateRoute roles={["admin", "teacher"]}>
              <Controllers />
            </PrivateRoute>
          ),
        },
        {
          path: "/controllers/users/:id",
          element: (
            <PrivateRoute roles={["admin"]}>
              <User />
            </PrivateRoute>
          ),
        },
        {
          path: "/controllers/sciences/:id",
          element: (
            <PrivateRoute roles={["admin", "teacher"]}>
              <Science />
            </PrivateRoute>
          ),
        },
        {
          path: "/profile/tests/:id",
          element: (
            <PrivateRoute roles={["admin", "teacher", "user"]}>
              <TestWork />
            </PrivateRoute>
          ),
        },
        {
          path: "profile/session/:id",
          element: (
            <PrivateRoute roles={["admin", "teacher", "user"]}>
              <Session />
            </PrivateRoute>
          ),
        },
        {
          path: "/news",
          element: (
            <PrivateRoute roles={["admin", "teacher", "user"]}>
              <News />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
    },
  ]);

  return <RouterProvider router={router} />;
}
