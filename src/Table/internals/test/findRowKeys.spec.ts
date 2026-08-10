import { describe, expect, it } from 'vitest';
import findRowKeys from '../utils/findRowKeys';

describe('findRowKeys', () => {
  const data = [
    {
      rowKey: 'a',
      children: [
        { rowKey: 'b' },
        {
          rowKey: 'c',
          children: [{ rowKey: 'd' }]
        }
      ]
    },
    { rowKey: 'e' }
  ];

  it('Should return empty array when rowKey is undefined', () => {
    expect(findRowKeys(data)).to.deep.equal([]);
  });

  it('Should return keys of nodes that have children', () => {
    const keys = findRowKeys(data, 'rowKey');
    expect(keys).to.include('a');
    expect(keys).to.include('c');
    expect(keys).not.to.include('e');
  });

  it('Should return all keys when expanded=true', () => {
    const flat = [{ rowKey: 'x' }, { rowKey: 'y' }];
    const keys = findRowKeys(flat, 'rowKey', true);
    expect(keys).to.deep.equal(['x', 'y']);
  });

  it('Should not return leaf node keys when expanded=false', () => {
    const flat = [{ rowKey: 'x' }, { rowKey: 'y' }];
    const keys = findRowKeys(flat, 'rowKey', false);
    expect(keys).to.deep.equal([]);
  });

  it('Should recursively find keys in nested data', () => {
    const keys = findRowKeys(data, 'rowKey');
    expect(keys).to.include('a');
    expect(keys).to.include('c');
    // 'b' has no children and expanded is falsy, should not appear
    expect(keys).not.to.include('b');
  });
});
