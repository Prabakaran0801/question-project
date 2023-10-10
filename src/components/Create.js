import React from "react";
import Form from "./Form";

const Create = () => {
  const initialState = {
    type: "",
    question: "",
    answer: "",
    catagory: "",
    tags: [],
  };
  return <Form initialState={initialState} />;
};

export default Create;
