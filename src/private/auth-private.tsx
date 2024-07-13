import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function AuthPrivate({ children }: { children: ReactNode }) {
  return <Navigate to={'/auth'} />;
}
