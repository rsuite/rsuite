import _ from 'lodash';

export default function findNodesOfTree(data: any[], check: (node: any) => boolean) {
  const nextNodes: any[] = [];
  const findNodes = (nodes: any[] = []) => {
    for (let i = 0; i < nodes.length; i += 1) {
      if (_.isArray(nodes[i].children)) {
        findNodes(nodes[i].children);
      }
      if (check(nodes[i])) {
        nextNodes.push(nodes[i]);
      }
    }
  };

  findNodes(data);

  return nextNodes;
}
