import React, { Fragment, useEffect } from "react"
import MainPanel from "../components/MainPanel/MainPanel"
import {useDispatch, useSelector} from "react-redux"
import {fetchCourses, fetchMostViewCourses, fetchNewestCourses, fetchHighlightCourses} from "../store/slices/coursesSlice"
import ListCourses from "../components/Courses/ListCourses.js";
import { fetchCategoriesList } from "../store/slices/categoriesSlice";
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
            {/* <ListCourses title="Most populars" listItemCourse = {listMostPopularCourse}/>  */}
            <ListCourses title="Most view courses" listItemCourse = {listMostViewCourses}/>
            <ListCourses title="Latest Courses" listItemCourse = {listNewestCourses}/> 
            <ListCourses title="Latest Courses" listItemCourse = {listNewestCourses}/> 
{/* <ListCourses title="Most populars" listItemCourse = {listMostPopularCourse}/>  */}
        </Fragment>
)
}

export default HomePage;