import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { addEdge, ConnectionLineType, Panel, useNodesState, useEdgesState } from 'reactflow';
import dagre from 'dagre';
// import './diagram.css';
import './style.css'
import 'reactflow/dist/style.css';
import { useParams } from 'react-router-dom';
import { allusers } from '../../service/api';

let initialNodes = [];
let initialEdges = [];

export const Hierarchy = () => {
  const [data, setData] = useState(null);

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

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const params = useParams();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  function findItems(data, id) {
    // Create a set to store unique parent IDs
    const parentIds = new Set();

    // Find items that match the first condition (_id === id)
    const itemsMatchingId = data.filter((item) => item._id === id);

    // Find items that match the second condition (parentId === id)
    const itemsMatchingParentId = data.filter((item) => item.parentId === id);

    // Add the parent IDs of items matching the second condition to the set
    itemsMatchingParentId.forEach((item) => parentIds.add(item._id));

    // Find items that match the third condition (_id is the parent of another item's parentId)
    const itemsMatchingParentInAnyItem = data.filter((item) => parentIds.has(item.parentId));

    // Combine the results of all three conditions
    const combinedResults = [...itemsMatchingId, ...itemsMatchingParentId, ...itemsMatchingParentInAnyItem];

    return combinedResults;
  }

  async function fetchdata() {
    const result = await allusers('/api/users');
    setData(findItems(result.data, params.id));
  }

  useEffect(() => {
    fetchdata();
  }, [params]);

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
        });
      });
    }

    initialNodes = newNodes;
    initialEdges = newEdges;
  }, [data]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    >
      {/* <Panel position="top-right">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel> */}
    </ReactFlow>
  );
};
