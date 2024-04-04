"use client";

import { cn, initialsName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMicOutline, IoMicOffOutline } from "react-icons/io5";
import { useToggle } from "usehooks-ts";
import { useEffect } from "react";
import hark from "hark";

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
  const [speaking, toggleSpeaking] = useToggle(false);

  useEffect(() => {
    const speechEvents = hark(stream, {});
    speechEvents.on("speaking", toggleSpeaking);
    speechEvents.on("stopped_speaking", toggleSpeaking);
    return () => {
      speechEvents.stop();
    };
  }, [stream, toggleSpeaking]);

  return (
    <div
      className={cn("relative h-full rounded-xl border  border-transparent", {
        "border-blue-500": speaking,
      })}
    >
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
      <p className="bg-gray/20 absolute bottom-3 left-4 select-none rounded-full px-4 py-2 text-md font-medium text-white backdrop-blur-lg dark:bg-gray-300/20">
        {name}
      </p>
      <div className="absolute right-3 top-3 ">
        {muted ? (
          <IoMicOffOutline className="h-6 w-6" />
        ) : (
          <IoMicOutline className="h-6 w-6 text-red-500" />
        )}
      </div>
    </div>
  );
}
