import Elk from 'elkjs';
import { isNode } from 'reactflow';

const DEFAULT_WIDTH = 172;
const DEFAULT_HEIGHT = 36;

export const createGraphLayout = async (elements) => {
  console.log("elements",elements);
  const nodes = [];
  const edges = [];

  const elk = new Elk({
    defaultLayoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'TOP',
      'elk.padding': '[top=100,left=60,bottom=40,right=250]',
      // "elk.spacing.componentComponent": 30,
      'elk.spacing.nodeNode': 180,
      'elk.layered.spacing.nodeNodeBetweenLayers': 75,
      // "elk.edgeLabels.inline": true,
      'elk.edgeRouting': 'SPLINES',
      //   "elk.algorithm": "layered",
      'elk.contentAlignment': 'V_CENTER',
      //   "elk.direction": "BOTTOM",
      // "elk.spacing.nodeNode": "25",
      // "elk.layered.spacing.nodeNodeBetweenLayers": "75"
      // "elk.layered.spacing": "50",
      // "elk.spacing": "50"
      // "elk.spacing.individual": "250"
      // "elk.alignment": "RIGHT"
    },
  });
  elements?.forEach((el) => {
    if (isNode(el)) {
      nodes.push({
        id: el.id,
        width: el.__rf?.width ?? DEFAULT_WIDTH,
        height: el.__rf?.height ?? DEFAULT_HEIGHT,
        transform: 'skew(20deg) !important',
        shape: el.shape,
      });
    } else {
      edges.push({
        id: el?.id,
        target: el?.target ? el?.target : null,
        source: el?.source,
      });
    }
  });
  const newGraph = await elk.layout({
    id: 'root',
    children: nodes,
    edges: edges.shift()
  });

  return elements.map((el) => {

    if (isNode(el)) {
      const node = newGraph?.children?.find((n) => n.id === el.id);

      if (!el.position.x || !el.position.y) {
        el.sourcePosition = 'right';
        el.targetPosition = 'left';

        if (node?.x && node?.y && node?.width && node?.height) {
          el.position = {
            x: node.x - node.width / 2 + Math.random() / 1000,
            y: node.y - node.height / 2,
          };
        }
      } else {
        el.sourcePosition = 'right';
        el.targetPosition = 'left';
        if (el?.position.x && el?.position?.y && el?.position?.width && el?.position?.height) {
          el.position = {
            x: el?.position.x,
            y: el?.position.y,
          };
        }
      }
    }
    return el;
  });
};
