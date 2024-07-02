import { ObjectId } from "mongodb";
import User from "../backend/models/User.js";

const userOneId = new ObjectId();

const users = [
  {
    _id: userOneId,
    username: "userone",
    email: "userone@gmail.com",
    password: "useronepassword",
  },
];
const populateUsers = (done) => {
  try {
    const existingUser = User.findOne({ email: users[0].email });
    if (existingUser) {
      return done();
    }
    const userOne = new User(users[0]);
    userOne.save();
    return done();
  } catch (err) {
    return done(err);
  }
};

export { populateUsers, users };
