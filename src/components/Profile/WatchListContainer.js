import { Box, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { HeaderContainer } from "./Profile Components/HeaderContainer";
import { WatchListItem } from "./Profile Components/WatchListItem";
export function WatchListContainer(props) {
  const watchList = useSelector((state) => state.watchlist.listCourse);

  const watchListJSX = watchList.map((item) => (
    <WatchListItem watchListItem={item} isWatchList={true} />
  ));

  return (
    <Box padding="16px">
      <Grid container direction="column">
        {watchListJSX}
      </Grid>
    </Box>
  );
}
