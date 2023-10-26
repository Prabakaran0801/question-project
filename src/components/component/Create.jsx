import React, { useState } from "react";
import Form from "./Form";

const Create = () => {
  const [initialState, setInitialState] = useState({});

  const onChange = (field, data) => {
    setInitialState((prev) => ({ ...prev, [field]: data }));
  };

  return <Form initialState={initialState} onChange={onChange} />;
};

export default Create;
