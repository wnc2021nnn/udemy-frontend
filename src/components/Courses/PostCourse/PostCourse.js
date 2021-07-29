import classes from "./PostCourse.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Button, Switch } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useParams } from "react-router";
import {
  createCourse,
  getCourseById,
  updateCourse,
} from "../../../api/api-courses";
import CategoryDropdown from "../../Category/CategoryDropDown";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../store/slices/statusSlice";
import Status from "../../../constants/status-constants";
export default function PostCourse(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const course_id = params.course_id;
  const initialState = {
    avatar: "",
    description: "",
    short_description: "",
    title: "",
    topic_id: "",
    price: 0,
    status: "INCOMPLETE",
  };
  const [courseInfor, setCourseInfor] = useState(initialState);
  const topicTitle = useSelector((state) => {
    const listCategory = state.categories.listCategory.entities;
    for (let i = 0; i < listCategory.length; i++) {
      const element = listCategory[i];
      for (let j = 0; j < element.topics.length; j++) {
        if (element.topics[j].topic_id === courseInfor.topic_id)
          return element.topics[j].title;
      }
    }
  });
  const onChangeFullDesciptionHandler = (value) => {
    setCourseInfor((prevState) => {
      return {
        ...prevState,
        description: value,
      };
    });
  };

  const onChangeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    let value = target.value;

    if (name === "price") {
      value = Number(value);
    }
    setCourseInfor((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onChangeStatusHandler = (event) => {
    const target = event.target;
    const name = target.name;
    const check = target.checked;
    const value = check ? "COMPLETE" : "INCOMPLETE";

    setCourseInfor((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onClickCategory = (topic_id) => {
    setCourseInfor((prevState) => {
      return { ...prevState, topic_id };
    });
  };
  useEffect(() => {
    if (course_id) {
      getCourseById(course_id).then((res) => {
        const courseRes = res.data.data;
        if (courseRes)
          setCourseInfor({
            avatar: courseRes.avatar,
            description: courseRes.description,
            short_description: courseRes.short_description,
            title: courseRes.title,
            topic_id: courseRes.topic_id,
            price: courseRes.price,
            status: courseRes.status,
          });
      });
    } else setCourseInfor(initialState);
  }, [params.course_id]);

  const onSaveClickHandler = () => {
    if (!course_id)
      createCourse(courseInfor).then((res) => {
        dispatch(
          setStatus({
            message: "Create new course successfully!",
            status: Status.SUCCESS_STATUS,
          })
        );
      });
    else {
      updateCourse(course_id, courseInfor).then((res) =>
        dispatch(
          setStatus({
            message: "Update course successfully!",
            status: Status.SUCCESS_STATUS,
          })
        )
      );
    }
  };
  return (
    <div className={classes.wrapper}>
      <h3>Course name</h3>
      <input
        value={courseInfor.title}
        onChange={onChangeHandler}
        name="title"
      />
      <h3>Price</h3>
      <input
        value={courseInfor.price}
        onChange={onChangeHandler}
        name="price"
      />
      <CategoryDropdown
        title={topicTitle ?? "Category"}
        clickTopicHandler={onClickCategory}
      />
      <h3>Course thumbnail</h3>
      <input
        value={courseInfor.avatar}
        onChange={onChangeHandler}
        name="avatar"
      />
      <h3>Short description</h3>
      <input
        value={courseInfor.short_description}
        onChange={onChangeHandler}
        name="short_description"
      />
      <div>
        <h3>Is Complete?</h3>
        <Switch
          checked={courseInfor.status === "COMPLETE"}
          onChange={onChangeStatusHandler}
          color="primary"
          name="status"
          inputProps={{ "aria-label": "primary checkbox" }}
          style={{ display: "inline" }}
        />
      </div>
      <h3>Full description</h3>
      <ReactQuill
        value={courseInfor.description}
        onChange={onChangeFullDesciptionHandler}
      />
      <Button
        variant="contained"
        color="primary"
        //startIcon={<AddIcon />}
        style={{ width: "30%", marginTop: "1rem" }}
        onClick={onSaveClickHandler}
      >
        Save
      </Button>
    </div>
  );
}
