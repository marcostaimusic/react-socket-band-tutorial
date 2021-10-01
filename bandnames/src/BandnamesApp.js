import React from "react";
import { SocketProvider } from "./context/SocketContext";
import App from "./App";

export const BandnamesApp = () => {
  return (
    <SocketProvider>
      <App />
    </SocketProvider>
  );
};
