import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { fetchCourses } from "../../store/slices/coursesSlice";
import CourseItem from "../Courses/CourseItem";

export default function CategoryCourse(){
    const dispatch = useDispatch();
    const listCourseCategory= useSelector(state=>state.courses.listCourses.entities);
    const params = useParams();
    const topic_id = params.topic_id;
    const listCourseJSX = listCourseCategory.map((courseItem)=>{
        return <CourseItem key={courseItem.course_id} courseItem={courseItem}/>;
    })

    useEffect(()=>{
        dispatch(fetchCourses({topic:topic_id}));
    }, [topic_id])

    return (
    <div>
        <h1>List course</h1>
        {listCourseJSX}
    </div>
    )
   

}