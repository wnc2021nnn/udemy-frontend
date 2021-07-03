import { useParams } from "react-router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedCourses } from "../api/api-courses";
import CourseItem from "../components/Courses/CourseItem";

const RELATED_COURSES_PARAM = {
  sort: "registed_des",
  limit: 4,
};

export default function CourseDetailPage(props) {
  const params = useParams();
  const course_id = params.course_id;
  const [relatedCourses, setRelatedCourses] = useState([]);

  const getRelatedCourseAPI = () => {
     getRelatedCourses(course_id, RELATED_COURSES_PARAM).then((res)=>{
         setRelatedCourses(res.data.data);
     })
     .catch((err)=>{console.error(err)});
  };
  
  const relatedCoursesListJSX = relatedCourses.map((courseItem)=>{
    return <CourseItem key={courseItem.course_id} courseItem = {courseItem}/>
})

  useEffect(() => {
    getRelatedCourseAPI();
  }, []);

  return (
    <Fragment>
      {relatedCoursesListJSX}
    </Fragment>
  );
}
