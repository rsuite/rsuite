import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { getDOMNode, getInstance } from '@test/testUtils';
import CheckTreePicker from '../CheckTreePicker';
import { KEY_VALUES } from '../../utils';
import { data, originMockData, changedMockData } from './mocks';

describe('CheckTreePicker', () => {
  it('Should render default value', () => {
    const instance = getDOMNode(<CheckTreePicker defaultOpen data={data} value={['Master']} />);
    expect(instance.querySelector('.rs-picker-toggle-value .rs-picker-value-item')).to.text(
      'Master (All)'
    );
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<CheckTreePicker data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should clean selected value', () => {
    const instance = getDOMNode(
      <CheckTreePicker defaultOpen data={data} defaultValue={['Master']} />
    );

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle')).to.text('Select');
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(
      <CheckTreePicker defaultOpen data={data} defaultValue={['Master']} />
    );

    expect(instance.querySelector('.rs-picker-toggle-clean')).to.exist;
  });

  it('Should render CheckTreePicker Menu', () => {
    const instance = getInstance(<CheckTreePicker defaultOpen data={data} />);

    expect(instance.overlay).to.have.class('rs-picker-check-tree-menu');
  });

  it('Should output a button', () => {
    const instance = getDOMNode(<CheckTreePicker toggleAs="button" data={[]} />);

    expect(instance.querySelector('button')).to.exist;
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<CheckTreePicker disabled data={[]} />);

    expect(instance).to.have.class('rs-picker-disabled');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<CheckTreePicker block data={[]} />);

    expect(instance).to.have.class('rs-picker-block');
  });

  it('Should active 4 node by `value` when cascade is true', () => {
    const instance = getInstance(<CheckTreePicker open data={data} value={['Master']} />);
    assert.equal(instance.overlay.querySelectorAll('.rs-checkbox-checked').length, 4);
  });

  it('Should active 1 node by `value` when cascade is false', () => {
    const instance = getInstance(
      <CheckTreePicker open cascade={false} data={data} value={['Master']} />
    );

    expect(instance.overlay.querySelectorAll('.rs-checkbox-checked')).to.lengthOf(1);
  });

  it('Should expand children nodes', () => {
    const instance = getInstance(
      <CheckTreePicker open cascade={false} data={data} value={['Master']} />
    );

    fireEvent.click(
      instance.overlay.querySelector(
        'div[data-ref="String_Master"]  > .rs-check-tree-node-expand-icon'
      )
    );

    expect(instance.overlay.querySelectorAll('.rs-check-tree-open')).to.lengthOf(1);
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} placeholder="test" />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('test');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance1 = getDOMNode(
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

    expect(instance1.querySelector('.rs-picker-toggle-value')).to.text('1,2');
    expect(instance2.querySelector('.rs-picker-toggle-value')).to.text(`2${placeholder}`);
    expect(instance3.querySelector('.rs-picker-toggle-placeholder')).to.text(placeholder);
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

    expect(instance1.querySelector('.rs-picker-toggle-value')).to.text('1');
    expect(instance2.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
    expect(instance3.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');

    expect(instance1.className).to.include('rs-picker-has-value');
    expect(instance2.className).to.not.include('rs-picker-has-value');
    expect(instance3.className).to.not.include('rs-picker-has-value');
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<CheckTreePicker data={[]} renderValue={() => 'value'} />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<CheckTreePicker placeholder="test" data={data} value={['4']} />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('test');
  });

  it('Should call `onChange` callback with 1 values', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(<CheckTreePicker open onChange={onChangeSpy} data={data} />);

    fireEvent.click(instance.overlay.querySelector('div[data-key="String_Master"] input'));

    expect(onChangeSpy).to.have.been.calledWith(['Master']);
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    const instance = getDOMNode(
      <CheckTreePicker defaultOpen data={data} defaultValue={['tester0']} onClean={onCleanSpy} />
    );

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));

    expect(onCleanSpy).to.calledOnce;
  });

  it('Should call `onOpen` callback', () => {
    const onOpenSpy = sinon.spy();
    const instance = getDOMNode(<CheckTreePicker onOpen={onOpenSpy} data={data} />);

    fireEvent.click(instance.querySelector('.rs-picker-toggle'));

    expect(onOpenSpy).to.calledOnce;
  });

  it('Should call `onClose` callback', async () => {
    const onCloseSpy = sinon.spy();
    const instance = getDOMNode(<CheckTreePicker onClose={onCloseSpy} data={data} />);

    fireEvent.click(instance.querySelector('.rs-picker-toggle'));
    fireEvent.click(instance.querySelector('.rs-picker-toggle'));

    await waitFor(() => {
      expect(onCloseSpy).to.calledOnce;
    });
  });

  it('Should focus item by key=ArrowDown ', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);
    fireEvent.keyDown(tree.target, { key: KEY_VALUES.DOWN });

    expect(tree.overlay.querySelector('.rs-check-tree-node-focus')).to.text('Master');
  });

  it('Should focus item by key=ArrowUp ', async () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(tree.overlay.querySelector('div[data-key="String_tester1"] input'));
    fireEvent.keyDown(tree.target, { key: KEY_VALUES.UP });

    await waitFor(() => {
      expect(tree.overlay.querySelector('.rs-check-tree-node-focus')).to.text('tester0');
    });
  });

  /**
   * When focus is on an open node, closes the node.
   */
  it('Should fold children node by key=ArrowLeft', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(tree.overlay.querySelector('div[data-key="String_Master"] input'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.LEFT });

    expect(
      tree.overlay.querySelector(`div[data-ref="String_Master"] > .rs-check-tree-node-expanded`)
    ).to.not.exist;
  });

  /**
   * When focus is on a root node that is also either an end node or a closed node, does nothing.
   */
  it('Should change nothing when trigger on root node by key=ArrowLeft', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(tree.overlay.querySelector('div[data-key="String_Master"] input'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.LEFT });

    expect(tree.overlay.querySelector('.rs-check-tree-node-focus')).to.text('Master');
    expect(
      tree.overlay.querySelector(`div[data-ref="String_Master"] > .rs-check-tree-node-expanded`)
    ).to.not.exist;
  });

  /**
   * When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
   */
  it('Should focus on parentNode when trigger on leaf node by key=ArrowLeft', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(tree.overlay.querySelector('div[data-key="String_tester0"] input'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.LEFT });

    expect(tree.overlay.querySelector('.rs-check-tree-node-focus')).to.text('Master');
  });

  /**
   * When focus is on a closed node, opens the node; focus does not move.
   */

  it('Should fold children node by key=ArrowRight', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} />);

    fireEvent.click(tree.overlay.querySelector('div[data-key="String_Master"] input'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.RIGHT });

    expect(
      tree.overlay.querySelectorAll(`div[data-ref="String_Master"] > .rs-check-tree-node-expanded`)
    ).to.lengthOf(1);
  });

  /**
   * When focus is on an end node, does nothing.
   */
  it('Should change nothing when trigger on leaf node key=ArrowRight', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(tree.overlay.querySelector('div[data-key="String_tester0"] input'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.RIGHT });

    expect(tree.overlay.querySelector('.rs-check-tree-node-focus')).to.text('tester0');
  });

  /**
   * When focus is on a open node, moves focus to the first child node.
   */
  it('Should focus on first child node when node expanded by keyCode=39', () => {
    const tree = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(tree.overlay.querySelector('div[data-key="String_Master"] input'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.RIGHT });

    expect(tree.overlay.querySelector('.rs-check-tree-node-focus')).to.text('tester0');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<CheckTreePicker className="custom" data={data} />);

    expect(instance).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const instance = getDOMNode(<CheckTreePicker style={{ fontSize: 12 }} data={data} />);

    expect(instance).to.have.style('font-size', '12px');
  });

  it('Should have a custom menuStyle', () => {
    const instance = getInstance(<CheckTreePicker menuStyle={{ fontSize: 12 }} data={data} open />);

    expect(instance.overlay).to.have.style('font-size', '12px');
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

    fireEvent.click(
      ref.current.overlay.querySelector(
        'div[data-ref="String_async"]  > .rs-check-tree-node-expand-icon'
      )
    );

    expect(ref.current.overlay.querySelector('[data-key="String_children1"]')).to.exist;
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

    fireEvent.click(instance.overlay.querySelector('div[data-key="String_2-1"] input'));
    expect(mockOnChange).to.have.been.calledWith(expectedValue);
  });

  it('Should render empty tree when searchKeyword is `name`', () => {
    const instance = getInstance(<CheckTreePicker data={data} open searchKeyword="name" />);

    expect(instance.overlay.querySelectorAll('.rs-check-tree-node')).to.lengthOf(0);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} classPrefix="custom-prefix" />);

    expect(instance.className).to.contain('custom-prefix');
  });

  it('Should render tree without checkbox', () => {
    const instance = getInstance(
      <CheckTreePicker
        data={data}
        open
        uncheckableItemValues={['tester0', 'disabled', 'tester1', 'tester2', 'Master']}
      />
    );

    expect(instance.overlay.querySelectorAll('.rs-check-tree-node-input-wrapper')).to.lengthOf(0);
  });

  it('Should render tree node with custom dom', () => {
    const customData = [
      {
        value: '1',
        label: <span className="custom-label">1</span>
      }
    ];
    const instance = getInstance(<CheckTreePicker data={customData} open />);

    expect(instance.overlay.querySelectorAll('.custom-label')).to.lengthOf(1);
  });

  it('Should render with expand master node', () => {
    const tree = getInstance(
      <CheckTreePicker defaultOpen data={data} expandItemValues={['Master']} />
    );

    const list = getDOMNode(tree.overlay).querySelectorAll('.rs-check-tree-node-expanded');

    expect(list).to.lengthOf(1);
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

    expect(ref.current.overlay.querySelector('.rs-check-tree-node-expanded')).to.exist;

    fireEvent.click(
      ref.current.overlay.querySelector(
        'div[data-ref="String_Master"]  > .rs-check-tree-node-expand-icon'
      )
    );

    rerender(
      <CheckTreePicker
        ref={ref}
        data={data}
        open
        expandItemValues={expandItemValues}
        onExpand={mockOnExpand}
      />
    );

    expect(ref.current.overlay.querySelector('.rs-check-tree-node-expanded')).to.not.exist;
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

    expect(list).to.length(1);
    expect(list[0]).to.text('Master');
  });

  it('Should only clean the searchKeyword', async () => {
    const instance = getInstance(
      <CheckTreePicker defaultOpen defaultExpandAll data={data} defaultValue={['Master']} />
    );

    const searchBar = instance.overlay.querySelector('.rs-picker-search-bar-input');

    fireEvent.focus(searchBar);
    fireEvent.change(searchBar, { target: { value: 'Master' } });

    fireEvent.keyDown(searchBar, { key: KEY_VALUES.BACKSPACE });

    expect(instance.root.querySelector('.rs-picker-toggle-value .rs-picker-value-item')).to.text(
      'Master (All)'
    );

    fireEvent.keyDown(instance.overlay, { key: KEY_VALUES.BACKSPACE });

    expect(instance.root.querySelector('.rs-picker-toggle-value .rs-picker-value-item')).to.not
      .exist;
  });

  it('Should display the search result when in virtualized mode', () => {
    const instance = getInstance(<CheckTreePicker open virtualized data={data} />);

    expect(instance.overlay.querySelectorAll('.rs-check-tree-node')).to.lengthOf(2);

    const searchBar = instance.overlay.querySelector('.rs-picker-search-bar-input');

    fireEvent.change(searchBar, { target: { value: 'test' } });

    expect(instance.overlay.querySelectorAll('.rs-check-tree-node')).to.lengthOf(4);
  });

  it('Should to reset the option height', () => {
    const instance = getInstance(
      <CheckTreePicker open virtualized data={data} listProps={{ itemSize: () => 28 }} />
    );

    const node = instance.overlay.querySelector('.rs-check-tree-node');
    assert.equal(node.style.height, '28px');
  });

  it('Should display indeterminate state when only one child node selected', () => {
    const instance = getInstance(<CheckTreePicker open defaultExpandAll data={data} />);

    fireEvent.click(instance.overlay.querySelector('div[data-key="String_tester2"] input'));

    expect(instance.overlay.querySelectorAll('.rs-checkbox-indeterminate')).to.lengthOf(1);
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

    fireEvent.click(ref.current.overlay.querySelector('div[data-key="String_node-1"] input'));

    expect(checkItems).to.lengthOf(1);
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

    fireEvent.click(instance.overlay.querySelector('div[data-key="String_Master"] input'));

    expect(onSelectSpy).to.called;
    expect(renderTreeNodeSpy).to.called;
    expect(() => JSON.stringify(data[0])).not.to.throw();
    expect(() => JSON.stringify(onSelectSpy.firstCall.args[0])).not.to.throw();
    expect(() => JSON.stringify(renderTreeNodeSpy.firstCall.args[0])).not.to.throw();
  });

  it('Should children can be removed', () => {
    const onChangeSpy = sinon.spy();
    const screen = render(<CheckTreePicker defaultOpen data={data} onChange={onChangeSpy} />);

    fireEvent.click(screen.getByText('Master'), { target: { checked: true } });
    fireEvent.click(screen.getByText('tester0'), { target: { checked: false } });

    expect(onChangeSpy.callCount).to.equal(2);
    expect(onChangeSpy.firstCall.args[0]).to.include('Master');
    expect(onChangeSpy.secondCall.args[0]).to.include('tester1');
  });

  describe('ref testing', () => {
    it('Should call onOpen', async () => {
      const onOpenSpy = sinon.spy();
      const instance = getInstance(<CheckTreePicker onOpen={onOpenSpy} data={data} />);

      act(() => {
        instance.open();
      });
      await waitFor(() => {
        expect(onOpenSpy).to.have.been.calledOnce;
      });
    });

    it('Should call onClose', async () => {
      const onCloseSpy = sinon.spy();

      const instance = getInstance(<CheckTreePicker onClose={onCloseSpy} data={data} />);

      act(() => {
        instance.open();
      });
      act(() => {
        instance.close();
      });

      await waitFor(() => {
        expect(onCloseSpy).to.have.been.calledOnce;
      });
    });

    it('Should get public objects and methods', () => {
      const instance = getInstance(<CheckTreePicker data={data} open virtualized />);

      expect(instance.root).to.exist;
      expect(instance.target).to.exist;
      expect(instance.updatePosition).to.instanceOf(Function);
      expect(instance.open).to.instanceOf(Function);
      expect(instance.close).to.instanceOf(Function);

      expect(instance.overlay).to.exist;
      expect(instance.list).to.exist;
    });
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
    const { getByRole } = render(
      <CheckTreePicker open value={[data[0].value]} disabled data={data} />
    );
    fireEvent.keyDown(getByRole('combobox'), {
      key: 'Backspace',
      code: 'Backspace'
    });
    expect(getByRole('combobox')).to.have.text('Master (All)1');
  });

  it('Should not clean values when setting cleanable=false', () => {
    const { getByRole } = render(<CheckTreePicker open value={[data[0].value]} data={data} />);
    fireEvent.keyDown(getByRole('combobox'), {
      key: 'Backspace',
      code: 'Backspace'
    });
    expect(getByRole('combobox')).to.have.text('Master (All)1');
  });

  it('Should remove all value when click clean button and value is unControlled', () => {
    const { getByLabelText, getByRole } = render(
      <CheckTreePicker defaultOpen data={data} defaultValue={['Master']} />
    );

    fireEvent.click(getByLabelText('Clear'));
    expect(getByRole('combobox')).to.text('Select');
  });

  it('Should persist value when click clean button and value is controlled', () => {
    const { getByLabelText, getByRole } = render(
      <CheckTreePicker defaultOpen data={data} value={['Master']} />
    );

    fireEvent.click(getByLabelText('Clear'));
    expect(getByRole('combobox')).to.text('Master (All)1');
  });
});
