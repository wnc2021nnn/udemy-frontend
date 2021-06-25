import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotTopicList } from "../../store/slices/categoriesSlice";
import classes from "./HotCategories.module.css";

export default function HotCategories() {
    const dispatch = useDispatch();
    const listHotTopic = useSelector(state=>state.categories.listHotTopic.entities);
    const listHotTopicJSX = listHotTopic.map((topic)=>{
        <div className={classes.listitem} key={topic.topic_id}>{topic.title}</div>
    })
    useEffect(()=>{
        dispatch(fetchHotTopicList());
    }, [])
  return (
    <div className={classes.wrapper}>
      <h1>Hot category</h1>
      <div className={classes.listwrapper}>
          {listHotTopicJSX}
      </div>
    </div>
  );
}
