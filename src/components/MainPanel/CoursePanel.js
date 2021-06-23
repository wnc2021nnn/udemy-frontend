import React from "react";
import classes from "./CoursePanel.module.css";
import startIcon from "../../assets/icons/star.svg";
import Card from "../UI/Card";
const CoursePanel = (props) => {
  const courseItem = props.courseItem;

  return (
    <div className={classes.wrapper}>
        <div className={classes.infor}>
          <div>{courseItem.description}</div>
          <div className={classes.author}>{`${courseItem.lecturer_last_name} ${courseItem.lecturer_first_name}`}</div> 
          <div className={classes.meta}>
            <div className={classes.review}>
              <div>{courseItem.rating}</div>
              <img alt="start icon" src={startIcon} />
            </div>
            <div>{`${courseItem.rating_total} reviews`}</div>
          </div>
        </div>
    </div>
  );
};

export default CoursePanel;
