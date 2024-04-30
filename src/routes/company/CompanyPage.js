import React, { useEffect, useState } from "react";
import companiesList from "data/companies.json";
import { Link } from "react-router-dom";
import { useStateValue } from "../../utils";
import { auth } from "../utils/firebase/firebaseConfig";
import "./companypage.css";

export function CompanyPage({ match }) {
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
    const id = parseFloat(match.params.id);
    let company;
    if (id >= 1 && id <= 10) {
      company = companies["Corporates"].find((company) => company.id === id);
    } else if (id >= 11 && id <= 22) {
      company = companies["Startups"].find((company) => company.id === id);
    } else {
      company = companies["NGOs"].find((company) => company.id === id);
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
          {/* {user ? (
            <Link to="/company/select">
              <button>Go to Company Selection</button>
            </Link>
          ) : null} */}
          <br />
          <img src={thisCompany?.logo} alt="" />
          <h1>{thisCompany?.name}</h1>
          <strong>
            Stall Coordinator:{" "}
            {thisCompany?.stall_coordinator
              ? `${thisCompany.stall_coordinator} (${thisCompany.coordinator_contact})`
              : null}
          </strong>
          <p>
            <strong>About the company</strong>
            <br />
            {thisCompany?.about}
          </p>
          <strong>Profiles Offered</strong>
          <ul>
            {thisCompany?.open_role.map((profile) => (
              <li>{profile}</li>
            ))}
          </ul>
          <strong>Job Description</strong>
          {thisCompany?.job_description ? (
            <div>
              {Object.keys(thisCompany.job_description).map((profile) => (
                <ul>
                  <strong>{profile}</strong>
                  {thisCompany.job_description[profile].map((task) => (
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
