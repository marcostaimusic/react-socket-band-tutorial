import React, { useState } from "react";
import useSocket from "../hooks/useSocket";
export const BandAdd = () => {
  const [value, setValue] = useState("");
  const socket = useSocket("http://localhost:8080");

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
