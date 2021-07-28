import { Grid, Box, Button, Card } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteWatchList } from "../../../api/api-watchlist";
import Status from "../../../constants/status-constants";
import { setStatus } from "../../../store/slices/statusSlice";
import { fetchWatchlist } from "../../../store/slices/watchlistSlice";
import { StarV1 } from "../../UI/StarV1";

export function WatchListItem(props) {
  const watchListItem = props.watchListItem;
  const isWatchList = props.isWatchList;
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteWatchListHanlder = () => {
    deleteWatchList({ course_id: watchListItem.course_id })
      .then((res) => {
        dispatch(fetchWatchlist());
      })
      .catch((err) => {
        dispatch(setStatus({ status: Status.FAILED_STATUS, message: "Error" }));
      });
  };

  return (
    <Card style={{ padding: "16px", marginTop: "8px", marginBottom: "8px" }}>
      <Grid container>
        <Grid item xs={2}>
          <Box height="60px" width="80px">
            <img
              alt=""
              height="60px"
              width="80px"
              hidden=""
              style={{ borderRadius: "6px" }}
              src={watchListItem.avatar}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={8}
          justifyContent="flex-start"
          onClick={props.onClickCourseHandler}
        >
          <Box justifyContent="flex-start" display="flex" my={1}>
            <text>{watchListItem.title}</text>
          </Box>
          <Box my={1}>
            <StarV1 watchListItem={watchListItem} />
          </Box>
        </Grid>
        <Grid item xs={2}>
          {isWatchList && (
            <Button>
              <Delete
                style={{ color: "EB5757" }}
                onClick={deleteWatchListHanlder}
              />
            </Button>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
