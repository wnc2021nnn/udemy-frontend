import React from "react";
import startIcon from "../../assets/icons/star.svg";
import Card from "../UI/Card";
import classes from "./CourseItem.module.css";
import Image from "../UI/Image/Image";
import { useHistory } from "react-router";
const CourseItem = (props) => {
  const history = useHistory();
  const courseItem = props.courseItem;

  const courseItemClickHandler = () => {
    history.push(`/courses/${courseItem.course_id}`);
  };

  return (
    <Card onClick={courseItemClickHandler}>
      <div className={classes.wrapper}>
        <Image
          alt={courseItem.course_id}
          src={courseItem.avatar}
          className={classes.thumbnail}
        />
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
        </div>
        <div>{courseItem.price}$</div>
      </div>
    </Card>
  );
};

export default CourseItem;
