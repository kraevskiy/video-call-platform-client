export const DEFAULT_CALLBACK_URL = "/";

export enum Routes {
  MAIN = "/",
  SIGN_IN = "/auth/sign-in",
  SIGN_UP = "/auth/sign-up",
  ERROR = "/auth/error",
}

export const authRoutes = [Routes.SIGN_IN, Routes.SIGN_UP, Routes.ERROR];
export const apiAuthPrefix = "/api/auth";
