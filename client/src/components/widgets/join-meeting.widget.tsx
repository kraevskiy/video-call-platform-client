"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function JoinMeetingWidget() {
  const [code, setCode] = useState("");
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[3fr,1fr] items-center">
        <Input
          className="text-md h-11 sm:rounded-2xl"
          placeholder="Enter code"
          maxLength={18}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button className="sm:rounded-2xl">Join</Button>
      </div>
      <div className="ml-2 mt-1 text-sm">{code.length}/18</div>
    </>
  );
}
