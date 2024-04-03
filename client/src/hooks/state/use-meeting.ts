import { JoinStatus, Nullable } from "@/types";
import { Meeting } from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type MeetingState = {
  meeting: Nullable<Meeting>;
  joinStatus: JoinStatus;
};

type MeetingAction = {
  setMeeting: (meeting: Nullable<Meeting>) => void;
  setJoinStatus: (status: JoinStatus) => void;
};

export const useMeeting = create<MeetingState & MeetingAction>()(
  immer((set) => ({
    meeting: null,
    joinStatus: "idle",
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
  })),
);
