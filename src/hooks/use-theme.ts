import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/features/theme/theme-slice";
import { Theme } from "@/features/theme/theme-slice";
import { RootState } from "@/app/store";

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  const changeTheme = (theme: Theme) => {
    dispatch(setTheme(theme));
  };

  return {
    theme,
    setTheme: changeTheme,
  };
};
