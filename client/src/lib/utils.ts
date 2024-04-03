import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from 'nanoid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateCode(code: string) {
  const allowedChars = /^[0-9A-za-z_\-]{18}$/;
  return allowedChars.test(code);
}

export function initialsName(fullName: string) {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toLocaleUpperCase();
}

export function generateCode(length = 18) {
  return nanoid(length);
}
