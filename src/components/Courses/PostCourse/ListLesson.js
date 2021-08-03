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
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";
import AddLesson from "./AddLesson";
import { addLesson, editLessonAPI } from "../../../api/api-courses";

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

export default function ListLesson(props) {
  const activeChapter = props.activeChapter;
  const lessons = props.lessons;
  const course_id = props.course_id;
  const [listLessonChapter, setListLessonChapter] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newLesson, setNewLesson] = useState({
    title: "",
    video_link: "",
  });

  const [editLesson, setEditLesson] = useState({});
  const [isOpenEditLesson, setIsOpenEditLesson] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    let temp = [];
    lessons.forEach((element) => {
      if (element.chapter_id === activeChapter.chapter_id) {
        temp.push(element);
      }
    });
    temp.sort((a, b) => a.index - b.index);
    setListLessonChapter(temp);
  }, [activeChapter, lessons]);

  const listChapter = listLessonChapter.map((item) => (
    <ListItem key={item.lesson_id}>
      <ListItemText primary={item.title} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            console.log(item);
            setIsOpenEditLesson(true);
            setEditLesson({
              title: item.title,
              video_link: item.video_link,
              lesson_id: item.lesson_id,
              index: item.index,
            });
          }}
        >
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));
  const handleChangeLesson = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setNewLesson((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitAddNewLesson = () => {
    setListLessonChapter((prevState) => {
      return [...prevState, newLesson];
    });
    addLesson({
      course_id,
      lessons: [
        {
          ...newLesson,
          index: listLessonChapter.length,
          chapter_id: activeChapter.chapter_id,
        },
      ],
    }).then((res) => {
      setIsOpen(false);
      setNewLesson({});
      props.getCourseContentHandler();
    });
  };

  const handleChangeEditLesson = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setEditLesson((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitEditLesson = () => {
    console.log(editLesson);
    editLessonAPI({
      course_id,
      lessons: [{ ...editLesson }],
    }).then((res) => {
      setIsOpenEditLesson(false);
      props.getCourseContentHandler();
    });
  };

  return (
    <div className={classes.demo} style={{ width: "100%" }}>
      <List>{listChapter}</List>
      <Button
        variant="contained"
        color="primary"
        style={{ width: "30%", marginTop: "1rem" }}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add lesson
      </Button>
      <AddLesson
        title="Add new lesson"
        isOpenAddNewLesson={isOpen}
        setIsOpenAddNewLesson={setIsOpen}
        handleChangeLesson={handleChangeLesson}
        submitAddNewLesson={submitAddNewLesson}
        lessonInfor={newLesson}
      />

      <AddLesson
        title="Edit lesson"
        isOpenAddNewLesson={isOpenEditLesson}
        setIsOpenAddNewLesson={setIsOpenEditLesson}
        handleChangeLesson={handleChangeEditLesson}
        submitAddNewLesson={submitEditLesson}
        lessonInfor={editLesson}
      />
    </div>
  );
}
