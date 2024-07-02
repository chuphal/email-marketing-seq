import React, { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Handle } from "reactflow";
import { useAddContext } from "../context/AddContext";
import Popup from "./Popup";

const Customsource = ({ data: { para1, bottomHandle } }) => {
  const openPopup = (popup) => setActivePopup(popup);
  const closePopup = () => setActivePopup(null);
  const [activePopup, setActivePopup] = useState(null);
  const { data, setData } = useAddContext();
  const emailRef = useRef("");

  const handleSubmit = () => {
    setData((prev) => {
      return { ...prev, email: emailRef.current.value };
    });

    closePopup();
  };

  return (
    <div>
      <div className="lead-source" onClick={() => openPopup("popup1")}>
        <FiPlus style={{ fontSize: 14 }} />
        <p>{para1}</p>
        {data.email.length > 1 && <p>{data.email}</p>}
      </div>
      {bottomHandle && <Handle position="bottom" type="source" />}
      <Popup isOpen={activePopup === "popup1"} onClose={closePopup}>
        <p>email</p>
        <input type="email" ref={emailRef} required />
        <button onClick={() => handleSubmit()}>Insert</button>
      </Popup>
    </div>
  );
};

export default Customsource;
