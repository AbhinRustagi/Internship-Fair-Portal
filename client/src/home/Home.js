import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

function Home() {
  document.title = `Internship Fair 2021 | The Placement Cell, SVC`;

  return (
    <div className="Home">
      <div className="container">
        <div className="navbar">
          <Link to="/">
            <div className="logo_box">
              <img src="./pcell_logo.png" alt="" />
              <p>
                The Placement Cell <br />
                <span>Sri Venkateswara College</span>
              </p>
            </div>
          </Link>
          <div className="button_box">
            <Link to="/ifair/register">
              <button className="register_button">Register Now!</button>
            </Link>
            <Link to="/ifair/login">
              <button className="login_button">Log in</button>
            </Link>
          </div>
        </div>

        <img src="./ifairlogo.png" alt="" />

        <div className="instruction">
          <h2>How to get started?</h2>
          <div className="row">
            <div className="col_4">
              <SpellcheckIcon />
              <div>
                <h3>Register</h3>
                <p>
                  Register your account for the first ever online edition of the
                  Internship Fair by filling in all the required details.
                </p>
              </div>
            </div>
            <div className="col_4">
              <AssignmentTurnedInIcon />
              <div>
                <h3>Get Verified</h3>
                <p>
                  Our team will go through the uploaded documents to make sure
                  they adhere to our guidelines.
                </p>
              </div>
            </div>
            <div className="col_4">
              <PlayCircleFilledIcon />
              <div>
                <h3>Intern!</h3>
                <p>
                  Voila! Upon successful verification of your documents, you’ll
                  be eligible to participate in the Internship Fair and apply to
                  various companies ranging from NGOs to Startups to Corporates.
                </p>
              </div>
            </div>
          </div>
          <Link to="/help">
            <p>Find complete details of the process here.</p>
          </Link>
          <small>
            NOTE: Only for the students of Sri Venkateswara College, University
            of Delhi.
          </small>
        </div>
      </div>
    </div>
  );
}

export default Home;
