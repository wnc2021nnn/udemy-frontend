import { Grid, Container, Box, Divider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyCoursesContainer } from "../components/Profile/MyCoursesContainer";
import { ProfileContainer } from "../components/Profile/ProfileContainer";
import { ProfileNavigation } from "../components/Profile/ProfileNavigation";
import { WatchListContainer } from "../components/Profile/WatchListContainer";
import { Util } from "../constants/util-constants";
import { fetchUserInfor } from "../store/slices/userSlice";

export default function ProfilePage(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const userInfor = useSelector((state) => state.user.userInform.user);
  const dispatch = useDispatch();
  const tabViews = [
    <ProfileContainer userInfor={userInfor} />,
    <WatchListContainer />,
    <MyCoursesContainer />,
  ];

  const getUserByIdAPI = () => {
    const userId = localStorage.getItem(Util.USER_ID);
    dispatch(fetchUserInfor(userId));
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
