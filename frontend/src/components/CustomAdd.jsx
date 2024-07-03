import React, { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Handle } from "reactflow";
import Popup from "./Popup";
import { useAddContext } from "../context/AddContext";
import useAddNode from "../hooks/useAddNode";
import Form from "react-bootstrap/Form";

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
        <div className="popup-with-buttons">
          <button
            onClick={() => handleClick("popup2")}
            type="button"
            className="btn btn-primary"
          >
            coldemail
          </button>
          <button
            onClick={() => handleClick("popup3")}
            type="button"
            className="btn btn-primary"
            style={{ marginLeft: "2rem" }}
          >
            wait
          </button>
        </div>
      </Popup>
      <Popup isOpen={activePopup === "popup2"} onClose={closePopup}>
        <div className="popup-with-coldemail">
          <h2>Coldemail</h2>
          <div className="input-label-div">
            <label>Subject:</label>
            <input
              type="text"
              ref={subjectRef}
              placeholder="Type here..."
              required
              style={{ marginLeft: "1rem", width: "25rem" }}
              className="form-control"
            />
          </div>
          <div className="input-label-div">
            <label>{`Text:`}</label>
            <textarea
              type="text"
              placeholder="Type here..."
              ref={coldemailRef}
              required
              style={{ marginLeft: "34px", width: "25rem", height: "10rem" }}
              className="form-control"
            />
          </div>
          <button
            onClick={() => handleSubmit("coldemail")}
            type="button"
            className="btn btn-success"
          >
            Insert
          </button>
        </div>
      </Popup>
      <Popup isOpen={activePopup === "popup3"} onClose={closePopup}>
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

export default CustomAdd;
