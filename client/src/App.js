import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/index.scss";

import AdminLogin from "./admin/AdminLogin";
import Logistics from "./admin/Logistics";
import Companies from "./companies/companiespage";
import CompanyPage from "./company-grid/CompanyPage";
import Grid from "./company-grid/Grid";
import Footer from "./components/footer/Footer";
import Help from "./Help/Help";
import Home from "./home/Home";
import Login from "./login/login";
import Profile from "./profile/profile";
import RegistrationForm from "./register/RegistrationForm";
import "./register/RegistrationForm.css";

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
