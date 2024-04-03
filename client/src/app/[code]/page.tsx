"use client";

import { Code } from "@/types";
import { useEffect, useState } from "react";
import Lobby from "./_components/lobby";
import Meeting from "./_components/meeting";
import { useMeeting } from "@/hooks/state/use-meeting";
import getMeetingByCode from "@/actions/get/get-meeting-by-code";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Routes } from "../../../routes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function MeetingPage({
  params: { code },
}: {
  params: { code: Code };
}) {
  const [isLobby, setIsLobby] = useState(true);
  const [loading, setLoading] = useState(true);
  const { meeting, setMeeting } = useMeeting((state) => ({
    meeting: state.meeting,
    setMeeting: state.setMeeting,
  }));
  const router = useRouter();

  useEffect(() => {
    if (meeting) {
      setLoading(false);
      return;
    }
    getMeetingByCode(code)
      .then((res) => {
        if (res) {
          setMeeting(res);
        } else {
          toast.error("Meeting not found");
          router.push(Routes.MAIN);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [code, meeting, setMeeting, router]);

  if (loading) {
    return (
      <div className="flex h-[calc(100dvh)] items-center justify-center">
        <AiOutlineLoading3Quarters className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return isLobby ? <Lobby /> : <Meeting />;
}
