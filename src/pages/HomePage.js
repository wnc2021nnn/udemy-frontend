import React, { Fragment, useEffect, useState } from "react";
import MainPanel from "../components/MainPanel/MainPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMostViewCourses,
  fetchNewestCourses,
  fetchHighlightCourses,
} from "../store/slices/coursesSlice";
import ListCourses from "../components/Courses/ListCourses.js";
import HotCategories from "../components/Category/HotCategories";
import Status from "../constants/status-constants";
import { setStatus } from "../store/slices/statusSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const listNewestCourses = useSelector(
    (state) => state.courses.listNewestCourses
  );
  const listHighlightCourses = useSelector(
    (state) => state.courses.listHighlightCourses
  );
  const listMostViewCourses = useSelector(
    (state) => state.courses.listMostViewCourses
  );

  useEffect(() => {
    dispatch(fetchMostViewCourses());
    dispatch(fetchNewestCourses());
    dispatch(fetchHighlightCourses());
  }, []);

  useEffect(() => {
    if (
      listNewestCourses.status.status == Status.LOADING_STATUS ||
      listHighlightCourses.status.status == Status.LOADING_STATUS ||
      listMostViewCourses.status.status == Status.LOADING_STATUS
    ) {
      dispatch(
        setStatus({ message: "Loading...", status: Status.LOADING_STATUS })
      );
    }
  }, [listNewestCourses, listHighlightCourses, listMostViewCourses]);

  return (
    <Fragment>
      <MainPanel listHighlightCourses={listHighlightCourses} />
      <ListCourses
        title="Most View courses"
        listItemCourse={listMostViewCourses.entities}
      />
      <ListCourses
        title="Latest Courses"
        listItemCourse={listNewestCourses.entities}
      />
      <HotCategories />
    </Fragment>
  );
};

export default HomePage;
