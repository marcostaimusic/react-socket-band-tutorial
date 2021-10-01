import React, { useState } from "react";

export const BandAdd = ({ addBandtoList }) => {
  const [value, setValue] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target.firstChild.value);
    console.log(value);
    if (value.trim().length > 0) {
      setValue(event.target.value);
      addBandtoList(value);
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
