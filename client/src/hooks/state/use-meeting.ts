import { Nullable } from "@/types";
import { Meeting } from "@prisma/client";
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type MeetingState = {
  meeting: Nullable<Meeting>;
};

type MeetingAction = {
  setMeeting: (meeting: Nullable<Meeting>) => void;
};

export const useMeeting = create<MeetingState & MeetingAction>()(
  immer((set) => ({
    meeting: null,
    setMeeting: (meeting) => {
      set((state) => {
        state.meeting = meeting
      })
    }
  }))
);
