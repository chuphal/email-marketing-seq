import { use, expect } from "chai";
import chaiHttp from "chai-http";
import { StatusCodes } from "http-status-codes";
import User from "../backend/models/User.js";
import app from "../backend/server.js";
import { populateUsers, users } from "./seed.js";

const chai = use(chaiHttp);

beforeEach(populateUsers);

// // auth testing
describe("POST /api/v1/auth/register", () => {
  const username = "example";
  const email = "example@gmail.com";
  const password = "123456";
  before((done) => {
    try {
      const user = User.findOne({ email: email });
      if (user) {
        User.findByIdAndRemove({
          _id: user[0]._id,
        });
      }
    } catch (err) {
      return done();
    }
  });

  // it("should create a user", (done) => {
  //   chai.request
  //     .execute(app)
  //     .post("/api/v1/auth/register")
  //     .send({ username, email, password })
  //     .end((err, res) => {
  //       if (err) {
  //         console.log("error", err);
  //         return done(err);
  //       } else {
  //         expect(res).to.have.status(StatusCodes.CREATED);
  //         expect(res).cookie("jwt").to.not.be.null;
  //         expect(res.body.msg).to.equal("Successfully registered");
  //         expect(res.body.user._id).to.not.be.null;
  //         expect(res.body.user.email).to.equal(email);
  //         expect(res.body.user.username).to.equal(username);
  //       }
  //     });
  //   done();
  // });
  it("should return password validation errors if request is invaild", (done) => {
    chai.request
      .execute(app)
      .post("/api/v1/auth/register")
      .send({
        username: "exampl",
        email: "exampl@gmail.com",
        password: "12345",
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          expect(res).to.have.status(StatusCodes.BAD_REQUEST);
          expect(res.body.msg).to.equal(
            "Password should be at least 6 charaters"
          );
        }
      });
    done();
  });

  it("should return email validation errors if request is invaild", (done) => {
    chai.request
      .execute(app)
      .post("/api/v1/auth/register")
      .send({
        username: "exampl",
        email: "exampl",
        password: "123456",
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          expect(res).to.have.status(StatusCodes.BAD_REQUEST);
          expect(res.body.msg).to.equal("Please provide valid email");
        }
      });
    done();
  });

  it("should return duplicate username errors", (done) => {
    chai.request
      .execute(app)
      .post("/api/v1/auth/register")
      .send({
        username: users[0].username,
        email: "example@gmail.com",
        password: "123456",
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          expect(res).to.have.status(StatusCodes.BAD_REQUEST);
          expect(res.body.msg).to.equal(
            "Duplicate value entered for username field, please choose another value"
          );
        }
      });
    done();
  });

  it("should return duplicate email errors", (done) => {
    chai.request
      .execute(app)
      .post("/api/v1/auth/register")
      .send({
        username: "example121121",
        email: users[0].email,
        password: "123456",
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          console.log(err);
          expect(res).to.have.status(StatusCodes.BAD_REQUEST);
          expect(res.body.msg).to.equal(
            "Duplicate value entered for email field, please choose another value"
          );
        }
      });
    done();
  });

  // it("testing login route...", (done) => {
  //   chai.request
  //     .execute(app)
  //     .post("/api/v1/auth/login")
  //     .send({
  //       username: registerUser.username,
  //       password: registerUser.password,
  //     })
  //     .end((err, response) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         expect(response).to.have.status(StatusCodes.OK);
  //         expect(response.body).to.have.property("msg", "Successfully login");
  //         expect(response.body).to.have.property("user");
  //         expect(response).cookie("jwt").to.be.null;
  //       }
  //       done();
  //     });
  // });

  // it("logout user type POST", (done) => {
  //   chai.request
  //     .execute(app)
  //     .post("/api/v1/auth/logout")
  //     .set("Cookie", `jwt=klajflksajd;l`)
  //     .end((err, response) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         expect(response).to.have.status(StatusCodes.OK);
  //         expect(response.body).to.have.property(
  //           "msg",
  //           "Logged out successfully"
  //         );
  //       }
  //       done();
  //     });
  // });
});
