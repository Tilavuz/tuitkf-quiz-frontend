import { AppDispatch, RootState } from "@/app/store";
import { getUser } from "@/features/auth/auth-slice";
import { getToken } from "@/helpers/action-token";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({
  roles,
  children,
}: {
  roles: string[];
  children: ReactNode;
}) {
  const { user, error } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const token = getToken();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (token && !error && !user) {
    return (
      <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }

  if (!user)
    return <Navigate to={"/auth"} state={{ from: location }} replace={true} />;

  if (user && roles.includes(user.auth.role) && user.auth.status) {
    return children;
  }
}
