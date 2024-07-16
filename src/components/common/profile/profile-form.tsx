import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { serverUrl } from "@/helpers/shared";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { toast } from "sonner";
import { authFail, authStart, changeUserData } from "@/features/auth/auth-slice";
import { apiClient } from "@/api/api-client";

export default function ProfileForm() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [photo, setPhoto] = useState<File | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const changeUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(authStart());
      const changeData = {
        name: nameRef?.current?.value,
        photo,
        password: passwordRef?.current?.value
      }
      const res = await apiClient.put(`/user/${user?._id}`, changeData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(changeUserData(res.data));
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
    <form onSubmit={(e) => changeUser(e)} className="flex flex-col gap-2 p-2">
      <div className="w-full h-[250px] mb-4 relative">
        <Input
          onChange={(e) => handlePhoto(e)}
          type="file"
          className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
        />
        <img
          className="object-cover w-full h-full rounded-t-md"
          src={
            photo
              ? URL.createObjectURL(photo)
              : `${serverUrl}/uploads/${user?.photo}`
          }
          alt="profile image"
        />
      </div>
      <Input
        ref={nameRef}
        defaultValue={user?.name}
        type="text"
        placeholder="Ism familyangizni yangilang!"
      />
      <Input type="text" value={user?.auth?.phone} disabled />
      <Input
        ref={passwordRef}
        type="password"
        placeholder="Parolingizni yangilang!"
      />
      <Button>{loading ? "loading..." : "Change"}</Button>
    </form>
  );
}
