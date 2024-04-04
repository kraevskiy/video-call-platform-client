import { JoinStatus, Nullable, PeerId, PeerUserWithSocketId } from "@/types";
import { Meeting } from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type MeetingState = {
  meeting: Nullable<Meeting>;
  joinStatus: JoinStatus;
  joinRequests: PeerUserWithSocketId[];
};

type MeetingAction = {
  setMeeting: (meeting: Nullable<Meeting>) => void;
  setJoinStatus: (status: JoinStatus) => void;
  addJoinRequest: (req: PeerUserWithSocketId) => void;
  removeJoinRequest: (peerId: PeerId) => void;
};

export const useMeeting = create<MeetingState & MeetingAction>()(
  immer((set) => ({
    meeting: null,
    joinStatus: "idle",
    joinRequests: [],
    setMeeting: (meeting) => {
      set((state) => {
        state.meeting = meeting;
      });
    },
    setJoinStatus: (status) => {
      set((state) => {
        state.joinStatus = status;
      });
    },
    addJoinRequest: (req) => {
      set((state) => {
        state.joinRequests.push(req);
      });
    },
    removeJoinRequest: (peerId) => {
      set((state) => {
        state.joinRequests = state.joinRequests.filter(
          (req) => req.id !== peerId,
        );
      });
    },
  })),
);
