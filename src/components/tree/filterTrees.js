// import { forEach, values } from 'lodash-es';
// import toTree from './toTree.js';

// function findParentNodes(node, lookup, parentNodesHash) {
//   if (!node) {
//     return;
//   }
//   if (node.pid === undefined || node.pid === '') {
//     return;
//   }

//   // eslint-disable-next-line no-param-reassign
//   parentNodesHash[node.pid] = lookup[node.pid];
//   findParentNodes(node.pnode, lookup, parentNodesHash);
// }

// // function findNodes(nodes, queryReg, filterdNodesHash, nodesEachLevelHash) {
// //   if (!Array.isArray(nodes) || nodes.length === 0) {
// //     return;
// //   }

// //   nodes.forEach((n) => {
// //     if (queryReg.test(n.name)) {
// //       // eslint-disable-next-line no-param-reassign
// //       filterdNodesHash[n.id] = n;
// //       if (!nodesEachLevelHash[n.pid]) {
// //         // eslint-disable-next-line no-param-reassign
// //         nodesEachLevelHash[n.pid] = n;
// //       }
// //     }
// //     findNodes(n.children, queryReg, filterdNodesHash, nodesEachLevelHash);
// //   });
// // }

// function filter(trees, query) {
//   if (!Array.isArray(trees) || trees.length === 0) {
//     return [];
//   }

//   if (query === undefined || query === '') {
//     return trees;
//   }

//   const queryReg = new RegExp(query, 'i');
//   const filterdNodesHash = {};
//   const nodesEachLevelHash = {};
//   forEach(lookup, (n) => {
//     if (queryReg.test(n.name)) {
//       // eslint-disable-next-line no-param-reassign
//       filterdNodesHash[n.id] = n;
//       if (!nodesEachLevelHash[n.pid]) {
//         // eslint-disable-next-line no-param-reassign
//         nodesEachLevelHash[n.pid] = n;
//       }
//     }
//   });

//   forEach(nodesEachLevelHash, (node) => {
//     findParentNodes(node, lookup, filterdNodesHash);
//   });
//   const nodes = values(filterdNodesHash);
//   return toTree(nodes).trees;
// }

// export default filter;
