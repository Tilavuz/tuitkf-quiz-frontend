import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
        <main className="">
            <Outlet />
        </main>
  );
}
