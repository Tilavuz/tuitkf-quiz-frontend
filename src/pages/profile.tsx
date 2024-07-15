import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { serverUrl } from "@/helpers/shared";
import { Ellipsis } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [photo, setPhoto] = useState<File | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="py-12">
      <div className="container flex items-start gap-6 flex-wrap lg:flex-nowrap">
        <div className="flex items-start gap-6 w-full md:flex-nowrap flex-wrap justify-center">
          <div className="max-w-[300px] w-full dark:bg-inherit dark:border bg-slate-50 rounded-md">
            <form className="flex flex-col gap-2 p-2">
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
              <Input type="text" value={user?.phone} disabled />
              <Input
                ref={passwordRef}
                type="password"
                placeholder="Parolingizni yangilang!"
              />
              <Button>Change</Button>
            </form>
          </div>
          <ul className="flex flex-col gap-2 p-4 rounded-md h-[457px] overflow-hidden overflow-y-auto select-none dark:bg-inherit dark:border bg-slate-50 w-full lg:max-w-[500px]">
            <li className="flex justify-between px-2 py-1 border items-center">
              <div className="flex flex-col font-mono">
                <p className="font-bold line-clamp-1">Falsafa fanidan test</p>
                <p className="text-sm">Tilovov Shavqiddin</p>
              </div>
              <Button>Ishlash</Button>
            </li>
            <li className="flex justify-between px-2 py-1 border items-center">
              <div className="flex flex-col font-mono">
                <p className="font-bold">Falsafa fanidan test</p>
                <p className="text-sm">Tilovov Shavqiddin</p>
              </div>
              <Button>Ishlash</Button>
            </li>
            <li className="flex justify-between px-2 py-1 border items-center">
              <div className="flex flex-col font-mono">
                <p className="font-bold">Falsafa fanidan test</p>
                <p className="text-sm">Tilovov Shavqiddin</p>
              </div>
              <Button>Ishlash</Button>
            </li>
            <li className="flex justify-between px-2 py-1 border items-center">
              <div className="flex flex-col font-mono">
                <p className="font-bold">Falsafa fanidan test</p>
                <p className="text-sm">Tilovov Shavqiddin</p>
              </div>
              <Button>Ishlash</Button>
            </li>
            <li className="flex justify-between px-2 py-1 border items-center">
              <div className="flex flex-col font-mono">
                <p className="font-bold">Falsafa fanidan test</p>
                <p className="text-sm">Tilovov Shavqiddin</p>
              </div>
              <Button>Ishlash</Button>
            </li>
            <li className="flex justify-between px-2 py-1 border items-center">
              <div className="flex flex-col font-mono">
                <p className="font-bold">Falsafa fanidan test</p>
                <p className="text-sm">Tilovov Shavqiddin</p>
              </div>
              <Button>Ishlash</Button>
            </li>
            <li className="flex justify-between px-2 py-1 border items-center">
              <div className="flex flex-col font-mono">
                <p className="font-bold">Falsafa fanidan test</p>
                <p className="text-sm">Tilovov Shavqiddin</p>
              </div>
              <Button>Ishlash</Button>
            </li>
            <li className="flex justify-between px-2 py-1 border items-center">
              <div className="flex flex-col font-mono">
                <p className="font-bold">Falsafa fanidan test</p>
                <p className="text-sm">Tilovov Shavqiddin</p>
              </div>
              <Button>Ishlash</Button>
            </li>
          </ul>
        </div>
        <ul className="flex flex-col gap-2 p-4 rounded-md h-[457px] overflow-hidden overflow-y-auto select-none dark:bg-inherit dark:border bg-slate-50 lg:max-w-[500px] w-full">
          <li className="flex justify-between px-2 py-1 border items-center">
            <div className="flex flex-col font-mono">
              <p className="font-bold line-clamp-1">Falsafa fanidan test</p>
              <p className="text-sm">Tilovov Shavqiddin</p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"}>
                  <Ellipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-24">
                <Link className="block text-sm hover:underline" to={"/"}>
                  Ishlash
                </Link>
                <Link className="block text-sm hover:underline" to={"/"}>
                  Natija
                </Link>
              </PopoverContent>
            </Popover>
          </li>
          <li className="flex justify-between px-2 py-1 border items-center">
            <div className="flex flex-col font-mono">
              <p className="font-bold">Falsafa fanidan test</p>
              <p className="text-sm">Tilovov Shavqiddin</p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"}>
                  <Ellipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-24">
                <Link className="block text-sm hover:underline" to={"/"}>
                  Ishlash
                </Link>
                <Link className="block text-sm hover:underline" to={"/"}>
                  Natija
                </Link>
              </PopoverContent>
            </Popover>
          </li>
          <li className="flex justify-between px-2 py-1 border items-center">
            <div className="flex flex-col font-mono">
              <p className="font-bold">Falsafa fanidan test</p>
              <p className="text-sm">Tilovov Shavqiddin</p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"}>
                  <Ellipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-24">
                <Link className="block text-sm hover:underline" to={"/"}>
                  Ishlash
                </Link>
                <Link className="block text-sm hover:underline" to={"/"}>
                  Natija
                </Link>
              </PopoverContent>
            </Popover>
          </li>
          <li className="flex justify-between px-2 py-1 border items-center">
            <div className="flex flex-col font-mono">
              <p className="font-bold">Falsafa fanidan test</p>
              <p className="text-sm">Tilovov Shavqiddin</p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"}>
                  <Ellipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-24">
                <Link className="block text-sm hover:underline" to={"/"}>
                  Ishlash
                </Link>
                <Link className="block text-sm hover:underline" to={"/"}>
                  Natija
                </Link>
              </PopoverContent>
            </Popover>
          </li>
          <li className="flex justify-between px-2 py-1 border items-center">
            <div className="flex flex-col font-mono">
              <p className="font-bold">Falsafa fanidan test</p>
              <p className="text-sm">Tilovov Shavqiddin</p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"}>
                  <Ellipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-24">
                <Link className="block text-sm hover:underline" to={"/"}>
                  Ishlash
                </Link>
                <Link className="block text-sm hover:underline" to={"/"}>
                  Natija
                </Link>
              </PopoverContent>
            </Popover>
          </li>
          <li className="flex justify-between px-2 py-1 border items-center">
            <div className="flex flex-col font-mono">
              <p className="font-bold">Falsafa fanidan test</p>
              <p className="text-sm">Tilovov Shavqiddin</p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"}>
                  <Ellipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-24">
                <Link className="block text-sm hover:underline" to={"/"}>
                  Ishlash
                </Link>
                <Link className="block text-sm hover:underline" to={"/"}>
                  Natija
                </Link>
              </PopoverContent>
            </Popover>
          </li>
          <li className="flex justify-between px-2 py-1 border items-center">
            <div className="flex flex-col font-mono">
              <p className="font-bold">Falsafa fanidan test</p>
              <p className="text-sm">Tilovov Shavqiddin</p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"}>
                  <Ellipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-24">
                <Link className="block text-sm hover:underline" to={"/"}>
                  Ishlash
                </Link>
                <Link className="block text-sm hover:underline" to={"/"}>
                  Natija
                </Link>
              </PopoverContent>
            </Popover>
          </li>
          <li className="flex justify-between px-2 py-1 border items-center">
            <div className="flex flex-col font-mono">
              <p className="font-bold">Falsafa fanidan test</p>
              <p className="text-sm">Tilovov Shavqiddin</p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"}>
                  <Ellipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-24">
                <Link className="block text-sm hover:underline" to={"/"}>
                  Ishlash
                </Link>
                <Link className="block text-sm hover:underline" to={"/"}>
                  Natija
                </Link>
              </PopoverContent>
            </Popover>
          </li>
        </ul>
      </div>
    </div>
  );
}
