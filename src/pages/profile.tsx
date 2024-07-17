import ProfileForm from "@/components/common/profile/profile-form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";

import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="py-12">
      <div className="container flex items-start gap-6 flex-wrap lg:flex-nowrap">
        <div className="flex items-start gap-6 w-full md:flex-nowrap flex-wrap justify-center">
          <div className="max-w-[300px] w-full dark:bg-inherit dark:border bg-slate-50 rounded-md">
            <ProfileForm />
          </div>
          <ul className="flex flex-col gap-2 p-4 rounded-md h-[547px] overflow-hidden overflow-y-auto select-none dark:bg-inherit dark:border bg-slate-50 w-full lg:max-w-[500px]">
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
        <ul className="flex flex-col gap-2 p-4 rounded-md h-[547px] overflow-hidden overflow-y-auto select-none dark:bg-inherit dark:border bg-slate-50 lg:max-w-[500px] w-full">
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
                <Button variant={'link'} className="p-0 text-red-500">Delete</Button>
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
