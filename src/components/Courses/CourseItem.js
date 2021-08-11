import React from "react";
import startIcon from "../../assets/icons/star.svg";
import Card from "../UI/Card";
import classes from "./CourseItem.module.css";
import Image from "../UI/Image/Image";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import bestIcon from "../../assets/icons/best.svg";
const CourseItem = (props) => {
  const history = useHistory();
  const courseItem = props.courseItem;
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
    <Card onClick={courseItemClickHandler}>
      <div className={classes.wrapper}>
        <Image
          alt={courseItem.course_id}
          src={courseItem.avatar}
          className={classes.thumbnail}
        />

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
            {courseItem.registed_count > 2 && (
              <img
                src={bestIcon}
                style={{
                  width: "2rem",
                  height: "2rem",
                  position: "relative",
                  top: "0",
                  right: "0",
                }}
              />
            )}
          </div>
        </div>
        <div>
          <s>
            <span>{courseItem.price}$</span>
          </s>
          <span> 0$</span>
        </div>
        <div>{topicTitle}</div>
      </div>
    </Card>
  );
};

export default CourseItem;
