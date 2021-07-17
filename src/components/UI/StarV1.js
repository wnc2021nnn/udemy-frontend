import { Box } from "@material-ui/core";
import { Star } from "@material-ui/icons";

export function StarV1(props) {
  return (
    <Box aria-orientation="horizontal" alignContent="center" display="flex">
      <Box mr={1}>
        <text>4.9</text>
      </Box>
      <Box mr={1}>
        <Star style={{ height: "18px", width: "18px" }} />
      </Box>
      <text>120 reviews</text>
    </Box>
  );
}
