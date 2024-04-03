import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Nullable, StreamStatus } from "@/types";

type StreamState = {
  stream: Nullable<MediaStream>;
  status: StreamStatus;
  visible: boolean;
  muted: boolean;
};

type StreamAction = {
  setStream: (stream: Nullable<MediaStream>) => void;
  setStatus: (status: StreamStatus) => void;
  setVisible: (visible: boolean) => void;
  setMuted: (muted: boolean) => void;
  reset: () => void;
  getStream: () => void;
  toggleVideo: (cb?: unknown) => void;
  toggleAudio: (cb?: unknown) => void;
};

const initialState: StreamState = {
  stream: null,
  status: "loading",
  visible: true,
  muted: false,
};

export const useStream = create<StreamState & StreamAction>()(
  immer((set) => ({
    ...initialState,
    setStream: (stream) => {
      set((state) => {
        state.stream = stream;
      });
    },
    setStatus: (status) => {
      set((state) => {
        state.status = status;
      });
    },
    setVisible: (visible) => {
      set((state) => {
        state.visible = visible;
      });
    },
    setMuted: (muted) => {
      set((state) => {
        state.muted = muted;
      });
    },
    reset: () => {
      set(() => initialState);
    },
    getStream: () => {
      set(async ({ stream, muted, visible, setStream, setStatus }) => {
        if (stream) {
          return;
        }
        try {
          const newStream = await navigator.mediaDevices.getUserMedia({
            audio: !muted,
            video: visible,
          });
          setStream(newStream);
          setStatus("success");
          console.log("Stream is ready");
        } catch (e) {
          setStatus("rejected");
          console.error("Access denied for audio and video stream", e);
        }
      });
    },
    toggleVideo: (cb) => {
      set(async ({ stream, muted, setVisible }) => {
        if (!stream) {
          throw new Error("There is no a video stream to toggle");
        }
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack && videoTrack.readyState === "live") {
          videoTrack.enabled = false;
          videoTrack.stop();
          setVisible(false);
        } else {
          const newStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: !muted,
          });
          const newVideoTrack = newStream.getVideoTracks()[0];

          if (typeof cb === "function") {
            cb(newVideoTrack);
          }
          stream.removeTrack(videoTrack);
          stream.addTrack(newVideoTrack);
          setVisible(true);
        }
      });
    },
    toggleAudio: (cb) => {
      set(async ({ stream, setMuted }) => {
        if (!stream) {
          throw new Error("Failed. Could not find stream");
        }
        const audioTrack = stream.getAudioTracks()[0];
        if (!audioTrack) {
          throw new Error("Failed. Could not find audio track in given stream");
        }
        if (audioTrack.enabled) {
          audioTrack.enabled = false;
          setMuted(true);
        } else {
          audioTrack.enabled = true;
          setMuted(false);
        }
      });
    },
  })),
);
