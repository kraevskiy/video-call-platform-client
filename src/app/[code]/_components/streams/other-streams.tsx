"use client";

import { useMeeting } from "@/hooks/state/use-meeting";
import { useShallow } from "zustand/react/shallow";
import { VideoContainer } from "../containers";
import PeerVideo from "../peer";

export default function OtherStreams() {
  const { streamsList, mutedList, visibleList, imagesList, namesList } =
    useMeeting(
      useShallow((state) => ({
        streamsList: state.streamsList,
        mutedList: state.mutedList,
        visibleList: state.visibleList,
        imagesList: state.imagesList,
        namesList: state.namesList,
      })),
    );

  return Object.entries(streamsList).map(([peerId, stream]) => (
    <VideoContainer
      key={peerId}
      muted={mutedList[peerId]}
      visible={visibleList[peerId]}
      image={imagesList[peerId]}
      name={namesList[peerId]}
      stream={stream}
    >
      <PeerVideo stream={stream} />
    </VideoContainer>
  ));
}
