import classes from "./PostCourse.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

export default function PostCourse(props) {
  const [fullDescription, setFullDescription] = useState("");
  const onChangeHandler = (value) => {
    setFullDescription(value);
  };
  console.log(fullDescription);
  return (
    <div className={classes.wrapper}>
      <h3>Course name</h3>
      <input />
      <h3>Course thumbnail</h3>
      <input type="file" />
      <h3>Short description</h3>
      <input />
      <h3>Full description</h3>
      <ReactQuill value={fullDescription} onChange={onChangeHandler} />
    </div>
  );
}
