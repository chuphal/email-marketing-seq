import React from "react";
import { Handle } from "reactflow";

const Customsequence = ({ data: { para1, bottomHandle } }) => {
  return (
    <div>
      <div className="lead-source">{para1 && <p>{para1}</p>}</div>
      {bottomHandle && <Handle position="bottom" type="source" />}
    </div>
  );
};

export default Customsequence;
