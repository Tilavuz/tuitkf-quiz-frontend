import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { auth, authFail } from "@/features/auth/auth-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetUser() {
    const { isLogin } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    const getUser = useCallback(async () => {
      try {
        if (!isLogin) {
          const res = await apiClient.get("/auth");
          dispatch(auth(res.data));
        }
      } catch (error) {
        const result = error as Error
        dispatch(authFail(result.message))
      }
    }, []);

    return { getUser };
}
