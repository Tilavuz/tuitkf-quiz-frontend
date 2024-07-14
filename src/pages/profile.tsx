import { RootState } from "@/app/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { serverUrl } from "@/helpers/shared"
import { ChangeEvent, useState } from "react"
import { useSelector } from "react-redux"

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [photo, setPhoto] = useState<File | null>(null)

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-[300px] bg-white rounded-md">
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
          <form className="flex flex-col gap-2 p-2">
            <Input
              defaultValue={user?.name}
              type="text"
              placeholder="Ism familyangizni yangilang!"
            />
            <Input type="text" value={user?.phone} disabled />
            <Input type="password" placeholder="Parolingizni yangilang!" />
            <Button disabled>Change</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
