import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "@/layouts/user-layout";
import UserPrivate from "@/private/user-private";
import Auth from "@/pages/auth/auth";
import { lazy, Suspense } from "react";


// Pages
import Home from "@/pages/home/home";
const Profile = lazy(() => import("@/pages/profile"));  

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserPrivate>
          <UserLayout />
        </UserPrivate>
      ),
      errorElement: <p>Error page</p>,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/profile',
          element: (
            <Suspense fallback={<p>loader...</p>}>
              <Profile />
            </Suspense>
          )
        }
      ],
    },
    {
      path: '/auth',
      element: <Auth />,
    }
  ]);

  return <RouterProvider router={router} />
}
