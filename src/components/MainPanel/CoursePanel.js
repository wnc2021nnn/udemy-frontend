import React from "react";
import classes from "./CoursePanel.module.css";
import startIcon from "../../assets/icons/star.svg";
import { useHistory } from "react-router";
const CoursePanel = (props) => {
  const history = useHistory();
  const courseItem = props.courseItem;
  const onClickHandler = () => {
    history.push(`/courses/${courseItem.course_id}`);
  };

  return (
    <div className={classes.wrapper} onClick={onClickHandler}>
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
