import React, { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Handle } from "reactflow";
import Popup from "./Popup";
import { useAddContext } from "../context/AddContext";
import useAddNode from "../hooks/useAddNode";
import { Form } from "react-router-dom";

const CustomAdd = () => {
  const [activePopup, setActivePopup] = useState(null);
  const delayRef = useRef(0);
  const coldemailRef = useRef("");
  const subjectRef = useRef("");
  const { nodes, data, setData } = useAddContext();
  const [time, setTime] = useState("");
  const { addNode } = useAddNode();

  const openPopup = (popup) => setActivePopup(popup);
  const closePopup = () => setActivePopup(null);

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const handleClick = (pops) => {
    setActivePopup(pops);
  };

  const handleSubmit = (value) => {
    if (value === "delay") {
      setData((prev) => {
        return {
          ...prev,
          delay: String(delayRef.current.value) + " " + time,
        };
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          coldemail: coldemailRef.current.value,
          subject: subjectRef.current.value,
        };
      });
    }

    addNode(value);
    closePopup();
  };

  return (
    <>
      <div>
        <div className="custom-add" onClick={() => openPopup("popup1")}>
          <FiPlus className="plus" />
          <Handle position="top" type="target" />
        </div>
      </div>
      <Popup isOpen={activePopup === "popup1"} onClose={closePopup}>
        <button onClick={() => handleClick("popup2")}>coldemail</button>
        <button onClick={() => handleClick("popup3")}>wait</button>
      </Popup>
      <Popup isOpen={activePopup === "popup2"} onClose={closePopup}>
        <p>Coldemail</p>
        <label>subject</label>
        <input type="text" ref={subjectRef} required />
        <label>text</label>
        <textarea type="text" ref={coldemailRef} required />
        <button onClick={() => handleSubmit("coldemail")}>Insert</button>
      </Popup>
      <Popup isOpen={activePopup === "popup3"} onClose={closePopup}>
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

        <button onClick={() => handleSubmit("delay")}>Insert</button>
      </Popup>
    </>
  );
};

export default CustomAdd;
