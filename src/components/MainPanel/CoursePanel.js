import React from "react";
import classes from "./CoursePanel.module.css";
import startIcon from "../../assets/icons/star.svg";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const CoursePanel = (props) => {
  const history = useHistory();
  const courseItem = props.courseItem;
  const isMyCourse = useSelector((state) =>
    state.courses.myCourses.entities.find(
      (item) => item.course_id === courseItem.course_id
    )
  );
  const topicTitle = useSelector((state) => {
    const listCategory = state.categories.listCategory.entities;
    for (let i = 0; i < listCategory.length; i++) {
      const element = listCategory[i];
      for (let j = 0; j < element.topics.length; j++) {
        if (element.topics[j].topic_id === courseItem.topic_id)
          return element.topics[j].title;
      }
    }
  });
  const courseItemClickHandler = () => {
    if (!isMyCourse) history.push(`/courses/${courseItem.course_id}`);
    else history.push(`/learn/${courseItem.course_id}`);
  };

  return (
    <div className={classes.wrapper} onClick={courseItemClickHandler}>
      <div className={classes.infor}>
        <div>{courseItem.title}</div>
        <div
          className={classes.author}
        >{`${courseItem.lecturer_last_name} ${courseItem.lecturer_first_name}`}</div>
        <div className={classes.meta}>
          <div className={classes.review}>
            <div>{courseItem.rating}</div>
            <img alt="start icon" src={startIcon} />
          </div>
          <div>{`${courseItem.rating_total} reviews`}</div>
        </div>
        <div style={{ display: "flex" }}>
          <s>{courseItem.price}$</s>
          <div style={{ width: "2rem" }}></div>
          <div>0$</div>
        </div>
        <div>{topicTitle}</div>
      </div>
    </div>
  );
};

export default CoursePanel;
