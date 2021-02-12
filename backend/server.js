const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("../client/build"));

var transporter = mailer.createTransport({
  service: "Gmail",
  auth: {
    user: "internshipfairsvc@gmail.com",
    pass: process.env.PASSWORD,
  },
});

const from = "internshipfairsvc@gmail.com"; // sender address

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/api/users/register", async (req, res) => {
  const recipient = req.body.to;
  const subject = "Credentials - Internship Fair 2021";
  const html = `<p>Dear ${req.body.fullName},</p><strong>Greetings of the day!</strong><p>Here are your credentials for logging into the Internship Fair Portal : <ul><li>Email: ${req.body.to}</li><li>Password: ${req.body.password}</li></ul> Do not share these details with anyone. If you face any trouble logging into the portal, please contact the Technical Team. </p><p>Regards, The Placement Cell</p>`;

  console.log(req.body);

  mailOptions = {
    from: "internshipfairsvc@gmail.com",
    to: recipient,
    subject: subject,
    html: html,
  };

  console.log(mailOptions);

  const mail = await transporter.sendMail(mailOptions, function (err, info) {
    if (err) res.send("Error");
    else {
      res.send("Done");
      console.log("Done");
    }
  });
});

app.listen(8000 || process.env.PORT, () => {
  console.log("Server Started");
});
