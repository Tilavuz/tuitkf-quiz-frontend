import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import tuitkfLogo from "@/assets/tuitkf-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, authFail, authStart } from "@/features/auth/auth-slice";
import { setToken } from "@/helpers/action-token";
import useGetUser from "@/hooks/use-get-user";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Auth() {
  const [register, setRegister] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const { getUser } = useGetUser()
  const navigate = useNavigate()

  const { loading, isLogin, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getUser()
  }, [getUser])

  useEffect(() => {
    if (isLogin && !error) {
      navigate("/");
    }
  }, [isLogin, error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(authStart());
      const authData = {
        name: nameRef?.current?.value,
        phone: phoneRef?.current?.value,
        password: passwordRef?.current?.value,
      };

      if (authData.name && authData.password && authData.phone && register) {
        const res = await apiClient.post("/register", authData);
        setToken(res.data.token);
        dispatch(auth(res.data.user));
        return;
      }

      if (authData.password && authData.phone && !register) {
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
      <div className="max-w-[750px] w-full py-20 bg-slate-200 flex items-center flex-wrap justify-around gap-4 rounded-lg">
        <div className="rounded-full h-[200px] w-[200px] bg-white">
          <img width={200} height={200} src={tuitkfLogo} alt="tuitkf logo" />
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="max-w-[350px] w-full flex flex-col gap-4"
        >
          <Label className={` flex-col gap-2 ${register ? "flex" : "hidden"}`}>
            <span className="">Ism familyangizni kiriting!</span>
            <Input
              type="text"
              className="bg-white"
              placeholder="Shavqiddin Tilovov"
              ref={nameRef}
            />
          </Label>
          <Label className="flex flex-col gap-2">
            <span className="">Telefon raqamingizni kiriting!</span>
            <Input
              type="text"
              className="bg-white"
              placeholder="+998*********"
              defaultValue={"+998"}
              ref={phoneRef}
            />
          </Label>
          <Label className="flex flex-col gap-2">
            <span className="">Parolingizni kiriting!</span>
            <Input
              type="password"
              className="bg-white"
              placeholder="********"
              ref={passwordRef}
            />
          </Label>
          <Button type="submit">
            {register && !loading && "Ro'yhatdan o'tish"}
            {!register && !loading && "Kirish"}
            {loading && "loading..."}
          </Button>
          <button
            type="button"
            onClick={() => setRegister(!register)}
            className="text-xs w-full text-right underline font-sans"
          >
            {register ? "Kirish" : "Ro'yhatdan o'tish"}
          </button>
        </form>
      </div>
    </div>
  );
}
