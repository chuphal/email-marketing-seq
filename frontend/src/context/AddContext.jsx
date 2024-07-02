import { createContext, useContext, useState } from "react";
import { useEdgesState, useNodesState } from "reactflow";
import { initialEdges, initialNodes } from "../components/WorkflowConstant";

export const AddContext = createContext();

export const useAddContext = () => {
  return useContext(AddContext);
};

export const AddContextProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [removeNode, setRemoveNode] = useState();

  const [data, setData] = useState({
    coldemail: "",
    delay: -1,
    email: "",
    subject: "",
  });

  return (
    <AddContext.Provider
      value={{
        nodes,
        setNodes,
        onEdgesChange,
        edges,
        setEdges,
        onNodesChange,
        data,
        setData,
        removeNode,
        setRemoveNode,
      }}
    >
      {children}
    </AddContext.Provider>
  );
};
