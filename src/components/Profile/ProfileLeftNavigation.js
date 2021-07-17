import { Button, Box, Avatar, Divider, Grid } from "@material-ui/core";

export function ProfileLeftNavigation(props) {
  return (
    <Grid container direction="column" justifyContent="flex-start">
      <ProfileHeader />
      <Divider />
      <NavButton text={"Profile"} />
      <NavButton text={"Watch List"} />
      <NavButton text={"My Courses"} />
    </Grid>
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
    <Grid Container direction="column">
      <Box display="flex" justifyContent="center" width="100%" marginTop="16px">
        <Avatar style={{ height: "160px", width: "160px" }} />
      </Box>
      <Box margin="16px">
        <text style={{ fontWeight: "bold", fontSize: "20px" }}>
          Le Chi Nhin
        </text>
      </Box>
    </Grid>
  );
}
