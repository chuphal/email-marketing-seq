import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

import { Outlet } from "react-router-dom";
import Workflow from "../components/Workflow";
import Showseq from "../components/Showseq";

const Home = () => {
  return (
    <>
      <Navbar />

      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: " 0px 3px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Home;
