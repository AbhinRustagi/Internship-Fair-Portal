import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import HelpIcon from "@material-ui/icons/Help";

import {
  storage,
  firestore as db,
  auth,
  functions,
} from "../utils/firebase/firebaseConfig";

import password from "generate-password";
import { useStateValue, setUser } from "../utils";
import { coursesList } from "data";

import "./RegistrationForm.css";

const passwordOptions = {
  length: 10,
  numbers: true,
  excludeSimilarCharacters: true,
  strict: true,
};

const sendMail = functions.httpsCallable("app");

function RegistrationForm() {
  const History = useHistory();

  const [_, dispatch] = useStateValue();

  const [buttonText, setButtonText] = useState("Continue");

  const [formValues, setFormValues] = useState({
    fullName: null,
    collegeRollNo: null,
    year: "1",
    course: null,
    emailAddress: null,
    contactNumber: null,
    guardianName: null,
    guardianNumber: null,
    college: "Sri Venkateswara College",
    approved: false,
    remarks: "",
    level: 1,
    sno: "0",
  });

  const [formError, setFormError] = useState({
    fieldMessage: false,
    admission: false,
    resume: false,
    proofOfResume: false,
  });

  const [filename, setFilename] = useState({
    resume: "Choose file",
    admission: "Choose file",
    proofOfResume: "Choose file",
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

  const handleFormChange = ({ target: { value, name } }) => {
    setFormValues({ ...formValues, [name]: value });

    if (value.length < 1) {
      setFormError({
        ...formError,
        fieldMessage: "No text field can contain less than 1 characters.",
      });
    } else {
      setFormError({
        ...formError,
        fieldMessage: 1,
      });
    }
  };

  const validateForm = () => {
    let errors = { valid: false, list: [] };

    for (const property in formValues) {
      if (formValues[property] === null) {
        errors.list.push(`${property} cannot be empty.`);
      }

      if (
        property.toString() === "contactNumber" ||
        property.toString() === "guardianNumber" ||
        property.toString() === "collegeRollNo"
      ) {
        if (formValues[property]?.match("^[a-zA-Z]*$")) {
          errors.list.push(`${property} cannot contain alphabets.`);
        }
      }
    }

    for (const property in uploadFiles) {
      if (uploadFiles[property] === null) {
        errors.list.push(`${property} cannot be empty.`);
      }

      if (filecheck[property] === -1) {
        errors.list.push(`${property} is greater than recommended size.`);
      }
    }

    if (errors.list.length === 0) {
      errors.valid = true;
    }
    return errors;
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    setButtonText("Processing");

    const result = validateForm();

    if (result.valid) {
      setButtonText("Registering Account");

      const newPassword = password.generate(passwordOptions);

      const storageRef = storage.ref().child("users");

      await auth
        .createUserWithEmailAndPassword(formValues.emailAddress, newPassword)
        .then(async (userCredential) => {
          await userCredential.user.updateProfile({
            displayName: formValues.collegeRollNo,
          });

          sendMail({
            to: formValues.emailAddress,
            password: newPassword,
            fullName: formValues.fullName,
          })
            .then(async () => {
              setButtonText("Uploading Details");

              await db
                .collection("users")
                .doc(`${formValues.collegeRollNo}`)
                .set(formValues)
                .then(() => {
                  dispatch({
                    type: "SET_USER",
                    user: userCredential.user.displayName,
                  });
                  History.push("/profile");
                })
                .then(async () => {
                  setButtonText("Uploading Files");

                  for (const property in uploadFiles) {
                    const file = uploadFiles[property];

                    await storageRef
                      .child(`${formValues.collegeRollNo}`)
                      .child(property.toString())
                      .put(file)
                      .then(async (snapshot) => {})
                      .catch((err) => {
                        window.alert(
                          `There was an error in uploading your files.\nRecommended Browser is Google Chrome. Try again in some time if the error persists.\nError Message: ${err}`
                        );

                        History.push("/");
                      });
                  }
                })
                .then(() => {
                  dispatch({
                    type: "SET_USER",
                    user: userCredential.user.displayName,
                  });

                  setUser(userCredential.user.displayName)
                    .then((thisUser) => {
                      dispatch({ type: "ADD_INFO", info: thisUser });
                    })
                    .then(() => {
                      History.push("/profile");
                    });
                })
                .catch((err) => {
                  console.log(err);

                  window.alert(
                    `There was an error in storing your details to the database.\nRecommended Browser is Google Chrome. Try again in some time if the error persists.\nError Message: ${err}`
                  );

                  History.push("/");
                });
            })
            .catch((err) => {
              window.alert(
                `There was an error sending credentials mail. Use Google Chrome or Contact the Technical Team.\nError Message: ${err}`
              );
            });
        })
        .catch((err) => {
          console.log(err);

          window.alert(
            `There was an error registering your account. Check Inbox to see if you have received a credentials mail or Use Google Chrome or Contact the Technical Team.\nError Message: ${err}`
          );

          History.push("/");
        });
    } else {
      var errors = result.list.join("\n");
      window.alert(`There is an error with your form. Errors: ${errors}`);
      setButtonText("Continue");
    }
  };

  const onFileUpload = async ({ target: { files, name } }) => {
    const thisFile = files[0];

    if (name.toString() === "resume" && thisFile.size / 1024 > 10 * 1024) {
      setFormError({
        ...formError,
        resume: "File size limit exceeded.",
      });
      alert("Please upload a file less than 10 MB.");
      setFilecheck({ ...filecheck, resume: -1 });
    } else if (name.toString() === "admission" && thisFile.size / 1024 > 1024) {
      setFormError({
        ...formError,
        admission: "File size limit exceeded.",
      });
      alert("Please upload a file less than 1 MB.");
      setFilecheck({ ...filecheck, admission: -1 });
    } else if (
      name.toString() === "proofOfResume" &&
      thisFile.size / 1024 > 25 * 1024
    ) {
      setFormError({
        ...formError,
        proofOfResume: "File size limit exceeded.",
      });
      alert("Please upload a file less than 25 MB.");
      setFilecheck({ ...filecheck, proofOfResume: -1 });
    } else {
      setFormError({ ...formError, [name]: 1 });
      await setFiles({
        ...uploadFiles,
        [name]: thisFile,
      });
      setFilecheck({ ...filecheck, [name]: 0 });
      setFilename({ ...filename, [name]: thisFile.name });
      setButtonText("Continue");
    }
  };

  return (
    <div className="Register_Page">
      <a target="_blank" rel="noreferrer" href="https://bit.do/fNfw4">
        <div className="help_button">
          <HelpIcon />
          <p>View Guidelines</p>
        </div>
      </a>
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
          <h3>Registration Form</h3>
        </div>

        <div className="form_box">
          <form>
            <div className="row">
              <div className="col_5">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/ifair-portal.appspot.com/o/assets%2FBusiness%20deal-cuate.png?alt=media&token=8ce437d0-5bef-4b5a-b04b-191ace6d03ea"
                  alt=""
                />
              </div>
              <div className="col_7">
                <div className="row">
                  <div className="col_6">
                    <div className="input_group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formValues.fullName}
                        onChange={handleFormChange}
                        id="fullName"
                        maxLength="25"
                        required
                        autoComplete="off"
                      />
                    </div>

                    <div className="input_group">
                      <label>College Roll Number</label>
                      <input
                        type="text"
                        name="collegeRollNo"
                        value={formValues.collegeRollNo}
                        onChange={handleFormChange}
                        id="collegeRollNo"
                        maxLength="9"
                        required
                        autoComplete="off"
                        pattern="[0-9]{5,9}"
                      />
                    </div>

                    <div className="select_group">
                      <label>College</label>
                      <select
                        name="college"
                        id="college"
                        onChange={handleFormChange}
                        required
                        disabled
                      >
                        <option default value="venky">
                          Sri Venkateswara College
                        </option>
                      </select>
                    </div>

                    <div className="select_group">
                      <label>Year of study</label>
                      <select
                        name="year"
                        id="year"
                        onChange={handleFormChange}
                        required
                      >
                        <option default value="1">
                          I Year
                        </option>
                        <option value="2">II Year</option>
                        <option value="3">III Year</option>
                      </select>
                    </div>

                    <div className="select_group">
                      <label htmlFor="">Course</label>
                      <select
                        name="course"
                        onChange={handleFormChange}
                        id="course"
                        required
                      >
                        {coursesList.map((course) => (
                          <option value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                    <div className="input_group">
                      <label htmlFor="">Email Address</label>
                      <input
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        value={formValues.emailAddress}
                        onChange={handleFormChange}
                        required
                        autoComplete="off"
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="">Contact Number (WhatsApp)</label>
                      <input
                        type="text"
                        name="contactNumber"
                        id="contactNumber"
                        value={formValues.contactNumber}
                        onChange={handleFormChange}
                        minLength="10"
                        maxLength="10"
                        required
                        autoComplete="off"
                        pattern="[0-9]{10}"
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="">Guardian's Name</label>
                      <input
                        type="text"
                        name="guardianName"
                        id="guardianName"
                        value={formValues.guardianName}
                        onChange={handleFormChange}
                        maxLength="25"
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="col_6">
                    <div className="input_group">
                      <label htmlFor="">Guardian's Contact Number</label>
                      <input
                        type="text"
                        value={formValues.guardianNumber}
                        name="guardianNumber"
                        id="guardianNumber"
                        onChange={handleFormChange}
                        minLength="10"
                        maxLength="10"
                        required
                        autoComplete="off"
                        pattern="[0-9]{10}"
                      />
                    </div>
                    <div className="file_group">
                      <label htmlFor="">Proof of Admission</label>
                      <small>
                        Upload scanned copy of your ID card or Admission Sheet
                        in JPG format. <br />
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
                      <p className="error_message">
                        {formError.admission === 1 ? null : formError.admission}
                      </p>
                    </div>

                    <div className="file_group">
                      <label htmlFor="">Resume</label>
                      <small>
                        Upload a copy of your Resume in PDF format. <br />
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
                      <p className="error_message">
                        {formError.resume === 1 ? null : formError.resume}
                      </p>
                    </div>

                    <div className="file_group">
                      <label htmlFor="">Proof of Resume</label>

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
                        required
                        onChange={onFileUpload}
                        accept=".pdf"
                      />

                      <p className="error_message">
                        {formError.proofOfResume === 1
                          ? null
                          : formError.proofOfResume}
                      </p>
                    </div>

                    {formError.fieldMessage && (
                      <p className="error_message">
                        {formError.fieldMessage === 1
                          ? null
                          : formError.fieldMessage}
                      </p>
                    )}

                    <button className="submitButton" onClick={handleSubmission}>
                      {buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
