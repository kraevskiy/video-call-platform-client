"use client";

import { useSocket } from "@/hooks/state/use-socket";
import { useEffect } from "react";
import { usePeer } from "@/hooks/state/use-peer";

export default function MeetingProvider({
  children,
  joinMeeting,
}: {
  children: React.ReactNode;
  joinMeeting: () => void;
}) {
  const socket = useSocket();
  const { myPeerId, setMyPeerId, setPeer } = usePeer();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    (async function createPeer() {
      try {
        const peer = new (await import("peerjs")).default();
        setPeer(peer);
        peer.on("open", (peerId) => {
          setMyPeerId(peerId);
        });
        peer.on("error", (e) => {
          console.log("Failed set up peer connection", e);
        });
      } catch (e) {
        console.log("Create peer error", e);
      }
    })();
  }, [setMyPeerId, setPeer]);

  return <div>{children}</div>;
}
