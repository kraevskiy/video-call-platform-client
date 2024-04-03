"use client";

import { useStream } from "@/hooks/state/use-stream";
import { useSession } from "next-auth/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Peer from "../peer";
import { VideoContainer } from "../containers";

export function MyStream() {
  const { stream, muted, visible, status } = useStream();
  const { data } = useSession();

  return (
    <>
      {status === "loading" && (
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-sky-50 dark:bg-gray-800">
          <AiOutlineLoading3Quarters className="h-12 w-12 animate-spin" />
        </div>
      )}
      {status === "rejected" && (
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-sky-50 dark:bg-gray-800">
          <div className="text-xl">Can not get your stream 😭</div>
        </div>
      )}
      {status === "success" && stream && (
        <VideoContainer
          muted={muted}
          visible={visible}
          name={`${data?.user?.name} (YOU)`}
          image={data?.user?.image || ""}
          stream={stream}
        >
          <Peer stream={stream} isMe={true} />
        </VideoContainer>
      )}
    </>
  );
}
