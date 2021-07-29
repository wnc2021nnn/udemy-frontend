import classes from "./CourseStudy.module.css";
import backIcon from "../../assets/icons/backIcon.svg";
import YouTubeVideoPlayer from "../UI/VideoPlayer/YoutubeVideoPlayer";
import CourseContent from "./CourseContent";
import { useHistory, useParams } from "react-router";
import {
  getCourseById,
  getCourseContent,
  getCourseReviews,
  reviewCourse,
  sendLog,
  updateStatus,
} from "../../api/api-courses";
import { useEffect, useState } from "react";
import starIcon from "../../assets/icons/star.svg";
import Review from "../Review/Review";
import { Rating } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { setStatus } from "../../store/slices/statusSlice";
import Status from "../../constants/status-constants";

export default function CourseStudy() {
  const params = useParams();
  const course_id = params.course_id;
  const dispatch = useDispatch();
  const [courseContent, setCourseContent] = useState({
    chapters: [],
    lessons: [],
  });
  const [lesson, setLesson] = useState({});
  const [course, setCourse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
    rating: "",
    reviews_text: "",
  });
  const [tagOverview, setTagOverview] = useState(true);
  const history = useHistory();

  const getCourseContentAPI = () => {
    getCourseContent(course_id)
      .then((res) => {
        setCourseContent(res.data.data);
        setLesson(res.data.data.lessons[0]);
      })
      .catch((err) => console.error(err.message));
  };

  const getCourseDetailAPI = () => {
    getCourseById(course_id)
      .then((res) => setCourse(res.data.data))
      .catch((err) => console.error(err.message));
  };

  const getCourseReviewsAPI = () => {
    getCourseReviews(course_id)
      .then((res) => setReviews(res.data.data))
      .catch((err) => console.error(err.message));
  };

  const reviewCourseAPI = () => {
    reviewCourse({
      course_id: course_id,
      reviews_text: review.reviews_text,
      rating: review.rating,
    })
      .then((res) => {
        getCourseReviewsAPI();
        setReview({
          rating: 0,
          reviews_text: "",
        });
        dispatch(
          setStatus({
            status: Status.SUCCESS_STATUS,
            message: "Review successfully",
          })
        );
      })
      .catch((err) => {
        dispatch(
          setStatus({
            status: Status.FAILED_STATUS,
            message: "Please rate this course!",
          })
        );
      });
  };

  const clickLessonHanlder = (lesson) => {
    setLesson({ ...lesson });
  };

  const clickTagHandler = (status) => {
    setTagOverview(status);
  };

  const reviewOnChangeHandler = (name, newValue) => {
    setReview((prevState) => {
      return {
        ...prevState,
        [name]: newValue,
      };
    });
  };

  const sendStatus = (timeStatus) => {
    updateStatus(lesson.lesson_id, { current_video_secconds: timeStatus });
  };

  const clickBackHandler = () => {
    history.push("/");
  };

  const getTimeLesson = (time) => {
    console.log(time);
    if (time)
      setLesson((prevState) => {
        return {
          ...prevState,
          total_time: time,
        };
      });
  };

  const reviewsJSX = reviews.map((item) => <Review review={item} />);

  useEffect(() => {
    getCourseContentAPI();
    getCourseDetailAPI();
    getCourseReviewsAPI();
  }, [course_id]);

  return (
    <div className={classes.wrapper}>
      <div style={{ display: "flex" }}>
        <img src={backIcon} alt="back icon" onClick={clickBackHandler} />
        <h4>{course.title}</h4>
      </div>
      <div className={classes.courseDetail}>
        <div className={classes.courseInfor}>
          {lesson && (
            <YouTubeVideoPlayer
              lesson={lesson}
              width="1000px"
              height="500px"
              sendStatus={sendStatus}
              getTimeLesson={getTimeLesson}
            />
          )}
          <div className={classes.tag}>
            <div
              onClick={() => clickTagHandler(true)}
              className={tagOverview ? classes.activeTag : ""}
            >
              Overview
            </div>
            <div
              onClick={() => clickTagHandler(false)}
              className={!tagOverview ? classes.activeTag : ""}
            >
              Review
            </div>
          </div>
          {tagOverview ? (
            <div className={classes.infor}>
              <h3>{course.description}</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <div>
                  <div style={{ display: "flex" }}>
                    <h4>{course.rating}</h4>
                    <img src={starIcon} alt="star icon" />
                  </div>
                  <div>{course.rating_total} reviews</div>
                </div>
                <div>
                  <h4>{course.registed_count}</h4>
                  <div>students</div>
                </div>
                <div>
                  <h4>10 hours</h4>
                  <div>Total</div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "1rem",
                width: "90%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <input
                  style={{ padding: "1rem 1rem 1rem 1rem", width: "100%" }}
                  placeholder="Write review..."
                  onChange={(event) => {
                    reviewOnChangeHandler("reviews_text", event.target.value);
                  }}
                  value={review.reviews_text}
                ></input>
                <button
                  onClick={reviewCourseAPI}
                  style={{ background: "#66b7dd", marginLeft: "0.5rem" }}
                >
                  Submit
                </button>
              </div>
              <Rating
                name="half-rating"
                defaultValue={review.rating}
                precision={1}
                onChange={(event, newValue) => {
                  reviewOnChangeHandler("rating", newValue);
                }}
                value={review.rating}
              />
              {reviewsJSX}
            </div>
          )}
        </div>
        <div style={{ width: "800px", textAlign: "start" }}>
          <h2>Course content</h2>
          <CourseContent
            courseContent={courseContent}
            isPreview={false}
            onLessonClick={clickLessonHanlder}
            lessonActiveId={lesson && lesson.lesson_id}
          />
        </div>
      </div>
    </div>
  );
}
