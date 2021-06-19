import React from "react";
import HorizontalList from "../UI/List/HorizontalList";
import ItemCourse from "../Courses/CourseItem";
import classes from "./ListCourses.module.css"
const ListCourses = (props) =>{

    const listCourseItem =  props.listItemCourse.map((item)=>{
        return <ItemCourse key={item.courses_id} courseItem = {item}/>
      })

    return <div className={classes.wrapper}>
            <h1>{props.title}</h1>
          <div className={classes.scrollContent}>
          {listCourseItem}
          </div>
      </div>
}

export default ListCourses;