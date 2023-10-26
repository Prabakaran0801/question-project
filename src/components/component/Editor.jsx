import React from "react";
import hljs from "highlight.js";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";

hljs.configure({
  languages: ["javascript", "ruby", "python", "rust"],
});

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

const Editor = ({ value, onChange, fieldName }) => {
  return (
    <ReactQuill
      value={value}
      onChange={(newContent) => onChange(fieldName, newContent)}
      theme="bubble"
      modules={modules}
      formats={formats}
    />
  );
};

export default Editor;
