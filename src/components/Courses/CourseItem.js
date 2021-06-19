import React from 'react'
import startIcon from '../../assets/icons/star.svg'
import Card from '../UI/Card'
import classes from './CourseItem.module.css'
const CourseItem = (props) =>{
  const courseItem = props.courseItem;
  return (
    <Card >
      <div className={classes.wrapper}>
      <img alt={courseItem.title} src={courseItem.avatar} className={classes.thumbnail}/>
      <div className={classes.infor}>
      <div>{courseItem.description}</div>
      <div className={classes.author}>{courseItem.lecturers_id}</div> 
        <div className={classes.meta}> 
          <div className={classes.review}>
            <div > 
              {courseItem.rating}
            </div>
            <img alt="start icon" src={startIcon}/>
          </div>
          <div>
            {`${courseItem.rating_total} reviews`}
          </div>
        </div>
      </div>
      </div>
    </Card>
  )
}

export default CourseItem;