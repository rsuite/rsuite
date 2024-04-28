import React from 'react';
import { act, fireEvent, render, waitFor, screen } from '@testing-library/react';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import {
  testStandardProps,
  testControlledUnControlled,
  testFormControl,
  testPickers
} from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';
import TreePicker, { TreePickerProps } from '../TreePicker';
import { KEY_VALUES } from '../../utils';
import { PickerHandle } from '../../internals/Picker';
import { ListHandle } from '../../internals/Windowing';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('TreePicker', () => {
  testStandardProps(<TreePicker data={data} />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('combobox');
    }
  });

  testPickers(TreePicker, { ariaHaspopup: 'tree' });

  testControlledUnControlled(TreePicker, {
    componentProps: { data, defaultOpen: true },
    value: '1',
    defaultValue: '2',
    changedValue: '3',
    simulateEvent: {
      changeValue: () => {
        userEvent.click(screen.getByRole('treeitem', { name: 'Master' }));
        return { changedValue: 'Master' };
      }
    },
    expectedValue: (value: string) => {
      expect(screen.getByTestId('picker-toggle-input')).to.have.attribute('value', value);
    }
  });

  testFormControl(TreePicker, {
    value: 'tester0',
    componentProps: { data },
    getUIElement: () => screen.getByRole('combobox')
  });

  it('Should render default value', () => {
    render(<TreePicker defaultOpen data={data} defaultValue={'Master'} />);

    expect(screen.getByRole('combobox')).to.have.text('Master');
  });

  it('Should have "default" appearance by default', () => {
    const { container } = render(<TreePicker data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-default');
  });

  it('Should clean selected value', () => {
    render(<TreePicker defaultOpen data={data} defaultValue={'Master'} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should output a clean button', () => {
    render(<TreePicker defaultOpen data={data} defaultValue={'Master'} />);
    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
  });

  it('Should render TreePicker Menu', () => {
    render(<TreePicker defaultOpen data={data} />);
    expect(screen.getByTestId('picker-popup')).to.have.class('rs-picker-tree-menu');
  });

  it('Should output a button', () => {
    render(<TreePicker toggleAs="button" data={[]} />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should active one node by `value`', () => {
    render(<TreePicker data={data} value={'Master'} open />);

    expect(screen.getAllByRole('treeitem', { selected: true })).to.have.length(1);
    expect(screen.getByRole('treeitem', { selected: true })).to.have.class('rs-tree-node-active');
  });

  it('Should expand children nodes', () => {
    render(<TreePicker open data={data} value="Master" />);

    fireEvent.click(screen.getByRole('button', { name: 'Expand Master' }));

    expect(screen.getAllByRole('treeitem', { expanded: true })).to.have.length(1);
  });

  it('Should have a placeholder', () => {
    render(<TreePicker data={data} placeholder="test" />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should render value by `renderValue()`', () => {
    const placeholder = 'value';

    // valid value
    render(
      <TreePicker
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={'2'}
        renderValue={(_value, item) => `Selected: ${item.label}`}
      />
    );

    // invalid value
    render(
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
    render(
      <TreePicker
        placeholder={placeholder}
        data={[]}
        value={null}
        renderValue={v => [v, placeholder]}
      />
    );

    expect(screen.getAllByRole('combobox')[0]).to.have.text('Selected: 2');
    expect(screen.getAllByRole('combobox')[1]).to.have.text(`5${placeholder}`);
    expect(screen.getAllByRole('combobox')[2]).to.have.text(placeholder);
  });

  it('Should call renderValue', () => {
    const { container: container1 } = render(
      <TreePicker data={[]} value="Test" renderValue={() => '1'} data-testid="picker1" />
    );
    const { container: container2 } = render(
      <TreePicker data={[]} value="Test" renderValue={() => null} data-testid="picker2" />
    );
    const { container: container3 } = render(
      <TreePicker data={[]} value="Test" renderValue={() => undefined} data-testid="picker3" />
    );

    expect(screen.getAllByRole('combobox')[0]).to.have.text('1');
    expect(screen.getAllByRole('combobox')[1]).to.have.text('Select');
    expect(screen.getAllByRole('combobox')[2]).to.have.text('Select');

    expect(container1.firstChild).to.have.class('rs-picker-has-value');
    expect(container2.firstChild).not.to.have.class('rs-picker-has-value');
    expect(container3.firstChild).not.to.have.class('rs-picker-has-value');
  });

  it('Should not be call renderValue()', () => {
    render(<TreePicker data={[]} renderValue={() => 'value'} />);
    expect(screen.getByRole('combobox')).to.text('Select');
  });

  it('Should render a placeholder when value does not exist in data', () => {
    render(<TreePicker placeholder="test" data={data} value="4" />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should call `onSelectItem` callback with the selected item and the full path', () => {
    const onSelectItem = sinon.spy();

    render(
      <TreePicker
        open
        data={data}
        expandItemValues={['Master', 'tester1']}
        onSelectItem={onSelectItem}
      />
    );

    userEvent.click(screen.getByRole('treeitem', { name: 'tester2' }));

    expect(onSelectItem).to.have.been.calledWith(sinon.match({ value: 'tester2' }), [
      sinon.match({ value: 'Master' }),
      sinon.match({ value: 'tester1' }),
      sinon.match({ value: 'tester2' })
    ]);
  });

  it('Should call `onChange` callback', () => {
    const onChange = sinon.spy();
    render(<TreePicker open onChange={onChange} data={data} />);

    fireEvent.click(screen.getByRole('treeitem', { name: 'Master' }));

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    render(<TreePicker defaultOpen data={data} defaultValue={'tester0'} onClean={onCleanSpy} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onCleanSpy).to.have.been.calledOnce;
  });

  it('Should call `onOpen` callback', () => {
    const onOpenSpy = sinon.spy();
    render(<TreePicker onOpen={onOpenSpy} data={data} />);

    fireEvent.click(screen.getByRole('combobox'));

    expect(onOpenSpy).to.have.been.calledOnce;
  });

  it('Should call `onClose` callback', async () => {
    const onCloseSpy = sinon.spy();
    render(<TreePicker defaultOpen onClose={onCloseSpy} data={data} />);

    fireEvent.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(onCloseSpy).to.have.been.calledOnce;
    });
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
    const ref = React.createRef<PickerHandle>();

    render(
      <TreePicker
        data={data}
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

    fireEvent.click(screen.getByRole('button', { name: 'Expand async' }));

    expect(screen.getByRole('treeitem', { name: 'children1' })).to.exist;
  });

  it('Should render one node when searchKeyword is `M`', () => {
    render(<TreePicker data={data} open searchKeyword="M" />);

    expect(screen.getAllByRole('treeitem')).to.have.length(1);
  });

  it('Should render tree node with custom dom', () => {
    const customData = [
      {
        value: '1',
        label: (
          <span className="custom-label" data-testid="custom-element">
            1
          </span>
        )
      }
    ];
    render(<TreePicker data={customData} open />);

    expect(screen.getByTestId('custom-element')).to.exist;
  });

  it('Should render with expand master node', () => {
    render(<TreePicker defaultOpen data={data} expandItemValues={['Master']} />);

    expect(screen.getAllByRole('treeitem', { expanded: true })).to.have.length(1);
  });

  it('Should fold all the node when toggle master node', () => {
    type TestAppInstance = {
      picker: PickerHandle;
      setExpandItemValues: (values: string[]) => void;
    };
    const TestApp = React.forwardRef((props: Omit<TreePickerProps, 'data' | 'open'>, ref) => {
      const pickerRef = React.useRef<PickerHandle>(null);
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
    const ref = React.createRef<TestAppInstance>();

    render(<TestApp ref={ref} onExpand={mockOnExpand} />);

    expect(screen.getByRole('treeitem', { expanded: true })).to.exist;

    fireEvent.click(screen.getByRole('button', { name: 'Collapse Master' }));

    act(() => {
      ref.current?.setExpandItemValues(expandItemValues);
    });

    expect(screen.queryByRole('treeitem', { expanded: true })).not.to.exist;
  });

  it('Should render the specified menu content by `searchBy`', () => {
    render(
      <TreePicker
        defaultOpen
        defaultExpandAll
        data={data}
        searchBy={(_a, _b, c) => c.value === 'Master'}
      />
    );

    const list = screen.getAllByRole('treeitem');

    expect(list).to.have.length(1);
    expect(list[0]).to.have.text('Master');
  });

  it('Should only clean the searchKeyword', () => {
    render(<TreePicker defaultOpen defaultExpandAll data={data} defaultValue={'Master'} />);

    const searchbox = screen.getByRole('searchbox');
    fireEvent.keyDown(searchbox, { target: { value: 'Master' } });

    searchbox.focus();
    fireEvent.keyDown(searchbox, { key: KEY_VALUES.BACKSPACE });

    expect(screen.getByRole('combobox')).to.have.text('Master');

    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.BACKSPACE });

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should display the search result when in virtualized mode', () => {
    render(<TreePicker open virtualized data={data} />);

    expect(screen.getAllByRole('treeitem')).to.have.length(2);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.change(searchbox, { target: { value: 'test' } });

    expect(screen.getAllByRole('treeitem')).to.have.length(4);
  });

  it('Should to reset the option height', () => {
    render(<TreePicker open virtualized data={data} listProps={{ rowHeight: 28 }} />);

    expect(screen.getAllByRole('treeitem')[0]).to.have.style('height', '28px');
  });

  it('Should catch the not set virtualized exception', () => {
    expect(() => {
      const ref = React.createRef<PickerHandle>();
      render(<TreePicker data={data} ref={ref} />);
      (ref.current as PickerHandle).list;
    }).to.throw(Error);
  });

  it('Should scroll the list by `scrollToRow`', () => {
    const onScrollSpy = sinon.spy();
    const ref = React.createRef<PickerHandle>();

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
      ((ref.current as PickerHandle).list as ListHandle).scrollToRow?.(2);
    });

    expect(onScrollSpy).to.be.calledOnce;
  });

  it('Should item able to stringfy', () => {
    const onSelectSpy = sinon.spy();
    const renderTreeNodeSpy = sinon.spy();

    render(
      <TreePicker
        defaultOpen
        data={data}
        onSelect={onSelectSpy}
        renderTreeNode={renderTreeNodeSpy}
      />
    );
    fireEvent.click(screen.getByRole('treeitem', { name: 'Master' }));

    expect(onSelectSpy).to.called;
    expect(renderTreeNodeSpy).to.called;
    expect(() => JSON.stringify(data[0])).not.to.throw();
    expect(() => JSON.stringify(onSelectSpy.firstCall.args[0])).not.to.throw();
    expect(() => JSON.stringify(renderTreeNodeSpy.firstCall.args[0])).not.to.throw();
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

  describe('Accessibility - Keyboard interactions', () => {
    it('Should focus item by key=ArrowDown', () => {
      render(<TreePicker open data={data} defaultExpandAll />);

      fireEvent.keyDown(screen.getByRole('combobox'), { key: KEY_VALUES.DOWN });

      const treeItem = screen.getByRole('treeitem', { name: 'Master' });

      expect(treeItem).to.have.class('rs-tree-node-focus');
      expect(treeItem).to.have.focus;
    });

    it('Should focus item by key=ArrowUp', async () => {
      render(<TreePicker open data={data} defaultExpandAll />);

      const label = await screen.findByRole('treeitem', { name: 'tester1' });

      fireEvent.click(label);
      fireEvent.keyDown(label, { key: KEY_VALUES.UP });

      await waitFor(() => {
        const treeItem = screen.getByRole('treeitem', { name: 'tester0' });

        expect(treeItem).to.have.class('rs-tree-node-focus');
        expect(treeItem).to.have.focus;
      });
    });

    it('Should fold children node by key=ArrowLeft', () => {
      render(<TreePicker open data={data} defaultExpandAll />);

      fireEvent.click(screen.getByRole('treeitem', { name: 'Master' }));
      fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.LEFT });

      expect(screen.queryByRole('treeitem', { name: 'Master', expanded: true })).not.to.exist;
    });

    it('Should change nothing when trigger on root node by key=ArrowLeft', () => {
      render(<TreePicker defaultOpen data={data} defaultExpandAll />);

      fireEvent.click(screen.getByRole('treeitem', { name: 'Master' }));
      fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.LEFT });

      expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.class('rs-tree-node-focus');
      expect(screen.queryByRole('treeitem', { name: 'Master', expanded: true })).not.to.exist;
    });

    it('Should focus on parentNode when trigger on leaf node by key=ArrowLeft', () => {
      render(<TreePicker defaultOpen data={data} defaultExpandAll />);

      fireEvent.click(screen.getByRole('treeitem', { name: 'Master' }));
      fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.LEFT });

      expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.class('rs-tree-node-focus');
    });

    it('Should fold children node by key=ArrowRight', () => {
      render(<TreePicker defaultOpen data={data} />);

      fireEvent.click(screen.getByRole('treeitem', { name: 'Master' }));
      fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.RIGHT });

      expect(screen.getByRole('treeitem', { name: 'Master', expanded: true })).to.exist;
    });

    it('Should change nothing when trigger on leaf node by key=ArrowRight', () => {
      render(<TreePicker defaultOpen data={data} defaultExpandAll />);

      fireEvent.click(screen.getByRole('treeitem', { name: 'tester0' }));
      fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.RIGHT });

      expect(screen.getByRole('treeitem', { name: 'tester0' })).to.have.class('rs-tree-node-focus');
    });

    it('Should focus on first child node when node expanded by key=ArrowRight', () => {
      render(<TreePicker defaultOpen data={data} defaultExpandAll />);

      fireEvent.click(screen.getByRole('treeitem', { name: 'Master' }));
      fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.RIGHT });

      expect(screen.getByRole('treeitem', { name: 'tester0' })).to.have.class('rs-tree-node-focus');
    });
  });
});
