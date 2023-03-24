import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import sinon from 'sinon';
import Cascader from '../Cascader';
import Button from '../../Button';
import { getDOMNode, getInstance } from '@test/testUtils';
import { PickerHandle } from '../../Picker';
import '../styles/index.less';

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
  it('Should output a picker', () => {
    const instance = getDOMNode(<Cascader data={[]}>title</Cascader>);

    expect(instance).to.have.class('rs-picker-cascader');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<Cascader data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Cascader data={[]} disabled />);

    expect(instance).to.have.class('rs-picker-disabled');
  });

  it('Should be inline', () => {
    const instance = getInstance(<Cascader data={[]} inline />);
    expect(instance.overlay.className).to.contain('rs-picker-inline');
    expect(instance.overlay.querySelector('.rs-picker-cascader-menu-items')).to.exist;
  });

  it('Should output a placeholder', () => {
    const placeholder = 'foobar';
    const instance = getDOMNode(<Cascader data={[]} placeholder={placeholder} />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text(placeholder);
  });

  it('Should output a button', () => {
    const instance = getInstance(<Cascader data={[]} toggleAs="button" />);
    assert.ok(instance.root.querySelector('button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<Cascader data={[]} block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <Cascader renderValue={v => [v, placeholder]} data={[{ value: 1, label: '1' }]} value={1} />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <Cascader renderValue={v => [v, placeholder]} data={[]} value={2} />
    );

    // Invalid value
    const instance3 = getDOMNode(
      <Cascader data={[]} renderValue={v => [v, placeholder]} value={''} />
    );

    assert.equal(
      (instance.querySelector('.rs-picker-toggle-value') as HTMLElement).textContent,
      `1${placeholder}`
    );
    assert.equal(
      (instance2.querySelector('.rs-picker-toggle-value') as HTMLElement).textContent,
      `2${placeholder}`
    );
    assert.equal(
      (instance3.querySelector('.rs-picker-toggle-value') as HTMLElement).textContent,
      placeholder
    );
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<Cascader data={[]} renderValue={() => 'value'} />);
    assert.equal(
      (instance.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'Select'
    );
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<Cascader data={[]} value={2} placeholder={'test'} />);
    assert.equal(
      (instance.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'test'
    );
  });

  it('Should be active by value', () => {
    const value = '2';
    const instance = getInstance(<Cascader defaultOpen data={items} value={value} />);

    assert.equal(
      instance.overlay.querySelector('.rs-picker-cascader-menu-item-active').textContent,
      value
    );
  });

  it('Should be active by defaultValue', () => {
    const value = '2';
    const instance = getInstance(<Cascader defaultOpen data={items} defaultValue={value} />);

    assert.equal(
      instance.overlay.querySelector('.rs-picker-cascader-menu-item-active').textContent,
      value
    );
  });

  it('Should call onSelect callback with correct node value', () => {
    const onSelect = sinon.spy();
    const instance = getInstance(<Cascader data={items} defaultOpen onSelect={onSelect} />);
    fireEvent.click(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[1]);

    expect(onSelect).to.have.been.calledWith(sinon.match({ value: '2' }));
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = sinon.spy();

    const instance = getInstance(<Cascader data={items} defaultOpen onChange={onChange} />);
    fireEvent.click(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[1]);

    expect(onChange).to.have.been.calledWith('2');
  });

  it('Should call onChange callback by `parentSelectable`', () => {
    const onChange = sinon.spy();

    const instance = getInstance(
      <Cascader data={items} defaultOpen parentSelectable onChange={onChange} />
    );
    fireEvent.click(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[2]);
    expect(onChange).to.have.been.calledWith('3');
  });

  it('Should call onClean callback', () => {
    const onClean = sinon.spy();
    const instance = getDOMNode(<Cascader data={items} defaultValue={'3-1'} onClean={onClean} />);

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean') as HTMLElement);

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
    const instance = getDOMNode(<Cascader defaultOpen data={items} defaultValue={'3-1'} />);

    act(() => {
      fireEvent.click(instance.querySelector('.rs-picker-toggle-clean') as HTMLElement);
    });

    expect(
      (instance.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent
    ).to.equal('Select');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Cascader data={[]} className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Cascader data={[]} style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Cascader data={[]} classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getInstance(<Cascader data={items} toggleAs={Button} />);
    assert.ok(instance.root.querySelector('.rs-btn'));
  });

  it('Should children be loaded lazily', () => {
    const instance = getInstance(
      <Cascader
        open
        data={[{ label: '1', value: '1', children: [] }]}
        getChildren={() => {
          return [{ label: '2', value: '2' }];
        }}
      />
    );

    act(() => {
      fireEvent.click(
        instance.overlay.querySelector(
          '.rs-picker-cascader-menu-has-children .rs-picker-cascader-menu-item'
        )
      );
    });

    expect(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[1]).to.text('2');
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

    act(() => {
      fireEvent.click(
        instance.overlay.querySelector(
          '.rs-picker-cascader-menu-has-children .rs-picker-cascader-menu-item'
        )
      );
    });
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

    act(() => {
      fireEvent.click(
        instance.overlay.querySelector(
          '.rs-picker-cascader-menu-has-children .rs-picker-cascader-menu-item'
        )
      );
    });

    await waitFor(() => {
      expect(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-column')).to.length(2);
    });
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<Cascader data={[]} value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<Cascader data={[]} value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(<Cascader data={[]} value="Test" renderValue={() => undefined} />);

    assert.equal(
      (instance1.querySelector('.rs-picker-toggle-value') as HTMLElement).textContent,
      '1'
    );
    assert.equal(
      (instance2.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'Select'
    );
    assert.equal(
      (instance3.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'Select'
    );

    assert.include(instance1.className, 'rs-picker-has-value');
    assert.notInclude(instance2.className, 'rs-picker-has-value');
    assert.notInclude(instance3.className, 'rs-picker-has-value');
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

    expect(
      (((ref.current as AppInstance).picker as PickerHandle).root as HTMLElement).querySelector(
        '.rs-picker-toggle-value'
      )
    ).to.text('2');
    expect(
      (((ref.current as AppInstance).picker as PickerHandle).overlay as HTMLElement).querySelector(
        '.rs-picker-cascader-menu-item-active'
      )
    ).to.text('2');

    act(() => {
      (ref.current as AppInstance).setValue(null);
    });

    expect(
      (((ref.current as AppInstance).picker as PickerHandle).root as HTMLElement).querySelector(
        '.rs-picker-toggle-placeholder'
      )
    ).to.text('Select');
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

    expect(
      ((ref.current as AppInstance).picker.overlay as HTMLElement).querySelectorAll(
        '.rs-picker-cascader-menu-item'
      ).length
    ).to.equal(0);

    act(() => {
      (ref.current as AppInstance).setData([{ label: 'test', value: 1 }]);
    });

    expect(
      ((ref.current as AppInstance).picker.overlay as HTMLElement).querySelectorAll(
        '.rs-picker-cascader-menu-item'
      ).length
    ).to.equal(1);

    expect(
      ((ref.current as AppInstance).picker.overlay as HTMLElement).querySelector(
        '.rs-picker-cascader-menu-item'
      )
    ).to.text('test');
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

    act(() => {
      const input = ((cascaderRef.current as PickerHandle).overlay as HTMLElement).querySelector(
        '.rs-picker-search-bar-input'
      ) as HTMLInputElement;

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'g' } });
    });

    const searchResult = (
      (cascaderRef.current as PickerHandle).overlay as HTMLElement
    ).querySelectorAll('.rs-picker-cascader-row');

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

    const input = ((cascaderRef.current as PickerHandle).overlay as HTMLElement).querySelector(
      '.rs-picker-search-bar-input'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: 'g' } });
    });

    const searchResult = (
      (cascaderRef.current as PickerHandle).overlay as HTMLElement
    ).querySelectorAll('.rs-picker-cascader-row');

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

    const input = ((cascaderRef.current as PickerHandle).overlay as HTMLElement).querySelector(
      '.rs-picker-search-bar-input'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: 't' } });
    });

    const searchResult = (
      (cascaderRef.current as PickerHandle).overlay as HTMLElement
    ).querySelector('.rs-picker-cascader-row .test-item');

    expect(searchResult).to.exist;
    expect(searchItems).to.length(2);
    expect(searchItems).to.deep.contain(items[0]);
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

    const overlay = (ref.current as AppInstance).picker.overlay as HTMLElement;

    expect(overlay.querySelectorAll('.rs-picker-cascader-menu-item')).to.length(0);

    act(() => {
      (ref.current as AppInstance).setData([{ label: 'test', value: 1 }]);
    });

    expect(overlay.querySelectorAll('.rs-picker-cascader-menu-item')).to.length(1);
    expect(overlay.querySelector('.rs-picker-cascader-menu-item')).to.text('test');
  });

  describe('Plain text', () => {
    it('Should render full path (separated by delimiter) of selected data', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <Cascader data={items} value="3-1" plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('3 / 3-1');
    });

    it('Should render "Not selected" if value is empty', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <Cascader data={items} value={null} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Not selected');
    });
  });

  it('Should item able to stringfy', () => {
    const onSelectSpy = sinon.spy();
    const renderMenuItemSpy = sinon.spy();

    const instance = getInstance(
      <Cascader
        defaultOpen
        data={items}
        onSelect={onSelectSpy}
        renderMenuItem={renderMenuItemSpy}
      />
    );
    const checkbox = instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[2];

    fireEvent.click(checkbox);

    expect(onSelectSpy).to.called;
    expect(renderMenuItemSpy).to.called;
    expect(() => JSON.stringify(items[2])).to.not.throw();
    expect(() => JSON.stringify(onSelectSpy.firstCall.args[1])).to.not.throw();
    expect(() => JSON.stringify(renderMenuItemSpy.lastCall.args[1])).to.not.throw();
  });

  it('Should update the subcolumn when the leaf node is clicked', () => {
    const { getByRole } = render(<Cascader data={items} open />);

    expect(getByRole('tree').querySelectorAll('.rs-picker-cascader-menu-column')).to.length(1);

    // Click on a node that has child nodes
    fireEvent.click(getByRole('treeitem', { name: '3' }));
    expect(getByRole('tree').querySelectorAll('.rs-picker-cascader-menu-column')).to.length(2);

    // Click on the leaf node
    fireEvent.click(getByRole('treeitem', { name: '1' }));
    expect(getByRole('tree').querySelectorAll('.rs-picker-cascader-menu-column')).to.length(1);
  });

  describe('Focus item', () => {
    it('Should update scroll position when the focus is not within the viewport', () => {
      const instance = getInstance(<Cascader defaultOpen data={items} menuHeight={72} />);

      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

      expect(instance.overlay.querySelector('[data-type="column"]').scrollTop).to.equal(36);

      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

      expect(instance.overlay.querySelector('[data-type="column"]').scrollTop).to.equal(0);
    });

    it('Should be switched to sub-selection using the left and right keys', () => {
      const instance = getInstance(<Cascader defaultOpen data={items} />);

      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
      fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

      let focusItems = instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item-focus');

      expect(focusItems).to.length(1);
      expect(focusItems[0]).to.have.text('3');

      fireEvent.keyDown(instance.target, { key: 'ArrowRight' });

      focusItems = instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item-focus');

      expect(focusItems).to.length(2);
      expect(focusItems[1]).to.have.text('3-1');

      fireEvent.keyDown(instance.target, { key: 'ArrowLeft' });
      fireEvent.keyDown(instance.target, { key: 'ArrowUp' });

      focusItems = instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item-focus');

      expect(focusItems).to.length(1);
      expect(focusItems[0]).to.have.text('2');
    });
  });
});
