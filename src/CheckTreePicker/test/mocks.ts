export const originMockData = [
  {
    value: 'root-node',
    label: 'root-node',
    children: [
      {
        value: 'node-1',
        label: 'node-1',
        children: [{ value: 'node-1-1', label: 'node-1-1' }]
      },
      {
        value: 'node-2',
        label: 'node-2',
        children: [{ value: 'node-2-1', label: 'node-2-1' }]
      }
    ]
  }
];

export const changedMockData = [
  {
    value: 'root-node',
    label: 'root-node',
    children: [
      {
        value: 'node-1',
        label: 'node-1',
        children: [{ value: 'node-1-1', label: 'node-1-1' }]
      },
      { value: 'node-2-1', label: 'node-2-1' },
      {
        value: 'node-2',
        label: 'node-2',
        children: []
      }
    ]
  }
];

export const controlledData = [
  {
    label: 'Eugenia',
    value: 'Eugenia'
  },
  {
    label: 'Kariane',
    value: 'Kariane'
  },
  {
    label: 'Louisa',
    value: 'Louisa'
  }
];
