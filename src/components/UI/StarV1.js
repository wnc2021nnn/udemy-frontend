import { Box } from "@material-ui/core";
import { Star } from "@material-ui/icons";

export function StarV1(props) {
  const watchListItem = props.watchListItem;
  return (
    <Box aria-orientation="horizontal" alignContent="center" display="flex">
      <Box mr={1}>
        <text>{watchListItem.rating}</text>
      </Box>
      <Box mr={1}>
        <Star style={{ height: "18px", width: "18px" }} />
      </Box>
      <text>{watchListItem.rating_total}</text>
    </Box>
  );
}
