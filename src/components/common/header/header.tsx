import { Link } from "react-router-dom";
import { list } from "./list";
import { serverUrl } from "@/helpers/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="py-4 border-b">
      <nav className="container flex items-center justify-between">
        <Link to={"/"} className="font-bold text-xl">
          TUITKF<sub className="italic">quiz</sub>
        </Link>
        <ul className="">
          {list.map((item) => {
            return (
              <li key={item.title}>
                <Link to={item.router}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <Link to={"/profile"} className="border rounded-full">
          <Avatar>
            <AvatarImage
              src={`${serverUrl}/uploads/${user?.photo}`}
            />
            <AvatarFallback>{user?.phone?.slice(4, 6)}</AvatarFallback>
          </Avatar>
        </Link>
      </nav>
    </header>
  );
}
