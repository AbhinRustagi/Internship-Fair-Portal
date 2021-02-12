import React, { useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  auth,
  firestore as db,
  storage,
} from "../utils/firebase/firebaseConfig";
import "./grid.css";
import companiesList from "../other/hereyougo";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

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

  const json_ref = companiesList[0];
  console.log(json_ref);

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
          <h2>Corporates</h2>
          {json_ref["Corporates"].map((company) => (
            <div className="company_box">
              <img src={company.companyLogo} alt="" />
              <h4>{company.companyName}</h4>
              <div className="button_row">
                <button className="add_button">
                  <AddCircleIcon />
                </button>
                <button className="view_button">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/profile" />
  );
}
