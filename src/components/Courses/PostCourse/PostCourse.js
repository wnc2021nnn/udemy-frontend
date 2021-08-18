import classes from "./PostCourse.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Button, Switch, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory, useParams } from "react-router";
import {
  addChapter,
  createCourse,
  getCourseById,
  getCourseContent,
  updateCourse,
} from "../../../api/api-courses";
import CategoryDropdown from "../../Category/CategoryDropDown";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../store/slices/statusSlice";
import Status from "../../../constants/status-constants";
import ModalMaterial from "../../UI/ModalMaterial/ModalMaterial";
import AddChapter from "./AddChapter";
import ListChapter from "./ListChapter";
import ListLesson from "./ListLesson";
import { validateField } from "../../../utils/validateFormUtil";
export default function PostCourse(props) {
  const history = useHistory();
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
  const [isOpenAddNewChapter, setIsOpenAddNewChapter] = useState(false);
  const [newChapter, setNewChapter] = useState({ index: 0, title: "" });
  const [courseContent, setCourseContent] = useState({
    chapters: [],
    lessons: [],
  });

  const [activeChapter, setActiveChapter] = useState({ chapter_id: "" });
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
      getCourseContent(course_id).then((res) => {
        const content = res.data.data;
        const chaptersRes = res.data.data.chapters.sort(
          (a, b) => a.index - b.index
        );
        console.log("chapters", chaptersRes);
        setCourseContent({
          chapters: chaptersRes,
          ...content,
        });
        if (content.chapters && content.chapters.length !== 0)
          setActiveChapter(content.chapters[0]);
      });
    } else setCourseInfor(initialState);
  }, [params.course_id]);
  console.log("active", activeChapter);

  const onSaveClickHandler = () => {
    if (
      validateField(courseInfor.avatar) ||
      validateField(courseInfor.description) ||
      validateField(courseInfor.short_description) ||
      validateField(courseInfor.title) ||
      validateField(courseInfor.topic_id)
    ) {
      dispatch(
        setStatus({
          message: "Vui lòng điền đầy đủ thông tin",
          status: Status.FAILED_STATUS,
        })
      );
      return;
    }
    if (!course_id)
      createCourse(courseInfor).then((res) => {
        dispatch(
          setStatus({
            message: "Create new course successfully!",
            status: Status.SUCCESS_STATUS,
          })
        );
        history.push(`/${res.data.data.course_id}`);
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

  const handleChangeChapter = (event) => {
    const value = event.target.value;
    setNewChapter((prevState) => {
      return { ...prevState, title: value };
    });
  };

  const getCourseContentHandler = () => {
    getCourseContent(course_id).then((res) => setCourseContent(res.data.data));
  };

  const submitAddNewChapter = () => {
    setCourseContent((prevState) => {
      return { ...prevState, chapters: [...prevState.chapters, newChapter] };
    });
    addChapter({
      course_id: course_id,
      chapters: [
        {
          index: courseContent.chapters.length - 1,
          title: newChapter.title,
        },
      ],
    }).then((res) => {
      setIsOpenAddNewChapter(false);
      getCourseContentHandler();
    });
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
      {course_id && (
        <div style={{ display: "flex" }}>
          <div style={{ width: "100%" }}>
            <h3>List chapter</h3>
            <ListChapter
              chapters={courseContent.chapters}
              activeChapter={activeChapter}
              setActiveChapter={setActiveChapter}
              submitAddNewChapter={submitAddNewChapter}
              isOpenAddNewChapter={isOpenAddNewChapter}
              setIsOpenAddNewChapter={setIsOpenAddNewChapter}
              handleChangeChapter={handleChangeChapter}
              submitAddNewChapter={submitAddNewChapter}
              chapter={newChapter}
              course_id={course_id}
              getCourseContentHandler={getCourseContentHandler}
            />
          </div>
          <div style={{ width: "2rem" }}></div>
          {activeChapter.chapter_id !== "" && (
            <div style={{ width: "100%" }}>
              <h3>List lesson</h3>
              <ListLesson
                lessons={courseContent.lessons}
                activeChapter={activeChapter}
                course_id={course_id}
                getCourseContentHandler={getCourseContentHandler}
              />
            </div>
          )}
        </div>
      )}

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
