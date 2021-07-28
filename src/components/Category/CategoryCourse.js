import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCourses } from "../../store/slices/coursesSlice";
import CourseItem from "../Courses/CourseItem";

export default function CategoryCourse() {
  const dispatch = useDispatch();
  const listCourseCategory = useSelector(
    (state) => state.courses.listCourses.entities
  );
  const params = useParams();
  const topic_id = params.topic_id;
  const listCourseJSX = listCourseCategory.map((courseItem) => {
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
    dispatch(fetchCourses({ topic: topic_id, limit: 4, page: 1 }));
  }, [topic_id]);

  return (
    <div>
      <h1>{topicTitle}</h1>
      {listCourseJSX}
    </div>
  );
}
