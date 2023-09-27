import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { addEdge, ConnectionLineType, Panel, useNodesState, useEdgesState } from 'reactflow';
import dagre from 'dagre';
import './style.css';
import 'reactflow/dist/style.css';
import { useParams } from 'react-router-dom';
import { allusers } from '../../service/api';
import Edit from './Edit';

export const Hierarchy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [nodesValue, setNodesValue] = useState([]);
  const [edgesValue, setEdgesValue] = useState([]);
  const [editId, setEditId] = useState('');

  const handleOpenModel = () => setIsOpen(true);
  const handleCloseModel = () => {
    fetchdata();
    setIsOpen(false);
  };

  const handleNodeDoubleClick = (event, node) => {
    setEditId(node?.id);
    handleOpenModel();
  };

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 172;
  const nodeHeight = 36;

  const position = { x: 0, y: 0 };
  const edgeType = 'smoothstep';

  const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? 'left' : 'top';
      node.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodesValue, edgesValue);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const params = useParams();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)),
    []
  );

  // hierarchy
  function findNodeById(id, data) {
    const item = data.find((item) => item._id === id);
    if (!item) {
      return null;
    }

    const children = data.filter((child) => child.parentId === id);
    const childNodes = children.map((child) => findNodeById(child._id, data)).filter(Boolean);

    return {
      id: item._id,
      data: item, // Include the data of the node
      children: childNodes,
    };
  }

  function extractNodes(node) {
    const nodes = [];

    function traverse(node) {
      nodes.push(node.data);
      node.children.forEach((child) => traverse(child));
    }

    traverse(node);

    return nodes;
  }

  function displayNodesFromId(data, startId) {
    const rootNode = findNodeById(startId, data);
    const nodes = extractNodes(rootNode);
    return nodes;
  }

  async function fetchdata() {
    const result = await allusers('/api/users');
    setData(displayNodesFromId(result?.data, params?.id));
  }
  useEffect(() => {
    // alert("fetch Api data")
    if (params?.id) {
      fetchdata();
    }
  }, [params.id]);

  useEffect(() => {
    const newNodes = [];
    const newEdges = [];

    if (data && data.length > 0) {
      data.forEach((item, index) => {
        newNodes.push({ id: item?._id, position, data: { label: item?.firstName } });
        newEdges.push({
          id: `e1-${index + 1}`,
          source: item?.parentId,
          target: item?._id,
          type: edgeType,
          animated: true,
          key: index,
        });
      });
    }
    setNodesValue(newNodes);
    setEdgesValue(newEdges);
  }, [data]);

  return (
    <>
      <Edit isOpenModel={isOpen} handleCloseModel={handleCloseModel} id={editId} />
      <ReactFlow
        nodes={nodesValue}
        edges={edgesValue}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={handleNodeDoubleClick}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      />
    </>
  );
};
