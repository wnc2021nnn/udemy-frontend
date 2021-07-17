import { Button, Box, Avatar, Divider, Grid } from "@material-ui/core";

export function ProfileNavigation(props) {
  const tabs = ["Profile", "Watch List", "My Courses"];

  const navButtons = tabs.map((tab, index) => (
    <NavButton
      text={tab}
      color={props.currentTabIndex === index ? "primary" : "default"}
      onClick={()=> props.onClickTab(index)}
    />
  ));

  return (
    <Grid container direction="column" justifyContent="flex-start">
      <ProfileHeader />
      <Divider />
      {navButtons}
    </Grid>
  );
}

function NavButton(props) {
  return (
    <Button
      href={props.href}
      fullWidth="true"
      style={{ height: "48px" }}
      onClick={props.onClick}
      variant="contained"
      color={props.color}
    >
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
