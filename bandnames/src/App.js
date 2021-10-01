import React, { useEffect, useState } from "react";
import useSocket from "./hooks/useSocket";

import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";

function App() {
  const [bands, setBands] = useState([]);

  const { socket, online } = useSocket("http://localhost:8080");

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
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
