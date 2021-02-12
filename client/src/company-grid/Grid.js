import React, { useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  auth,
  firestore as db,
  storage,
} from "../utils/firebase/firebaseConfig";
import "./grid.css";

import { useStateValue } from "../utils/StateProvider";

export default function Grid() {
  const History = useHistory();
  const [{ user, approved, companyLimit }, dispatch] = useStateValue();

  const logOut = async () => {
    await auth.signOut().then(() => {
      dispatch({
        action: "REMOVE_USER",
      });
      History.push("/");
    });
  };

  return approved ? (
    <div className="company_grid">
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
            <button className="logout_button" onClick={logOut}>
              Log out
            </button>
          </div>
        </div>
        <h3>You can apply in upto {companyLimit} companies.</h3>
        <div className="company_container">
          <div className="company_box"></div>
          <div className="company_box"></div>
          <div className="company_box"></div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/profile" />
  );
}
