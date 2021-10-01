import io from "socket.io-client";
import { useMemo, useEffect, useState, useCallback } from "react";

export const useSocket = (serverPath) => {
  const socket = useMemo(() => {
    return io.connect(serverPath, {
      transports: ["websocket"],
    });
  }, [serverPath]);

  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return { socket, online };
};

export default useSocket;

// export function useSocket(serverPath) {
//   // const socket = useCallback(() => io.connect(serverPath), [serverPath]);
//   const socket = useMemo(() => io.connect(serverPath), [serverPath]);
//   const [online, setOnline] = useState(false);

//   useEffect(() => {
//     console.log(socket);
//     setOnline(socket.connected);
//   }, [socket]);

//   useEffect(() => {
//     socket.on("connect", () => {
//       setOnline(true);
//     });
//   }, [socket]);

//   useEffect(() => {
//     socket.on("disconnect", () => {
//       setOnline(false);
//     });
//   }, [socket]);

//   return { socket, online };
// }
