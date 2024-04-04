"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRecentMeetings } from "@/hooks/state/use-recent-meetings";
import { useRouter } from "next/navigation";
import { IoCopyOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "usehooks-ts";

export function RecentMeetingsWidget() {
  const meetings = useRecentMeetings((state) => state.meetings);
  const router = useRouter();
  const [, copy] = useCopyToClipboard();

  const handleCopy = (id: string) => {
    copy(window.location.href + id)
      .then(() => {
        toast.success("Copied!");
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  if (!meetings.length) {
    return null;
  }

  return (
    <ScrollArea className="h-[280px] rounded-2xl border shadow-md shadow-sky-100 dark:border-gray-900 dark:shadow-gray-900">
      <div className="space-y-2 py-2 pl-2 pr-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="flex items-center justify-between rounded-xl bg-sky-100 px-4 py-2 dark:bg-gray-900"
          >
            <div className="text-md lg:text-lg">{meeting.name}</div>
            <div className="flex items-center gap-x-3">
              <div
                className="hidden cursor-pointer items-center gap-x-2 justify-self-end text-lg lg:flex"
                onClick={() => handleCopy(meeting.id)}
              >
                <IoCopyOutline />
                <span>{meeting.code}</span>
              </div>
              <Button
                className="rounded-xl"
                onClick={() => router.push(meeting.code)}
              >
                Join
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
