import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RegistrationForm from "./register/RegistrationForm";
import Home from "./home/Home";
import Footer from "./components/footer/Footer";
import Profile from "./profile/profile";
import Login from "./login/login";
import Help from "./Help/Help";
import AdminLogin from "./admin/AdminLogin";
import Logistics from "./admin/Logistics";
import Download from "./downloadData/downloadData";

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
          <Route path="/admin/logistics">
            <Logistics />
          </Route>
          <Route path="/downloadData">
            <Download />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
