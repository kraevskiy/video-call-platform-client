"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMeeting } from "@/hooks/state/use-meeting";
import { useShallow } from "zustand/react/shallow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialsName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PeerUserWithSocketId } from "@/types";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { useSocket } from "@/hooks/state/use-socket";
import { useParams } from "next/navigation";

export default function JoinRequestDialog() {
  const { joinRequests, removeJoinRequest } = useMeeting(
    useShallow((state) => ({
      joinRequests: state.joinRequests,
      removeJoinRequest: state.removeJoinRequest,
    })),
  );
  const socket = useSocket();
  const params = useParams();

  const answerUser = (user: PeerUserWithSocketId, acceptOrReject = true) => {
    socket.emit(acceptOrReject ? "user:accepted" : "user:rejected", {
      user,
      code: params?.code as string,
    });
    removeJoinRequest(user.peerId);
  };

  if (!joinRequests.length) {
    return null;
  }

  return (
    <div className="absolute left-4 top-4 rounded-xl bg-sky-50 p-2 dark:bg-gray-800 border shadow-md dark:border-gray-900">
      <ScrollArea className="h-44 pr-3">
        <div className="space-y-2">
          {joinRequests.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-x-5 bg-sky-100 dark:bg-gray-900 p-2 rounded-xl"
            >
              <div className="flex items-center gap-x-3">
                <Avatar className="border-2 border-white dark:border-gray-900">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{initialsName(user.name)}</AvatarFallback>
                </Avatar>
                <div>{user.name}</div>
              </div>
              <div className="space-x-2">
                <Button size="icon" onClick={() => answerUser(user)} variant="success" className="rounded-full">
                  <IoCheckmark className="w-7 h-7"/>
                </Button>
                <Button size="icon" onClick={() => answerUser(user, false)} variant="destructive" className="rounded-full">
                  <IoCloseOutline className="w-7 h-7"/>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
