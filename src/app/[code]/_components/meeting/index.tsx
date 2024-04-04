"use client";

import { StreamsContainer } from "../containers";
import { MyStream } from "../streams";
import { JoinRequestDialog } from "@/app/[code]/_components/dialogs";

export default function Meeting() {
  return (
    <>
      <StreamsContainer count={1}>
        <MyStream />
      </StreamsContainer>
      <JoinRequestDialog />
    </>
  );
}
