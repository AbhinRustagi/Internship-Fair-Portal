const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { buildMessage, Mailer } = require("./utils");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const from = "internshipfairsvc@gmail.com"; // sender address

const mailer = new Mailer(from, process.env.PASSWORD);
mailer.createTransporter();

app.post("/api/users/register", async (req, res) => {
  const recipient = req.body.to;
  const subject = "Credentials - Internship Fair 2021";
  const html = buildMessage(req.body);

  const mailOptions = {
    from,
    recipient,
    subject,
    html,
  };

  await mailer.sendEmail(mailOptions, (err) => {
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
