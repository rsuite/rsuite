import sinon from 'sinon';
import useFlattenTree from '../hooks/useFlattenTree';
import { renderHook } from '@testing-library/react';
import { formatNodeRefKey } from '../utils';
import type { TreeNode } from '@/internals/Tree/types';

describe('useFlattenTree', () => {
  const defaultOptions = {
    value: 'value',
    labelKey: 'label',
    valueKey: 'value',
    childrenKey: 'children'
  };

  describe('Error handling', () => {
    let consoleErrorStub;

    beforeEach(() => {
      consoleErrorStub = sinon.stub(console, 'error').callsFake(() => {
        // do nothing
      });
    });

    afterEach(() => {
      consoleErrorStub.restore();
    });

    it('Should detect duplicate values', () => {
      const duplicateData: TreeNode[] = [
        {
          label: 'node 1',
          value: '1'
        },
        {
          label: 'node 2',
          value: '2',
          children: [
            {
              label: 'node 3',
              value: '1'
            }
          ]
        }
      ];

      renderHook(() => useFlattenTree(duplicateData, defaultOptions));

      expect(consoleErrorStub).to.have.been.calledWith(
        "[rsuite] The value '1' is duplicated. Each node in the tree data must have a unique value."
      );
    });
  });

  describe('Basic functionality', () => {
    it('Should handle empty data', () => {
      const { result } = renderHook(() => useFlattenTree([], defaultOptions));
      expect(Object.keys(result.current)).to.have.length(0);
    });

    it('Should flatten single level tree', () => {
      const data = [
        { label: 'Node 1', value: '1' },
        { label: 'Node 2', value: '2' }
      ];

      const { result } = renderHook(() => useFlattenTree(data, defaultOptions));

      const node1Key = formatNodeRefKey('1');
      const node2Key = formatNodeRefKey('2');

      expect(result.current[node1Key][defaultOptions.labelKey]).to.equal('Node 1');
      expect(result.current[node2Key][defaultOptions.labelKey]).to.equal('Node 2');
    });

    it('Should flatten nested tree', () => {
      const data = [
        {
          label: 'Node 1',
          value: '1',
          children: [
            { label: 'Node 1.1', value: '1-1' },
            { label: 'Node 1.2', value: '1-2' }
          ]
        }
      ];

      const { result } = renderHook(() => useFlattenTree(data, defaultOptions));

      const node11Key = formatNodeRefKey('1-1');
      const node12Key = formatNodeRefKey('1-2');

      expect(result.current[node11Key]?.parent?.[defaultOptions.valueKey]).to.equal('1');
      expect(result.current[node12Key]?.layer).to.equal(2);
    });
  });

  describe('Custom keys', () => {
    it('Should work with custom keys', () => {
      const data = [
        {
          title: 'Node 1',
          id: '1',
          items: [{ title: 'Node 1.1', id: '1-1' }]
        }
      ];

      const { result } = renderHook(() =>
        useFlattenTree(data, {
          value: '1',
          labelKey: 'title',
          valueKey: 'id',
          childrenKey: 'items'
        })
      );

      const node1Key = formatNodeRefKey('1');
      const node11Key = formatNodeRefKey('1-1');

      expect(result.current[node1Key].title).to.equal('Node 1');
      expect(result.current[node11Key].title).to.equal('Node 1.1');
    });
  });

  describe('Callback functionality', () => {
    it('Should call callback when nodes change', () => {
      const callback = sinon.spy();
      const data = [{ label: 'Node 1', value: '1' }];

      renderHook(() => useFlattenTree(data, { ...defaultOptions, callback }));

      expect(callback).to.have.been.calledOnce;
      expect(callback.firstCall.args[0]).to.have.property(formatNodeRefKey('1'));
    });
  });

  describe('Update handling', () => {
    it('Should update when data changes', () => {
      const initialData = [{ label: 'Node 1', value: '1' }];

      const { result, rerender } = renderHook(({ data }) => useFlattenTree(data, defaultOptions), {
        initialProps: { data: initialData }
      });

      expect(Object.keys(result.current)).to.have.length(1);

      const newData = [...initialData, { label: 'Node 2', value: '2' }];
      rerender({ data: newData });

      expect(Object.keys(result.current)).to.have.length(2);
    });
  });
});
