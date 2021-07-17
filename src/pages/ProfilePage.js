import { Grid, Container, Box, Divider } from "@material-ui/core";
import { useState } from "react";
import { MyCoursesContainer } from "../components/Profile/MyCoursesContainer";
import { ProfileContainer } from "../components/Profile/ProfileContainer";
import { ProfileNavigation } from "../components/Profile/ProfileNavigation";
import { WatchListContainer } from "../components/Profile/WatchListContainer";

export default function ProfilePage(props) {
  const [tabIndex, setTabIndex] = useState(0);

  const tabViews = [
    <ProfileContainer />,
    <WatchListContainer />,
    <MyCoursesContainer />,
  ];

  return (
    <Container>
      <Box border={1} borderRadius={8} borderColor="grey.500">
        <Grid container maxWidth="lg">
          <Grid item xs={3}>
            <ProfileNavigation
              currentTabIndex={tabIndex}
              onClickTab={setTabIndex}
            />
          </Grid>
          <Grid item xs={9}>
            {tabViews[tabIndex]}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
