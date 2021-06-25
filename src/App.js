import "./App.css";
import Layout from "./components/layout/Layout";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/Route/PrivateRoute";
import MyLearningPage from "./pages/MyLearningPage";
function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <PrivateRoute
            path="/mylearning"
            component={MyLearningPage}
          ></PrivateRoute>
              <PrivateRoute
            path="/profile"
            component={MyLearningPage}
          ></PrivateRoute>
        </Switch>
      </Layout>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
    </div>
  );
}

export default App;
