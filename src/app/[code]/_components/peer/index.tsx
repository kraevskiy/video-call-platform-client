"use client";

import { memo } from "react";

function PeerVideo({
  stream,
  isMe = false,
}: {
  stream: MediaStream;
  isMe?: boolean;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-sky-50 dark:bg-gray-800 ">
      <video
        ref={(node) => {
          if (node) {
            node.srcObject = stream;
          }
        }}
        autoPlay
        muted={isMe}
        className="aspect-video h-full -scale-x-100 object-contain"
      />
      <audio
        ref={(node) => {
          if (node) {
            node.srcObject = stream;
          }
        }}
        autoPlay
        muted={isMe}
        className="hidden"
      />
    </div>
  );
}

export default memo(PeerVideo);
