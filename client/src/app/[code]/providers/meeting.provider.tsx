"use client";

export default function MeetingProvider({
  children,
  joinMeeting,
}: {
  children: React.ReactNode;
  joinMeeting: () => void;
}) {
  return <div>{children}</div>;
}
