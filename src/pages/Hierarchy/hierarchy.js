import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import ContextMenu from './ContextMenu';
import 'reactflow/dist/style.css';
import './style.css';
import { allusers } from '../../service/api';
import { createGraphLayout } from './layout';

const initialNodes = [];

const initialEdges = [];
export const Hierarchy = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [allElements, setAllElements] = useState([]);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges]);

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  async function fetchdata() {
    const result = await allusers('/api/users');

    if (result && result.status === 200) {
      result.data.forEach((item, index) => {
        initialNodes.push({ id: item?._id, position: { x: 175 * index, y: 10 * index }, data: { label: item?.firstName } });
        initialEdges.push({ id: `e1-${index + 1}`, source: item?.parentId, target: item?._id, animated: true });
      });
      createGraphLayout(initialNodes.concat(initialEdges))
        .then((els) => {
          setAllElements(els);
        })
        .catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);
  return (
    <ReactFlow
      ref={ref}
      // elements={}
      nodes={allElements.filter((data)=> data.position)}
      edges={allElements.filter((data)=> !data.position)}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
      onNodeContextMenu={onNodeContextMenu}
      defaultZoom={0.8}
      fitView
    >
      {/* <Background /> */}
      {/* {menu && <ContextMenu onClick={onPaneClick} {...menu} />} */}
    </ReactFlow>
  );
};
