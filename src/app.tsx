import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layouts/root-layout";
import AuthPrivate from "@/private/auth-private";
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
        <AuthPrivate>
          <RootLayout />
        </AuthPrivate>
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
