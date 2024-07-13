import tuitkfLogo from "@/assets/tuitkf-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Auth() {
  const [register, setRegister] = useState<boolean>(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center font-serif select-none">
      <div className="max-w-[750px] w-full py-20 bg-slate-200 flex items-center flex-wrap justify-around gap-4 rounded-lg">
        <div className="rounded-full h-[200px] w-[200px] bg-white">
          <img width={200} height={200} src={tuitkfLogo} alt="tuitkf logo" />
        </div>
        <form className="max-w-[350px] w-full flex flex-col gap-4">
          <Label className={` flex-col gap-2 ${register ? "flex" : "hidden"}`}>
            <span className="">Ism familyangizni kiriting!</span>
            <Input
              type="text"
              className="bg-white"
              placeholder="Shavqiddin Tilovov"
            />
          </Label>
          <Label className="flex flex-col gap-2">
            <span className="">Telefon raqamingizni kiriting!</span>
            <Input
              type="text"
              className="bg-white"
              placeholder="+998*********"
              defaultValue={"+998"}
            />
          </Label>
          <Label className="flex flex-col gap-2">
            <span className="">Parolingizni kiriting!</span>
            <Input
              type="password"
              className="bg-white"
              placeholder="********"
            />
          </Label>
          <Button type="submit">
            {register ? "Ro'yhatdan o'tish" : "Kirish"}
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
