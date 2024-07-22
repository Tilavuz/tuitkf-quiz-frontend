import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getTopSecondUsers } from "@/features/top-users/top-users-slice";
import { serverUrl } from "@/helpers/shared";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SecondCoursTopUsers() {
 const dispatch = useDispatch();
 const { topSecondUsers } = useSelector((state: RootState) => state.topUsers);
    
  useEffect(() => {
    (async function () {
      try {
        if(!topSecondUsers?.length) {
            const res = await apiClient.get(
              "/statistics/top-second-course-users"
            );
            dispatch(getTopSecondUsers(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="flex items-start gap-4 flex-wrap">
      {topSecondUsers &&
        topSecondUsers.map((user) => {
          if (user.user) {
            return (
              <div
                key={user?.user?._id}
                className="md:max-w-[300px] w-full border rounded-md"
              >
                <div className="h-[300px] w-full">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={`${serverUrl}/uploads/${user?.user?.photo}`}
                    alt=""
                  />
                </div>
                <div className="p-2">
                  <p className="flex items-start justify-between gap-2">
                    <span className="font-bold">{user?.user?.name}</span>
                    <span className="uppercase">{user?.user?.group}</span>
                  </p>
                  <p className="flex items-start justify-between gap-2">
                    <span className="font-bold">Fan</span>
                    <span className="font-mono line-clamp-1">
                      {user.session?.science_id?.title}
                    </span>
                  </p>
                  <p className="flex items-start justify-between gap-2">
                    <span className="font-bold">Ball</span>
                    <span className="font-mono">{user?.session?.score}</span>
                  </p>
                  <p className="flex items-start justify-between gap-2">
                    <span className="font-bold">Savollar</span>
                    <span className="font-mono">
                      {user?.session?.questions}
                    </span>
                  </p>
                  <p className="flex items-start justify-between gap-2">
                    <span className="font-bold">Foiz</span>
                    <span className="font-mono">{user?.session?.percent}%</span>
                  </p>
                  <p className="flex items-start justify-between gap-2">
                    <span className="font-bold">Vaqt</span>
                    <span className="font-mono">
                      {Math.floor(user?.session?.time / 60)}m{" "}
                      {Math.floor(user?.session?.time % 60)}s
                    </span>
                  </p>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}
