import React from "react";
import Singlemail from "./Singlemail";
import useScheduleEmail from "../hooks/useScheduleEmail";
import { useNavigate } from "react-router-dom";
import { useAddContext } from "../context/AddContext";
import { initialEdges, initialNodes } from "./WorkflowConstant";

const Showseq = () => {
  const { loading, mailData } = useScheduleEmail();
  const { setNodes, setEdges, setData } = useAddContext();
  const navigate = useNavigate();

  const handleClick = () => {
    const newData = {
      email: "",
      subject: "",
      coldemail: "",
      delay: -1,
    };
    setData(newData);
    setNodes(initialNodes);
    setEdges(initialEdges);
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "35rem",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
        padding: "2rem",
        margin: "2rem",
        width: "40rem",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        <h2>Your scheduled Email</h2>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        <button type="button" className="btn btn-success" onClick={handleClick}>
          + New Sequence
        </button>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : mailData.length === 0 ? (
        <div className="no-scheduled">Currently, No email is scheduled</div>
      ) : (
        mailData.map((data, idx) => <Singlemail data={data} key={idx} />)
      )}
    </div>
  );
};

export default Showseq;
