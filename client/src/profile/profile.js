import React, { useState, useEffect } from "react";
import { useStateValue } from "../utils/StateProvider";
import { Redirect, useHistory, Link } from "react-router-dom";
import "./profile.css";
import {
  storage,
  firestore as db,
  auth,
} from "../utils/firebase/firebaseConfig";

function Profile() {
  const [{ user }, dispatch] = useStateValue();
  const [thisUser, setThisUser] = useState({
    fullName: null,
    collegeRollNo: null,
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

  useEffect(async () => {
    if (user) {
      await db
        .collection("users")
        .doc(user)
        .get()
        .then(async (doc) => {
          const thisRef = storage.ref().child("users").child(user);
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
                console.log(err);
                properties = { ...properties, [property]: null };
              });
          }
          setThisUser({ ...thisUser, ...doc.data(), ...properties });
        });
    }
  }, []);

  useEffect(() => {
    console.log(thisUser);
  }, [thisUser]);

  const [buttonText, setButtonText] = useState({
    admission: "Upload File",
    proofOfResume: "Upload File",
    resume: "Upload File",
  });
  const [filename, setfileName] = useState({
    admission: "Choose File",
    proofOfResume: "Choose File",
    resume: "Choose File",
  });
  const [uploadFiles, setFiles] = useState({
    admission: null,
    resume: null,
    proofOfResume: null,
  });
  const [filecheck, setFilecheck] = useState({
    resume: -1,
    proofOfResume: -1,
    admission: -1,
  });

  document.title = `${thisUser?.fullName} | Internship Fair 2021`;

  const History = useHistory();

  const logOut = () => {
    dispatch({
      action: "REMOVE_USER",
    });

    History.push("/");
  };

  const onFileUpload = async ({ target: { files, name } }) => {
    const thisFile = files[0];

    if (name.toString() === "resume" && thisFile.size / 1024 > 10 * 1024) {
      setButtonText({
        ...buttonText,
        resume: "File size limit exceeded.",
      });
      alert("Please upload a file less than 10 MB.");
      setFilecheck({ ...filecheck, resume: -1 });
    } else if (name.toString() === "admission" && thisFile.size / 1024 > 1024) {
      setButtonText({
        ...buttonText,
        admission: "File size limit exceeded.",
      });
      alert("Please upload a file less than 1 MB.");
      setFilecheck({ ...filecheck, admission: -1 });
    } else if (
      name.toString() === "proofOfResume" &&
      thisFile.size / 1024 > 25 * 1024
    ) {
      setButtonText({
        ...buttonText,
        proofOfResume: "File size limit exceeded.",
      });
      alert("Please upload a file less than 25 MB.");
      setFilecheck({ ...filecheck, proofOfResume: -1 });
    } else {
      await setFiles({
        ...uploadFiles,
        [name]: thisFile,
      });
      setFilecheck({ ...filecheck, [name]: 0 });
      setfileName({ ...filename, [name]: thisFile.name });
      setButtonText({ ...buttonText, [name]: "Upload File" });
    }
  };

  const handleUpload = (property) => {
    if (filecheck[property] === -1) {
      alert("Upload a file within the size constraints.");
    } else {
      setButtonText({ ...buttonText, [property]: "Processing" });
      storage
        .ref()
        .child("users")
        .child(`${thisUser?.collegeRollNo}`)
        .child(property)
        .put(uploadFiles[property])
        .then(() => {
          setButtonText({ ...buttonText, [property]: "Uploaded." });
        })
        .catch((err) => {
          setButtonText({ ...buttonText, [property]: "There was an error." });
          console.log(err);
        });
    }
  };

  const deleteAccount = (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    db.collection("users")
      .doc(user.displayName)
      .delete()
      .then(() => {
        const storageRef = storage.ref();

        storageRef
          .child("users")
          .child(user.displayName)
          .child("resume")
          .delete()
          .catch((err) => {
            console.log(err);
          });

        storageRef
          .child("users")
          .child(user.displayName)
          .child("proofOfResume")
          .delete()
          .catch((err) => {
            console.log(err);
          });

        storageRef
          .child("users")
          .child(user.displayName)
          .child("admission")
          .delete()
          .catch((err) => {
            console.log(err);
          });

        user.delete().then(() => {
          History.push("/");
        });
      });
  };

  return user ? (
    <div className="profile_page">
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

        <div className="profile_info">
          {thisUser.resume &&
          thisUser.proofOfResume &&
          thisUser.admission ? null : (
            <div className="flash warning">
              <p>You have not uploaded</p>{" "}
              {thisUser.resume ? null : <li>Resume</li>}
              {thisUser.proofOfResume ? null : <li>Proof of Resume</li>}
              {thisUser.admission ? null : <li>Proof of Admission</li>}
              <br />
              <p>
                Please upload these files in order to participate in the
                Internship Fair, 2021. <br />
                Scroll down on this page to upload the files. ↓
              </p>
            </div>
          )}
          <div className="delete_box">
            <p>
              Accidentally entered wrong information such as your email address,
              or details? You can delete your account and register again.{" "}
            </p>
            <button
              className="submitButton deleteProfile"
              onClick={deleteAccount}
            >
              Delete my Account
            </button>
          </div>
          <h1>Hello, {thisUser?.fullName}</h1>
          <h4>My profile</h4>
          <hr />
          <h3 className="stage_indicator">
            You're at stage {`${thisUser?.level}`}
          </h3>
          <hr />
          <h4>Files Approved: {thisUser?.approved ? "Yes" : "No"}</h4>
          <p className="files_remarks">
            <strong>Remarks</strong>:{" "}
            {thisUser?.remarks === ""
              ? "Yet to be reviewed."
              : thisUser?.remarks}
            {thisUser.approved ? (
              <div className="company_selection">
                <Link to="/company/select">
                  <button>Go on to select companies ➞</button>
                </Link>
              </div>
            ) : null}
          </p>

          <hr />
          <div className="row">
            <div className="col_3">
              <div className="user_info">
                <strong>College Roll No: </strong>
                <p>{thisUser?.collegeRollNo}</p>
              </div>
              <div className="user_info">
                <strong>College: </strong>
                <p>{thisUser?.college}</p>
              </div>
              <div className="user_info">
                <strong>Course: </strong>
                <p>{thisUser?.course}</p>
              </div>
            </div>
            <div className="col_3">
              <div className="user_info">
                <strong>Email Address: </strong>
                <p>{thisUser?.emailAddress}</p>
              </div>
              <div className="user_info">
                <strong>Year of Study: </strong>
                <p>{thisUser?.year}</p>
              </div>
              <div className="user_info">
                <strong>Contact Number: </strong>
                <p>{thisUser?.contactNumber}</p>
              </div>
            </div>
            <div className="col_3">
              <div className="user_info">
                <strong>Guardian's Name: </strong>
                <p>{`${thisUser?.guardianName}`}</p>
              </div>
              <div className="user_info">
                <strong>Guardian's Contact Number: </strong>
                <p>{`${thisUser?.guardianNumber}`}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col_3">
              <div className="user_file">
                <strong>Admission Proof: </strong>
                <a target="_blank" rel="noreferrer" href={thisUser?.admission}>
                  {thisUser?.admission === null
                    ? "Not Uploaded"
                    : "View your current submission here"}
                </a>
              </div>
            </div>
            <div className="col_3">
              <div className="user_file">
                <strong>Resume: </strong>
                <a target="_blank" rel="noreferrer" href={thisUser?.resume}>
                  {thisUser?.resume === null
                    ? "Not Uploaded"
                    : "View your current submission here"}
                </a>
              </div>
            </div>
            <div className="col_3">
              <div className="user_file">
                <strong>Proof of Resume: </strong>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={thisUser?.proofOfResume}
                >
                  {thisUser?.proofOfResume === null
                    ? "Not Uploaded"
                    : "View your current submission here"}
                </a>
              </div>
            </div>
          </div>
          <hr />
          <div className="reupload">
            <h3>File Upload</h3>
            <p>
              Upload your files here. After they've been uploaded successfully,
              our team will verify them to make sure they meet our mandated
              guidelines. <br />
              <br />
              Once successfully verified, the <strong>
                Files Approved
              </strong>{" "}
              field above will reflect the same and you'll be able to
              participate in the Internship Fair.
              <br />
              <br />
              In case they do not meet our guidelines, you can check the
              suggested changes in the <strong>Remarks</strong> field and after
              making those changes, you can reupload your files.
              <br />
              <br />
              In case you uploaded the wrong files, or your files weren't
              successfully uploaded whilst registering your account, you can
              reupload them here.{" "}
            </p>
            <form>
              <div className="row">
                <div className="col_3">
                  <h4>Admission Proof</h4>
                  <div className="file_group">
                    <small>
                      Upload scanned copy of your ID card or Admission Sheet in
                      JPG format. <br />
                      (Maximum file size limit: 1 MB)
                    </small>
                    <label htmlFor="admission" className="upload_btn">
                      {filename.admission.length > 30
                        ? filename.admission.slice(0, 29) + "..."
                        : filename.admission}
                    </label>
                    <input
                      type="file"
                      name="admission"
                      id="admission"
                      onChange={onFileUpload}
                      accept=".jpg, .jpeg"
                      required
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpload("admission");
                      }}
                    >
                      {buttonText.admission}
                    </button>
                  </div>
                </div>

                <div className="col_3">
                  <h4>Resume</h4>
                  <div className="file_group">
                    <small>
                      Upload a copy of your Resume in PDF format. <br />
                      <br />
                      (Maximum file size limit: 10 MB)
                    </small>
                    <label htmlFor="resume" className="upload_btn">
                      {filename.resume.length > 30
                        ? filename.resume.slice(0, 29) + "..."
                        : filename.resume}
                    </label>
                    <input
                      type="file"
                      name="resume"
                      id="resume"
                      onChange={onFileUpload}
                      accept=".pdf"
                      required
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpload("resume");
                      }}
                    >
                      {buttonText.resume}
                    </button>
                  </div>
                </div>

                <div className="col_3">
                  <h4>Proof of Resume</h4>
                  <div className="file_group">
                    <small>
                      Upload an aggregated PDF of all certificates listed in
                      your resume in PDF format.
                      <br /> (Maximum file size limit: 25 MB)
                    </small>
                    <label htmlFor="proofOfResume" className="upload_btn">
                      {filename.proofOfResume.length > 30
                        ? filename.proofOfResume.slice(0, 29) + "..."
                        : filename.proofOfResume}
                    </label>
                    <input
                      type="file"
                      name="proofOfResume"
                      id="proofOfResume"
                      onChange={onFileUpload}
                      accept=".pdf"
                      required
                    />
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpload("proofOfResume");
                      }}
                    >
                      {buttonText.proofOfResume}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Profile;
