import "./App.css";
import Layout from "./components/layout/Layout";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
        <Route path="/" exact="true">
            <HomePage />
          </Route>
          <Route path="/categories" exact="true">
            <CategoryPage />
          </Route>
          
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
