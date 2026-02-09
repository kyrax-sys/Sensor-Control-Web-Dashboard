import { io, Socket } from "socket.io-client";
import { SERVER_HTTP } from "./api";

export const SERVER_SOCKET = SERVER_HTTP;

export const connectSocket = (token: string): Socket => {
  return io(SERVER_SOCKET, {
    auth: { token },
    transports: ["websocket"],
  });
};
