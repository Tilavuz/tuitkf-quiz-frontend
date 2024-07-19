import { apiClient } from "@/api/api-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { serverUrl } from "@/helpers/shared";
import { UserInterface } from "@/interface/user-interface";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState<UserInterface>();

  useEffect(() => {
    (async function getUser() {
      try {
        const res = await apiClient.get(`/users/${id}`);
        setUser(res.data);
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

  return (
    <div className="container py-4">
      <div className="max-w-[350px]">
        <div className="h-[350px] relative">
          <img
            className="w-full h-full object-cover rounded-md"
            src={`${serverUrl}/uploads/${user?.photo}`}
            alt="profile image"
          />
          <Dialog>
            <DialogTrigger asChild>
              <button className="cursor-pointer absolute top-0 left-0 h-full w-full"></button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
              <img
                className="w-full h-full"
                src={`${serverUrl}/uploads/${user?.photo}`}
                alt=""
              />
              <Link
                target="_blanck"
                className="text-sm italic text-blue-500"
                to={`${serverUrl}/uploads/${user?.photo}`}
                download={true}
              >
                Downoald
              </Link>
            </DialogContent>
          </Dialog>
        </div>
        <div className="py-2 flex flex-col gap-2">
          <p className="flex items-center justify-between">
            <span className="font-bold capitalize">{user?.name}</span>
            <span className="bg-lime-500 text-white font-bold rounded-md px-1">
              {user?.auth?.phone}
            </span>
          </p>
          {user?.auth?.phone !== "+998908827251" && (
            <p className="flex items-center justify-between">
              <span className="capitalize font-bold">Role</span>
              <span
                className={`${
                  user?.auth.role === "user" ? "bg-red-500" : "bg-lime-500"
                } text-white font-bold px-1 rounded-md`}
              >
                {user?.auth?.role}
              </span>
            </p>
          )}
          <p className="flex items-center justify-between">
            <span className="capitalize font-bold">Guruh</span>
            <span
              className={`bg-lime-500 text-white font-bold px-1 rounded-md uppercase`}
            >
              {user?.group}
            </span>
          </p>
          <p className="flex items-center justify-between">
            <span className="capitalize font-bold">Yosh</span>
            <span
              className={`${
                user?.age && user?.age >= 18 ? "bg-lime-500" : "bg-red-500"
              } text-white font-bold px-1 rounded-md uppercase`}
            >
              {user?.age}
            </span>
          </p>
          <p className="flex items-center justify-between">
            <span className="capitalize font-bold">Status</span>
            <span
              className={`${
                user?.auth?.status ? "bg-lime-500" : "bg-red-500"
              } text-white font-bold px-1 rounded-md uppercase`}
            >
              {user?.auth?.status ? "active" : "block"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
