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
  const courseItemClickHandler = () => {
    if (!isMyCourse) history.push(`/courses/${courseItem.course_id}`);
    else history.push(`/learn/${courseItem.course_id}`);
  };

  return (
    <div className={classes.wrapper} onClick={courseItemClickHandler}>
      <div className={classes.infor}>
        <div>{courseItem.description}</div>
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
        <div>{courseItem.price}$</div>
      </div>
    </div>
  );
};

export default CoursePanel;
