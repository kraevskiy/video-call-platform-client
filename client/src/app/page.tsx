import Navbar from "@/components/navbar";
import {
  CreateMeetingWidget,
  JoinMeetingWidget,
  RecentMeetingsWidget,
} from "@/components/widgets";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex h-[calc(100dvh)] flex-col">
      <Navbar />
      <div className="grid grow gap-5 p-3 md:grid-cols-[1.7fr,1fr]">
        <div className="rounded-xl bg-sky-50 p-5 dark:bg-gray-800">
          <h2 className="mb-5 text-xl font-bold">Join or create meeting</h2>
          <h3 className="mb-2 text-lg">Join meeting with code</h3>
          <JoinMeetingWidget className="mb-5"/>
          <h3 className="mb-2 text-lg">Create new meeting</h3>
          <CreateMeetingWidget />
          <Separator className="my-5 dark:bg-gray-900" />
          <h2 className="mb-5 text-xl font-bold">Recent meetings</h2>
          <RecentMeetingsWidget />
        </div>
        <div className="rounded-xl bg-sky-50 p-5 dark:bg-gray-800">
          Video chat app
        </div>
      </div>
    </main>
  );
}
