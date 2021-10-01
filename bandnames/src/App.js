import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socket;
};

function App() {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    console.log(socket);
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

  useEffect(() => {
    socket.on("bandList", (bands) => {
      console.log(bands);
      setBands(bands);
    });
  }, [socket]);

  const castVote = (id) => {
    // console.log("voted", id);
    socket.emit("voting", id);
  };

  const deleteBand = (id) => {
    socket.emit("deleting", id);
  };

  const changeNameandSave = (id, name) => {
    socket.emit("changeName", { id, name });
  };

  const addBandtoList = (name) => {
    socket.emit("addingBand", { name });
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success"> Online</span>
          ) : (
            <span className="text-danger"> Offline</span>
          )}
        </p>
      </div>

      <h1>Band names</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <BandList
            data={bands}
            vote={castVote}
            deleting={deleteBand}
            changeNameandSave={changeNameandSave}
          />
        </div>
        <div className="col-4">
          <BandAdd addBandtoList={addBandtoList} />
        </div>
      </div>
    </div>
  );
}

export default App;
