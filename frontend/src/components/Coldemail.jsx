import React, { useRef, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { Handle } from "reactflow";
import { useAddContext } from "../context/AddContext";
import Popup from "./Popup";
import { RxCross2 } from "react-icons/rx";
import useAddNode from "../hooks/useAddNode";

const Coldemail = () => {
  const { data, setData, removeNode } = useAddContext();
  const [activePopup, setActivePopup] = useState(null);
  const openPopup = (popup) => setActivePopup(popup);
  const closePopup = () => setActivePopup(null);
  const coldemailRef = useRef("");
  const subjectRef = useRef("");
  const { onNodesChangeFunction } = useAddNode();

  const handleSubmit = () => {
    setData((prev) => {
      return {
        ...prev,
        coldemail: coldemailRef.current.value,
        subject: subjectRef.current.value,
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
            <MdOutlineEmail className="delay-icon" />
          </div>

          <div style={{ width: "100px" }}>
            <div>
              <h5 style={{ fontSize: "12px" }}>Cold Email</h5>
            </div>
            <p>{"Subject : " + data.subject}</p>
          </div>

          <Handle position="bottom" type="source" />
          <Handle position="top" type="target" />
        </div>
      </div>
      <Popup isOpen={activePopup === "popup1"} onClose={closePopup}>
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
    </>
  );
};

export default Coldemail;
