import React, { useState } from "react";
import Form from "./Form";
import Sidebar from "./Sidebar";

const Create = () => {
  const [initialState, setInitialState] = useState({});

  const onChange = (field, data) => {
    setInitialState((prev) => ({ ...prev, [field]: data }));
  };

  return (
    <>
      <div>
        <Form a initialState={initialState} onChange={onChange} />;
      </div>
    </>
  );
};

export default Create;
