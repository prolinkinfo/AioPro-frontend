import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { Background, useNodesState, useEdgesState, addEdge, Handle, Position } from 'reactflow'
import ContextMenu from './ContextMenu';
import 'reactflow/dist/style.css';
import './style.css';
import './diagram.css'
import { allusers } from '../../service/api';
import EditModel from './Edit'
// eslint-disable-next-line import/order
import { useParams } from 'react-router-dom';

let initialNodes = []
let initialEdges = []

export const Hierarchy = () => {
  // const [initialNodes, setInitialNodes] = useState([])
  // const [initialEdges, setInitialEdges] = useState([])
  const [data, setData] = useState(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [menu, setMenu] = useState(null);
  const [isOpenModel, setIsOpenModel] = useState(false)
  // const [selectedList, setSelectedList] = useState(null)

  const params = useParams();

  console.log(params.id, "params")
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

  // function findSourceById(array, targetId) {
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < array.length; i++) {
  //     if (array[i].target === targetId) {
  //       return array[i].source;
  //     }
  //   }
  //   // If no matching item is found, you can return null or handle it as needed.
  //   return null;
  // }

  const handleNodeDoubleClick = useCallback((event, node) => {
    console.log(node, "node")
    // const source = findSourceById(initialEdges, node?.id);
    // setSelectedList(...selectedList, { sourceId: source })
    // console.log(source, "source")


    setIsOpenModel(true)
  }, []);


  const closeModal = () => {
    setIsOpenModel(false)
  };

  function findItems(data, id) {
    // Create a set to store unique parent IDs
    const parentIds = new Set();

    // Find items that match the first condition (_id === id)
    const itemsMatchingId = data.filter(item => item._id === id);

    // Find items that match the second condition (parentId === id)
    const itemsMatchingParentId = data.filter(item => item.parentId === id);

    // Add the parent IDs of items matching the second condition to the set
    itemsMatchingParentId.forEach(item => parentIds.add(item._id));

    // Find items that match the third condition (_id is the parent of another item's parentId)
    const itemsMatchingParentInAnyItem = data.filter(item => parentIds.has(item.parentId));

    // Combine the results of all three conditions
    const combinedResults = [...itemsMatchingId, ...itemsMatchingParentId, ...itemsMatchingParentInAnyItem];

    return combinedResults;
  }

  useEffect(() => {
    const newNodes = [];
    const newEdges = [];
    if (data && data.length > 0) {

      console.log(data, "data", "111111111111111111")
      data.forEach((item, index) => {
        newNodes.push({ id: item?._id, position: { x: 175, y: 0 }, data: { label: item?.firstName } });
        newEdges.push({ id: `e1-${index + 1}`, source: item?.parentId, target: item?._id, animated: true });
      });
    }

    initialNodes = newNodes
    initialEdges = newEdges
    // setInitialNodes(newNodes)
    // setInitialEdges(newEdges)
    console.log(initialNodes, "initialNodes", "111111111111111111")
    console.log(initialEdges, "initialEdges", "111111111111111111")
  }, [data])

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     data.forEach((item, index) => {
  //       setInitialNodes(...initialNodes, { id: item?._id, position: { x: 175, y: 0 }, data: { label: item?.firstName } });
  //       setInitialEdges(...initialEdges, { id: `e1-${index + 1}`, source: item?.parentId, target: item?._id, animated: true });
  //     });
  //   }
  // }, [data])


  async function fetchdata() {
    const result = await allusers('/api/users');
    console.log(params.id, "111111111111111111")
    setData(findItems(result.data, params.id));

  }

  useEffect(() => {
    fetchdata();
  }, [params]);



  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);


  return (
    <>
      <EditModel isOpenModel={isOpenModel} closeModal={closeModal} />

      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        onNodeDoubleClick={handleNodeDoubleClick}
        fitView
      >
        <Handle type="target" position={Position.Left} />
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      </ReactFlow>
    </>
  );
};
