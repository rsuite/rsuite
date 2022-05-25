export const data = [
  {
    label: 'Master',
    value: 'Master',
    children: [
      {
        label: 'tester0',
        value: 'tester0'
      },
      {
        label: 'tester1',
        value: 'tester1',
        children: [
          {
            label: 'tester2',
            value: 'tester2'
          }
        ]
      }
    ]
  },
  {
    label: 'Disabled node',
    value: 'disabled'
  }
];

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
