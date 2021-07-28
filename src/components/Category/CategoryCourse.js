import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Pagination from "@material-ui/lab/Pagination";
import CourseItem from "../Courses/CourseItem";
import ReactPaginate from "react-paginate";
import { getAllCourses } from "../../api/api-courses";

export default function CategoryCourse() {
  const dispatch = useDispatch();
  const [listCourseCategory, setListCourseCategory] = useState({
    listCourses: [],
    total_courses: 0,
  });
  const params = useParams();
  const topic_id = params.topic_id;
  const listCourseJSX = listCourseCategory.listCourses.map((courseItem) => {
    return <CourseItem key={courseItem.course_id} courseItem={courseItem} />;
  });
  const topicTitle = useSelector((state) => {
    const listCategory = state.categories.listCategory.entities;
    for (let i = 0; i < listCategory.length; i++) {
      const element = listCategory[i];
      for (let j = 0; j < element.topics.length; j++) {
        if (element.topics[j].topic_id === topic_id)
          return element.topics[j].title;
      }
    }
  });

  useEffect(() => {
    getAllCourses({ topic: topic_id, limit: 4, page: 1 }).then((res) => {
      setListCourseCategory({
        listCourses: res.data.data,
        total_courses: res.data.pagination.total_courses,
      });
    });
  }, [topic_id]);

  const changePaginationHandler = (event, value) => {
    getAllCourses({ topic: topic_id, limit: 4, page: value }).then((res) => {
      setListCourseCategory({
        listCourses: res.data.data,
        total_courses: res.data.pagination.total_courses,
      });
    });
  };

  return (
    <div>
      <h1>{topicTitle}</h1>
      {listCourseJSX}
      <Pagination
        count={Math.ceil(listCourseCategory.total_courses / 4)}
        style={{ position: "fixed", bottom: "0", height: "4rem" }}
        onChange={changePaginationHandler}
      />
    </div>
  );
}
