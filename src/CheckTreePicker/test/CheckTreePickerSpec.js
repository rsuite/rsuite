import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from '@test/testUtils';
import CheckTreePicker from '../CheckTreePicker';
import { KEY_VALUES } from '../../utils';
import { assert } from 'chai';
import { data, originMockData, changedMockData } from './mocks';

const itemFocusClassName = '.rs-check-tree-node-focus';
const itemExpandedClassName = '.rs-check-tree-node-expanded';

describe('CheckTreePicker', () => {
  it('Should render default value', () => {
    const instance = getDOMNode(<CheckTreePicker defaultOpen data={data} value={['Master']} />);
    expect(
      instance.querySelector('.rs-picker-toggle-value .rs-picker-value-item').textContent
    ).to.equal('Master (All)');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<CheckTreePicker data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should clean selected value', () => {
    const instance = getDOMNode(
      <CheckTreePicker defaultOpen data={data} defaultValue={['Master']} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle').textContent).to.equal('Select');
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(
      <CheckTreePicker defaultOpen data={data} defaultValue={['Master']} />
    );
    assert.ok(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should render CheckTreePicker Menu', () => {
    const instance = getInstance(<CheckTreePicker defaultOpen data={data} />);

    expect(instance.overlay.classList.contains('.rs-picker-check-tree-menu'));
  });

  it('Should output a button', () => {
    const instance = getDOMNode(<CheckTreePicker toggleAs="button" data={[]} />);
    assert.ok(instance.querySelector('button'));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<CheckTreePicker disabled data={[]} />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<CheckTreePicker block data={[]} />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active 4 node by `value` when cascade is true', () => {
    const instance = getInstance(<CheckTreePicker open data={data} value={['Master']} />);
    assert.equal(instance.overlay.querySelectorAll('.rs-checkbox-checked').length, 4);
  });

  it('Should active 1 node by `value` when cascade is false', () => {
    const instance = getInstance(
      <CheckTreePicker open cascade={false} data={data} value={['Master']} />
    );
    assert.equal(instance.overlay.querySelectorAll('.rs-checkbox-checked').length, 1);
  });

  it('Should expand children nodes', () => {
    const instance = getInstance(
      <CheckTreePicker open cascade={false} data={data} value={['Master']} />
    );

    ReactTestUtils.Simulate.click(
      instance.overlay.querySelector(
        'div[data-ref="String_Master"]  > .rs-check-tree-node-expand-icon'
      )
    );
    assert.equal(instance.overlay.querySelectorAll('.rs-check-tree-open').length, 1);
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} placeholder="test" />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'test');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <CheckTreePicker
        data={[
          { value: 1, label: '1' },
          { value: 2, label: '2' }
        ]}
        value={[1, 2]}
        renderValue={value => value.join(',')}
      />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <CheckTreePicker
        placeholder={placeholder}
        renderValue={v => [v, placeholder]}
        data={[]}
        value={[2]}
      />
    );

    // Invalid value
    const instance3 = getDOMNode(
      <CheckTreePicker
        placeholder={placeholder}
        renderValue={v => [v, placeholder]}
        data={[]}
        value={[]}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').textContent, '1,2');
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').textContent, `2${placeholder}`);
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').textContent, placeholder);
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(
      <CheckTreePicker data={[]} value={['test']} renderValue={() => '1'} />
    );
    const instance2 = getDOMNode(
      <CheckTreePicker data={[]} value={['test']} renderValue={() => null} />
    );
    const instance3 = getDOMNode(
      <CheckTreePicker data={[]} value={['test']} renderValue={() => undefined} />
    );

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').textContent, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<CheckTreePicker data={[]} renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<CheckTreePicker placeholder="test" data={data} value={['4']} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'test');
  });

  it('Should call `onChange` callback with 1 values', () => {
    const mockOnChange = sinon.spy();
    const instance = getInstance(<CheckTreePicker open onChange={mockOnChange} data={data} />);
    ReactTestUtils.Simulate.change(
      instance.overlay.querySelector('div[data-key="String_Master"] input')
    );
    expect(mockOnChange).to.have.been.calledWith(['Master']);
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <CheckTreePicker defaultOpen data={data} defaultValue={['tester0']} onClean={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onOpen` callback', done => {
    const cb = () => {
      done();
    };

    const instance = getDOMNode(<CheckTreePicker onOpen={cb} data={data} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
  });

  it('Should call `onClose` callback', done => {
    const cb = () => {
      done();
    };

    const instance = getDOMNode(<CheckTreePicker onClose={cb} data={data} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<CheckTreePicker onOpen={doneOp} data={data} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<CheckTreePicker defaultOpen onClose={doneOp} data={data} />);
    picker.close();
  });

  it('Should focus item by keyCode=40 ', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);
    ReactTestUtils.Simulate.keyDown(tree.target, { key: KEY_VALUES.DOWN });

    assert.equal(tree.overlay.querySelector(itemFocusClassName).textContent, 'Master');
  });

  it('Should focus item by keyCode=38 ', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    ReactTestUtils.Simulate.change(
      tree.overlay.querySelector('div[data-key="String_tester1"] input')
    );
    ReactTestUtils.Simulate.keyDown(tree.target, { key: KEY_VALUES.UP });

    assert.equal(tree.overlay.querySelector(itemFocusClassName).textContent, 'tester0');
  });

  it('Should focus item by keyCode=13 ', done => {
    const doneOp = () => {
      done();
    };
    const tree = getInstance(
      <CheckTreePicker defaultOpen data={data} defaultExpandAll onChange={doneOp} />
    );
    ReactTestUtils.Simulate.change(
      tree.overlay.querySelector('div[data-key="String_tester1"] input')
    );
  });

  /**
   * When focus is on an open node, closes the node.
   */
  it('Should fold children node by keyCode=37', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    ReactTestUtils.Simulate.change(
      tree.overlay.querySelector('div[data-key="String_Master"] input')
    );
    ReactTestUtils.Simulate.keyDown(tree.overlay, { key: KEY_VALUES.LEFT });
    assert.equal(
      tree.overlay.querySelectorAll(`div[data-ref="String_Master"] > ${itemExpandedClassName}`)
        .length,
      0
    );
  });

  /**
   * When focus is on a root node that is also either an end node or a closed node, does nothing.
   */
  it('Should change nothing when trigger on root node by keyCode=37', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    ReactTestUtils.Simulate.change(
      tree.overlay.querySelector('div[data-key="String_Master"] input')
    );
    ReactTestUtils.Simulate.keyDown(tree.overlay, { key: KEY_VALUES.LEFT });
    assert.equal(tree.overlay.querySelector(itemFocusClassName).textContent, 'Master');

    assert.equal(
      tree.overlay.querySelectorAll(`div[data-ref="String_Master"] > ${itemExpandedClassName}`)
        .length,
      0
    );
  });

  /**
   * When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
   */
  it('Should focus on parentNode when trigger on leaf node by keyCode=37', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    ReactTestUtils.Simulate.change(
      tree.overlay.querySelector('div[data-key="String_tester0"] input')
    );
    ReactTestUtils.Simulate.keyDown(tree.overlay, { key: KEY_VALUES.LEFT });
    assert.equal(tree.overlay.querySelector(itemFocusClassName).textContent, 'Master');
  });

  /**
   * When focus is on a closed node, opens the node; focus does not move.
   */
  it('Should fold children node by keyCode=39', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} />);

    ReactTestUtils.Simulate.change(
      tree.overlay.querySelector('div[data-key="String_Master"] input')
    );
    ReactTestUtils.Simulate.keyDown(tree.overlay, { key: KEY_VALUES.RIGHT });
    assert.equal(
      tree.overlay.querySelectorAll(`div[data-ref="String_Master"] > ${itemExpandedClassName}`)
        .length,
      1
    );
  });

  /**
   * When focus is on an end node, does nothing.
   */
  it('Should change nothing when trigger on leaf node by keyCode=39', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    ReactTestUtils.Simulate.change(
      tree.overlay.querySelector('div[data-key="String_tester0"] input')
    );
    ReactTestUtils.Simulate.keyDown(tree.overlay, { key: KEY_VALUES.RIGHT });
    assert.equal(tree.overlay.querySelector(itemFocusClassName).textContent, 'tester0');
  });

  /**
   * When focus is on a open node, moves focus to the first child node.
   */
  it('Should focus on first child node when node expanded by keyCode=39', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    ReactTestUtils.Simulate.change(
      tree.overlay.querySelector('div[data-key="String_Master"] input')
    );
    ReactTestUtils.Simulate.keyDown(tree.overlay, { key: KEY_VALUES.RIGHT });
    assert.equal(tree.overlay.querySelector(itemFocusClassName).textContent, 'tester0');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<CheckTreePicker className="custom" data={data} />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<CheckTreePicker style={{ fontSize }} data={data} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom menuStyle', () => {
    const fontSize = '12px';
    const instance = getInstance(<CheckTreePicker menuStyle={{ fontSize }} data={data} open />);
    assert.equal(getDOMNode(instance.overlay).style.fontSize, fontSize);
  });

  it('Should load data async', () => {
    const data = [
      {
        label: 'Master',
        value: 'Master'
      },
      {
        label: 'async',
        value: 'async',
        children: []
      }
    ];

    const ref = React.createRef();
    render(
      <CheckTreePicker
        ref={ref}
        data={data}
        value={['Master']}
        open
        cascade={false}
        defaultExpandAll
        getChildren={() => [
          {
            label: 'children1',
            value: 'children1'
          }
        ]}
      />
    );

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.click(
        ref.current.overlay.querySelector(
          'div[data-ref="String_async"]  > .rs-check-tree-node-expand-icon'
        )
      );
    });

    assert.ok(ref.current.overlay.querySelector('[data-key="String_children1"]'));
  });

  it('Should trigger onChange and return correctly value', () => {
    const data = [
      {
        value: '1',
        label: '1',
        children: [
          {
            value: '1-1',
            label: '1-1'
          },
          {
            value: '1-2',
            label: '1-2'
          },
          {
            value: '1-3',
            label: '1-3'
          }
        ]
      },
      {
        value: '2',
        label: '2',
        children: [
          {
            value: '2-1',
            label: '2-1'
          },
          {
            value: '2-2',
            label: '2-2'
          },
          {
            value: '2-3',
            label: '2-3'
          }
        ]
      }
    ];

    const expectedValue = ['1', '2-1'];
    const mockOnChange = sinon.spy();

    const instance = getInstance(
      <CheckTreePicker
        data={data}
        onChange={mockOnChange}
        defaultValue={['1-1', '1-2', '1-3']}
        open
        defaultExpandAll
      />
    );

    ReactTestUtils.Simulate.change(
      instance.overlay.querySelector('div[data-key="String_2-1"] input')
    );
    expect(mockOnChange).to.have.been.calledWith(expectedValue);
  });

  it('Should render empty tree when searchKeyword is `name`', () => {
    const instance = getInstance(<CheckTreePicker data={data} open searchKeyword="name" />);
    assert.equal(instance.overlay.querySelectorAll('.rs-check-tree-node').length, 0);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render tree without checkbox', () => {
    const instance = getInstance(
      <CheckTreePicker
        data={data}
        open
        uncheckableItemValues={['tester0', 'disabled', 'tester1', 'tester2', 'Master']}
      />
    );

    assert.equal(instance.overlay.querySelectorAll('.rs-check-tree-node-input-wrapper').length, 0);
  });

  it('Should render tree node with custom dom', () => {
    const customData = [
      {
        value: '1',
        label: <span className="custom-label">1</span>
      }
    ];
    const instance = getInstance(<CheckTreePicker data={customData} open />);

    assert.equal(instance.overlay.querySelectorAll('.custom-label').length, 1);
  });

  it('Should render with expand master node', () => {
    const tree = getInstance(
      <CheckTreePicker defaultOpen data={data} expandItemValues={['Master']} />
    );

    const list = getDOMNode(tree.overlay).querySelectorAll('.rs-check-tree-node-expanded');
    assert.equal(list.length, 1);
  });

  it('Should fold all the node when toggle master node', () => {
    let expandItemValues = ['Master'];
    const mockOnExpand = values => {
      expandItemValues = values;
    };
    const ref = React.createRef();
    const { rerender } = render(
      <CheckTreePicker
        ref={ref}
        data={data}
        open
        expandItemValues={expandItemValues}
        onExpand={mockOnExpand}
      />
    );

    assert.ok(ref.current.overlay.querySelector('.rs-check-tree-node-expanded'));

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.click(
        ref.current.overlay.querySelector(
          'div[data-ref="String_Master"]  > .rs-check-tree-node-expand-icon'
        )
      );
    });

    rerender(
      <CheckTreePicker
        ref={ref}
        data={data}
        open
        expandItemValues={expandItemValues}
        onExpand={mockOnExpand}
      />
    );

    assert.ok(!ref.current.overlay.querySelector('.rs-check-tree-node-expanded'));
  });

  it('Should render the specified menu content by `searchBy`', () => {
    const instance = getInstance(
      <CheckTreePicker
        defaultOpen
        defaultExpandAll
        data={data}
        searchBy={(a, b, c) => c.value === 'Master'}
      />
    );
    const list = getDOMNode(instance.overlay).querySelectorAll('.rs-check-tree-node');
    assert.equal(list.length, 1);
    assert.ok(list[0].textContent, 'Louisa');
  });

  it('Should only clean the searchKeyword', () => {
    const instance = getInstance(
      <CheckTreePicker defaultOpen defaultExpandAll data={data} defaultValue={['Master']} />
    );

    const searchBar = instance.overlay.querySelector('.rs-picker-search-bar-input');
    ReactTestUtils.Simulate.change(searchBar, {
      target: { value: 'Master' }
    });

    searchBar.focus();
    ReactTestUtils.Simulate.keyDown(searchBar, {
      key: KEY_VALUES.BACKSPACE
    });
    assert.equal(
      instance.root.querySelector('.rs-picker-toggle-value .rs-picker-value-item').textContent,
      'Master (All)'
    );

    ReactTestUtils.Simulate.keyDown(instance.overlay, {
      key: KEY_VALUES.BACKSPACE
    });

    assert.ok(!instance.root.querySelector('.rs-picker-toggle-value .rs-picker-value-item'));
  });

  it('Should display the search result when in virtualized mode', () => {
    const instance = getInstance(<CheckTreePicker open virtualized data={data} />);

    assert.equal(instance.overlay.querySelectorAll('.rs-check-tree-node').length, 2);

    const searchBar = instance.overlay.querySelector('.rs-picker-search-bar-input');
    ReactTestUtils.Simulate.change(searchBar, {
      target: { value: 'test' }
    });

    assert.equal(instance.overlay.querySelectorAll('.rs-check-tree-node').length, 4);
  });

  it('Should to reset the option height', () => {
    const instance = getInstance(
      <CheckTreePicker open virtualized data={data} listProps={{ rowHeight: 28 }} />
    );

    const node = instance.overlay.querySelector('.rs-check-tree-node');
    assert.equal(node.style.height, '28px');
  });

  it('Should display indeterminate state when only one child node selected', () => {
    const instance = getInstance(<CheckTreePicker open defaultExpandAll data={data} />);
    ReactTestUtils.Simulate.change(
      instance.overlay.querySelector('div[data-key="String_tester2"] input')
    );
    assert.equal(instance.overlay.querySelectorAll('.rs-checkbox-indeterminate').length, 1);
  });

  it('Should not has duplicated key when data changed', () => {
    let checkItems = [];
    const mockRenderValue = (values, checkedItems, selectedElement) => {
      checkItems = checkedItems;
      return selectedElement;
    };
    const ref = React.createRef();
    const { rerender } = render(
      <CheckTreePicker ref={ref} open data={originMockData} renderValue={mockRenderValue} />
    );

    rerender(
      <CheckTreePicker open ref={ref} data={changedMockData} renderValue={mockRenderValue} />
    );

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.change(
        ref.current.overlay.querySelector('div[data-key="String_node-1"] input')
      );
    });

    assert.equal(checkItems.length, 1);
  });

  it('Should item able to stringify', () => {
    const onSelectSpy = sinon.spy();
    const renderTreeNodeSpy = sinon.spy();

    const instance = getInstance(
      <CheckTreePicker
        defaultOpen
        data={data}
        onSelect={onSelectSpy}
        renderTreeNode={renderTreeNodeSpy}
      />
    );
    ReactTestUtils.Simulate.change(
      instance.overlay.querySelector('div[data-key="String_Master"] input')
    );

    assert.doesNotThrow(() => JSON.stringify(data[0]));
    assert.doesNotThrow(() => JSON.stringify(onSelectSpy.firstCall.args[0]));
    assert.doesNotThrow(() => JSON.stringify(renderTreeNodeSpy.firstCall.args[0]));
  });

  it('Should children can be removed', () => {
    const onChangeSpy = sinon.spy();
    const screen = render(<CheckTreePicker defaultOpen data={data} onChange={onChangeSpy} />);

    fireEvent.click(screen.getByText('Master'), {
      target: {
        checked: true
      }
    });

    fireEvent.click(screen.getByText('tester0'), {
      target: {
        checked: false
      }
    });

    expect(onChangeSpy.callCount).to.equal(2);
    expect(onChangeSpy.firstCall.args[0]).to.include('Master');
    expect(onChangeSpy.secondCall.args[0]).to.include('tester1');
  });

  it('Should children can be removed when setting virtualized', () => {
    const onChangeSpy = sinon.spy();
    const screen = render(
      <CheckTreePicker open virtualized defaultExpandAll data={data} onChange={onChangeSpy} />
    );

    fireEvent.click(screen.getByText('Master'), {
      target: {
        checked: true
      }
    });

    fireEvent.click(screen.getByText('tester0'), {
      target: {
        checked: false
      }
    });

    expect(onChangeSpy.callCount).to.equal(2);
    expect(onChangeSpy.firstCall.args[0]).to.include('Master');
    expect(onChangeSpy.secondCall.args[0]).to.include('tester1');
  });

  it('Should not clean values when setting disabled=true', () => {
    render(<CheckTreePicker open value={[data[0].value]} disabled data={data} />);
    fireEvent.keyDown(screen.getByRole('combobox'), {
      key: 'Backspace',
      code: 'Backspace'
    });
    expect(screen.getByRole('combobox')).to.have.text('Master (All)1');
  });

  it('Should not clean values when setting cleanable=false', () => {
    render(<CheckTreePicker open value={[data[0].value]} data={data} />);
    fireEvent.keyDown(screen.getByRole('combobox'), {
      key: 'Backspace',
      code: 'Backspace'
    });
    expect(screen.getByRole('combobox')).to.have.text('Master (All)1');
  });
});
