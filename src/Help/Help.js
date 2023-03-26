import React from "react";
import { Link } from "react-router-dom";

export default function Help() {
  return (
    <div>
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
            {/* <Link to="/ifair/register">
              <button className="register_button">Register Now!</button>
            </Link> */}
            <Link to="/ifair/login">
              <button className="login_button">Log in</button>
            </Link>
          </div>
        </div>
        <h1>Internship Fair, 2021</h1>
        <small>
          Only for the students of Sri Venkateswara College, University of
          Delhi.
        </small>
        <h3>Complete process is explained here.</h3>
        <p>
          <strong>REGISTRATION</strong> <br />
          In order to register for the Internship Fair, 2021, upload your
          resume, proof of resume and proof of admission on the online portal.
          After this, you will receive a mail in your inbox with the login
          credentials. You can use them to login to the portal at any given
          time.
          <p>Note: Please check your spam folder for the credentials mail.</p>
        </p>
        <p>
          <strong>VERIFICATION</strong> <br />
          The second step is the verification. Our team will go through your
          uploaded documents to make sure that they adhere to our guidelines. In
          case there’s some discrepancy with the files, you’ll receive a
          notification on your portal with details to rectify them. You’re
          expected to upload these files again with the changes made. Once all
          your documents are verified, you’ll be eligible to participate in the
          Internship Fair.
        </p>
        <p>
          <strong>INTERN!</strong>
          <br /> On the day of the fair, you’ll be allowed to sit for 5
          companies of your choice. The companies will range from NGOs to
          Startups to Corporates. Once you’ve registered for a particular
          company, you’ll receive the Google Meet link for further procedures
          regarding the selection process of the company, on your registered
          WhatsApp number.
        </p>
        <h3>HAPPY INTERNING!</h3>
        <p>Note: Recommended browser: Google Chrome.</p>
      </div>
    </div>
  );
}
