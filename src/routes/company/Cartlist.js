import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { useStateValue } from "context";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "utils/firebase";
import "./Cartlist.css";

export default function Cartlist() {
  const [{ user, cart }, dispatch] = useStateValue();
  const History = useHistory();

  const [email, setEmail] = useState("");

  const removeItem = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  useEffect(() => {
    db.collection("users")
      .doc(user.toString())
      .get()
      .then((doc) => {
        setEmail(doc.data().emailAddress);
      });
  }, []);

  const handleSubmission = (e) => {
    e.preventDefault();

    if (cart.length < 1) {
      alert("Please select at least one company.");
    } else {
      cart.forEach(async (company) => {
        console.log(company);
        const rollno = user;
        db.collection("companies")
          .doc(company.id.toString())
          .update({
            [rollno]: {
              profile1: company.profiles.profile1,
              profile2: company.profiles.profile2,
            },
          })
          .catch((err) => {
            db.collection("companies")
              .doc(company.id.toString())
              .set({
                [rollno]: {
                  profile1: company.profiles.profile1,
                  profile2: company.profiles.profile2,
                },
              })
              .catch((err) => {
                alert("error");
                console.log(err);
              });
          });
      });

      db.collection("users").doc(user.toString()).update({
        companiesSelected: true,
        Companies: cart,
      });

      alert("Process completed.");

      History.push("/profile");
    }
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
                    {company.profiles?.profile2 ? (
                      <li>{company.profiles?.profile2}</li>
                    ) : null}
                  </ul>
                }
              </div>
            ))
          : "None"}
      </div>
      <button onClick={handleSubmission} className="submitButton">
        Submit
      </button>
    </div>
  );
}
