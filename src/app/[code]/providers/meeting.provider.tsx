"use client";

import { useSocket } from "@/hooks/state/use-socket";
import { useEffect } from "react";
import { usePeer } from "@/hooks/state/use-peer";
import { useMeeting } from "@/hooks/state/use-meeting";
import { useShallow } from "zustand/react/shallow";

export default function MeetingProvider({
  children,
  joinMeeting,
}: {
  children: React.ReactNode;
  joinMeeting: () => void;
}) {
  const socket = useSocket();
  const { myPeerId, setMyPeerId, setPeer } = usePeer();
  const { setJoinStatus, addJoinRequest } = useMeeting(
    useShallow((state) => ({
      setJoinStatus: state.setJoinStatus,
      addJoinRequest: state.addJoinRequest,
    })),
  );

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

  useEffect(() => {
    socket.on("user:wait-for-owner", () => {
      setJoinStatus("wait-for-owner");
    });
    socket.on("meeting:full", () => {
      setJoinStatus("room-is-full");
    });
    socket.on("user:rejected", () => {
      setJoinStatus("rejected");
    });
    socket.on("user:join-request", (user) => {
      addJoinRequest(user);
    });
    socket.on("user:accepted", ({ code, user }) => {
      socket.emit("meeting:join", { code, user });
      setJoinStatus("accepted");
      joinMeeting();
    });
  }, [joinMeeting, socket, setJoinStatus, addJoinRequest]);

  return <div>{children}</div>;
}
