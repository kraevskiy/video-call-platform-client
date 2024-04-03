"use client";

import Time from "@/components/navbar/time";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Routes } from "@/../routes";
import { useStream } from "@/hooks/state/use-stream";
import {
  IoMicOffOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
  IoCopyOutline,
} from "react-icons/io5";
import { FiPhoneOff } from "react-icons/fi";
import { useMeeting } from "@/hooks/state/use-meeting";
import { useCopyToClipboard } from "usehooks-ts";
import toast from "react-hot-toast";
import { MediaKind } from "@/types";

export default function ControlPanel() {
  const { muted, visible, toggleAudio, toggleVideo } = useStream();
  const { meeting } = useMeeting();
  const router = useRouter();
  const [, copy] = useCopyToClipboard();

  const handleCopy = () => {
    copy(window.location.href)
      .then(() => {
        toast.success("Copied!");
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  const toggle = (kind: MediaKind) => {
    switch (kind) {
      case "audio":
        toggleAudio();
        // socket.emit("user:toggle-audio", myPeerId);
        break;
      case "video":
        toggleVideo();
        // toggleVideo((newTrack: MediaStreamTrack) => {
        //   Object.values(connections).forEach((el) => {
        //     const sender = el.peerConnection?.getSenders().find((s) => {
        //       return s.track?.kind === newTrack.kind;
        //     });
        //     sender?.replaceTrack(newTrack);
        //   });
        // });
        // socket.emit("user:toggle-video", myPeerId);
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-[85px] px-3 pb-3">
      <div className="grid h-full w-full grid-cols-[1.5fr,1fr] items-center rounded-xl bg-sky-50 px-3 dark:bg-gray-800 md:grid-cols-3">
        <Time className="hidden md:block" />
        <div className="flex items-center justify-center gap-x-3">
          <Button
            size="icon"
            variant="destructive"
            onClick={() => {
              router.push(Routes.MAIN);
            }}
          >
            <FiPhoneOff className="h-6 w-6" />
          </Button>
          <Button size="icon" onClick={() => toggle("audio")}>
            {muted ? (
              <IoMicOffOutline className="h-6 w-6" />
            ) : (
              <IoMicOutline className="h-6 w-6" />
            )}
          </Button>
          <Button size="icon" onClick={() => toggle("video")}>
            {visible ? (
              <IoVideocamOutline className="h-6 w-6" />
            ) : (
              <IoVideocamOffOutline className="h-6 w-6" />
            )}
          </Button>
        </div>
        <div
          className="flex cursor-pointer items-center gap-x-2 justify-self-end"
          onClick={handleCopy}
        >
          <IoCopyOutline />
          <span className="hidden md:block">{meeting?.code}</span>
          <span className="md:hidden">{`${meeting?.code.slice(0, 6)}...`}</span>
        </div>
      </div>
    </div>
  );
}
