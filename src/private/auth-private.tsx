import { RootState } from "@/app/store";
import { getToken } from "@/helpers/action-token";
import useGetUser from "@/hooks/use-get-user";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthPrivate({ children }: { children: ReactNode }) {
  const { isLogin } = useSelector((state: RootState) => state.auth)
  const { getUser } = useGetUser()
  const token = getToken()

  useEffect(() => {
    if(!isLogin) {
      getUser();
    }
  }, [getUser])

  if(isLogin && token) {
    return children
  }else if(token && !isLogin) {
    return <p>Loader...</p>
  }

  return <Navigate to={'/auth'} />;
}
