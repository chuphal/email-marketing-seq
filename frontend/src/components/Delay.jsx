import React, { useRef, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { Handle } from "reactflow";
import { useAddContext } from "../context/AddContext";
import Popup from "./Popup";
import { RxCross2 } from "react-icons/rx";
import useAddNode from "../hooks/useAddNode";
import Form from "react-bootstrap/Form";

const Delay = () => {
  const { data, setData, setNodes, setEdges, removeNode } = useAddContext();
  const [activePopup, setActivePopup] = useState(null);
  const openPopup = (popup) => setActivePopup(popup);
  const closePopup = () => setActivePopup(null);
  const delayRef = useRef(0);
  const [time, setTime] = useState("");
  const { onNodesChangeFunction } = useAddNode();

  const handleChange = (e) => {
    setTime(e.target.value);
  };
  const handleSubmit = () => {
    setData((prev) => {
      return {
        ...prev,
        delay: String(delayRef.current.value) + " " + time,
      };
    });
    closePopup();
  };

  return (
    <>
      <div className="main-cold-div">
        <div
          onClick={() => onNodesChangeFunction(removeNode)}
          className="cross-div"
          style={{ float: "right" }}
        >
          <RxCross2 className="cross-style" />
        </div>

        <div className="delay-comp" onClick={() => openPopup("popup1")}>
          <div className="delay-icon-div">
            <BiTimeFive className="delay-icon" />
          </div>
          <div style={{ width: "100px" }}>
            <div>
              <h5 style={{ fontSize: "12px" }}>Delay</h5>
              <p>Wait: {data.delay}</p>
            </div>
          </div>

          <Handle position="bottom" type="source" />
          <Handle position="top" type="target" />
        </div>
      </div>
      <Popup isOpen={activePopup === "popup1"} onClose={closePopup}>
        <div className="popup-with-delay">
          <h2>Wait/Delay</h2>
          <div className="input-label-div">
            <label>Delay:</label>
            <input
              className="form-control"
              type="number"
              ref={delayRef}
              placeholder="Type a number..."
              required
              style={{ marginLeft: "1rem", width: "15rem" }}
            />
          </div>
          <div className="input-label-div">
            <label>Type:</label>
            <Form.Select
              aria-label="Default select example"
              value={time}
              onChange={handleChange}
              style={{ marginLeft: "1rem", width: "15rem" }}
            >
              <option>Select type</option>
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
              <option value="days">days</option>
            </Form.Select>
          </div>

          <button
            onClick={() => handleSubmit("delay")}
            type="button"
            className="btn btn-success"
          >
            Insert
          </button>
        </div>
      </Popup>
    </>
  );
};

export default Delay;
