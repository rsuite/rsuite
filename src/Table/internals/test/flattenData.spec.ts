import flattenData from '../utils/flattenData';
import { PARENT_KEY } from '../constants';
import { describe, expect, it } from 'vitest';

describe('flattenData', () => {
  it('should flatten a single-level tree', () => {
    const tree = [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
      { id: '3', name: 'C' }
    ];

    const result = flattenData(tree);

    expect(result).to.deep.equal(tree.map(node => ({ ...node, [PARENT_KEY]: undefined })));
  });

  it('should flatten a multi-level tree', () => {
    const tree = [
      {
        id: '1',
        name: 'A',
        children: [
          { id: '2', name: 'B' },
          {
            id: '3',
            name: 'C',
            children: [
              { id: '4', name: 'D' },
              { id: '5', name: 'E' }
            ]
          },
          { id: '6', name: 'F' }
        ]
      },
      {
        id: '7',
        name: 'G',
        children: [
          { id: '8', name: 'H' },
          { id: '9', name: 'I' }
        ]
      },
      { id: '10', name: 'J' }
    ];

    const result = flattenData(tree);

    expect(result).to.have.lengthOf(10);
    expect(JSON.stringify(result)).to.equal(
      JSON.stringify([
        {
          id: '1',
          name: 'A',
          children: [
            { id: '2', name: 'B' },
            {
              id: '3',
              name: 'C',
              children: [
                { id: '4', name: 'D' },
                { id: '5', name: 'E' }
              ]
            },
            { id: '6', name: 'F' }
          ]
        },
        { id: '2', name: 'B' },
        {
          id: '3',
          name: 'C',
          children: [
            { id: '4', name: 'D' },
            { id: '5', name: 'E' }
          ]
        },
        { id: '4', name: 'D' },
        { id: '5', name: 'E' },
        { id: '6', name: 'F' },
        {
          id: '7',
          name: 'G',
          children: [
            { id: '8', name: 'H' },
            { id: '9', name: 'I' }
          ]
        },
        { id: '8', name: 'H' },
        { id: '9', name: 'I' },
        { id: '10', name: 'J' }
      ])
    );
  });
});
