import React, { useEffect, useState } from "react";
import companiesList from "../other/hereyougo2";
import { Link } from "react-router-dom";
import { useStateValue } from "../utils/StateProvider";
import { auth } from "../utils/firebase/firebaseConfig";
import "./companypage.css";

function CompanyPage({ match }) {
  const companies = companiesList[0];
  const [{ user }, dispatch] = useStateValue();

  const [thisCompany, setThisCompany] = useState();

  const logOut = async () => {
    await auth.signOut().then(() => {
      dispatch({
        action: "REMOVE_USER",
      });
      History.push("/");
    });
  };

  useEffect(() => {
    const id = parseInt(match.params.id);
    let company;
    if (id >= 1 && id <= 10) {
      company = companies["Corporates"].find(
        (company) => company.companyId === id
      );
    } else if (id >= 11 && id <= 22) {
      company = companies["Startups"].find(
        (company) => company.companyId === id
      );
    } else {
      company = companies["NGOs"].find((company) => company.companyId === id);
    }
    setThisCompany(company);
  }, []);

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

          {user ? (
            <div className="button_box">
              <button className="logout_button" onClick={logOut}>
                Log out
              </button>
            </div>
          ) : null}
        </div>
        <div className="company_info">
          {user ? (
            <Link to="/company/select">
              <button>Go to Company Selection</button>
            </Link>
          ) : null}
          <br />
          <img src={thisCompany?.companyLogo} alt="" />
          <h1>{thisCompany?.companyName}</h1>
          <strong>
            Stall Coordinator:{" "}
            {thisCompany?.stallCoordinator
              ? `${thisCompany.stallCoordinator} (${thisCompany.coordinatorPhone})`
              : null}
          </strong>
          <p>
            <strong>About the company</strong>
            <br />
            {thisCompany?.aboutCompany}
          </p>
          <strong>Profiles Offered</strong>
          <ul>
            {thisCompany?.profilesOffered.map((profile) => (
              <li>{profile}</li>
            ))}
          </ul>
          <strong>Job Description</strong>
          {thisCompany?.JD ? (
            <div>
              {Object.keys(thisCompany.JD).map((profile) => (
                <ul>
                  <strong>{profile}</strong>
                  {thisCompany.JD[profile].map((task) => (
                    <li>{task}</li>
                  ))}
                </ul>
              ))}
            </div>
          ) : null}
          <strong>Additional Information</strong>
          {thisCompany?.perks ? (
            <ul>
              {thisCompany.perks.map((perk) => (
                <li>{perk}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CompanyPage;
