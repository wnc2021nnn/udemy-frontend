import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  getRelatedCourses,
  getCourseById,
  getCourseReviews,
  purchasesCourse,
  getCourseContent,
} from "../../api/api-courses";
import CourseItem from "../../components/Courses/CourseItem";
import classes from "./CourseDetail.module.css";
import starIcon from "../../assets/icons/star.svg";
import heartIcon from "../../assets/icons/heartIcon.svg";
import Image from "../UI/Image/Image";
import userIcon from "../../assets/icons/userIcon.svg";
import playIcon from "../../assets/icons/playIcon.svg";
import Review from "../Review/Review";
import { Fragment } from "react";
import Status from "../../constants/status-constants";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../store/slices/statusSlice";
import { getToken } from "../../utils/auth/verify";
import { addWatchList } from "../../api/api-watchlist";
import CourseContent from "./CourseContent";
import { showTime } from "../../utils/timeUtil";
import { getUserById } from "../../api/user-api";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";
import { fetchMyCourses } from "../../store/slices/coursesSlice";

const RELATED_COURSES_PARAM = {
  sort: "registed_des",
  limit: 6,
};
export default function CourseDetail(props) {
  const params = useParams();
  const history = useHistory();
  const course_id = params.course_id;
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [courseDetail, setCourseDetail] = useState({});
  const [reviews, setReviews] = useState([]);
  const [courseContent, setCourseContent] = useState({
    chapters: [],
    lessons: [],
  });
  const [lecturer, setLecturer] = useState({});
  const [statusComponent, setStatusComponent] = useState({
    status: "",
    message: "",
  });
  const addedWatchList = useSelector((state) =>
    state.watchlist.listCourse.find((item) => item.course_id === course_id)
  );

  const topicTitle = useSelector((state) => {
    const listCategory = state.categories.listCategory.entities;
    for (let i = 0; i < listCategory.length; i++) {
      const element = listCategory[i];
      for (let j = 0; j < element.topics.length; j++) {
        if (element.topics[j].topic_id === courseDetail.topic_id)
          return element.topics[j].title;
      }
    }
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStatus(statusComponent));
  }, [statusComponent]);
  const getLectuterAPI = (userId) => {
    getUserById(userId).then((res) => {
      setLecturer(res.data.data);
    });
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
        getLectuterAPI(res.data.data.lecturer_id);
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
  const addWatchListAPI = () => {
    addWatchList(course_id)
      .then((res) => {
        if (res.status === 200) {
          dispatch(fetchWatchlist());
          setStatusComponent({
            message: "Thêm khoá học vào Watch List thành công",
            status: Status.SUCCESS_STATUS,
          });
        } else
          setStatusComponent({
            message: "Khoá học đã có trong Watch List",
            status: Status.FAILED_STATUS,
          });
      })
      .catch((err) =>
        setStatusComponent({
          message: "Khoá học đã có trong Watch List",
          status: Status.FAILED_STATUS,
        })
      );
  };
  const purchasesCourseAPI = () => {
    purchasesCourse({ item_id: course_id })
      .then((res) => {
        dispatch(fetchMyCourses());
        history.push(`/learn/${course_id}`);
      })
      .catch((err) =>
        setStatusComponent({
          status: Status.FAILED_STATUS,
          message: err.message,
        })
      );
  };

  const getCourseContentAPI = () => {
    getCourseContent(course_id).then((res) => {
      setCourseContent(res.data.data);
    });
  };

  const clickAddWatchListHandler = (event) => {
    event.preventDefault();
    if (!getToken()) {
      dispatch(
        setStatus({
          message: "Vui lòng đăng nhập!",
          status: Status.FAILED_STATUS,
        })
      );
    } else addWatchListAPI();
  };

  const clickBuyCourseHandler = () => {
    if (!getToken()) {
      dispatch(
        setStatus({
          message: "Vui lòng đăng nhập!",
          status: Status.FAILED_STATUS,
        })
      );
    } else purchasesCourseAPI();
  };

  const relatedCoursesListJSX = relatedCourses.map((courseItem) => {
    return <CourseItem key={courseItem.course_id} courseItem={courseItem} />;
  });

  const reviewsJSX = reviews.map((item) => (
    <Review key={item.created_at} review={item} />
  ));

  useEffect(() => {
    getRelatedCourseAPI();
    getDetailCourseAPI();
    getCourseReviewsAPI();
    getCourseContentAPI();
  }, [course_id]);

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.course}>
          <div className={classes.courseInfor}>
            <h3>{topicTitle}</h3>

            <h2>{courseDetail.title}</h2>
            <h3>{courseDetail.description}</h3>
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
              <div>Last update {showTime(courseDetail.updated_at)}</div>
              <h4>
                Created by{" "}
                {`${courseDetail.lecturer_last_name} ${courseDetail.lecturer_first_name}`}
              </h4>
            </div>
            <button
              className={classes.wishButton}
              onClick={clickAddWatchListHandler}
            >
              <div>{addedWatchList ? "Added watch list" : "Watch list"}</div>
              <img src={heartIcon} alt="heart icon" />
            </button>
          </div>
          <div className={classes.courseShow}>
            <img
              src={courseDetail.avatar}
              alt={courseDetail.course_id}
              className={classes.image}
            />
            <h3>${courseDetail.price}</h3>
            <button onClick={clickBuyCourseHandler}>Buy now</button>
          </div>
        </div>
        <div className={classes.detail}>
          <div className={classes.information}>
            <div>
              <h3>Full description</h3>
              <p>{courseDetail.description}</p>
            </div>
            <div>
              <h3>Lectuter</h3>
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
                    <div>{lecturer.students_count} students</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={playIcon} />
                    <div>{lecturer.courses_count} courses</div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "1rem" }}>
                {`${courseDetail.lecturer_last_name} ${courseDetail.lecturer_first_name}`}
              </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <h3>Reviews</h3>
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
            <h3>Course content</h3>
            <CourseContent courseContent={courseContent} isPreview={true} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
