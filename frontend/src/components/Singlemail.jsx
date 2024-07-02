import React from "react";
import { useAddContext } from "../context/AddContext";
import { useNavigate } from "react-router-dom";

const Singlemail = (data) => {
  const navigate = useNavigate();
  const { setNodes, setEdges, setData } = useAddContext();
  const handleClick = () => {
    const nodes = JSON.parse(data.data.nodes);
    const edges = JSON.parse(data.data.edges);

    const newData = {
      email: data.data.to,
      subject: data.data.subject,
      coldemail: data.data.text,
      delay: data.data.delay,
    };
    setData(newData);
    setNodes(nodes);
    setEdges(edges);
    navigate("/");
  };
  return (
    <div>
      <div className="singlemail-div" onClick={() => handleClick()}>
        <span className="subject-part">{data.data.subject}</span>
        <p></p>
      </div>
    </div>
  );
};

export default Singlemail;
