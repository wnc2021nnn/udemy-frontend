import { Grid, Container, Divider, Box } from "@material-ui/core";
import { Fragment } from "react";
import { ProfileContainer } from "../components/Profile/ProfileContainer";
import { ProfileLeftNavigation } from "../components/Profile/ProfileLeftNavigation";

export default function ProfilePage(props) {
  return (
    <Fragment>
      <Container>
        <Box border={1} borderRadius={8} borderColor="grey.500">
          <Grid container maxWidth="lg">
            <Grid item xs={3}>
              <ProfileLeftNavigation />
            </Grid>
            <Grid item xs={9}>
              <ProfileContainer />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
}
