import "./App.css";
import Layout from "./components/layout/Layout";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
        <Route path="/" exact>
            <HomePage />
          </Route>
          
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
