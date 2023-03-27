import React, { useState, useEffect } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";
import "./companyBox.css";

export default function Box({ logo, name, id, profile }) {
  const [{ user, cart }, dispatch] = useStateValue();
  const [profiles, setProfiles] = useState({ profile1: null, profile2: null });

  const addToCart = (e) => {
    e.preventDefault();

    if (profiles.profile1 === null) {
      alert("Please select at least one profile.");
    } else {
      dispatch({
        type: "ADD_TO_CART",
        newItem: { name: name, id: id, profiles: profiles },
      });
    }
  };

  const handleChange = (e) => {
    setProfiles({ ...profiles, [e.target.name]: e.target.value });
    console.log(profiles);
  };

  return (
    <div className="company_box">
      <img src={logo} alt="" />
      <h4>{name}</h4>
      <div className="button_row">
        <button onClick={addToCart} className="add_button">
          <AddCircleIcon />
        </button>
        <Link to={"/company/" + id.toString()}>
          <button className="view_button">Read more</button>
        </Link>
      </div>
      <small>Select Profile(s)</small>
      <select onChange={handleChange} name="profile1">
        <option value={null}>Select a profile</option>
        {profile.map((profile) => (
          <option value={profile}>{profile}</option>
        ))}
      </select>
      {profile.length > 1 ? (
        <select onChange={handleChange} name="profile2">
          <option value="Select a profile">Select a profile</option>
          {profile.map((profile) => (
            <option value={profile}>{profile}</option>
          ))}
        </select>
      ) : null}
    </div>
  );
}
