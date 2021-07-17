import {
  GridList,
  Button,
  GridListTile,
  Box,
  Avatar,
  Divider,
} from "@material-ui/core";

export function ProfileLeftNavigation(props) {
  return (
    <GridList cellHeight="auto" cols={1}>
      <GridListTile>
        <ProfileHeader />
      </GridListTile>
      <GridListTile>
        <Divider />
      </GridListTile>

      <GridListTile>
        <NavButton text={"Profile"} />
      </GridListTile>
      <GridListTile>
        <NavButton text={"Watch List"} />
      </GridListTile>
      <GridListTile>
        <NavButton text={"My Courses"} />
      </GridListTile>
    </GridList>
  );
}

function NavButton(props) {
  return (
    <Button href={props.href} fullWidth="true" style={{ height: "48px" }}>
      {props.text}
    </Button>
  );
}

function ProfileHeader(props) {
  return (
    <GridList cellHeight="auto" cols={1}>
      <GridListTile>
        <Box display="flex" justifyContent="center" width="100%" marginTop="16px">
          <Avatar style={{ height: "160px", width: "160px" }} />
        </Box>
      </GridListTile>
      <GridListTile>
        <Box margin="16px">
          <text>Le Chi Nhin</text>
        </Box>
      </GridListTile>
    </GridList>
  );
}
