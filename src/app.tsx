import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layouts/root-layout";
import AuthPrivate from "@/private/auth-private";
import Auth from "@/pages/auth/auth";

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
      children: [],
    },
    {
      path: '/auth',
      element: <Auth />,
    }
  ]);

  return <RouterProvider router={router} />
}
