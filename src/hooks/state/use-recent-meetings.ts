import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Meeting } from "@prisma/client";
import { immer } from "zustand/middleware/immer";

type RecentMeetingsState = {
  meetings: Meeting[];
};
type RecentMeetingsActions = {
  setMeeting: (meeting: Meeting) => void;
};

export const useRecentMeetings = create<
  RecentMeetingsState & RecentMeetingsActions
>()(
  immer(
    persist(
      (set, get) => ({
        meetings: [],
        setMeeting: (meeting) =>
          set((state) => {
            state.meetings = [meeting, ...state.meetings.filter(storeMeeting => storeMeeting.id !== meeting.id)].slice(0, 10);
          }),
      }),
      {
        name: "recent-meetings-storage",
      },
    ),
  ),
);
