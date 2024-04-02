"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function CreateMeetingWidget() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Create new meeting</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="mb-5">Create new meeting</DialogTitle>
            <form>
              <Label className="mb-5" htmlFor="name">Name</Label>
              <Input id="name" placeholder="English lesson" className="mb-5 h-10 text-md" maxLength={110}/>
              <Button type="submit" className="w-full" size="sm">
                Create new meeting
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
