import "./App.css";
import Layout from "./components/layout/Layout";
import { Route, Switch } from "react-router-dom";
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
function App() {
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
          <PrivateRoute
            path="/mylearning"
            component={MyLearningPage}
          ></PrivateRoute>
          <PrivateRoute
            path="/profile"
            component={MyLearningPage}
          ></PrivateRoute>
          <PrivateRoute path="/learn/:course_id" component={CourseStudyPage} />
          <PrivateRoute path="/course/post" component={PostCoursePage} />
          <Route path="/courses/:course_id">
            <CourseDetailPage />
          </Route>
        </Switch>
      </Layout>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Snackbar />
    </div>
  );
}

export default App;
