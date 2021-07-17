import { Box, Grid } from "@material-ui/core";
import { HeaderContainer } from "./Profile Components/HeaderContainer";
import { WatchListItem } from "./Profile Components/WatchListItem";
export function WatchListContainer(props) {
  return (
    <Box padding="16px">
      <Grid container direction="column">
        <HeaderContainer text="Watch List" />
        <WatchListItem />
        <WatchListItem />
        <WatchListItem />
        <WatchListItem />
      </Grid>
    </Box>
  );
}
