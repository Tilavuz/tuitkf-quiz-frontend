import { apiClient } from "@/api/api-client";
import { serverUrl } from "@/helpers/shared";
import { SessionInterface } from "@/interface/session-interface";
import { UserInterface } from "@/interface/user-interface";
import { useEffect, useState } from "react";

export default function TopUsers() {
    const [users, setUsers] = useState<{ user: UserInterface, session: SessionInterface }[]>()

    useEffect(() => {
      (async function () {
        try {
          const res = await apiClient.get("statistics/top-users");
          setUsers(res.data)
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);

  return (
    <div className="flex items-start gap-4 flex-wrap">
        {
            users && users.map(user => {
                if(user.user) {
                    return (
                      <div
                        key={user?.user?._id}
                        className="max-w-[300px] border rounded-md"
                      >
                        <div className="h-[300px] w-full">
                          <img
                            className="w-full h-full object-cover rounded-md"
                            src={`${serverUrl}/uploads/${user?.user?.photo}`}
                            alt=""
                          />
                        </div>
                        <div className="p-2">
                          <p className="flex items-start justify-between">
                            <span className="font-bold">
                              {user?.user?.name}
                            </span>
                            <span className="uppercase">
                              {user?.user?.group}
                            </span>
                          </p>
                          <p className="flex items-start justify-between">
                            <span className="font-bold">Fan</span>
                            <span className="font-mono">
                              {user.session?.science_id?.title}
                            </span>
                          </p>
                          <p className="flex items-start justify-between">
                            <span className="font-bold">Ball</span>
                            <span className="font-mono">
                              {user?.session?.score}
                            </span>
                          </p>
                          <p className="flex items-start justify-between">
                            <span className="font-bold">Savollar</span>
                            <span className="font-mono">
                              {user?.session?.questions}
                            </span>
                          </p>
                          <p className="flex items-start justify-between">
                            <span className="font-bold">Foiz</span>
                            <span className="font-mono">
                              {user?.session?.percent}%
                            </span>
                          </p>
                          <p className="flex items-start justify-between">
                            <span className="font-bold">Vaqt</span>
                            <span className="font-mono">
                              {Math.floor(user?.session?.time / 60)}m {Math.floor(user?.session?.time % 60)}s
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                }
            }) 
        }
    </div>
  )
}
