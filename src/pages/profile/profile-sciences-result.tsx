import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSessions, removeSession } from "@/features/sessions/sessions-slice";
import { Ellipsis } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ProfileSciencesResult() {
  const { sessions } = useSelector((state: RootState) => state.sessions)
  const dispatch = useDispatch()
  useEffect(() => {
    (async function () {
      try {
        if (!sessions) {
          const res = await apiClient.get("/sessions");
          dispatch(getSessions(res.data));
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
    })();
  }, []);

  const deleteSession = async (id: string) => {
    try {
      await apiClient.delete(`/sessions/delete/${id}`);
      dispatch(removeSession(id))
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
    <ul className="flex flex-col gap-2 p-4 rounded-md h-[547px] overflow-hidden overflow-y-auto select-none dark:bg-inherit dark:border bg-slate-50 xl:max-w-[500px] w-full">
      {sessions &&
        sessions.map((session) => {
          return (
            <li
              key={session._id}
              className="flex justify-between px-2 py-1 border items-center"
            >
              <div className="flex flex-col font-mono">
                <p className="font-bold line-clamp-1">
                  {session?.science_id?.title}
                </p>
                <p className="text-sm flex gap-2 font-bold text-white">
                  <span className="bg-green-500  px-1 rounded-lg">
                    {session?.percent}%
                  </span>
                  <span className="bg-yellow-500 px-1 rounded-lg">
                    {session?.score}ball
                  </span>
                  <span className="bg-red-500 px-1 rounded-lg">
                    {Math.floor(session?.time / 60)}m{" "}
                    {Math.floor(session?.time % 60)}s
                  </span>
                </p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"ghost"}>
                    <Ellipsis />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-24">
                  <Button className="p-0" variant={"link"}>
                    <Link
                      className="block text-sm hover:underline"
                      to={`session/${session?._id}`}
                    >
                      Natija
                    </Link>
                  </Button>
                  <Button
                    onClick={() => deleteSession(session?._id!)}
                    variant={"link"}
                    className="p-0 text-red-500"
                  >
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </li>
          );
        })}
    </ul>
  );
}
