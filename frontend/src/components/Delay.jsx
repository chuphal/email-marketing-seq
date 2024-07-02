import React, { useRef, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { Handle } from "reactflow";
import { useAddContext } from "../context/AddContext";
import Popup from "./Popup";
import { RxCross2 } from "react-icons/rx";
import useAddNode from "../hooks/useAddNode";
import { Form } from "react-router-dom";

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
      <div className="delay-comp" onClick={() => openPopup("popup1")}>
        <div className="delay-icon-div">
          <BiTimeFive className="delay-icon" />
        </div>
        <div style={{ width: "100px" }}>
          <div style={{ float: "right" }}>
            <div
              onClick={() => onNodesChangeFunction(removeNode)}
              className="cross-div"
            >
              <RxCross2 className="cross-style" />
            </div>
          </div>
          <div>
            <h5>Delay</h5>
            <p>Wait {data.delay}</p>
          </div>
        </div>

        <Handle position="bottom" type="source" />
        <Handle position="top" type="target" />
      </div>
      <Popup isOpen={activePopup === "popup1"} onClose={closePopup}>
        <p>Wait/Delay</p>
        <input type="number" ref={delayRef} required />
        <Form.Select
          aria-label="Default select example"
          value={time}
          onChange={handleChange}
        >
          <option>Select type</option>
          <option value="minutes">minutes</option>
          <option value="hours">hours</option>
          <option value="days">days</option>
        </Form.Select>
        <button onClick={() => handleSubmit()}>Insert</button>
      </Popup>
    </>
  );
};

export default Delay;
