import Header from "@/components/common/header/header";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
    <Header />
      <main className="">
        <Outlet />
      </main>
    </>
  );
}
