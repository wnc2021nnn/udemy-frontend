import React, { Fragment, useEffect, useState } from "react";
import classes from "./MainPanel.module.css";
import HorizontalList from "../UI/List/HorizontalList";
import logoIcon from "../../assets/icons/Logo.svg";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { useDispatch, useSelector } from "react-redux";
import CoursePanel from "../MainPanel/CoursePanel";
import { fetchHighlightCourses } from "../../store/slices/coursesSlice";

const MainPanel = () => {
  const dispatch = useDispatch();

  const listHighlightCourses = useSelector(
    (state) => state.courses.listMostViewCourses.entities
  );
  const listHighlightCoursesJSX = listHighlightCourses.map((element) => {
    return(
      <div key={element.course_id} className="each-slide">
        <div style={{ backgroundImage: `url("${element.avatar}")`}} className={classes.slide}>
          <CoursePanel courseItem={element} />
        </div>
      </div>
    )
  });

  useEffect(() => {
    dispatch(fetchHighlightCourses());
  }, []);

  return (
    <Fragment>  
      {/* <div className={classes.root}> */}
        <Slide easing="ease" autoplay="false"  className={classes.root}> 
          {listHighlightCoursesJSX}
        </Slide>
      {/* </div> */}
    </Fragment>
  );
};

export default MainPanel;
