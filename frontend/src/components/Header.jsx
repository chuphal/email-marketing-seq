import React, { useRef } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="py-3 mb-4 border-bottom">
        <div className="container d-flex flex-wrap justify-content-left">
          <Link to={"/"}>
            <button type="button" className="btn btn-secondary">
              Create Sequence
            </button>
          </Link>
          <Link to={"/get"} style={{ marginLeft: "1rem" }}>
            <button type="button" className="btn btn-secondary">
              Show Sequence
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
