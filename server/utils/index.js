const mailer = require("nodemailer");

export const buildMessage = (details) => {
  const message =
    `<p>Dear ${details.fullName},</p>` +
    "<strong>Greetings of the day!</strong>" +
    "<p>" +
    "Here are your credentials for logging into the Internship Fair Portal:" +
    "<ul>" +
    `<li>Email: ${details.to}</li>` +
    `<li>Password: ${details.password}</li>` +
    "</ul>" +
    "Do not share these details with anyone. If you face any trouble logging into the portal, please contact the Technical Team." +
    "</p>" +
    "<p>Regards, The Placement Cell</p>";
  return message;
};

export class Mailer {
  constructor(email, password, service = "Gmail") {
    this.email = email;
    this.password = password;
    this.service = service;
    this.createTransporter();
  }

  createTransporter() {
    this.transporter = mailer.createTransport({
      service: this.service,
      auth: {
        user: this.email,
        password: this.password,
      },
    });
  }

  async sendEmail(options, callback) {
    return this.transporter.sendMail(options, function (err) {
      callback(err);
    });
  }
}
