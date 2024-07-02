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
    <div>
      <h2>Your schedulded Email</h2>
      <button type="button" class="btn btn-success" onClick={handleClick}>
        + new Sequence
      </button>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        mailData.map((data, idx) => <Singlemail data={data} key={idx} />)
      )}
    </div>
  );
};

export default Showseq;
