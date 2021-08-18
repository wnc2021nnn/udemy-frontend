import "./App.css";
import Layout from "./components/layout/Layout";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/Route/PrivateRoute";
import CategoryPage from "./pages/CategoryPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import Snackbar from "../src/components/UI/Snackbar/Snackbar";
import CourseStudyPage from "./pages/CourseStudyPage";
import PostCoursePage from "./pages/PostCoursePage";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserInfor, logOut } from "./store/slices/userSlice";
import { getToken, getUserId } from "./utils/auth/verify";
import NotFoundPage from "./pages/NotFoundPage";
import MainNavigation from "./components/layout/MainNavigation";
import TeacherNavigation from "./components/layout/TeacherNavigation";
import SearchResult from "./components/Search/SearchResult";

function App() {
  const dispatch = useDispatch();
  const userInfor = useSelector((state) => state.user.userInform.user);
  const [role, setRole] = useState(false);
  useEffect(() => {
    const userId = getUserId();
    if (getToken() && userId) dispatch(fetchUserInfor(userId));
    else {
      localStorage.clear();
      dispatch(logOut());
    }
  }, []);

  useEffect(() => {
    if (userInfor.email_verified)
      if (!userInfor.role) setRole(false);
      else setRole(userInfor.role === 1);
    else setRole(false);
  }, [userInfor]);
  return (
    <div className="App">
      {!role ? (
        <Layout>
          <MainNavigation />
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/category/:topic_id/">
              <CategoryPage />
            </Route>
            <PrivateRoute
              path="/profile"
              component={ProfilePage}
            ></PrivateRoute>
            <PrivateRoute
              path="/learn/:course_id"
              component={CourseStudyPage}
            />
            <PrivateRoute path="/course/post" component={PostCoursePage} />
            <Route path="/courses/:course_id">
              <CourseDetailPage />
            </Route>
            <Route path="/search/:keyword">
              <SearchResult />
            </Route>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="*" exact>
              <NotFoundPage />
            </Route>
          </Switch>
        </Layout>
      ) : (
        <Layout>
          <TeacherNavigation />
          <Switch>
            <PrivateRoute path="/profile">
              <ProfilePage />
            </PrivateRoute>
            <Route path="/" exact>
              <PostCoursePage />
            </Route>
            <Route path="/:course_id" exact>
              <PostCoursePage />
            </Route>
            <Route path="*" exact>
              <NotFoundPage />
            </Route>
          </Switch>
        </Layout>
      )}

      <Snackbar />
    </div>
  );
}

export default App;
