import React from "react";
import { useStateValue } from "../utils/StateProvider";
import "./Cartlist.css";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

export default function Cartlist() {
  const [{ user, cart }, dispatch] = useStateValue();

  const removeItem = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <div className="cartlist">
      <p>Companies you've selected so far:</p>
      <div className="map">
        {cart.length > 0
          ? cart.map((company) => (
              <div className="cartbox">
                <div className="title">
                  <h4>{company.name}</h4>
                  <button
                    className="removebutton"
                    onClick={(e) => {
                      e.preventDefault();
                      removeItem(company.id);
                    }}
                  >
                    <RemoveCircleIcon />
                  </button>
                </div>
                {
                  <ul>
                    <li>{company.profiles?.profile1}</li>
                    <li>{company.profiles?.profile2}</li>
                  </ul>
                }
              </div>
            ))
          : "None"}
      </div>
    </div>
  );
}
