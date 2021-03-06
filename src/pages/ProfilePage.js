import { Grid, Container, Box, Divider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyCoursesContainer } from "../components/Profile/MyCoursesContainer";
import { ProfileContainer } from "../components/Profile/ProfileContainer";
import { ProfileNavigation } from "../components/Profile/ProfileNavigation";
import { WatchListContainer } from "../components/Profile/WatchListContainer";
import { fetchUserInfor } from "../store/slices/userSlice";
import { getUserId } from "../utils/auth/verify";

export default function ProfilePage(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const userInfor = useSelector((state) => state.user.userInform.user);
  const dispatch = useDispatch();
  const [tabViews, setTabViews] = useState([
    <ProfileContainer userInfor={userInfor} />,
    <WatchListContainer />,
    <MyCoursesContainer userInfor={userInfor} />,
  ]);

  const getUserByIdAPI = () => {
    const userId = getUserId();
    if (userId) dispatch(fetchUserInfor(userId));
  };

  useEffect(() => {
    getUserByIdAPI();
  }, []);

  useEffect(() => {
    if (userInfor.role == 1) {
      setTabViews([
        <ProfileContainer userInfor={userInfor} />,
        <MyCoursesContainer userInfor={userInfor} />,
      ]);
    }
  }, [userInfor.role]);
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
