import { Socket as ClientSocket } from "socket.io-client";
import { Code } from "@/types/index";
import { MediaConnection } from "peerjs";

export type Socket = ClientSocket<ServerToClientEvents, ClientToServerEvents>;

export type PeerId = string;

export type PeerUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  peerId: PeerId;
  muted: boolean;
  visible: boolean;
};

export type PeerUserWithSocketId = { socketId: string } & PeerUser;
export type BasicDataWithCodeAndPeerUserWithSocketId = {
  code: Code;
  user: PeerUserWithSocketId;
};
export type BasicDataWithCodeAndPeerUser = { code: Code; user: PeerUser };
export type BasicJoinData = {
  code: Code;
  user: PeerUser;
  ownerId: string;
};

export interface ClientToServerEvents {
  "user:join-request": (data: BasicJoinData) => void;
  "user:accepted": (data: BasicDataWithCodeAndPeerUserWithSocketId) => void;
  "user:rejected": (data: BasicDataWithCodeAndPeerUserWithSocketId) => void;
  "meeting:join": (data: Omit<BasicJoinData, "ownerId">) => void;
  "user:toggle-audio": (peerId: PeerId) => void;
  "user:toggle-video": (peerId: PeerId) => void;
}

export interface ServerToClientEvents {
  "meeting:full": () => void;
  "user:wait-for-owner": () => void;
  "user:joined": (data: PeerUser) => void;
  "user:accepted": (data: BasicDataWithCodeAndPeerUser) => void;
  "user:rejected": (data: BasicDataWithCodeAndPeerUser) => void;
  "user:join-request": (data: PeerUserWithSocketId) => void;
  "user:toggled-video": (peerId: PeerId) => void;
  "user:toggled-audio": (peerId: PeerId) => void;
  "user:left": (peerId: PeerId) => void;
}

export type KeyValue<T> = Record<string, T>;

export type MeetingType = {
  ownerId: string;
  ownerSocketId: string;
  members: number;
};

export type PeerConnection = {
  stream: MediaStream;
  connection: MediaConnection;
} & PeerUser;
