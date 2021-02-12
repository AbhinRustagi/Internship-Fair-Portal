import React, { useState, useEffect } from "react";
import {
  firestore as db,
  storage,
  functions,
} from "../../utils/firebase/firebaseConfig";
import "./userprofile.css";

const sendRemarksMail = functions.httpsCallable("rejectionMail");
const sendAcceptMail = functions.httpsCallable("acceptMail");

export default function UserProfile({ rollno }) {
  const [thisUser, setThisUser] = useState({
    fullName: null,
    collegeRollNo: rollno,
    year: null,
    course: null,
    emailAddress: null,
    contactNumber: null,
    guardianName: null,
    guardianNumber: null,
    college: "Sri Venkateswara College",
    approved: false,
    remarks: null,
    level: null,
    sno: null,
    resume: null,
    proofOfResume: null,
    admission: null,
  });

  const [thisRemarks, setRemarks] = useState(null);

  const [status, setStatus] = useState({ bgcolor: null, text: "" });

  const handleChange = ({ target: { value } }) => {
    setRemarks(value);
    console.log(thisRemarks);
  };

  const [buttonText, setButtonText] = useState({
    accept: "Accept",
    remarker: "Send Remarks",
  });

  useEffect(async () => {
    await db
      .collection("users")
      .doc(rollno)
      .get()
      .then(async (doc) => {
        const thisRef = storage.ref().child("users").child(rollno);
        let properties = {
          admission: null,
          resume: null,
          proofOfResume: null,
        };

        for (const property in properties) {
          await thisRef
            .child(property.toString())
            .getDownloadURL()
            .then((url) => {
              properties = { ...properties, [property]: url };
            })
            .catch((err) => {
              properties = { ...properties, [property]: null };
            });
        }

        if (!doc.data().companyLimit) {
          await db.collection("users").doc(doc.data().collegeRollNo).update({
            companyLimit: 4,
          });
        }

        setThisUser({ ...thisUser, ...doc.data(), ...properties });
      });
  }, []);

  useEffect(() => {
    setStatus({
      ...status,
      bgcolor: thisUser.approved ? "#16c79a" : "#ec4646",
      text: thisUser.fullName,
    });
  }, [thisUser]);

  useEffect(async () => {
    await db
      .collection("users")
      .doc(rollno)
      .get()
      .then(async (doc) => {
        const thisRef = storage.ref().child("users").child(rollno);
        let properties = {
          admission: null,
          resume: null,
          proofOfResume: null,
        };

        for (const property in properties) {
          await thisRef
            .child(property.toString())
            .getDownloadURL()
            .then((url) => {
              properties = { ...properties, [property]: url };
            })
            .catch((err) => {
              properties = { ...properties, [property]: null };
            });
        }
        setThisUser({ ...thisUser, ...doc.data(), ...properties });
      });
  }, [buttonText]);

  const handleAccept = async (e) => {
    e.preventDefault();
    await db.collection("users").doc(thisUser.collegeRollNo).update({
      remarks: "Accepted!",
      level: 2,
      approved: true,
    });
    sendAcceptMail({
      to: thisUser.emailAddress,
      fullName: thisUser.fullName,
    })
      .then((res) => {
        console.log(res);
        setButtonText({ ...buttonText, accept: "Accepted and Mail Sent!" });
      })
      .catch((err) => alert(err));
  };

  const handleRemarks = async (e) => {
    e.preventDefault();
    await db.collection("users").doc(thisUser.collegeRollNo).update({
      remarks: thisRemarks,
      approved: false,
      level: 1,
    });
    console.log(thisUser.emailAddress);
    sendRemarksMail({
      to: thisUser.emailAddress,
      fullName: thisUser.fullName,
      remarks: thisRemarks,
    })
      .then((res) => {
        console.log(res);
        setButtonText({
          ...buttonText,
          remarker: "Remarks Added and Mail Sent!",
        });
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="userProfile">
      <div
        className="status"
        style={{
          backgroundColor: status.bgcolor,
        }}
      >
        {thisUser.fullName}
      </div>
      <ul>
        <li>
          <strong>Roll No:</strong> {thisUser.collegeRollNo}
        </li>
        <li>
          <strong>Course: </strong>
          {thisUser.course}
        </li>
        <li>
          <strong>Year:</strong> {thisUser.year}
        </li>
        <li>
          <strong>Email Address:</strong> {thisUser.emailAddress}
        </li>
        <li>
          <strong>Contact Number:</strong> {thisUser.contactNumber}
        </li>
        <li>
          <strong>Guardian's Name:</strong> {thisUser.guardianName}
        </li>
        <li>
          <strong>Guardian's Number: </strong>
          {thisUser.guardianNumber}
        </li>
        <hr />
        <li>
          <strong> Resume:</strong>{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={thisUser.resume ? thisUser.resume : null}
          >
            {thisUser.resume ? "View Here" : "Not Uploaded"}
          </a>
        </li>
        <li>
          <strong>Admission Proof:</strong>{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={thisUser.admission ? thisUser.admission : null}
          >
            {thisUser.admission ? "View Here" : "Not Uploaded"}
          </a>
        </li>
        <li>
          <strong>Proof of Resume:</strong>{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={thisUser.proofOfResume ? thisUser.proofOfResume : null}
          >
            {thisUser.proofOfResume ? "View Here" : "Not Uploaded"}
          </a>
        </li>
        <li>
          <strong>Current Remarks:</strong> {thisUser.remarks}
        </li>
      </ul>
      <textarea
        name="remarks"
        className="remarks"
        placeholder="Enter Remarks here"
        onChange={handleChange}
        value={thisRemarks}
      ></textarea>
      <button className="send_remarks" onClick={handleRemarks}>
        {buttonText.remarker}
      </button>
      <button className="accept" onClick={handleAccept}>
        {buttonText.accept}
      </button>
    </div>
  );
}
