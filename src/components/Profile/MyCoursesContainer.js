import { Box, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchMyCourses } from "../../store/slices/coursesSlice";
import { WatchListItem } from "./Profile Components/WatchListItem";

export function MyCoursesContainer(props) {
  const myCourses = useSelector((state) => state.courses.myCourses.entities);
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfor = props.userInfor;
  const onClickCourseHandler = (myCourse) => {
    if (userInfor.role === 1) {
      history.push(`/${myCourse.course_id}`);
    } else history.push(`/learn/${myCourse.course_id}`);
  };
  const myCoursesJSX = myCourses.map((item) => (
    <WatchListItem
      watchListItem={item}
      onClickCourseHandler={() => {
        onClickCourseHandler(item);
      }}
    />
  ));

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, []);
  return (
    <Box padding="16px">
      <Grid container direction="column">
        {myCoursesJSX}
      </Grid>
    </Box>
  );
}
