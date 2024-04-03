import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { MyStream } from "../streams";
import { useStream } from "@/hooks/state/use-stream";
import { useEffect } from "react";
import { IoMicOutline, IoMicOffOutline, IoVideocamOutline, IoVideocamOffOutline } from "react-icons/io5";

export default function Lobby() {
  const { stream, status, muted, visible, getStream, toggleAudio, toggleVideo } = useStream();

  useEffect(() => {
    if (!stream) {
      getStream();
    }
  }, [stream, getStream]);

  const handleJoin = () => {
    console.log("Join");
  };

  return (
    <div className="flex h-[calc(100dvh)] flex-col">
      <Navbar />
      <div className="flex grow items-center p-5">
        <div className="grid h-[90%] w-full gap-2 md:grid-cols-[2fr,1fr]">
          <div className="relative">
            <div className="h-full w-full rounded-xl bg-sky-50 dark:bg-gray-800">
              <MyStream />
              {status ==='success' && (
                <div className="absolute bottom-0 right-0 flex space-x-1 p-3">
                  <Button onClick={toggleAudio} size="icon">
                    {muted
                      ? <IoMicOffOutline className="w-6 h-6"/>
                      : <IoMicOutline className="w-6 h-6"/>
                    }
                  </Button>
                  <Button onClick={toggleVideo} size="icon">
                    {visible
                      ? <IoVideocamOutline className="w-6 h-6"/>
                      : <IoVideocamOffOutline className="w-6 h-6"/>
                    }
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="grid place-content-center place-items-center gap-2 text-center">
            <Button size="lg" onClick={handleJoin}>
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
