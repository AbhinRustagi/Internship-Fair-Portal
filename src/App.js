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
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "src/styles/index.scss";

import AdminLogin from "src/admin/AdminLogin";
import Logistics from "src/admin/Logistics";
import Companies from "src/companies/companiespage";
import CompanyPage from "src/company-grid/CompanyPage";
import Grid from "src/company-grid/Grid";
import Footer from "src/components/footer/Footer";
import Help from "src/Help/Help";
import Home from "src/home/Home";
import Login from "src/login/login";
import Profile from "src/profile/profile";
import RegistrationForm from "src/register/RegistrationForm";
import "src/register/RegistrationForm.css";

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
            <Logistics />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
