import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "indent",
  "link",
];

const Editor = ({ value, onChange }) => {
  return (
    <QuillNoSSRWrapper
      placeholder="Product description (min 20 characters long)"
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
      theme="snow"
    />
  );
};

export default Editor;
