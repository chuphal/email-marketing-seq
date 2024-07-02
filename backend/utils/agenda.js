import Agenda from "agenda";
import dotenv from "dotenv";
import transporter from "../utils/nodemailer/mailerConfig.js";
import Coldemail from "../models/Coldemail.js";

dotenv.config();
const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI,
    collection: "email",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
});

agenda.define("schedule-coldemail", async (job) => {
  const { to, subject, text, userId, nodes, edges } = job.attrs.data;

  const mailOptions = {
    from: '"Logan" <chandanchuphal124@gmail.com>',
    to,
    subject,
    text,
  };
  // console.log("mailoption", mailOptions);
  let info = await transporter.sendMail(mailOptions);

  console.log("Email sent: %s", info.messageId);
});

agenda.on("ready", async () => {
  console.log("Agenda is ready!");
  await agenda.start();
});

agenda.on("error", (error) => {
  console.error("Agenda connection error:", error);
});

export default agenda;
