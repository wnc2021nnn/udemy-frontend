import React, { Fragment, useEffect } from "react"
import MainPanel from "../components/MainPanel/MainPanel"
import {useDispatch, useSelector} from "react-redux"
import {fetchMostViewCourses, fetchNewestCourses, fetchHighlightCourses} from "../store/slices/coursesSlice"
import ListCourses from "../components/Courses/ListCourses.js";
import HotCategories from "../components/Category/HotCategories"

const HomePage = () =>{

    const dispatch = useDispatch();
    const listNewestCourses = useSelector(state=>state.courses.listNewestCourses.entities);
    const listHighlightCourses = useSelector(state=>state.courses.listHighlightCourses.entities);
    const listMostViewCourses = useSelector(state=>state.courses.listMostViewCourses.entities);

    useEffect(()=>{
        dispatch(fetchMostViewCourses());
        dispatch(fetchNewestCourses());
        dispatch(fetchHighlightCourses());
    },[])
    console.log("Home page rendered");
    return (
        <Fragment>
            <MainPanel/>
            <ListCourses title="Most View courses" listItemCourse = {listMostViewCourses}/>
            <ListCourses title="Latest Courses" listItemCourse = {listNewestCourses}/> 
            <HotCategories/>
        </Fragment>
)
}

export default HomePage;