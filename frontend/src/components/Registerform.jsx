import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

const Registerform = () => {
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { loading, register } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const user = {
      username,
      email,
      password,
    };
    console.log("register", user);
    await register(user);
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div
      className="col-md-10 mx-auto col-lg-5 reg-form-section"
      style={{ width: "35%", marginTop: "5rem" }}
    >
      <form
        className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ opacity: "0.8", fontWeight: "700" }}>Register</h2>
        </div>

        <div className="form-floating mb-3">
          <input
            type="username"
            className="form-control"
            id="floatingUsername"
            placeholder="logan"
            ref={usernameRef}
          />
          <label htmlFor="floatingInput" style={{ color: "grey" }}>
            Username
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            ref={emailRef}
          />
          <label htmlFor="floatingInput" style={{ color: "grey" }}>
            Email address
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            ref={passwordRef}
          />
          <label htmlFor="floatingPassword" style={{ color: "grey" }}>
            Password
          </label>
        </div>
        <small className="text-body-secondary reg-anchor">
          <Link to="/login">Already have an account?</Link>
        </small>

        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          style={{ marginTop: "0.5rem" }}
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            "Register"
          )}
        </button>
        <hr className="my-4" />
        <small className="text-body-secondary">
          By clicking Register, you agree to the
          <spam className="terms-link"> Terms of Service </spam> &
          <spam className="terms-link">Privacy Policy</spam>
        </small>
      </form>
    </div>
  );
};

export default Registerform;
