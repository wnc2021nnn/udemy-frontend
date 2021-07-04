import { useParams } from "react-router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRelatedCourses,
  getCourseById,
  getCourseReviews,
} from "../../api/api-courses";
import CourseItem from "../../components/Courses/CourseItem";
import classes from "./CourseDetail.module.css";
import starIcon from "../../assets/icons/star.svg";
import heartIcon from "../../assets/icons/heartIcon.svg";
import Image from "../UI/Image/Image";
import userIcon from "../../assets/icons/userIcon.svg";
import playIcon from "../../assets/icons/playIcon.svg";
import Review from "../Review/Review";
import { ImportExport } from "@material-ui/icons";

const RELATED_COURSES_PARAM = {
  sort: "registed_des",
  limit: 6,
};
export default function CourseDetail(props) {
  const params = useParams();
  const course_id = params.course_id;
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [courseDetail, setCourseDetail] = useState({});
  const [reviews, setReviews] = useState([]);
  const review = {
    course_id: "course_000002",
    user_id: "132fdbd8-5b03-4748-98f7-d2f037783355",
    rating: 3,
    reviews_text: "Khoa hoc rat huu ich 22",
    created_at: "1625404002314",
    course_review_id: "3665243d-96a6-4d4d-a561-0f17adcb705e",
    first_name: "Ngyen",
    last_name: "Le",
  };
  const getRelatedCourseAPI = () => {
    getRelatedCourses(course_id, RELATED_COURSES_PARAM)
      .then((res) => {
        const listRelated = res.data.data.filter(
          (item) => item.course_id !== course_id
        );
        setRelatedCourses(listRelated);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getDetailCourseAPI = () => {
    getCourseById(course_id)
      .then((res) => {
        setCourseDetail(res.data.data);
      })
      .catch((err) => console.error(err));
  };
  const getCourseReviewsAPI = () => {
    getCourseReviews(course_id)
      .then((res) => {
        setReviews(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  const relatedCoursesListJSX = relatedCourses.map((courseItem) => {
    return <CourseItem key={courseItem.course_id} courseItem={courseItem} />;
  });

  const reviewsJSX = reviews.map((item) => <Review review={item} />);

  useEffect(() => {
    getRelatedCourseAPI();
    getDetailCourseAPI();
    getCourseReviewsAPI();
  }, [course_id]);
  console.log(courseDetail.avatar);

  return (
    <div className={classes.wrapper}>
      <div className={classes.course}>
        <div className={classes.courseInfor}>
          <h2>{courseDetail.title}</h2>
          <h4>{courseDetail.description}</h4>
          <div className={classes.meta}>
            <div className={classes.rating}>
              <div>{courseDetail.rating}</div>
              <img src={starIcon} alt="star icon" />
            </div>
            <div>{courseDetail.rating_total} reviews</div>
            <div>{courseDetail.registed_count} students</div>
            <div>120 hours</div>
          </div>
          <div>
            <div>Last update 01/2021</div>
            <h4>Created by Le Chi Nhin</h4>
          </div>
          <button className={classes.wishButton}>
            <div> Wish list</div>
            <img src={heartIcon} alt="heart icon" />
          </button>
        </div>
        <div className={classes.courseShow}>
          <img
            src={courseDetail.avatar}
            alt={courseDetail.course_id}
            className={classes.image}
          />
          <h4>${courseDetail.price}</h4>
          <button>Buy now</button>
        </div>
      </div>
      <div className={classes.detail}>
        <div className={classes.information}>
          <div>
            <h4>Full description</h4>
            <p>{courseDetail.description}</p>
          </div>
          <div>
            <h4>Lectuter</h4>
            <div className={classes.lectuterInfor}>
              <Image src="" alt="" className={classes.imageLectuter} />
              <div style={{}}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img src={userIcon} />
                  <div>120 students</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={playIcon} />
                  <div>16 course</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              Avinash Jain is currently a sophomore at UC Berkeley majoring in
              Electrical Engineering and Computer Science. He's the CEO and
              Founder of TheCodex, an online educational platform focused on
              bringing the best programming content to hundreds of thousands of
              students around the world.
            </div>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <h4>Reviews</h4>
            {reviewsJSX}
          </div>
          <div>
            <h4>Related Courses</h4>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {relatedCoursesListJSX}
            </div>
          </div>
        </div>
        <div className={classes.courseContent}>
          <h4>Course content</h4>
        </div>
      </div>
    </div>
  );
}
