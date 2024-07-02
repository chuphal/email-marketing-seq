import React from "react";
import "reactflow/dist/style.css";
import ReactFlow, { Controls, MiniMap } from "reactflow";
import Customsource from "./Customsource";
import CustomAdd from "./CustomAdd";
import { useAddContext } from "../context/AddContext.jsx";
import Delay from "./Delay.jsx";
import Coldemail from "./Coldemail.jsx";
import { toast } from "react-toastify";
import useSchedule from "../hooks/useSchedule.js";
import Customsequence from "./Customsequence.jsx";

const nodeTypes = {
  customSrc: Customsource,
  customSeq: Customsequence,
  customAdd: CustomAdd,
  delay: Delay,
  coldemail: Coldemail,
};

const Workflow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, data, setRemoveNode } =
    useAddContext();
  const { loading, formSubmit } = useSchedule();

  const handleSubmit = async () => {
    if (data.delay === -1 || data.coldemail == "" || data.email == "") {
      toast.error("Please fill all the fields");
    } else {
      const delay = data.delay;
      const text = data.coldemail;
      const to = data.email;
      const subject = data.subject;
      const node = JSON.stringify(nodes);
      const edge = JSON.stringify(edges);

      const newData = {
        to,
        delay,
        text,
        subject,
        nodes: node,
        edges: edge,
      };
      await formSubmit(newData);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "90%",
        backgroundColor: "#f2f2f2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleSubmit}
          type="button"
          className="btn btn-success"
        >
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            "Save & Schedule"
          )}
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={(event, node) => setRemoveNode(node)}
        fitView
      >
        <Controls />

        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default Workflow;
