import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io(process.env.NEXT_PUBLIC_API_BASE_URL);
    }
    setSocket(socketInstance);

    return () => {
      socketInstance?.disconnect();
      socketInstance = null;
    };
  }, []);

  return socket;
}
