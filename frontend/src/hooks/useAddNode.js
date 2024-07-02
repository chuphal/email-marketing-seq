import { useCallback } from "react";
import { useReactFlow } from "reactflow";

const useAddNode = () => {
  const { setNodes, setEdges } = useReactFlow();
  const addNode = useCallback((value) => {
    let newNodeId;
    let nodes;

    setNodes((prevNodes) => {
      const prevNode1 = prevNodes[prevNodes.length - 2];
      const prevNode2 = prevNodes[[prevNodes.length - 1]];

      newNodeId = new Date().toString();
      nodes = [
        ...prevNodes.slice(0, prevNodes.length - 1),
        {
          id: newNodeId,
          data: { label: "node 4" },
          type: value,
          position: { x: prevNode1.position.x, y: prevNode1.position.y + 100 },
        },
        {
          id: prevNode2.id,
          type: prevNode2.type,
          position: { x: prevNode2.position.x, y: prevNode2.position.y + 100 },
        },
      ];
      return [
        ...prevNodes.slice(0, prevNodes.length - 1),
        {
          id: newNodeId,
          data: { label: "node 4" },
          type: value,
          position: { x: prevNode1.position.x, y: prevNode1.position.y + 100 },
        },
        {
          id: prevNode2.id,
          type: prevNode2.type,
          position: { x: prevNode2.position.x, y: prevNode2.position.y + 100 },
        },
      ];
    });

    const newEdge = {
      id: `e${nodes.length}-${newNodeId}`,
      source: nodes[nodes.length - 3].id,
      target: newNodeId,
    };
    const lastEdge = {
      id: `e${newNodeId}-${nodes[nodes.length - 1].id}`,
      source: newNodeId,
      target: nodes[nodes.length - 1].id,
    };
    setEdges((prevEdges) => {
      return [...prevEdges.slice(0, prevEdges.length - 1), newEdge, lastEdge];
    });
  }, []);

  const onNodesChangeFunction = (node) => {
    if (node.id === "2" || node.id === "3") {
      return;
    }
    let newSource = "";
    let newTarget = "";
    setEdges((eds) => {
      const edges = eds.filter((ed) => {
        if (ed.source === node.id) {
          newTarget = ed.target;
        } else if (ed.target === node.id) {
          newSource = ed.source;
        }

        return ed.source !== node.id && ed.target !== node.id;
      });
      return [
        ...edges,
        {
          id: `e${newSource}-${newTarget}`,
          source: newSource,
          target: newTarget,
        },
      ];
    });

    setNodes((nds) => nds.filter((n) => n.id !== node.id));
  };

  return { addNode, onNodesChangeFunction };
};

export default useAddNode;
