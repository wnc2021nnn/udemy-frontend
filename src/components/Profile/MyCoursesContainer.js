import { Box, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { WatchListItem } from "./Profile Components/WatchListItem";

export function MyCoursesContainer(props) {
  const myCourses = useSelector((state) => state.courses.myCourses.entities);
  const myCoursesJSX = myCourses.map((item) => (
    <WatchListItem watchListItem={item} />
  ));
  return (
    <Box padding="16px">
      <Grid container direction="column">
        {myCoursesJSX}
      </Grid>
    </Box>
  );
}
