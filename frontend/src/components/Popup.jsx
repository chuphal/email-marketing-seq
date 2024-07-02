import React from "react";
import ReactDOM from "react-dom";

const Popup = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.body // Portal destination
  );
};

export default Popup;
