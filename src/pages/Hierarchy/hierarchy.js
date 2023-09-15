import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, { Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import ContextMenu from './ContextMenu';
import 'reactflow/dist/style.css';
import './style.css';

export const Hierarchy = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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

  const initialNodes = [
    { id: '1', position: { x: 175, y: 0 }, data: { label: 'a' } },
    { id: '2', position: { x: 0, y: 250 }, data: { label: 'b' } },
    { id: '3', position: { x: 175, y: 250 }, data: { label: 'c' } },
    { id: '4', position: { x: 250, y: 350 }, data: { label: 'd' } },
    { id: '5', position: { x: 450, y: 350 }, data: { label: 'e' } },
    { id: '6', position: { x: 550, y: 350 }, data: { label: 'f' } },
    { id: '7', position: { x: 550, y: 350 }, data: { label: 'g' } },
  ];

  const initialEdges = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
    },
    {
      id: 'e1-4',
      source: '1',
      target: '4',
    },
    {
      id: 'e1-5',
      source: '2',
      target: '5',
    },
    {
      id: 'e1-6',
      source: '2',
      target: '6',
    },
    {
      id: 'e1-7',
      source: '3',
      target: '7',
    },
  ];

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);
  return (
    <ReactFlow
      ref={ref}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
      onNodeContextMenu={onNodeContextMenu}
      fitView
    >
      <Background />
      {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
    </ReactFlow>
  );
};
