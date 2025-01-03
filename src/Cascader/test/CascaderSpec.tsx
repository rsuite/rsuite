import React from 'react';
import { render, waitFor, fireEvent, act, screen } from '@testing-library/react';
import sinon from 'sinon';
import Cascader from '../Cascader';
import Button from '../../Button';
import {
  testStandardProps,
  testControlledUnControlled,
  testFormControl,
  testPickers
} from '@test/utils';
import { PickerHandle } from '@/internals/Picker';
import '../styles/index.less';
import userEvent from '@testing-library/user-event';
import { mockTreeData } from '@test/mocks/data-mock';
import CustomProvider from '@/CustomProvider';

const items = mockTreeData(['1', '2', ['3', '3-1', '3-2']]);

describe('Cascader', () => {
  testStandardProps(<Cascader data={[]} />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('combobox');
    }
  });
  testPickers(Cascader, { ariaHaspopup: 'tree' });
  testControlledUnControlled(Cascader, {
    componentProps: { data: items, defaultOpen: true },
    value: '1',
    defaultValue: '2',
    changedValue: '3',
    simulateEvent: {
      changeValue: () => {
        const input = screen.getAllByRole('treeitem')[1];
        userEvent.click(input);
        return { changedValue: '2' };
      }
    },
    expectedValue: (value: string) => {
      expect(screen.getByTestId('picker-toggle-input')).to.have.attribute('value', value);
    }
  });

  testFormControl(Cascader, {
    value: '1',
    componentProps: { data: items },
    getUIElement: () => screen.getByRole('combobox')
  });

  it('Should output a picker', () => {
    const { container } = render(<Cascader data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-cascader');
  });

  it('Should have "default" appearance by default', () => {
    const { container } = render(<Cascader data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-default');
  });

  it('Should output a placeholder', () => {
    const placeholder = 'foobar';
    render(<Cascader data={[]} placeholder={placeholder} />);

    expect(screen.getByRole('combobox')).to.text(placeholder);
  });

  it('Should output a button', () => {
    render(<Cascader data={[]} toggleAs="button" />);
    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const { rerender } = render(
      <Cascader renderValue={v => [v, placeholder]} data={[{ value: 1, label: '1' }]} value={1} />
    );

    expect(screen.getByRole('combobox')).to.have.text(`1${placeholder}`);

    // Invalid value
    rerender(<Cascader renderValue={v => [v, placeholder]} data={[]} value={2} />);

    expect(screen.getByRole('combobox')).to.have.text(`2${placeholder}`);

    // Invalid value
    rerender(<Cascader data={[]} renderValue={v => [v, placeholder]} value={''} />);

    expect(screen.getByRole('combobox')).to.have.text(placeholder);
  });

  it('Should not be call renderValue()', () => {
    render(<Cascader data={[]} renderValue={() => 'value'} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should render a placeholder when value error', () => {
    render(<Cascader data={[]} value={2} placeholder={'test'} />);
    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should be active by value', () => {
    const value = '2';
    render(<Cascader defaultOpen data={items} value={value} />);

    expect(screen.getByRole('treeitem', { name: value }).firstChild).to.have.class(
      'rs-cascade-tree-item-active'
    );
  });

  it('Should be active by defaultValue', () => {
    const value = '2';
    render(<Cascader defaultOpen data={items} defaultValue={value} />);

    expect(screen.getByRole('treeitem', { name: value }).firstChild).to.have.class(
      'rs-cascade-tree-item-active'
    );
  });

  it('Should call onSelect callback with correct node value', () => {
    const onSelect = sinon.spy();
    render(<Cascader data={items} defaultOpen onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('treeitem', { name: '2' }));

    const args = onSelect.getCall(0).args;

    expect(args[0]).to.deep.equal({ value: '2', label: '2' });
    expect(args[1]).to.deep.equal([{ value: '2', label: '2' }]);
    expect(args[2].target).to.have.text('2');
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = sinon.spy();

    render(<Cascader data={items} defaultOpen onChange={onChange} />);
    fireEvent.click(screen.getByRole('treeitem', { name: '2' }));

    expect(onChange).to.have.been.calledWith('2');
  });

  it('Should call onChange callback by `parentSelectable`', () => {
    const onChange = sinon.spy();

    render(<Cascader data={items} defaultOpen parentSelectable onChange={onChange} />);
    fireEvent.click(screen.getByRole('treeitem', { name: '3' }));
    expect(onChange).to.have.been.calledWith('3');
  });

  it('Should call onClean callback', () => {
    const onClean = sinon.spy();
    render(<Cascader data={items} defaultValue={'3-1'} onClean={onClean} />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onClean).to.have.been.calledOnce;
  });

  it('Should call `onOpen` callback', async () => {
    const onOpen = sinon.spy();
    const ref = React.createRef<any>();
    render(<Cascader ref={ref} onOpen={onOpen} data={items} />);

    ref.current.open();

    await waitFor(() => {
      expect(onOpen).to.have.been.calledOnce;
    });
  });

  it('Should call `onClose` callback', async () => {
    const onClose = sinon.spy();
    const ref = React.createRef<any>();
    render(<Cascader ref={ref} defaultOpen onClose={onClose} data={items} />);

    ref.current.close();

    await waitFor(() => {
      expect(onClose).to.have.been.calledOnce;
    });
  });

  it('Should clean selected default value', () => {
    render(<Cascader defaultOpen data={items} defaultValue={'3-1'} />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should have a custom className', () => {
    const { container } = render(<Cascader data={[]} className="custom" />);

    expect(container.firstChild).to.have.class('custom');
  });

  it('Should render a button by toggleAs={Button}', () => {
    render(<Cascader data={items} toggleAs={Button} />);
    expect(screen.getByRole('combobox')).to.have.class('rs-btn');
  });

  it('Should children be loaded lazily', () => {
    render(
      <Cascader
        open
        data={[{ label: '1', value: '1', children: [] }]}
        getChildren={() => {
          return [{ label: '2', value: '2' }];
        }}
      />
    );

    fireEvent.click(screen.getByRole('treeitem', { name: '1' }));

    expect(screen.getByRole('treeitem', { name: '2' })).to.exist;
  });

  it('Should present an async loading state', () => {
    function fetchNodes() {
      return new Promise<{ label: string; value: string }[]>(resolve => {
        setTimeout(() => {
          resolve([{ label: '2', value: '2' }]);
        }, 500);
      });
    }

    render(
      <Cascader open data={[{ label: '1', value: '1', children: [] }]} getChildren={fetchNodes} />
    );

    fireEvent.click(screen.getByRole('treeitem', { name: '1' }));

    expect(screen.getByTestId('spinner')).to.exist;
  });

  it('Should call renderValue', () => {
    const { container, rerender } = render(
      <Cascader data={[]} value="Test" renderValue={() => '1'} />
    );

    expect(screen.getByRole('combobox')).to.have.text('1');
    expect(container.firstChild).to.have.class('rs-picker-has-value');

    rerender(<Cascader data={[]} value="Test" renderValue={() => null} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');

    rerender(<Cascader data={[]} value="Test" renderValue={() => undefined} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');
  });

  it('Should update path', () => {
    type AppInstance = {
      picker: PickerHandle;
      setValue: (newValue: string | null) => void;
    };
    const TestApp = React.forwardRef((props, ref) => {
      const [value, setValue] = React.useState('2');
      const pickerRef = React.useRef<PickerHandle>(null);
      React.useImperativeHandle(ref, () => ({
        picker: pickerRef.current,
        setValue
      }));

      return <Cascader {...props} ref={pickerRef} defaultOpen data={items} value={value} open />;
    });

    TestApp.displayName = 'TestApp';

    const ref = React.createRef<AppInstance>();

    render(<TestApp ref={ref} />);

    expect(screen.getByRole('combobox')).to.have.text('2');
    expect(screen.getByRole('treeitem', { selected: true })).to.have.text('2');

    act(() => {
      (ref.current as AppInstance).setValue(null);
    });

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should update columns', () => {
    type AppInstance = {
      picker: PickerHandle;
      setData: (newData: { label: string; value: number }[]) => void;
    };
    const TestApp = React.forwardRef((props, ref) => {
      const [data, setData] = React.useState([]);
      const pickerRef = React.useRef<PickerHandle>(null);
      React.useImperativeHandle(ref, () => ({
        picker: pickerRef.current,
        setData
      }));

      return <Cascader {...props} ref={pickerRef} data={data} open />;
    });

    TestApp.displayName = 'TestApp';

    const ref = React.createRef<AppInstance>();
    render(<TestApp ref={ref} />);

    expect(screen.queryAllByRole('treeitem')).to.have.lengthOf(0);

    act(() => {
      (ref.current as AppInstance).setData([{ label: 'test', value: 1 }]);
    });

    expect(screen.getAllByRole('treeitem')).to.have.lengthOf(1);
    expect(screen.getByRole('treeitem')).to.have.text('test');
  });

  it('Should call `onSearch` callback', () => {
    const data = mockTreeData(['a', 'b', ['c', 'c-1', 'c-2']]);
    const onSearch = sinon.spy();

    render(<Cascader defaultOpen data={data} onSearch={onSearch} />);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.focus(searchbox);
    fireEvent.change(searchbox, { target: { value: 'c' } });

    expect(onSearch).to.be.calledOnce;
    expect(onSearch).to.be.calledWith('c');
  });

  it('Should close the search panel when clicking on the search option', async () => {
    const onClose = sinon.spy();
    const data = mockTreeData(['a', 'b', ['c', 'c-1', 'c-2']]);

    render(<Cascader defaultOpen searchable data={data} onClose={onClose} />);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.focus(searchbox);
    fireEvent.change(searchbox, { target: { value: 'c' } });

    expect(screen.getAllByRole('treeitem')).to.have.length(2);

    fireEvent.click(screen.getByRole('treeitem', { name: 'c-1' }));

    expect(screen.getByRole('combobox')).to.have.text('c / c-1');

    await waitFor(() => {
      expect(onClose).to.have.been.calledOnce;
    });
  });

  it('Should show search items with childrenKey', () => {
    const childrenKey = 'sub';
    const data = mockTreeData(['t', 'h', ['g', 'g-m', 'g-b']], {
      childrenKey
    });

    render(<Cascader defaultOpen data={data} childrenKey={childrenKey} />);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.focus(searchbox);
    fireEvent.change(searchbox, { target: { value: 'g' } });

    expect(screen.getAllByRole('treeitem')).to.have.length(2);
  });

  it('Should show search items with parentSelectable', () => {
    const items = mockTreeData(['t', 'h', ['g', 'g-m', 'g-b']]);

    render(<Cascader defaultOpen data={items} parentSelectable />);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.change(searchbox, { target: { value: 'g' } });

    expect(screen.getAllByRole('treeitem')).to.have.length(3);
  });

  it('Should show search items rendered by renderSearchItem', () => {
    const items = mockTreeData([['parent', 'test']]);

    let searchItems: unknown | null = null;

    render(
      <Cascader
        defaultOpen
        data={items}
        renderSearchItem={(label, items) => {
          searchItems = items;
          return <div className="test-item">{label}</div>;
        }}
      />
    );

    const searchbox = screen.getByRole('searchbox');

    fireEvent.change(searchbox, { target: { value: 't' } });

    expect(screen.getAllByRole('treeitem')).to.have.length(1);
    expect(searchItems).to.have.length(2);
    expect(screen.getByRole('treeitem')).to.have.text('parenttest');
  });

  it('Should update columns', () => {
    type AppInstance = {
      picker: PickerHandle;
      setData: (newData: { label: string; value: number }[]) => void;
    };
    const TestApp = React.forwardRef((props, ref) => {
      const [data, setData] = React.useState([]);
      const pickerRef = React.useRef<PickerHandle>(null);
      React.useImperativeHandle(ref, () => ({
        setData,
        picker: pickerRef.current
      }));

      return <Cascader {...props} ref={pickerRef} data={data} open />;
    });
    const ref = React.createRef();
    render(<TestApp ref={ref} />);

    expect(screen.queryAllByRole('treeitem')).to.have.lengthOf(0);

    act(() => {
      (ref.current as AppInstance).setData([{ label: 'test', value: 1 }]);
    });

    expect(screen.getAllByRole('treeitem')).to.have.lengthOf(1);
    expect(screen.getByRole('treeitem')).to.have.text('test');
  });

  it('Should item able to stringfy', () => {
    const onSelect = sinon.spy();
    const renderMenuItem = sinon.spy();

    render(
      <Cascader defaultOpen data={items} onSelect={onSelect} renderMenuItem={renderMenuItem} />
    );
    const checkbox = screen.getAllByRole('treeitem')[2];

    fireEvent.click(checkbox);

    expect(onSelect).to.called;
    expect(renderMenuItem).to.called;
    expect(() => JSON.stringify(items[2])).to.not.throw();
    expect(() => JSON.stringify(onSelect.firstCall.args[1])).to.not.throw();
    expect(() => JSON.stringify(renderMenuItem.lastCall.args[1])).to.not.throw();
  });

  it("Should custom render the tree's node", () => {
    render(
      <Cascader
        defaultOpen
        data={items}
        renderTreeNode={(_node, item) => <i data-testid="custom-item">{item.label}</i>}
      />
    );

    expect(screen.getAllByTestId('custom-item')).to.have.length(3);
  });

  it('Should custom render the column', () => {
    render(
      <Cascader
        defaultOpen
        data={items}
        renderColumn={(_childNodes, { items }) => (
          <div data-testid="custom-column">
            {items.map((item, index) => (
              <i key={index}>{item.label}</i>
            ))}
          </div>
        )}
      />
    );

    expect(screen.getAllByTestId('custom-column')).to.have.length(1);
  });

  it('[Deprecated renderMenu] Should custom render the column', () => {
    render(
      <Cascader
        defaultOpen
        data={items}
        renderMenu={items => (
          <div data-testid="custom-column">
            {items.map((item, index) => (
              <i key={index}>{item.label}</i>
            ))}
          </div>
        )}
      />
    );

    expect(screen.getAllByTestId('custom-column')).to.have.length(1);
  });

  it('Should update the subcolumn when the leaf node is clicked', () => {
    render(<Cascader data={items} open />);

    expect(screen.getAllByRole('group')).to.length(1);

    // Click on a node that has child nodes
    fireEvent.click(screen.getByRole('treeitem', { name: '3' }));
    expect(screen.getAllByRole('group')).to.length(2);

    // Click on the leaf node
    fireEvent.click(screen.getByRole('treeitem', { name: '1' }));
    expect(screen.getAllByRole('group')).to.length(1);
  });

  it('Should trigger onChange callback & onSelect callback when press Enter', () => {
    const onChange = sinon.spy();
    const onSelect = sinon.spy();

    render(<Cascader data={items} onChange={onChange} onSelect={onSelect} defaultOpen />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(onChange).to.have.been.calledOnce;
    expect(onSelect).to.have.been.calledOnce;
  });

  it('Should custom column width', () => {
    render(<Cascader data={items} columnWidth={100} defaultOpen />);

    expect(screen.getByRole('group')).to.have.style('width', '100px');
  });

  it('Should custom column height', () => {
    render(<Cascader data={items} columnHeight={100} defaultOpen />);

    expect(screen.getByRole('group')).to.have.style('height', '100px');
  });

  it('[Deprecated menuWidth] Should custom column width', () => {
    render(<Cascader data={items} menuWidth={100} defaultOpen />);

    expect(screen.getByRole('group')).to.have.style('width', '100px');
  });

  it('[Deprecated menuHeight] Should custom column height', () => {
    render(<Cascader data={items} menuHeight={100} defaultOpen />);

    expect(screen.getByRole('group')).to.have.style('height', '100px');
  });

  describe('ref testing', () => {
    it('Should control the open and close of picker', async () => {
      const onOpen = sinon.spy();
      const onClose = sinon.spy();
      const ref = React.createRef<any>();

      render(<Cascader ref={ref} onOpen={onOpen} onClose={onClose} data={items} />);

      ref.current.open();

      await waitFor(() => {
        expect(onOpen).to.be.calledOnce;
      });

      ref.current.close();

      await waitFor(() => {
        expect(onClose).to.be.calledOnce;
      });
    });
  });

  describe('Plain text', () => {
    it('Should render full path (separated by delimiter) of selected data', () => {
      render(
        <div data-testid="content">
          <Cascader data={items} value="3-1" plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('3 / 3-1');
    });

    it('Should render "Not selected" if value is empty', () => {
      render(
        <div data-testid="content">
          <Cascader data={items} value={null} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Not selected');
    });
  });

  describe('Focus item', () => {
    it('Should update scroll position when the focus is not within the viewport', () => {
      render(<Cascader defaultOpen data={items} menuHeight={72} />);

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

      expect(screen.getAllByRole('group')[0].scrollTop).to.equal(36);

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

      expect(screen.getAllByRole('group')[0].scrollTop).to.equal(0);
    });

    it('Should be switched to sub-selection using the left and right keys', () => {
      render(<Cascader defaultOpen data={items} />);

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

      let focusItems = screen
        .getByRole('tree')

        .querySelectorAll('.rs-cascade-tree-item-focus');

      expect(focusItems).to.length(1);
      expect(focusItems[0]).to.have.text('3');

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowRight' });

      focusItems = screen.getByRole('tree').querySelectorAll('.rs-cascade-tree-item-focus');

      expect(focusItems).to.length(2);
      expect(focusItems[1]).to.have.text('3-1');

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowLeft' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' });

      focusItems = screen.getByRole('tree').querySelectorAll('.rs-cascade-tree-item-focus');

      expect(focusItems).to.length(1);
      expect(focusItems[0]).to.have.text('2');
    });

    it('Should be selected for focus item by Enter key', () => {
      render(<Cascader data={items} />);

      userEvent.click(screen.getByRole('combobox'));

      const input = screen.getByRole('searchbox');

      userEvent.type(input, '1');
      userEvent.type(screen.getByRole('combobox'), '{enter}');

      expect(screen.getByRole('combobox')).to.have.text('1');

      userEvent.click(screen.getByRole('button', { name: 'Clear' }));
      userEvent.click(screen.getByRole('combobox'));
      userEvent.type(input, '12');
      userEvent.type(screen.getByRole('combobox'), '{enter}');

      expect(screen.getByRole('combobox')).to.have.text('Select');
    });
  });

  describe('Locale', () => {
    it('Should render default locale', () => {
      render(<Cascader defaultOpen data={items} />);

      expect(screen.getByRole('combobox')).to.have.text('Select');
      expect(screen.getByRole('searchbox')).to.have.attribute('placeholder', 'Search');

      // Trigger search event
      fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'not found value' } });
      expect(screen.getByText('No results found')).to.exist;
    });

    it('Should render custom locale with `CustomProvider` component', () => {
      const PickerZhCN = {
        noResultsText: '无匹配选项',
        searchPlaceholder: '搜索',
        placeholder: '选择',
        checkAll: '全部'
      };

      render(
        <CustomProvider
          locale={{
            Combobox: PickerZhCN
          }}
        >
          <Cascader defaultOpen data={items} />
        </CustomProvider>
      );

      expect(screen.getByRole('combobox')).to.have.text('选择');
      expect(screen.getByRole('searchbox')).to.have.attribute('placeholder', '搜索');

      // Trigger search event
      fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'not found value' } });
      expect(screen.getByText('无匹配选项')).to.exist;
    });

    it('Should override locale with `locale` property', () => {
      render(
        <Cascader
          defaultOpen
          data={items}
          locale={{
            searchPlaceholder: 'Custom Search Place Holder',
            noResultsText: 'Custom No Results Message',
            placeholder: 'Custom Place Holder'
          }}
        />
      );

      expect(screen.getByRole('combobox')).to.have.text('Custom Place Holder');
      expect(screen.getByRole('searchbox')).to.have.attribute(
        'placeholder',
        'Custom Search Place Holder'
      );

      // Trigger search event
      fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'not found value' } });
      expect(screen.getByText('Custom No Results Message')).to.exist;
    });
  });

  describe('Accessibility', () => {
    it('Should have a role combobox', () => {
      render(<Cascader data={items} />);

      expect(screen.getByRole('combobox')).to.exist;
    });

    it('Should have a role tree', () => {
      render(<Cascader data={items} defaultOpen />);

      expect(screen.getByRole('tree')).to.exist;
    });

    it('Should focus on search input by key=character', () => {
      render(<Cascader defaultOpen data={items} />);

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 't' });

      expect(screen.getByRole('searchbox')).to.have.focus;
    });
  });
});
