"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { IoMdMore } from "react-icons/io";
import { initialsName } from "@/lib/utils";

export default function MyAvatar() {
  const { theme, setTheme } = useTheme();
  const { data } = useSession();

  if (!data) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex h-full cursor-pointer items-center justify-between rounded-full bg-sky-100 p-2 dark:bg-gray-900 md:w-80">
          <div className="flex items-center gap-x-5">
            <Avatar className="border-2 border-white">
              <AvatarImage src={data?.user?.image || ""} />
              <AvatarFallback>
                {initialsName(data?.user?.name || "")}
              </AvatarFallback>
            </Avatar>
            <div className="hidden font-medium md:block">
              {data?.user?.name}
            </div>
          </div>
          <IoMdMore className="hidden h-8 w-8 md:block" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex cursor-pointer items-center justify-between gap-x-3 rounded-xl p-2 duration-200 hover:bg-sky-100 dark:hover:bg-gray-900">
          Switch theme{" "}
          <Switch
            defaultChecked={theme === "dark"}
            onCheckedChange={(value) => setTheme(value ? "dark" : "light")}
          />
        </div>
        <div
          className="flex cursor-pointer items-center gap-x-3 rounded-xl p-2 duration-200 hover:bg-sky-100 dark:hover:bg-gray-900"
          onClick={() => signOut()}
        >
          Sign out
        </div>
      </PopoverContent>
    </Popover>
  );
}
