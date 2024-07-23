import { Link } from "react-router-dom";
import { list } from "./list";
import { serverUrl } from "@/helpers/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { ModeToggle } from "../mode-toggle";
import PrivateRoute from "@/private/private-route";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <header className="py-4 border-b select-none">
      <nav className="container flex items-center justify-between">
        <Link to={"/"} className="font-bold text-xl">
          TUITKF<sub className="italic">quiz</sub>
        </Link>
        <ul className="items-center gap-4 sm:flex hidden">
          {list.map((item) => {
            return (
              <PrivateRoute key={item.title} roles={item.roles}>
                <li>
                  <Link to={item.router}>{item.title}</Link>
                </li>
              </PrivateRoute>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <div className="sm:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-0">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <ul className="items-center flex-col gap-4 flex">
                  {list.map((item) => {
                    return (
                      <PrivateRoute key={item.title} roles={item.roles}>
                        <li>
                          <Link to={item.router}>{item.title}</Link>
                        </li>
                      </PrivateRoute>
                    );
                  })}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
          <ModeToggle />
          <Link to={"/profile"} className="border rounded-full">
            <Avatar>
              <AvatarImage src={`${serverUrl}/uploads/${user?.photo}`} />
              <AvatarFallback>{user?.auth.phone?.slice(4, 6)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </nav>
    </header>
  );
}
