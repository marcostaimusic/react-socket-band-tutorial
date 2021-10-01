import React, { useState, useContext } from "react";

import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const [value, setValue] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target.firstChild.value);
    console.log(value);
    if (value.trim().length > 0) {
      setValue(event.target.value);
      socket.emit("addingBand", { name: value });
      setValue("");
    }
  };

  return (
    <>
      <h3>Add Band</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="New band name"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </form>
    </>
  );
};
