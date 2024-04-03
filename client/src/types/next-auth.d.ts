import { type DefaultSelection } from "next-auth";

export type ExtendedUser = DefaultSelection["user"] & {
  id: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
