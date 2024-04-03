"use client";

import { cn, initialsName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMicOutline, IoMicOffOutline } from "react-icons/io5";

type VideoContainerProps = {
  muted: boolean;
  visible: boolean;
  image: string;
  name: string;
  stream: MediaStream;
  children: React.ReactNode;
};

export default function VideoContainer({
  muted,
  visible,
  image,
  name,
  stream,
  children,
}: VideoContainerProps) {
  return (
    <div className="relative h-full rounded-xl">
      <div
        className={cn("h-full w-full", {
          hidden: !visible,
        })}
      >
        {children}
      </div>
      {!visible && (
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-sky-50 dark:bg-gray-800">
          <Avatar className="h-20 w-20 md:h-24 md:w-24">
            <AvatarImage src={image} />
            <AvatarFallback className="text-2xl md:text-4xl">
              {initialsName(name)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      <p className="bg-gray/20 absolute bottom-3 left-4 select-none rounded-full py-2 px-4 text-md font-medium text-white backdrop-blur-lg dark:bg-gray-300/20">
        {name}
      </p>
      <div className="absolute right-3 top-3 ">
        {
          muted ? <IoMicOffOutline className="w-6 h-6" /> : <IoMicOutline className="w-6 h-6 text-red-500" />
        }
      </div>
    </div>
  );
}
