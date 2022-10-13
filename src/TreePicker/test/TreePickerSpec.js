import React from 'react';
import { act, fireEvent, render, waitFor, screen } from '@testing-library/react';
import { getDOMNode, getInstance } from '@test/testUtils';
import TreePicker from '../TreePicker';
import { KEY_VALUES } from '../../utils';

const data = [
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

describe('TreePicker', () => {
  it('Should render default value', () => {
    const instance = getDOMNode(<TreePicker defaultOpen data={data} defaultValue={'Master'} />);

    expect(instance.querySelector('.rs-picker-toggle-value').textContent).to.equal('Master');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<TreePicker data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should clean selected value', () => {
    const instance = getDOMNode(<TreePicker defaultOpen data={data} defaultValue={'Master'} />);

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle').textContent).to.equal('Select');
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<TreePicker defaultOpen data={data} defaultValue={'Master'} />);
    expect(instance.querySelector('.rs-picker-toggle-clean')).to.exist;
  });

  it('Should render TreePicker Menu', () => {
    const instance = getInstance(<TreePicker defaultOpen data={data} />);
    expect(instance.overlay.classList.contains('.rs-picker-tree-menu'));
  });

  it('Should output a button', () => {
    const instance = getDOMNode(<TreePicker toggleAs="button" data={[]} />);

    expect(instance.querySelector('button')).to.exist;
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<TreePicker disabled data={[]} />);

    expect(instance).to.have.class('rs-picker-disabled');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<TreePicker block data={[]} />);

    expect(instance).to.have.class('rs-picker-block');
  });

  it('Should active one node by `value`', () => {
    const instance = getInstance(<TreePicker data={data} value={'Master'} open />);

    expect(instance.overlay.querySelectorAll('.rs-tree-node-active')).to.lengthOf(1);
  });

  it('Should expand children nodes', () => {
    const instance = getInstance(
      <TreePicker open cascade={false} data={data} value={['Master']} />
    );

    fireEvent.click(
      instance.overlay.querySelector('div[data-ref="String_Master"]  > .rs-tree-node-expand-icon')
    );

    expect(instance.overlay.querySelectorAll('.rs-tree-open')).to.lengthOf(1);
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<TreePicker data={data} placeholder="test" />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('test');
  });

  it('Should render value by `renderValue()`', () => {
    const placeholder = 'value';

    // valid value
    const instance1 = getDOMNode(
      <TreePicker
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={'2'}
        renderValue={(value, item) => `Selected: ${item.label}`}
      />
    );

    // invalid value
    const instance2 = getDOMNode(
      <TreePicker
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={'5'}
        renderValue={v => [v, placeholder]}
      />
    );

    // invalid value
    const instance3 = getDOMNode(
      <TreePicker
        placeholder={placeholder}
        data={[]}
        value={null}
        renderValue={v => [v, placeholder]}
      />
    );

    expect(instance1.querySelector('.rs-picker-toggle-value')).to.text('Selected: 2');
    expect(instance2.querySelector('.rs-picker-toggle-value')).to.text(`5${placeholder}`);
    expect(instance3.querySelector('.rs-picker-toggle-placeholder')).to.text(placeholder);
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<TreePicker data={[]} value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<TreePicker data={[]} value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(
      <TreePicker data={[]} value="Test" renderValue={() => undefined} />
    );

    expect(instance1.querySelector('.rs-picker-toggle-value')).to.text('1');
    expect(instance2.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
    expect(instance3.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');

    expect(instance1.className).to.include('rs-picker-has-value');
    expect(instance2.className).to.not.include('rs-picker-has-value');
    expect(instance3.className).to.not.include('rs-picker-has-value');
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<TreePicker data={[]} renderValue={() => 'value'} />);
    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<TreePicker placeholder="test" data={data} value={['4']} />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('test');
  });

  it('Should call `onChange` callback', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(<TreePicker open onChange={onChangeSpy} data={data} />);

    fireEvent.click(instance.overlay.querySelector('span[data-key="String_Master"]'));

    expect(onChangeSpy).to.calledOnce;
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    const instance = getDOMNode(
      <TreePicker defaultOpen data={data} defaultValue={'tester0'} onClean={onCleanSpy} />
    );

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));

    expect(onCleanSpy).to.calledOnce;
  });

  it('Should call `onOpen` callback', () => {
    const onOpenSpy = sinon.spy();
    const instance = getDOMNode(<TreePicker onOpen={onOpenSpy} data={data} />);

    fireEvent.click(instance.querySelector('.rs-picker-toggle'));

    expect(onOpenSpy).to.calledOnce;
  });

  it('Should call `onClose` callback', async () => {
    const onCloseSpy = sinon.spy();
    const instance = getDOMNode(<TreePicker onClose={onCloseSpy} data={data} />);

    fireEvent.click(instance.querySelector('.rs-picker-toggle'));
    fireEvent.click(instance.querySelector('.rs-picker-toggle'));

    await waitFor(() => {
      expect(onCloseSpy).to.calledOnce;
    });
  });

  it('Should focus item by key=ArrowDown', () => {
    const instance = getInstance(<TreePicker open data={data} defaultExpandAll value="tester1" />);
    fireEvent.keyDown(instance.target, { key: KEY_VALUES.DOWN });

    expect(instance.overlay.querySelector('.rs-tree-node-focus')).to.text('Master');
  });

  it('Should focus item by key=ArrowUp', async () => {
    const instance = getInstance(<TreePicker open data={data} defaultExpandAll value="tester1" />);

    fireEvent.click(instance.overlay.querySelector('span[data-key="String_tester1"]'));
    fireEvent.keyDown(instance.target, { key: KEY_VALUES.UP });

    await waitFor(() => {
      expect(instance.overlay.querySelector('.rs-tree-node-focus')).to.text('tester0');
    });
  });

  /**
   * When focus is on an open node, closes the node.
   */
  it('Should fold children node by key=ArrowLeft', () => {
    const tree = getInstance(<TreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(tree.overlay.querySelector('span[data-key="String_Master"]'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.LEFT });

    expect(tree.overlay.querySelector(`div[data-ref="String_Master"] > .rs-tree-node-expanded`)).to
      .not.exist;
  });

  /**
   * When focus is on a root node that is also either an end node or a closed node, does nothing.
   */
  it('Should change nothing when trigger on root node by key=ArrowLeft', () => {
    const tree = getInstance(<TreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(tree.overlay.querySelector('span[data-key="String_Master"]'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.LEFT });

    expect(tree.overlay.querySelector('.rs-tree-node-focus')).to.text('Master');
    expect(tree.overlay.querySelector(`div[data-ref="String_Master"] > .rs-tree-node-expanded`)).to
      .not.exist;
  });

  /**
   * When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
   */
  it('Should focus on parentNode when trigger on leaf node by key=ArrowLeft', () => {
    const tree = getInstance(<TreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(tree.overlay.querySelector('span[data-key="String_Master"]'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.LEFT });
    expect(tree.overlay.querySelector('.rs-tree-node-focus')).to.text('Master');
  });

  /**
   * When focus is on a closed node, opens the node; focus does not move.
   */
  it('Should fold children node by key=ArrowRight', () => {
    const tree = getInstance(<TreePicker defaultOpen data={data} />);

    fireEvent.click(tree.overlay.querySelector('span[data-key="String_Master"]'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.RIGHT });

    expect(
      tree.overlay.querySelectorAll(`div[data-ref="String_Master"] > .rs-tree-node-expanded`)
    ).to.lengthOf(1);
  });

  /**
   * When focus is on an end node, does nothing.
   */
  it('Should change nothing when trigger on leaf node by key=ArrowRight', () => {
    const tree = getInstance(<TreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(tree.overlay.querySelector('span[data-key="String_tester0"]'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.RIGHT });

    expect(tree.overlay.querySelector('.rs-tree-node-focus')).to.text('tester0');
  });

  /**
   * When focus is on a open node, moves focus to the first child node.
   */
  it('Should focus on first child node when node expanded by key=ArrowRight', () => {
    const tree = getInstance(<TreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(tree.overlay.querySelector('span[data-key="String_Master"]'));
    fireEvent.keyDown(tree.overlay, { key: KEY_VALUES.RIGHT });

    expect(tree.overlay.querySelector('.rs-tree-node-focus')).to.text('tester0');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TreePicker className="custom" data={data} />);
    expect(instance).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const instance = getDOMNode(<TreePicker style={{ fontSize: 12 }} data={data} />);
    expect(instance).to.have.style('font-size', '12px');
  });

  it('Should have a custom menuStyle', () => {
    const instance = getInstance(<TreePicker open menuStyle={{ fontSize: 12 }} data={data} />);
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
      <TreePicker
        data={data}
        cascade={false}
        open
        ref={ref}
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
      ref.current.overlay.querySelector('div[data-ref="String_async"]  > .rs-tree-node-expand-icon')
    );

    expect(ref.current.overlay.querySelector('[data-key="String_children1"]')).to.exist;
  });

  it('Should render one node when searchKeyword is `M`', () => {
    const instance = getInstance(<TreePicker data={data} open searchKeyword="M" />);

    expect(instance.overlay.querySelectorAll('.rs-tree-node')).to.lengthOf(1);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TreePicker data={data} classPrefix="custom-prefix" />);

    expect(instance.className).to.contain('custom-prefix');
  });

  it('Should render tree node with custom dom', () => {
    const customData = [
      {
        value: '1',
        label: <span className="custom-label">1</span>
      }
    ];
    const instance = getInstance(<TreePicker data={customData} open />);

    expect(instance.overlay.querySelectorAll('.custom-label')).to.lengthOf(1);
  });

  it('Should render with expand master node', () => {
    const instance = getInstance(
      <TreePicker defaultOpen data={data} expandItemValues={['Master']} />
    );

    expect(getDOMNode(instance.overlay).querySelectorAll('.rs-tree-node-expanded')).to.lengthOf(1);
  });

  it('Should fold all the node when toggle master node', () => {
    const TestApp = React.forwardRef((props, ref) => {
      const pickerRef = React.useRef();
      const [expandItemValues, setExpandItemValues] = React.useState(['Master']);
      React.useImperativeHandle(ref, () => {
        return {
          picker: pickerRef.current,
          setExpandItemValues
        };
      });
      return (
        <TreePicker
          ref={pickerRef}
          {...props}
          data={data}
          open
          expandItemValues={expandItemValues}
        />
      );
    });

    TestApp.displayName = 'TestApp';

    let expandItemValues = [];
    const mockOnExpand = values => {
      expandItemValues = values;
    };
    const ref = React.createRef();

    render(<TestApp ref={ref} onExpand={mockOnExpand} />);

    expect(ref.current.picker.overlay.querySelector('.rs-tree-node-expanded')).to.exist;

    fireEvent.click(
      ref.current.picker.overlay.querySelector(
        'div[data-ref="String_Master"]  > .rs-tree-node-expand-icon'
      )
    );

    act(() => {
      ref.current.setExpandItemValues(expandItemValues);
    });

    expect(ref.current.picker.overlay.querySelector('.rs-tree-node-expanded')).to.not.exist;
  });

  it('Should render the specified menu content by `searchBy`', () => {
    const instance = getInstance(
      <TreePicker
        defaultOpen
        defaultExpandAll
        data={data}
        searchBy={(a, b, c) => c.value === 'Master'}
      />
    );
    const list = getDOMNode(instance.overlay).querySelectorAll('.rs-tree-node');

    expect(list).to.length(1);
    expect(list[0]).to.text('Master');
  });

  it('Should only clean the searchKeyword', () => {
    const instance = getInstance(
      <TreePicker defaultOpen defaultExpandAll data={data} defaultValue={'Master'} />
    );

    const searchBar = instance.overlay.querySelector('.rs-picker-search-bar-input');
    fireEvent.keyDown(searchBar, { target: { value: 'Master' } });

    searchBar.focus();
    fireEvent.keyDown(searchBar, { key: KEY_VALUES.BACKSPACE });

    expect(instance.root.querySelector('.rs-picker-toggle-value')).to.text('Master');

    fireEvent.keyDown(instance.overlay, { key: KEY_VALUES.BACKSPACE });

    expect(instance.root.querySelector('.rs-picker-toggle-value .rs-picker-value-item')).to.not
      .exist;
  });

  it('Should display the search result when in virtualized mode', () => {
    const instance = getInstance(<TreePicker open virtualized data={data} />);

    expect(instance.overlay.querySelectorAll('.rs-tree-node')).to.length(2);

    const searchBar = instance.overlay.querySelector('.rs-picker-search-bar-input');

    fireEvent.change(searchBar, { target: { value: 'test' } });

    expect(instance.overlay.querySelectorAll('.rs-tree-node')).to.length(4);
  });

  it('Should to reset the option height', () => {
    const instance = getInstance(
      <TreePicker open virtualized data={data} listProps={{ rowHeight: 28 }} />
    );

    const node = instance.overlay.querySelector('.rs-tree-node');

    expect(node).to.have.style('height', '28px');
  });

  it('Should catch the not set virtualized exception', () => {
    expect(() => {
      const ref = React.createRef();
      render(<TreePicker data={data} ref={ref} />);
      ref.current.list;
    }).to.throw(Error);
  });

  it('Should scroll the list by `scrollToRow`', () => {
    const onScrollSpy = sinon.spy();
    const ref = React.createRef();

    render(
      <TreePicker
        data={data}
        ref={ref}
        virtualized
        style={{ height: 30 }}
        open
        listProps={{
          onScroll: onScrollSpy
        }}
      />
    );

    act(() => {
      ref.current.list.scrollToRow(2);
    });

    expect(onScrollSpy).to.be.calledOnce;
  });

  it('Should item able to stringfy', () => {
    const onSelectSpy = sinon.spy();
    const renderTreeNodeSpy = sinon.spy();

    const instance = getInstance(
      <TreePicker
        defaultOpen
        data={data}
        onSelect={onSelectSpy}
        renderTreeNode={renderTreeNodeSpy}
      />
    );
    fireEvent.click(instance.overlay.querySelector('span[data-key="String_Master"]'));

    expect(onSelectSpy).to.called;
    expect(renderTreeNodeSpy).to.called;
    expect(() => JSON.stringify(data[0])).not.to.throw();
    expect(() => JSON.stringify(onSelectSpy.firstCall.args[0])).not.to.throw();
    expect(() => JSON.stringify(renderTreeNodeSpy.firstCall.args[0])).not.to.throw();
  });

  describe('ref testing', () => {
    it('Should call onOpen', async () => {
      const onOpenSpy = sinon.spy();
      const instance = getInstance(<TreePicker onOpen={onOpenSpy} data={data} />);

      act(() => {
        instance.open();
      });
      await waitFor(() => {
        expect(onOpenSpy).to.have.been.calledOnce;
      });
    });

    it('Should call onClose', async () => {
      const onCloseSpy = sinon.spy();

      const instance = getInstance(<TreePicker onClose={onCloseSpy} data={data} />);

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
      const instance = getInstance(<TreePicker data={data} open virtualized />);

      expect(instance.root).to.exist;
      expect(instance.target).to.exist;
      expect(instance.updatePosition).to.instanceOf(Function);
      expect(instance.open).to.instanceOf(Function);
      expect(instance.close).to.instanceOf(Function);

      expect(instance.overlay).to.exist;
      expect(instance.list).to.exist;
    });
  });

  it('Should not clean values when setting disabled=true', () => {
    render(<TreePicker open value={data[0].value} disabled data={data} />);
    fireEvent.keyDown(screen.getByRole('combobox'), {
      key: 'Backspace',
      code: 'Backspace'
    });
    expect(screen.getByRole('combobox')).to.have.text('Master');
  });

  it('Should not clean values when setting cleanable=false', () => {
    render(<TreePicker open value={data[0].value} data={data} />);
    fireEvent.keyDown(screen.getByRole('combobox'), {
      key: 'Backspace',
      code: 'Backspace'
    });
    expect(screen.getByRole('combobox')).to.have.text('Master');
  });

  it('Should remove all value when click clean button and value is unControlled', () => {
    render(<TreePicker defaultOpen data={data} defaultValue={'Master'} />);

    fireEvent.click(screen.getByLabelText('Clear'));
    expect(screen.getByRole('combobox')).to.text('Select');
  });

  it('Should persist value when click clean button and value is controlled', () => {
    render(<TreePicker defaultOpen data={data} value={'Master'} />);

    fireEvent.click(screen.getByLabelText('Clear'));
    expect(screen.getByRole('combobox')).to.text('Master');
  });
});
