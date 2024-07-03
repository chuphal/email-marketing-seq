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
        <div className="popup-with-coldemail">
          <h2>Email</h2>
          <div className="input-label-div">
            <label>To:</label>
            <input
              type="email"
              ref={emailRef}
              required
              className="form-control"
              placeholder="Enter the email..."
              style={{ marginLeft: "1rem", width: "15rem" }}
            />
          </div>
          <button
            onClick={() => handleSubmit()}
            type="button"
            className="btn btn-success"
          >
            Insert
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default Customsource;
