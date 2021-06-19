import React, { Fragment, useEffect } from "react"
import MainPanel from "../components/MainPanel/MainPanel"
import {useDispatch, useSelector} from "react-redux"
import {fetchCourses, fetchMostViewCourses, fetchNewestCourses} from "../store/slices/coursesSlice"
import ListCourses from "../components/Courses/ListCourses.js";
const HomePage = () =>{

    const dispatch = useDispatch();
    const listNewestCourses = useSelector(state=>state.courses.listNewestCourses.entities);
    useEffect(()=>{
        dispatch(fetchCourses());
        dispatch(fetchNewestCourses());
    },[])
    return (
        <Fragment>
            <MainPanel/>
            {/* <ListCourses title="Most populars" listItemCourse = {listMostPopularCourse}/>  */}
            <ListCourses title="Latest Courses" listItemCourse = {listNewestCourses}/> 
            <ListCourses title="Latest Courses" listItemCourse = {listNewestCourses}/> 
            <ListCourses title="Latest Courses" listItemCourse = {listNewestCourses}/> 
{/* <ListCourses title="Most populars" listItemCourse = {listMostPopularCourse}/>  */}
        </Fragment>
)
}

export default HomePage;