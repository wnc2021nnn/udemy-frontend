import classes from "./PostCourse.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useParams } from "react-router";
export default function PostCourse(props) {
  const params = useParams();
  const [fullDescription, setFullDescription] = useState("");
  const onChangeHandler = (value) => {
    setFullDescription(value);
  };
  console.log(params);
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
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ width: "30%", marginTop: "1rem" }}
      >
        Add chapter
      </Button>
    </div>
  );
}
