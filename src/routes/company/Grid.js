import Companies from "data/companies.json";
import { Link, Redirect, useHistory } from "react-router-dom";
import { auth } from "utils/firebase";
import Box from "./box";
import CartList from "./Cartlist";
import "./grid.css";

import { useStateValue } from "utils";

export function CompanyPageGrid() {
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
        <h3 style={{ margin: "5px 0 0" }}>
          You can apply in upto {companyLimit} companies.
        </h3>
        <p style={{ margin: "5px 0" }}>
          You can select upto 2 profiles in companies which offer more than two
          profiles.
        </p>
        <CartList />
        <div className="company_container">
          <h2>Corporates</h2>
          {Companies[0].Corporates.map((company) => (
            <Box
              name={company.name}
              logo={company.logo}
              id={company.id}
              profile={company.open_role}
            />
          ))}
        </div>
        <div className="company_container">
          <h2>Startups</h2>
          {Companies[0].Startups.map((company) => (
            <Box
              name={company.name}
              logo={company.logo}
              id={company.id}
              profile={company.open_role}
            />
          ))}
        </div>
        <div className="company_container">
          <h2>NGOs</h2>
          {Companies[0].NGOs.map((company) => (
            <Box
              name={company.name}
              logo={company.logo}
              id={company.id}
              profile={company.open_role}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/profile" />
  );
}
