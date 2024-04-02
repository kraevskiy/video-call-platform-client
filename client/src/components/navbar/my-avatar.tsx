"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export default function MyAvatar() {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <div className="bg-light-secondary dark:bg-dark-secondary flex h-full cursor-pointer items-center justify-between rounded-full p-2 md:w-80">
          <div className="flex items-center gap-x-5">
            <Avatar className="border-2 border-white">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="hidden font-medium md:block">Illia</div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-between cursor-pointer items-center gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
          Switch theme{" "}
          <Switch
            defaultChecked={theme === "dark"}
            onCheckedChange={(value) => setTheme(value ? "dark" : "light")}
          />
        </div>
        <div className="flex cursor-pointer items-center gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
          sign
        </div>
      </PopoverContent>
    </Popover>
  );
}
