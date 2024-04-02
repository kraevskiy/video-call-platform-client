import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateCode(code: string) {
  const allowedChars = /^[0-9A-za-z_\-]{18}$/;
  return allowedChars.test(code)
}
