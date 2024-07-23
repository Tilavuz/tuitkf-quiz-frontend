import { apiClient } from "@/api/api-client";
import { AppDispatch, RootState } from "@/app/store";
import tuitkfLogo from "@/assets/tuitkf-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, authFail, authStart, getUser } from "@/features/auth/auth-slice";
import { setToken } from "@/helpers/action-token";
import { FormEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMask } from "@react-input/mask";

export default function Auth() {
  const phoneRef = useMask({
    mask: "+998 (__) ___-____",
    replacement: { _: /\d/ },
  });
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isLogin, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLogin && !error) {
      navigate("/");
    }
  }, [isLogin, error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(authStart());
      let phone = `${phoneRef?.current?.value?.slice(
        0,
        4
      )}${phoneRef?.current?.value?.slice(
        6,
        8
      )}${phoneRef?.current?.value?.slice(
        10,
        13
      )}${phoneRef?.current?.value?.slice(14, 18)}`;
      const authData = {
        phone,
        password: passwordRef?.current?.value,
      };

      if (authData.password && authData.phone) {
        const res = await apiClient.post("/login", authData);
        setToken(res.data.token);
        dispatch(auth(res.data.user));
        return;
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        dispatch(authFail(error.response.data.message));
      } else {
        toast.error(error.message);
        dispatch(authFail(error.message));
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center font-serif select-none">
      <div className="max-w-[750px] w-full py-20 bg-slate-200 dark:bg-inherit flex items-center flex-wrap justify-around gap-4 rounded-lg dark:border">
        <div className="rounded-full h-[200px] w-[200px] bg-white">
          <img
            className="shadow-lg shadow-white rounded-full"
            width={200}
            height={200}
            src={tuitkfLogo}
            alt="tuitkf logo"
          />
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="max-w-[350px] w-full flex flex-col gap-4"
        >
          <Label className="flex flex-col gap-2">
            <span className="">Telefon raqamingizni kiriting!</span>
            <Input
              disabled={loading}
              type="text"
              defaultValue={"+998"}
              inputMode="numeric"
              className="bg-white dark:bg-inherit"
              ref={phoneRef}
            />
          </Label>
          <Label className="flex flex-col gap-2">
            <span className="">Parolingizni kiriting!</span>
            <Input
              disabled={loading}
              type="password"
              className="bg-white dark:bg-inherit"
              placeholder="********"
              ref={passwordRef}
              required={true}
            />
          </Label>
          <Button disabled={loading} type="submit">
            {loading ? "loading..." : "Kirish"}
          </Button>
          <Link
            target="_blanck"
            to={"https://t.me/tuitkf_quiz_bot"}
            className="text-right text-xs hover:underline"
          >
            Ro'yhatdan o'tish
          </Link>
        </form>
      </div>
    </div>
  );
}
