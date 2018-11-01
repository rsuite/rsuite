import _ from 'lodash';

export default function findNodesOfTree(data, check) {
  const nextNodes = [];
  const findNodes = (nodes = []) => {
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
