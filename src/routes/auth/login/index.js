import VisibilityIcon from "@material-ui/icons/Visibility";
import { useStateValue } from "context";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "utils/firebase";
import "./login.css";

export function Login() {
  const History = useHistory();

  const [formValues, setFormValues] = useState({
    email: null,
    password: null,
  });

  const [{ user }, dispatch] = useStateValue();

  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const [buttonText, setButtonText] = useState("Log In");

  const handleSubmit = (e) => {
    e.preventDefault();

    setButtonText("Processing");

    auth
      .signInWithEmailAndPassword(formValues.email, formValues.password)
      .then((userCredential) => {
        dispatch({
          type: "SET_USER",
          user: userCredential.user.displayName,
        });

        History.push("/profile");
      })
      .catch((error) => {
        setButtonText("There was an error.");
      });
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleVisibility = (e) => {
    if (passwordVisibility === "password") {
      setPasswordVisibility("text");
    } else {
      setPasswordVisibility("password");
    }
  };

  const resetPassword = (e) => {
    e.preventDefault();

    if (formValues.email === null) {
      alert("Enter your email address first.");
    } else {
      auth
        .sendPasswordResetEmail(formValues.email)
        .then(() => {
          alert("Email Sent.");
        })
        .catch((err) => {
          console.log(err);
          alert("There was an error.");
        });
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="title_box">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ifair-portal.appspot.com/o/assets%2Fpcell_logo.png?alt=media&token=0fab47f3-c265-4b11-a5a5-162437e594c2"
              alt="The Placement Cell, Sri Venkateswara College { Logo }"
            />
          </Link>
          <h2>Internship Fair 2021</h2>
          <small>
            The Placement Cell, Sri Venkateswara College, Delhi University
          </small>
          <h3>Log In</h3>
        </div>
        <div className="form_box">
          <form>
            <div className="row">
              <div className="col_6">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/ifair-portal.appspot.com/o/assets%2F4334828.png?alt=media&token=2e4e062b-892b-4b51-b0e8-a562be08ff92"
                  alt=""
                />
              </div>
              <div className="col_6">
                <div className="input_group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    placeholder=""
                    minLength="1"
                    required
                    onChange={handleChange}
                    value={formValues.email}
                  />
                </div>
                <div className="input_group">
                  <label>Password</label>
                  <input
                    type={passwordVisibility}
                    name="password"
                    id="password"
                    placeholder=""
                    required
                    minLength="1"
                    onChange={handleChange}
                    value={formValues.password}
                  />
                  <button onClick={handleVisibility} type="button">
                    <VisibilityIcon />
                  </button>
                </div>
                <button onClick={handleSubmit} className="submitButton">
                  {buttonText}
                </button>
                <button
                  className="submitButton resetpassword"
                  onClick={resetPassword}
                >
                  Forgot password? Reset it here.
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
