"use client";

import { StreamsContainer } from "../containers";
import { MyStream, OtherStreams } from "../streams";
import { JoinRequestDialog } from "@/app/[code]/_components/dialogs";
import { useMeeting } from "@/hooks/state/use-meeting";
import { useShallow } from "zustand/react/shallow";

export default function Meeting() {
  const { streamsList } = useMeeting(
    useShallow((state) => ({
      streamsList: state.streamsList,
    })),
  );

  return (
    <>
      <StreamsContainer count={Object.keys(streamsList).length + 1}>
        <MyStream />
        <OtherStreams />
      </StreamsContainer>
      <JoinRequestDialog />
    </>
  );
}
