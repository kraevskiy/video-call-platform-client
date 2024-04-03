'use client';

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { MyStream } from "../streams";
import { useStream } from "@/hooks/state/use-stream";
import { useEffect } from "react";
import {
  IoMicOutline,
  IoMicOffOutline,
  IoVideocamOutline,
  IoVideocamOffOutline,
} from "react-icons/io5";
import { useMeeting } from "@/hooks/state/use-meeting";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useShallow } from "zustand/react/shallow";

export default function Lobby() {
  const {
    stream,
    status,
    muted,
    visible,
    getStream,
    toggleAudio,
    toggleVideo,
  } = useStream();
  const { joinStatus, meeting } = useMeeting(
    useShallow((state) => ({
      joinStatus: state.joinStatus,
      meeting: state.meeting,
    })),
  );

  useEffect(() => {
    if (!stream) {
      getStream();
    }
  }, [stream, getStream]);

  const handleJoin = () => {
    // emit user join
  };

  return (
    <div className="flex h-[calc(100dvh)] flex-col">
      <Navbar />
      <div className="flex grow items-center p-5">
        <div className="grid h-[90%] w-full gap-2 md:grid-cols-[2fr,1fr]">
          <div className="relative">
            <div className="h-full w-full rounded-xl bg-sky-50 dark:bg-gray-800">
              <MyStream />
              {status === "success" && (
                <div className="absolute bottom-0 right-0 flex space-x-1 p-3">
                  <Button onClick={toggleAudio} size="icon">
                    {muted ? (
                      <IoMicOffOutline className="h-6 w-6" />
                    ) : (
                      <IoMicOutline className="h-6 w-6" />
                    )}
                  </Button>
                  <Button onClick={toggleVideo} size="icon">
                    {visible ? (
                      <IoVideocamOutline className="h-6 w-6" />
                    ) : (
                      <IoVideocamOffOutline className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="grid place-content-center place-items-center gap-2 text-center">
            {joinStatus === "idle" && (
              <>
                {status === "loading" && <div>Waiting for your stream 😴</div>}
                {status === "rejected" && (
                  <div>
                    You can not join without stream. Allow this site to use
                    video and audio 🎥
                  </div>
                )}
                {status === "success" && (
                  <>
                    <div className="mb-3">{meeting?.name}</div>
                    <Button size="lg" onClick={handleJoin}>
                      Join
                    </Button>
                  </>
                )}
              </>
            )}
            {joinStatus === "loading" && (
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <AiOutlineLoading3Quarters className="h-20 w-20 animate-spin" />
                <span>Wait until meeting owner accept your request</span>
              </div>
            )}
            {joinStatus === "rejected" && (
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <span>Meeting owner rejected your join request</span>
              </div>
            )}
            {joinStatus === "wait-for-owner" && (
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <div>{meeting?.name}</div>
                <div>Meeting owner is not here</div>
                <Button size="lg" onClick={handleJoin}>
                  Try again
                </Button>
              </div>
            )}
            {joinStatus === "room-is-full" && (
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <div>{meeting?.name}</div>
                <div>Meeting is full try again later</div>
                <Button size="lg" onClick={handleJoin}>
                  Try again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
