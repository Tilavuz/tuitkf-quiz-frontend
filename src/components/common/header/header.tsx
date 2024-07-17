import { Link } from "react-router-dom";
import { list } from "./list";
import { serverUrl } from "@/helpers/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { ModeToggle } from "../mode-toggle";
import PrivateRoute from "@/private/private-route";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <header className="py-4 border-b">
      <nav className="container flex items-center justify-between">
        <Link to={"/"} className="font-bold text-xl">
          TUITKF<sub className="italic">quiz</sub>
        </Link>
        <ul className="flex items-center gap-4">
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
