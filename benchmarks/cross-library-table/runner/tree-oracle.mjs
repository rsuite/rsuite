// Fixed workload oracle, independent of the adapter data and flattening code.
const roots = ['north', 'south', 'west'];
const rootOpen = ['north', 'north-projects', 'north-overview', 'south', 'west'];
const open = [
  'north',
  'north-projects',
  'north-report',
  'north-budget',
  'north-overview',
  'south',
  'west'
];
const reversed = [
  'west',
  'south',
  'north',
  'north-projects',
  'north-report',
  'north-budget',
  'north-overview'
];
export const treeStates = {
  initial: { ids: roots, expanded: [], selected: [] },
  'root-expanded': { ids: rootOpen, expanded: ['north'], selected: [] },
  'branch-expanded': { ids: open, expanded: ['north', 'north-projects'], selected: [] },
  selected: { ids: open, expanded: ['north', 'north-projects'], selected: ['north-budget'] },
  reordered: { ids: reversed, expanded: ['north', 'north-projects'], selected: ['north-budget'] },
  'root-collapsed': { ids: ['west', 'south', 'north'], expanded: [], selected: ['north-budget'] },
  'root-reexpanded': {
    ids: reversed,
    expanded: ['north', 'north-projects'],
    selected: ['north-budget']
  },
  'branch-collapsed': {
    ids: ['west', 'south', 'north', 'north-projects', 'north-overview'],
    expanded: ['north'],
    selected: ['north-budget']
  },
  'branch-reexpanded': {
    ids: reversed,
    expanded: ['north', 'north-projects'],
    selected: ['north-budget']
  }
};
export const levels = {
  north: 1,
  south: 1,
  west: 1,
  'north-projects': 2,
  'north-overview': 2,
  'north-report': 3,
  'north-budget': 3,
  'south-report': 2
};
export const branches = ['north', 'north-projects', 'south'];
export const treeOwnership = {
  rsuite: 'native-tree;app-checkbox-selection',
  antd: 'native-tree-and-selection',
  chakra: 'app-flattening-disclosure-and-selection',
  heroui: 'react-aria-tree-and-selection-via-heroui'
};
