import React, { useState } from "react";
import { useStateValue } from "../utils/StateProvider";
import { useHistory, Link, Redirect } from "react-router-dom";
import { firestore as db, storage } from "../utils/firebase/firebaseConfig";

export default function DownloadData() {
  const History = useHistory();
  const [{ user }, dispatch] = useStateValue();

  var data =
    "rollno,name,course,phone,college,email,guardianname,guardiannumber,approved,remarks,level,resume,proofofresume,admission\n";

  const [state, setState] = useState("none");

  const logOut = () => {
    dispatch({
      action: "REMOVE_USER",
    });

    History.push("/");
  };

  const downloadAll = async (e) => {
    e.preventDefault();

    await db
      .collection("users")
      .get()
      .then(async (users) => {
        await users.forEach(async (user) => {
          const thisUser = user.data();
          const ref = storage
            .ref()
            .child("users")
            .child(`${thisUser.collegeRollNo}`);
          const admission = await ref
            .child("admission")
            .getDownloadURL()
            .then((url) => url)
            .catch((e) => "");
          const resume = await ref
            .child("resume")
            .getDownloadURL()
            .then((url) => url)
            .catch((e) => "");
          const proofOfResume = await ref
            .child("proofOfResume")
            .getDownloadURL()
            .then((url) => url)
            .catch((e) => "");

          data =
            data +
            `${thisUser.collegeRollNo},${thisUser.fullName},${thisUser.course},${thisUser.contactNumber},${thisUser.college},${thisUser.emailAddress},${thisUser.guardianName},${thisUser.guardianNumber},${thisUser.approved},${thisUser.remarks},${thisUser.level},${resume},${admission},${proofOfResume}\n`;
        });
      })
      .then(() => {
        setState("block");
      })
      .catch((e) => alert("There was an error."));
  };

  const [atag, setATag] = useState({ href: null, download: null });
  const inputRef = React.useRef(null);
  const downloadCSV = (e) => {
    e.preventDefault();
    var blob = new Blob([data], { type: "text/csv" });
    var url = URL.createObjectURL(blob);
    setATag({ ...atag, href: url, download: "completeset.csv" });
  };

  return user === "admin" ? (
    <div className="download">
      <div className="container">
        <div className="navbar">
          <Link to="/">
            <div className="logo_box">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ifair-portal.appspot.com/o/assets%2Fpcell_logo.png?alt=media&token=0fab47f3-c265-4b11-a5a5-162437e594c2"
                alt="Placement Cell Logo"
              />
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

        <button onClick={downloadAll}>Click here first</button>
        <p>Download may take upto 10 minutes to start.</p>
        <button
          style={{
            display: state,
          }}
          onClick={downloadCSV}
          ref={inputRef}
        >
          Now here
        </button>
        <a href={atag.href} download={atag.download}>
          <button>Here at the end</button>
        </a>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
