"use server";
import { Code } from "@/types";
import { db } from "@/lib/db";

export default async function getMeetingByCode(code: Code) {
  try {
    const meeting = await db.meeting.findUnique({ where: { code } });
    return meeting;
  } catch (e) {
    return null;
  }
}
