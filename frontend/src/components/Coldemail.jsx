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
      <div className="delay-comp" onClick={() => openPopup("popup1")}>
        <div className="delay-icon-div">
          <MdOutlineEmail className="delay-icon" />
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
          <h5>Cold Email</h5>
          <p>{"Subject : " + data.subject}</p>
        </div>

        <Handle position="bottom" type="source" />
        <Handle position="top" type="target" />
      </div>
      <Popup isOpen={activePopup === "popup1"} onClose={closePopup}>
        <p>Coldemail</p>
        <label>subject</label>
        <input type="text" ref={subjectRef} required />
        <label>text</label>
        <textarea type="text" ref={coldemailRef} required />
        <button onClick={() => handleSubmit()}>Insert</button>
      </Popup>
    </>
  );
};

export default Coldemail;
