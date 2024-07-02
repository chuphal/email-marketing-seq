export const initialNodes = [
  {
    id: "1",
    type: "customSrc",
    data: {
      icon: "add",
      para1: "Add email",
      bottomHandle: false,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "3",
    type: "customSeq",
    data: {
      para1: "Sequence Start Point",
      bottomHandle: true,
    },
    position: { x: 0, y: 100 },
  },
  {
    id: "2",
    type: "customAdd",
    position: { x: 70, y: 200 },
  },
];

export const initialEdges = [
  {
    id: "e3-2",
    source: "3",
    target: "2",
    animated: true,
  },
];
