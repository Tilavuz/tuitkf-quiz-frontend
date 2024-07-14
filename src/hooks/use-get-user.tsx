import { apiClient } from "@/api/api-client";
import { auth, authFail } from "@/features/auth/auth-slice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function useGetUser() {
  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    try {
      const res = await apiClient.get("/auth");
      if(res.data) {
        dispatch(auth(res.data));
        return
      }
      throw new Error('Foydalanuvchi topilmadi!')
    } catch (error) {
      const result = error as Error;
      dispatch(authFail(result.message));
    }
  }, []);

  return { getUser };
}
