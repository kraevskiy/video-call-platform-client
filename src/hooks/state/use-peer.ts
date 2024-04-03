import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Nullable, PeerId } from "@/types";
import Peer from "peerjs";

type PeerState = {
  peer: Nullable<Peer>;
  myPeerId: PeerId;
};
type PeerActions = {
  setPeer: (peer: Nullable<Peer>) => void;
  setMyPeerId: (peerId: PeerId) => void;
};

export const usePeer = create<PeerState & PeerActions>()(
  immer((set) => ({
    peer: null,
    myPeerId: "",
    setPeer: (peer) => {
      set((state) => {
        state.peer = peer;
      });
    },
    setMyPeerId: (peerId) => {
      set((state) => {
        state.myPeerId = peerId;
      });
    },
  })),
);
