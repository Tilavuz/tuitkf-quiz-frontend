import { RootState } from "@/app/store";
import { getToken } from "@/helpers/action-token";
import useGetUser from "@/hooks/use-get-user";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function UserPrivate({ children }: { children: ReactNode }) {
  const { isLogin, error, user } = useSelector((state: RootState) => state.auth)
  const { getUser } = useGetUser()
  const token = getToken()

  useEffect(() => {
    if(token && !isLogin) {
      getUser();
    }
  }, [getUser, token])

  if(isLogin && token && user?.auth.role === 'user') {
    return children
  }else if(token && !error) {
    return <p>Loader...</p>
  }

  return <Navigate to={'/auth'} />;
}
