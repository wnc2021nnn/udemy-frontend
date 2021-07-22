import { Grid, Container, Box, Divider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getUserById } from "../api/user-api";
import { MyCoursesContainer } from "../components/Profile/MyCoursesContainer";
import { ProfileContainer } from "../components/Profile/ProfileContainer";
import { ProfileNavigation } from "../components/Profile/ProfileNavigation";
import { WatchListContainer } from "../components/Profile/WatchListContainer";
import { Util } from "../constants/util-constants";

export default function ProfilePage(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [userInfor, setUserInfor] = useState({
    first_name: "",
    last_name: "",
  });

  const tabViews = [
    <ProfileContainer userInfor={userInfor} />,
    <WatchListContainer />,
    <MyCoursesContainer />,
  ];

  const getUserByIdAPI = () => {
    const userId = localStorage.getItem(Util.USER_ID);
    getUserById(userId).then((res) => setUserInfor(res.data.data));
  };

  useEffect(() => {
    getUserByIdAPI();
  }, []);
  return (
    <Container>
      <Box border={1} borderRadius={8} borderColor="grey.500">
        <Grid container maxWidth="lg">
          <Grid item xs={3}>
            <ProfileNavigation
              currentTabIndex={tabIndex}
              onClickTab={setTabIndex}
              userInfor={userInfor}
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
