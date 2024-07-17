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
    return <p>loader...</p>;
  }

  if (!user)
    return <Navigate to={"/auth"} state={{ from: location }} replace={true} />;

  if (user && roles.includes(user.auth.role) && user.status) {
    return children;
  }
}
