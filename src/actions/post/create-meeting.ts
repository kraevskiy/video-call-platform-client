"use server";

import {
  CreateMeetingInputs,
  CreateMeetingValidationSchema,
} from "@/types/forms";
import { auth } from "@/../auth";
import { db } from "@/lib/db";
import { generateCode } from '@/lib/utils';

export default async function createMeeting(data: CreateMeetingInputs) {
  const session = await auth();
  if (!session) {
    return { error: "Forbidden!" };
  }
  const validationResult = CreateMeetingValidationSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: "Invalid name" };
  }

  const meeting = await db.meeting.create({
    data: {
      ownerId: session.user.id,
      code: generateCode(),
      name: validationResult.data.name,
    },
  });

  return { success: true, meeting };
}
