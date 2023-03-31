import "@fontsource/barlow-semi-condensed";
import "@fontsource/barlow-semi-condensed/300.css";
import "@fontsource/barlow-semi-condensed/500.css";
import "@fontsource/barlow-semi-condensed/600.css";
import "@fontsource/barlow-semi-condensed/700.css";
import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "src/styles/index.scss";

import Companies from "companies/companiespage";
import { Footer } from "components";
import {
  AdminLogin,
  AdminPageGrid,
  CompanyPage,
  Help,
  Home,
  Login,
  Profile,
  CompanyPageGrid,
  RegistrationForm,
} from "routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route exact path="/ifair/register">
            <RegistrationForm />
          </Route>
          <Route exact path="/companies">
            <Companies />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/ifair/login">
            <Login />
          </Route>
          <Route exact path="/help">
            <Help />
          </Route>
          <Route exact path="/admin/login">
            <AdminLogin />
          </Route>
          <Route exact path="/company/select">
            <CompanyPageGrid />
          </Route>
          <Route exact path="/company/:id" component={CompanyPage} />
          <Route exact path="/admin/logistics">
            <AdminPageGrid />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
