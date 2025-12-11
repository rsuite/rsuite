import React from 'react';
import CheckTree from '../CheckTree';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mockTreeData } from '@test/mocks/data-mock';
import { testStandardProps } from '@test/cases';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2', 'tester3']], 'disabled']);

describe('CheckTree', () => {
  testStandardProps(<CheckTree data={data} />);

  it('Should set a height for the Tree', () => {
    const { rerender } = render(<CheckTree data={data} />);

    expect(screen.getByRole('tree')).to.have.attr('style', '--rs-tree-view-height: 360px;');

    rerender(<CheckTree data={data} height={100} />);

    expect(screen.getByRole('tree')).to.have.attr('style', '--rs-tree-view-height: 100px;');
  });

  it('Should set a height for the Tree with virtualized', () => {
    render(<CheckTree data={data} virtualized height={100} />);

    expect(screen.getByRole('tree').querySelector('.rs-check-tree-virt-list')).to.have.style(
      'height',
      '100px'
    );
  });

  it('Should render a multi-selectable tree', () => {
    const { container } = render(<CheckTree data={data} />);

    expect(container.firstChild).to.have.class('rs-check-tree');
    expect(screen.getByRole('tree')).to.have.attr('aria-multiselectable', 'true');
  });

  it('Should show indent line', () => {
    render(<CheckTree data={data} showIndentLine />);

    expect(screen.queryAllByTestId('indent-line')).to.have.length(2);
  });

  it('Should call `onSelectItem` callback with the selected item and the full path', () => {
    const onSelectItem = vi.fn();

    render(
      <CheckTree data={data} expandItemValues={['Master', 'tester1']} onSelectItem={onSelectItem} />
    );

    fireEvent.click(screen.getByRole('checkbox', { name: 'tester2' }));

    expect(onSelectItem).toHaveBeenCalledWith(expect.objectContaining({ value: 'tester2' }), [
      expect.objectContaining({ value: 'Master' }),
      expect.objectContaining({ value: 'tester1' }),
      expect.objectContaining({ value: 'tester2' })
    ]);
  });

  it('Should call `onSelect` callback', () => {
    const onSelect = vi.fn();

    render(<CheckTree data={data} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Master' }));

    // The first argument is the selected item, second is the selected values, third is the event
    expect(onSelect.mock.calls[0][0]).toMatchObject({ value: 'Master' });
    expect(onSelect).toHaveBeenCalled();
  });

  it('Should not call `onSelect` callback when the item is disabled', () => {
    const onSelect = vi.fn();

    render(<CheckTree data={data} onSelect={onSelect} disabledItemValues={['Master']} />);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Master' }));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('Should all nodes be checked', () => {
    // Test data comes from: https://github.com/rsuite/rsuite/issues/3559
    const data = [
      {
        label: 'label_1',
        value: 'value_1',
        children: [
          {
            label: 'label_2',
            value: 'value_2',
            children: [
              {
                label: 'label_3',
                value: 'value_3',
                children: [
                  {
                    label: 'label_4',
                    value: 'value_4',
                    children: [
                      {
                        label: 'label_5',
                        value: 'value_5'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    render(<CheckTree data={data} value={['value_5']} defaultExpandAll />);

    screen.getAllByRole('treeitem').forEach(item => {
      expect(item).to.have.attribute('aria-checked', 'true');
    });
  });

  describe('Disabled/Uncheckable items', () => {
    it('Should render the item as disabled', () => {
      const onSelect = vi.fn();
      render(<CheckTree data={data} disabledItemValues={['Master']} onSelect={onSelect} />);

      expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.attribute('aria-disabled');

      fireEvent.click(screen.getByRole('checkbox', { name: 'Master' }));

      expect(onSelect).not.toHaveBeenCalled();
    });

    it('Should render children of disabled node as disabled', () => {
      const onSelect = vi.fn();
      render(
        <CheckTree
          data={data}
          disabledItemValues={['Master']}
          onSelect={onSelect}
          defaultExpandAll
        />
      );

      // Parent node should be disabled
      expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.attribute('aria-disabled');

      // Children nodes should also be disabled
      expect(screen.getByRole('treeitem', { name: 'tester0' })).to.have.attribute('aria-disabled');
      expect(screen.getByRole('treeitem', { name: 'tester1' })).to.have.attribute('aria-disabled');
      expect(screen.getByRole('treeitem', { name: 'tester2' })).to.have.attribute('aria-disabled');
      expect(screen.getByRole('treeitem', { name: 'tester3' })).to.have.attribute('aria-disabled');

      // Clicking on children should not trigger onSelect
      fireEvent.click(screen.getByRole('checkbox', { name: 'tester0' }));
      expect(onSelect).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole('checkbox', { name: 'tester1' }));
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('Should not check disabled children when parent is checked', () => {
      const onChange = vi.fn();
      const testData = [
        {
          label: 'Parent',
          value: 'parent',
          children: [
            { label: 'Child 1', value: 'child1' },
            { label: 'Child 2', value: 'child2' },
            { label: 'Child 3', value: 'child3' }
          ]
        }
      ];

      render(
        <CheckTree
          data={testData}
          disabledItemValues={['child2']}
          onChange={onChange}
          defaultExpandAll
        />
      );

      // Click parent node to check it
      fireEvent.click(screen.getByRole('checkbox', { name: 'Parent' }));

      // Should check parent and non-disabled children, but not disabled child2
      expect(onChange).toHaveBeenCalledWith(['parent', 'child1', 'child3'], expect.anything());
    });

    it('Should not check disabled grandchildren when grandparent is checked', () => {
      const onChange = vi.fn();
      const testData = [
        {
          label: 'Node 2',
          value: '2',
          children: [
            {
              label: 'Node 2-1',
              value: '2-1',
              children: [
                {
                  label: 'Node 2-1-1',
                  value: '2-1-1'
                },
                {
                  label: 'Node 2-1-2',
                  value: '2-1-2'
                }
              ]
            },
            {
              label: 'Node 2-2',
              value: '2-2'
            }
          ]
        }
      ];

      render(
        <CheckTree
          data={testData}
          disabledItemValues={['2-1-1', '2-1-2']}
          onChange={onChange}
          defaultExpandAll
        />
      );

      // Click Node 2 to check it
      fireEvent.click(screen.getByRole('checkbox', { name: 'Node 2' }));

      // Should check Node 2, 2-1, and 2-2, but NOT the disabled grandchildren 2-1-1 and 2-1-2
      expect(onChange).toHaveBeenCalledWith(['2', '2-1', '2-2'], expect.anything());
    });

    it('Should allow parent to be checked when all children are disabled', () => {
      const onChange = vi.fn();
      const testData = [
        {
          label: 'Node 2',
          value: '2',
          children: [
            {
              label: 'Node 2-1',
              value: '2-1',
              children: [
                {
                  label: 'Node 2-1-1',
                  value: '2-1-1'
                },
                {
                  label: 'Node 2-1-2',
                  value: '2-1-2'
                }
              ]
            },
            {
              label: 'Node 2-2',
              value: '2-2'
            }
          ]
        }
      ];

      render(
        <CheckTree
          data={testData}
          disabledItemValues={['2-1-1', '2-1-2']}
          onChange={onChange}
          defaultExpandAll
        />
      );

      // Click Node 2-1 directly (which has all children disabled)
      fireEvent.click(screen.getByRole('checkbox', { name: 'Node 2-1' }));

      // Should check only Node 2-1, not its disabled children
      expect(onChange).toHaveBeenCalledWith(['2-1'], expect.anything());

      // Node 2-1 should be checkable (not disabled) even though all its children are disabled
      expect(screen.getByRole('treeitem', { name: 'Node 2-1' })).to.have.attribute(
        'aria-disabled',
        'false'
      );

      // Node 2-1 should be checked after clicking
      expect(screen.getByRole('treeitem', { name: 'Node 2-1' })).to.have.attribute(
        'aria-checked',
        'true'
      );
    });

    it('Should not render the checkbox when the item is uncheckable', () => {
      const onSelect = vi.fn();

      render(<CheckTree data={data} onSelect={onSelect} uncheckableItemValues={['Master']} />);

      expect(screen.queryByRole('checkbox', { name: 'Master' })).to.not.exist;
    });
  });

  describe('Indeterminate state', () => {
    it('Should set indeterminate state on parent node when some children are checked', () => {
      // Test data with parent and children
      const treeData = [
        {
          label: 'Parent',
          value: 'parent',
          children: [
            { label: 'Child 1', value: 'child1' },
            { label: 'Child 2', value: 'child2' },
            { label: 'Child 3', value: 'child3' }
          ]
        }
      ];

      render(<CheckTree data={treeData} value={['child1']} defaultExpandAll />);

      const parentCheckbox = screen.getByRole('checkbox', { name: 'Parent' });

      // Parent should have aria-checked="mixed" for accessibility
      expect(parentCheckbox).to.have.attribute('aria-checked', 'mixed');

      // Parent checkbox should have indeterminate property set for screen reader support
      expect((parentCheckbox as HTMLInputElement).indeterminate).to.be.true;
    });

    it('Should not set indeterminate state when all children are checked', () => {
      const treeData = [
        {
          label: 'Parent',
          value: 'parent',
          children: [
            { label: 'Child 1', value: 'child1' },
            { label: 'Child 2', value: 'child2' }
          ]
        }
      ];

      render(<CheckTree data={treeData} value={['parent', 'child1', 'child2']} defaultExpandAll />);

      const parentCheckbox = screen.getByRole('checkbox', { name: 'Parent' });

      // Parent should be fully checked, not indeterminate
      expect(parentCheckbox).to.have.attribute('aria-checked', 'true');
      expect((parentCheckbox as HTMLInputElement).indeterminate).to.be.false;
    });

    it('Should not set indeterminate state when no children are checked', () => {
      const treeData = [
        {
          label: 'Parent',
          value: 'parent',
          children: [
            { label: 'Child 1', value: 'child1' },
            { label: 'Child 2', value: 'child2' }
          ]
        }
      ];

      render(<CheckTree data={treeData} value={[]} defaultExpandAll />);

      const parentCheckbox = screen.getByRole('checkbox', { name: 'Parent' });

      // Parent should be unchecked, not indeterminate
      expect(parentCheckbox).to.have.attribute('aria-checked', 'false');
      expect((parentCheckbox as HTMLInputElement).indeterminate).to.be.false;
    });

    it('Should update indeterminate state when children selection changes', () => {
      const treeData = [
        {
          label: 'Parent',
          value: 'parent',
          children: [
            { label: 'Child 1', value: 'child1' },
            { label: 'Child 2', value: 'child2' }
          ]
        }
      ];

      const { rerender } = render(<CheckTree data={treeData} value={[]} defaultExpandAll />);

      const parentCheckbox = screen.getByRole('checkbox', { name: 'Parent' });

      // Initially unchecked
      expect((parentCheckbox as HTMLInputElement).indeterminate).to.be.false;

      // Select one child - should become indeterminate
      rerender(<CheckTree data={treeData} value={['child1']} defaultExpandAll />);
      expect((parentCheckbox as HTMLInputElement).indeterminate).to.be.true;

      // Select all children - should not be indeterminate
      rerender(
        <CheckTree data={treeData} value={['parent', 'child1', 'child2']} defaultExpandAll />
      );
      expect((parentCheckbox as HTMLInputElement).indeterminate).to.be.false;
    });
  });

  describe('Accessibility - Keyboard interactions', () => {
    it('Should focus the next item when pressing the down arrow key', () => {
      render(<CheckTree data={data} />);
      const tree = screen.getByRole('tree');
      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.keyDown(tree, { key: 'ArrowDown' });

      expect(treeItems[0]).to.have.focus;
    });

    it('Should focus the previous item when pressing the up arrow key', () => {
      render(<CheckTree data={data} defaultExpandAll />);
      const tree = screen.getByRole('tree');
      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.keyDown(tree, { key: 'ArrowUp' });
      fireEvent.keyDown(tree, { key: 'ArrowUp' });

      expect(treeItems[treeItems.length - 1]).to.have.focus;
    });

    it('Should expand the item when pressing the right arrow key', () => {
      render(<CheckTree data={data} />);

      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      fireEvent.keyDown(treeItems[0], { key: 'ArrowRight' });

      expect(treeItems[0]).to.have.attribute('aria-expanded', 'true');
    });

    it('Should collapse the item when pressing the left arrow key', () => {
      render(<CheckTree data={data} defaultExpandAll />);

      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      fireEvent.keyDown(treeItems[0], { key: 'ArrowLeft' });

      expect(treeItems[0]).to.have.attribute('aria-expanded', 'false');
    });

    it('Should check the item when pressing the enter key', () => {
      render(<CheckTree data={data} />);
      const tree = screen.getByRole('tree');
      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.keyDown(tree, { key: 'ArrowDown' });
      fireEvent.keyDown(tree, { key: 'Enter' });

      expect(treeItems[0]).to.have.attribute('aria-checked', 'true');
    });

    it('Should focus the first visible item when pressing the Home key', () => {
      render(<CheckTree data={data} defaultExpandAll />);
      const tree = screen.getByRole('tree');
      const treeItems = screen.getAllByRole('treeitem');

      // First focus on a middle item
      fireEvent.keyDown(tree, { key: 'ArrowDown' });
      fireEvent.keyDown(tree, { key: 'ArrowDown' });
      fireEvent.keyDown(tree, { key: 'ArrowDown' });

      // Then press Home to go to first item
      fireEvent.keyDown(tree, { key: 'Home' });

      expect(treeItems[0]).to.have.focus;
    });

    it('Should focus the last visible item when pressing the End key', () => {
      render(<CheckTree data={data} defaultExpandAll />);
      const tree = screen.getByRole('tree');
      const treeItems = screen.getAllByRole('treeitem');

      // First focus on first item
      fireEvent.keyDown(tree, { key: 'ArrowDown' });

      // Then press End to go to last item
      fireEvent.keyDown(tree, { key: 'End' });

      expect(treeItems[treeItems.length - 1]).to.have.focus;
    });

    describe('With virtualized', () => {
      it('Should focus the next item when pressing the down arrow key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);
        const tree = screen.getByRole('tree');

        fireEvent.keyDown(tree, { key: 'ArrowDown' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.focus;
      });

      it('Should focus the previous item when pressing the up arrow key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);
        const tree = screen.getByRole('tree');

        fireEvent.keyDown(tree, { key: 'ArrowUp' });
        fireEvent.keyDown(tree, { key: 'ArrowUp' });

        const treeItems = screen.getAllByRole('treeitem');

        expect(treeItems[treeItems.length - 1]).to.have.focus;
      });

      it('Should expand the item when pressing the right arrow key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);

        fireEvent.click(screen.getAllByRole('checkbox')[0]);
        fireEvent.keyDown(screen.getAllByRole('treeitem')[0], { key: 'ArrowRight' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.attribute('aria-expanded', 'true');
      });

      it('Should collapse the item when pressing the left arrow key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);

        fireEvent.click(screen.getAllByRole('checkbox')[0]);
        fireEvent.keyDown(screen.getAllByRole('treeitem')[0], { key: 'ArrowLeft' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.attribute('aria-expanded', 'false');
      });

      it('Should check the item when pressing the enter key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);
        const tree = screen.getByRole('tree');

        fireEvent.keyDown(tree, { key: 'ArrowDown' });
        fireEvent.keyDown(tree, { key: 'Enter' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.attribute('aria-checked', 'true');
      });

      it('Should focus the first visible item when pressing the Home key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);
        const tree = screen.getByRole('tree');

        // First focus on a middle item
        fireEvent.keyDown(tree, { key: 'ArrowDown' });
        fireEvent.keyDown(tree, { key: 'ArrowDown' });
        fireEvent.keyDown(tree, { key: 'ArrowDown' });

        // Then press Home to go to first item
        fireEvent.keyDown(tree, { key: 'Home' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.focus;
      });

      it('Should focus the last visible item when pressing the End key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);
        const tree = screen.getByRole('tree');

        // First focus on first item
        fireEvent.keyDown(tree, { key: 'ArrowDown' });

        // Then press End to go to last item
        fireEvent.keyDown(tree, { key: 'End' });

        const treeItems = screen.getAllByRole('treeitem');
        expect(treeItems[treeItems.length - 1]).to.have.focus;
      });
    });
  });

  describe('Scroll Shadows', () => {
    it('Should hava a scroll shadow', () => {
      render(<CheckTree data={data} scrollShadow height={100} />);

      expect(screen.getByRole('tree')).to.have.class('rs-scroll-view-shadow');
    });

    it('Should hava a scroll shadow with virtualized', () => {
      render(<CheckTree data={data} scrollShadow height={100} virtualized />);

      expect(screen.getByRole('tree')).to.not.have.class('rs-scroll-view-shadow');
      expect(screen.getByTestId('scroll-view')).to.have.class('rs-scroll-view-shadow');
    });
  });

  describe('Controlled and uncontrolled value', () => {
    it('Should checked the item passed through the `value` property', async () => {
      render(<CheckTree data={data} value={['tester2']} defaultExpandAll />);

      expect(screen.getByRole('treeitem', { name: 'tester2' })).to.have.attribute(
        'aria-checked',
        'true'
      );
    });

    it('Should checked the item passed through the `defaultValue` property', () => {
      render(<CheckTree data={data} defaultValue={['tester2']} defaultExpandAll />);

      expect(screen.getByRole('treeitem', { name: 'tester2' })).to.have.attribute(
        'aria-checked',
        'true'
      );
    });

    it('Should call `onChange` when the value changes', () => {
      const onChange = vi.fn();

      render(<CheckTree data={data} onChange={onChange} defaultExpandAll />);

      fireEvent.click(screen.getByRole('checkbox', { name: 'tester2' }));

      // The first argument should be the selected value, second is the event object
      expect(onChange.mock.calls[0][0]).toEqual(['tester2']);
      expect(onChange).toHaveBeenCalled();
    });

    it('Should be controlled and render the updated value', () => {
      const App = () => {
        const [value, setValue] = React.useState(['tester0']);
        return (
          <>
            <CheckTree data={data} value={value} defaultExpandAll />
            <button onClick={() => setValue(['tester1'])}>Click</button>
          </>
        );
      };

      render(<App />);

      expect(screen.getByRole('treeitem', { name: 'tester0' })).to.have.attribute(
        'aria-checked',
        'true'
      );
      expect(screen.getByRole('treeitem', { name: 'tester1' })).to.have.attribute(
        'aria-checked',
        'false'
      );

      fireEvent.click(screen.getByRole('button', { name: 'Click' }));

      expect(screen.getByRole('treeitem', { name: 'tester0' })).to.have.attribute(
        'aria-checked',
        'false'
      );
      expect(screen.getByRole('treeitem', { name: 'tester1' })).to.have.attribute(
        'aria-checked',
        'true'
      );
    });

    it('Should be uncontrolled and render default value', () => {
      const App = () => {
        const [value, setValue] = React.useState(['tester0']);
        return (
          <>
            <CheckTree data={data} defaultValue={value} defaultExpandAll />
            <button onClick={() => setValue(['tester1'])}>Click</button>
          </>
        );
      };

      render(<App />);

      expect(screen.getByRole('treeitem', { name: 'tester0' })).to.have.attribute(
        'aria-checked',
        'true'
      );
      expect(screen.getByRole('treeitem', { name: 'tester1' })).to.have.attribute(
        'aria-checked',
        'false'
      );

      fireEvent.click(screen.getByRole('button', { name: 'Click' }));

      expect(screen.getByRole('treeitem', { name: 'tester0' })).to.have.attribute(
        'aria-checked',
        'true'
      );
      expect(screen.getByRole('treeitem', { name: 'tester1' })).to.have.attribute(
        'aria-checked',
        'false'
      );
    });
  });

  describe('Async load children nodes', () => {
    it('Should async load children nodes', async () => {
      const data = [{ label: 'async', value: 'async', children: [] }];

      const fetchNodes = () => {
        return new Promise<any>(resolve => {
          setTimeout(() => resolve([{ label: 'children', value: 'children' }]), 500);
        });
      };

      render(<CheckTree data={data} cascade={false} getChildren={fetchNodes} />);

      fireEvent.click(screen.getByRole('button', { name: 'Expand async' }));

      expect(screen.getByRole('button', { name: 'Collapse async' })).to.have.attribute('aria-busy');

      await waitFor(() => {
        expect(screen.getByRole('treeitem', { name: 'children' })).to.exist;
        expect(screen.getByRole('button', { name: 'Collapse async' })).to.not.have.attribute(
          'aria-busy'
        );
      });
    });

    // fix: https://github.com/rsuite/rsuite/issues/3973
    it('Should load children nodes and check the state of the node', async () => {
      const data = [{ label: 'async', value: 'async', children: [] }];

      const fetchNodes = () => {
        return new Promise<any>(resolve => {
          setTimeout(() => resolve([{ label: 'children', value: 'children' }]), 500);
        });
      };

      render(<CheckTree data={data} value={['async']} getChildren={fetchNodes} />);

      fireEvent.click(screen.getByRole('button', { name: 'Expand async' }));

      expect(screen.getByRole('checkbox', { name: 'async' })).to.be.checked;

      await waitFor(() => {
        expect(screen.getByRole('checkbox', { name: 'async' })).to.be.checked;
        expect(screen.getByRole('checkbox', { name: 'children' })).to.be.checked;
      });
    });
  });

  describe('Searchable', () => {
    it('Should render the search input', () => {
      render(<CheckTree data={data} searchable />);
      expect(screen.getByRole('searchbox')).to.exist;
    });

    it('Should filter the tree nodes', () => {
      render(<CheckTree data={data} searchable />);

      fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'disabled' } });

      expect(screen.getAllByRole('treeitem')).to.have.length(1);
    });

    it('Should filter the tree nodes with virtualized', () => {
      render(<CheckTree data={data} searchable virtualized />);

      fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'disabled' } });

      expect(screen.getAllByRole('treeitem')).to.have.length(1);
    });

    it('Should call `onSearch` callback', () => {
      const onSearch = vi.fn();

      render(<CheckTree data={data} searchable onSearch={onSearch} />);

      fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'disabled' } });

      // The first argument is the search value, second is the event
      expect(onSearch.mock.calls[0][0]).toBe('disabled');
      expect(onSearch).toHaveBeenCalled();
    });
  });
});
