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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "src/styles/index.scss";

import AdminGrid from "routes/admin/Grid.admin";
import AdminLogin from "routes/admin/Login.admin";
import Companies from "companies/companiespage";
import CompanyPage from "company-grid/CompanyPage";
import Grid from "company-grid/Grid";
import Footer from "components/footer/Footer";
import Help from "Help/Help";
import Home from "home/Home";
import Login from "login/login";
import Profile from "profile/profile";
import RegistrationForm from "register/RegistrationForm";
import "register/RegistrationForm.css";

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
            <Grid />
          </Route>
          <Route exact path="/company/:id" component={CompanyPage} />
          <Route exact path="/admin/logistics">
            <AdminGrid />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
