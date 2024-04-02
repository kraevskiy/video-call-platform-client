import Navbar from "@/components/navbar";
import { JoinMeetingWidget } from '@/components/widgets';

export default function Home() {
  return (
    <main className="flex h-[calc(100dvh)] flex-col">
      <Navbar />
      <div className="grid grow gap-5 p-3 md:grid-cols-[1.7fr,1fr]">
        <div className="bg-sky-50 dark:bg-gray-800 rounded-xl p-5">
          <h2 className="text-xl font-bold mb-5">Join or create meeting</h2>
          <h3 className="mb-2 text-lg">Join meeting with code</h3>
          <JoinMeetingWidget />
        </div>
        <div className="bg-sky-50 dark:bg-gray-800 rounded-xl p-5"></div>
      </div>
    </main>
  );
}
