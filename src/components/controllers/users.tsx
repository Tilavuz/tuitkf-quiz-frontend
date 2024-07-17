import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { serverUrl } from "@/helpers/shared";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/api/api-client";
import { useEffect } from "react";
import { getUsers } from "@/features/auth/user-slice";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";

export default function Users() {
  const { users, totalPages, currentPage } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const res = await apiClient.get("/users");
        dispatch(getUsers(res.data));
        
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
    })();
  }, []);

  const handlePage = async (currentPage: number, limit: number) => {
    try {
      if(currentPage > 0 && totalPages! >= limit) {
        const res = await apiClient.get(
          `/users?page=${currentPage}&limit=${limit}`
        );
        dispatch(getUsers(res.data));
      }
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
  }


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
    <div className="border max-w-[600px] w-full h-[720px] overflow-y-auto p-2 flex flex-col justify-between">
      <ul className="flex flex-col gap-2">
        {users &&
          users.map((user) => {
            return (
              <li
                key={user?._id}
                className="flex items-center gap-2 justify-between"
              >
                <div className="flex items-center gap-2">
                  <Link
                    to={`/users/${user?._id}`}
                    className="border rounded-full"
                  >
                    <Avatar>
                      <AvatarImage
                        src={`${serverUrl}/uploads/${user?.photo}`}
                      />
                      <AvatarFallback>
                        {user?.auth.phone?.slice(4, 6)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <p className="flex flex-col">
                    <span className="text-sm font-bold">{user?.name}</span>
                    <span className="text-sm">{user?.auth?.phone}</span>
                  </p>
                </div>
                {user?.auth?.phone !== "+998908827251" && (
                  <Switch
                    onCheckedChange={(e) => blockUser(user?._id ?? "", e)}
                    defaultChecked={user?.auth?.status}
                  />
                )}

                <Button variant={"ghost"}>
                  <Ellipsis />
                </Button>
              </li>
            );
          })}
      </ul>
      {users && users.length > 10 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem className="cursor-pointer select-none">
              <PaginationPrevious
                onClick={() => handlePage(currentPage! - 1, 10)}
              />
            </PaginationItem>
            <PaginationItem className="cursor-pointer select-none">
              <PaginationNext
                onClick={() => handlePage(currentPage! + 1, 10)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
