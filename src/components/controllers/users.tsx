import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { serverUrl } from "@/helpers/shared";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/api/api-client";

export default function Users() {
  const { user } = useSelector((state: RootState) => state.auth);

  const blockUser = async (id: string, e: boolean) => {
    try {
      await apiClient.put(`/user/${id}`, { status: e });
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <ul className="">
      <li className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Link to={`/users/${user?._id}`} className="border rounded-full">
            <Avatar>
              <AvatarImage src={`${serverUrl}/uploads/${user?.photo}`} />
              <AvatarFallback>{user?.auth.phone?.slice(4, 6)}</AvatarFallback>
            </Avatar>
          </Link>
          <p className="flex flex-col">
            <span className="text-sm font-bold">{user?.name}</span>
            <span className="text-sm">{user?.auth?.phone}</span>
          </p>
        </div>
        <Switch
          onCheckedChange={(e) => blockUser(user?._id ?? "", e)}
          defaultChecked={user?.status}
        />

        <Button variant={"ghost"}>
          <Ellipsis />
        </Button>
      </li>
    </ul>
  );
}
