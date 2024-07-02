import mongoose from "mongoose";

const ColdemailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User", // model
    required: [true, "Please provide user"],
  },
  to: {
    type: String,
    required: [true, "Please provide email"],
  },
  subject: {
    type: String,
    required: [true, "please provide subject"],
  },
  text: {
    type: String,
    required: [true, "please provide text for an email"],
  },
  nodes: {
    type: String,
    reqired: [true, "provide nodes"],
  },
  edges: {
    type: String,
    reqired: [true, "provide edges"],
  },
  delay: {
    type: String,
    required: [true, "provide delay"],
  },
});

const Coldemail = mongoose.model("Coldemail", ColdemailSchema);

export default Coldemail;
