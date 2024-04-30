import { useStateValue } from "context";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "utils/firebase";

import "./Login.admin.css";

export function AdminLogin() {
  const History = useHistory();
  const [formValues, setFormValues] = useState({ email: null, password: null });

  const [{ user }, dispatch] = useStateValue();

  const handleChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(formValues.email, formValues.password)
      .then((user) => {
        dispatch({
          type: "SET_USER",
          user: user.user.displayName,
        });
      })
      .then(() => {
        History.push("/admin/logistics");
      });
  };

  return (
    <div className="admin_login">
      <div className="container">
        <h1>Admin Log in</h1>
        <div className="admin_login_box">
          <input
            type="text"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} type="submit">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
