import "./App.css";
import Layout from "./components/layout/Layout";
import { Route, Switch, useHistory } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/Route/PrivateRoute";
import MyLearningPage from "./pages/MyLearningPage";
import CategoryPage from "./pages/CategoryPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import Snackbar from "../src/components/UI/Snackbar/Snackbar";
import CourseStudyPage from "./pages/CourseStudyPage";
import PostCoursePage from "./pages/PostCoursePage";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserInfor, logOut } from "./store/slices/userSlice";
import { getToken, getUserId } from "./utils/auth/verify";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = getUserId();
    if (getToken() && userId) dispatch(fetchUserInfor(userId));
    else {
      localStorage.clear();
      dispatch(logOut());
    }
  }, []);
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/category/:topic_id/">
            <CategoryPage />
          </Route>
          <PrivateRoute path="/profile" component={ProfilePage}></PrivateRoute>
          <PrivateRoute path="/learn/:course_id" component={CourseStudyPage} />
          <PrivateRoute path="/course/post" component={PostCoursePage} />
          <Route path="/courses/:course_id">
            <CourseDetailPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
      </Layout>

      <Snackbar />
    </div>
  );
}

export default App;
