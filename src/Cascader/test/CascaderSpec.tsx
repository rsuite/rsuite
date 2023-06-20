import React from 'react';
import { render, waitFor, fireEvent, act, screen } from '@testing-library/react';
import sinon from 'sinon';
import Cascader from '../Cascader';
import Button from '../../Button';
import { getInstance } from '@test/testUtils';
import { PickerHandle } from '../../Picker';
import '../styles/index.less';
import { testStandardProps } from '@test/commonCases';

const items = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3',
    children: [
      {
        value: '3-1',
        label: '3-1'
      },
      {
        value: '3-2',
        label: '3-2'
      }
    ]
  }
];

describe('Cascader', () => {
  testStandardProps(<Cascader data={[]} />);

  it('Should output a picker', () => {
    const { container } = render(<Cascader data={[]}>title</Cascader>);

    expect(container.firstChild).to.have.class('rs-picker-cascader');
  });

  it('Should have "default" appearance by default', () => {
    const { container } = render(<Cascader data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-default');
  });

  it('Should be disabled', () => {
    const { container } = render(<Cascader data={[]} disabled />);

    expect(container.firstChild).to.have.class('rs-picker-disabled');
  });

  it('Should be inline', () => {
    const { container } = render(<Cascader data={[]} inline />);

    expect(container.firstChild).to.have.class('rs-picker-inline');
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('.rs-picker-cascader-menu-items')).to.exist;
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

  it('Should be block', () => {
    const { container } = render(<Cascader data={[]} block />);

    expect(container.firstChild).to.have.class('rs-picker-block');
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
      'rs-picker-cascader-menu-item-active'
    );
  });

  it('Should be active by defaultValue', () => {
    const value = '2';
    render(<Cascader defaultOpen data={items} defaultValue={value} />);

    expect(screen.getByRole('treeitem', { name: value }).firstChild).to.have.class(
      'rs-picker-cascader-menu-item-active'
    );
  });

  it('Should call onSelect callback with correct node value', () => {
    const onSelect = sinon.spy();
    render(<Cascader data={items} defaultOpen onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('treeitem', { name: '2' }));

    expect(onSelect).to.have.been.calledWith(sinon.match({ value: '2' }));
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
    const picker = getInstance(<Cascader onOpen={onOpen} data={items} />);
    act(() => {
      picker.open();
    });

    await waitFor(() => {
      expect(onOpen).to.have.been.calledOnce;
    });
  });

  it('Should call `onClose` callback', async () => {
    const onClose = sinon.spy();
    const picker = getInstance(<Cascader defaultOpen onClose={onClose} data={items} />);
    act(() => {
      picker.close();
    });
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

    const instance = getInstance(
      <Cascader open data={[{ label: '1', value: '1', children: [] }]} getChildren={fetchNodes} />
    );

    fireEvent.click(screen.getByRole('treeitem', { name: '1' }));
    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.overlay.querySelector('.rs-icon.rs-icon-spin')).to.exist;
  });

  it('Should present an async loading state with inline', async () => {
    function fetchNodes() {
      return new Promise<{ label: string; value: string }[]>(resolve => {
        setTimeout(() => {
          resolve([{ label: '2', value: '2' }]);
        }, 500);
      });
    }

    const instance = getInstance(
      <Cascader
        inline
        open
        data={[{ label: '1', value: '1', children: [] }]}
        getChildren={fetchNodes}
      />
    );

    fireEvent.click(
      // eslint-disable-next-line testing-library/no-node-access
      instance.overlay.querySelector(
        '.rs-picker-cascader-menu-has-children .rs-picker-cascader-menu-item'
      )
    );

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-column')).to.length(2);
    });
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

  it('Should show search items with childrenKey', () => {
    const itemsWithChildrenKey = {
      childrenKey: 'sub',
      data: [
        {
          value: 't',
          label: 't'
        },
        {
          value: 'h',
          label: 'h'
        },
        {
          value: 'g',
          label: 'g',
          sub: [
            {
              value: 'g-m',
              label: 'g-m'
            },
            {
              value: 'g-b',
              label: 'g-b'
            }
          ]
        }
      ]
    };

    const cascaderRef = React.createRef<PickerHandle>();

    render(
      <Cascader
        ref={cascaderRef}
        defaultOpen
        data={itemsWithChildrenKey.data}
        childrenKey={itemsWithChildrenKey.childrenKey}
      />
    );

    // TODO-Doma
    // Use `searchbox` role
    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'g' } });

    const searchResult = ((cascaderRef.current as PickerHandle).overlay as HTMLElement)
      // eslint-disable-next-line testing-library/no-node-access
      .querySelectorAll('.rs-picker-cascader-row');

    expect(searchResult.length).to.equal(2);
  });

  it('Should show search items with parentSelectable', () => {
    const items = [
      {
        value: 't',
        label: 't'
      },
      {
        value: 'h',
        label: 'h'
      },
      {
        value: 'g',
        label: 'g',
        children: [
          {
            value: 'g-m',
            label: 'g-m'
          },
          {
            value: 'g-b',
            label: 'g-b'
          }
        ]
      }
    ];

    const cascaderRef = React.createRef<PickerHandle>();

    render(<Cascader ref={cascaderRef} defaultOpen data={items} parentSelectable />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'g' } });

    const searchResult = ((cascaderRef.current as PickerHandle).overlay as HTMLElement)
      // eslint-disable-next-line testing-library/no-node-access
      .querySelectorAll('.rs-picker-cascader-row');

    expect(searchResult.length).to.equal(3);
  });

  it('Should show search items rendered by renderSearchItem', () => {
    const items = [
      {
        label: 'parent',
        value: 'parent',
        children: [
          {
            label: 'test',
            value: 'test'
          }
        ]
      }
    ];
    const cascaderRef = React.createRef<PickerHandle>();
    let searchItems: unknown | null = null;

    render(
      <Cascader
        ref={cascaderRef}
        defaultOpen
        data={items}
        renderSearchItem={(label, items) => {
          searchItems = items;
          return <div className="test-item">{label}</div>;
        }}
      />
    );

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 't' } });

    const searchResult = ((cascaderRef.current as PickerHandle).overlay as HTMLElement)
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('.rs-picker-cascader-row .test-item');

    expect(searchResult).to.exist;
    expect(searchItems).to.length(2);
    expect(searchItems).to.deep.contain(items[0]);
    // eslint-disable-next-line testing-library/no-node-access
    expect(searchItems).to.deep.contain(items[0].children[0]);

    expect(searchResult).to.text('parenttest');
  });

  describe('ref testing', () => {
    it('Should control the open and close of picker', async () => {
      const onOpenSpy = sinon.spy();
      const onCloseSpy = sinon.spy();

      const instance = getInstance(
        <Cascader onOpen={onOpenSpy} onClose={onCloseSpy} data={items} />
      );

      instance.open();
      await waitFor(() => {
        assert.isTrue(onOpenSpy.calledOnce);
      });

      instance.close();
      await waitFor(() => {
        assert.isTrue(onCloseSpy.calledOnce);
      });
    });
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

  it('Should item able to stringfy', () => {
    const onSelectSpy = sinon.spy();
    const renderMenuItemSpy = sinon.spy();

    render(
      <Cascader
        defaultOpen
        data={items}
        onSelect={onSelectSpy}
        renderMenuItem={renderMenuItemSpy}
      />
    );
    const checkbox = screen.getAllByRole('treeitem')[2];

    fireEvent.click(checkbox);

    expect(onSelectSpy).to.called;
    expect(renderMenuItemSpy).to.called;
    expect(() => JSON.stringify(items[2])).to.not.throw();
    expect(() => JSON.stringify(onSelectSpy.firstCall.args[1])).to.not.throw();
    expect(() => JSON.stringify(renderMenuItemSpy.lastCall.args[1])).to.not.throw();
  });

  it('Should update the subcolumn when the leaf node is clicked', () => {
    render(<Cascader data={items} open />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('tree').querySelectorAll('.rs-picker-cascader-menu-column')).to.length(
      1
    );

    // Click on a node that has child nodes
    fireEvent.click(screen.getByRole('treeitem', { name: '3' }));
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('tree').querySelectorAll('.rs-picker-cascader-menu-column')).to.length(
      2
    );

    // Click on the leaf node
    fireEvent.click(screen.getByRole('treeitem', { name: '1' }));
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('tree').querySelectorAll('.rs-picker-cascader-menu-column')).to.length(
      1
    );
  });

  it('Should trigger onChange callback & onSelect callback when press Enter', () => {
    const onChangeSpy = sinon.spy();
    const onSelectSpy = sinon.spy();

    const instance = getInstance(
      <Cascader data={items} onChange={onChangeSpy} onSelect={onSelectSpy} defaultOpen />
    );

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

    fireEvent.keyDown(instance.target, { key: 'Enter' });

    expect(onChangeSpy).to.have.been.calledOnce;
    expect(onSelectSpy).to.have.been.calledOnce;
  });

  describe('Focus item', () => {
    it('Should update scroll position when the focus is not within the viewport', () => {
      const instance = getInstance(<Cascader defaultOpen data={items} menuHeight={72} />);

      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

      // eslint-disable-next-line testing-library/no-node-access
      expect(instance.overlay.querySelector('[data-type="column"]').scrollTop).to.equal(36);

      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

      // eslint-disable-next-line testing-library/no-node-access
      expect(instance.overlay.querySelector('[data-type="column"]').scrollTop).to.equal(0);
    });

    it('Should be switched to sub-selection using the left and right keys', () => {
      const instance = getInstance(<Cascader defaultOpen data={items} />);

      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

      // eslint-disable-next-line testing-library/no-node-access
      let focusItems = instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item-focus');

      expect(focusItems).to.length(1);
      expect(focusItems[0]).to.have.text('3');

      fireEvent.keyDown(instance.target, { key: 'ArrowRight' });

      // eslint-disable-next-line testing-library/no-node-access
      focusItems = instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item-focus');

      expect(focusItems).to.length(2);
      expect(focusItems[1]).to.have.text('3-1');

      fireEvent.keyDown(instance.target, { key: 'ArrowLeft' });
      fireEvent.keyDown(instance.target, { key: 'ArrowUp' });

      // eslint-disable-next-line testing-library/no-node-access
      focusItems = instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item-focus');

      expect(focusItems).to.length(1);
      expect(focusItems[0]).to.have.text('2');
    });
  });
});
