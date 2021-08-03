import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import AddChapter from "./AddChapter";
import { editChapterAPI } from "../../../api/api-courses";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function ListChapter(props) {
  const chapters = props.chapters;
  const activeChapter = props.activeChapter;
  const classes = useStyles();
  const course_id = props.course_id;
  const [isOpenEditChapter, setIsOpenEditChapter] = useState(false);
  const [editChapter, setEditChapter] = useState({});
  const handleChangeEditChapter = (event) => {
    setEditChapter((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  const submitEditChapter = () => {
    editChapterAPI({ course_id, chapters: [{ ...editChapter }] }).then(
      (res) => {
        setIsOpenEditChapter(false);
        props.getCourseContentHandler();
      }
    );
  };

  useEffect(() => {
    console.log(editChapter);
  }, [editChapter]);

  const listChapter = chapters.map((item) => (
    <ListItem
      key={item.chapter_id}
      button
      selected={activeChapter.chapter_id === item.chapter_id}
      onClick={(event) => {
        props.setActiveChapter(item);
      }}
    >
      <ListItemText primary={item.title} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            setIsOpenEditChapter(true);
            setEditChapter({
              title: item.title,
              chapter_id: item.chapter_id,
            });
          }}
        >
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <div className={classes.demo} style={{ width: "100%" }}>
      <List>{listChapter}</List>
      <Button
        variant="contained"
        color="primary"
        style={{ width: "30%", marginTop: "1rem" }}
        onClick={() => {
          props.setIsOpenAddNewChapter(true);
        }}
      >
        Add chapter
      </Button>
      <AddChapter
        isOpenAddNewChapter={props.isOpenAddNewChapter}
        title="Add new chapter"
        setIsOpenAddNewChapter={props.setIsOpenAddNewChapter}
        handleChangeChapter={props.handleChangeChapter}
        submitAddNewChapter={props.submitAddNewChapter}
        value={props.chapter.title}
      />

      <AddChapter
        isOpenAddNewChapter={isOpenEditChapter}
        title="Edit chapter"
        setIsOpenAddNewChapter={setIsOpenEditChapter}
        handleChangeChapter={handleChangeEditChapter}
        submitAddNewChapter={submitEditChapter}
        value={editChapter.title}
      />
    </div>
  );
}
