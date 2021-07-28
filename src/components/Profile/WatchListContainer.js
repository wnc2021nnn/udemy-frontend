import { Box, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { HeaderContainer } from "./Profile Components/HeaderContainer";
import { WatchListItem } from "./Profile Components/WatchListItem";
export function WatchListContainer(props) {
  const watchList = useSelector((state) => state.watchlist.listCourse);
  const history = useHistory();
  const onClickCourseHandler = (watchListItem) => {
    history.push(`/courses/${watchListItem.course_id}`);
  };

  const watchListJSX = watchList.map((item) => (
    <WatchListItem
      watchListItem={item}
      isWatchList={true}
      onClickCourseHandler={() => {
        onClickCourseHandler(item);
      }}
    />
  ));

  return (
    <Box padding="16px">
      <Grid container direction="column">
        {watchListJSX}
      </Grid>
    </Box>
  );
}
