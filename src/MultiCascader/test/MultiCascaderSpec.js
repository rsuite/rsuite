import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { getDOMNode, getInstance } from '@test/testUtils';
import MultiCascader from '../MultiCascader';
import Button from '../../Button';

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

describe('MultiCascader', () => {
  it('Should output a dropdown', () => {
    const instance = getDOMNode(<MultiCascader data={[]}>Title</MultiCascader>);

    expect(instance.className).to.contain('picker-cascader');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<MultiCascader data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should render number', () => {
    const instance = getDOMNode(<MultiCascader data={items} value={['3-1', '3-2']} />);

    expect(instance.querySelector('.rs-picker-value-count')).to.text('1');
    expect(instance.className).to.include('rs-picker-countable');
  });

  it('Should not render number', () => {
    const instance = getDOMNode(
      <MultiCascader data={items} value={['3-1', '3-2']} countable={false} />
    );

    assert.isNull(instance.querySelector('.rs-picker-value-count'));
  });

  it('Should render the parent node by children value', () => {
    const instance = getDOMNode(<MultiCascader data={items} value={['3-1', '3-2']} />);

    assert.equal(instance.querySelector('.rs-picker-value-list').textContent, '3 (All)');
  });

  it('Should render the parent node by children defaultValue', () => {
    const instance = getDOMNode(<MultiCascader data={items} defaultValue={['3-1', '3-2']} />);

    assert.equal(instance.querySelector('.rs-picker-value-list').textContent, '3 (All)');
  });

  it('Should render the parent node by children value', () => {
    const instance = getDOMNode(
      <MultiCascader data={items} value={['3-1']} uncheckableItemValues={['3-2']} />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').textContent, '3 (All)');
  });

  it('Should render the children nodes', () => {
    const instance = getDOMNode(
      <MultiCascader data={items} value={['3-1', '3-2']} uncheckableItemValues={['3']} />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').textContent, '3-1,3-2');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<MultiCascader data={[]} disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be inline', async () => {
    const instance = getInstance(<MultiCascader data={[]} inline />);

    await waitFor(() => {
      assert.ok(instance.overlay.className.match(/\brs-picker-inline\b/));
      assert.ok(instance.overlay.querySelector('.rs-picker-cascader-menu-items'));
    });
  });

  it('Should output a placeholder', () => {
    const placeholder = 'foobar';
    const instance = getDOMNode(<MultiCascader data={[]} placeholder={placeholder} />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, placeholder);
  });

  it('Should output a button', () => {
    const instance = getInstance(<MultiCascader data={[]} toggleAs="button" />);
    assert.ok(instance.root.querySelector('button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<MultiCascader data={[]} block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should output a placeholder by renderValue()', () => {
    const placeholder = 'foobar';
    const instance = getDOMNode(
      <MultiCascader renderValue={() => placeholder} data={items} value={['1']} />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').textContent, placeholder);

    const instance2 = getDOMNode(<MultiCascader data={[]} renderValue={() => placeholder} />);
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <MultiCascader
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={[1]}
      />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <MultiCascader renderValue={v => [v, placeholder]} data={[]} value={[2]} />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').textContent, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').textContent, `2${placeholder}`);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<MultiCascader data={[]} renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(
      <MultiCascader
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={['4']}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'test');
  });

  it('Should be active by value', () => {
    const value = ['2'];
    const instance = getInstance(<MultiCascader defaultOpen data={items} value={value} />);
    assert.equal(instance.overlay.querySelector('.rs-checkbox-checked').textContent, value);
  });

  it('Should be active by defaultValue', () => {
    const value = ['2'];
    const instance = getInstance(<MultiCascader defaultOpen data={items} defaultValue={value} />);
    assert.equal(instance.overlay.querySelector('.rs-checkbox-checked').textContent, value);
  });

  it('Should call `onSelect` callback ', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(<MultiCascader data={items} defaultOpen onSelect={onSelectSpy} />);

    fireEvent.click(instance.overlay.querySelector('.rs-checkbox'));
    assert.ok(onSelectSpy.calledOnce);
  });

  it('Should call `onChange` callback ', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(<MultiCascader data={items} defaultOpen onChange={onChangeSpy} />);
    const menu = instance.overlay.querySelector('.rs-checkbox-wrapper');

    fireEvent.click(menu);
    assert.equal(onChangeSpy.firstCall.firstArg[0], '1');
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    const instance = getDOMNode(
      <MultiCascader data={items} defaultValue={['1']} onClean={onCleanSpy} />
    );

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));
    assert.ok(onCleanSpy.calledOnce);
  });

  it('Should call `onOpen` callback', () => {
    const onOpenSpy = sinon.spy();
    const picker = getInstance(<MultiCascader onOpen={onOpenSpy} data={items} />);

    act(() => {
      picker.open();
    });

    assert.ok(onOpenSpy.calledOnce);
  });

  it('Should call `onClose` callback', () => {
    const onCloseSpy = sinon.spy();
    const picker = getInstance(<MultiCascader defaultOpen onClose={onCloseSpy} data={items} />);

    act(() => {
      picker.close();
    });
    assert.ok(onCloseSpy.calledOnce);
  });

  it('Should clean selected default value', () => {
    const ref = React.createRef();
    act(() => {
      render(<MultiCascader ref={ref} defaultOpen data={items} defaultValue={['3-1']} />);
    });

    const target = ref.current.root;

    act(() => {
      fireEvent.click(target.querySelector('.rs-picker-toggle-clean'));
    });

    assert.equal(target.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<MultiCascader data={[]} className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<MultiCascader data={[]} style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<MultiCascader data={[]} classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getInstance(<MultiCascader open data={items} toggleAs={Button} />);
    assert.ok(instance.root.querySelector('.rs-btn'));
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(
      <MultiCascader data={[]} value={['Test']} renderValue={() => '1'} />
    );
    const instance2 = getDOMNode(
      <MultiCascader data={[]} value={['Test']} renderValue={() => null} />
    );
    const instance3 = getDOMNode(
      <MultiCascader data={[]} value={['Test']} renderValue={() => undefined} />
    );

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').textContent, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');

    assert.include(instance1.className, 'rs-picker-has-value');
    assert.notInclude(instance2.className, 'rs-picker-has-value');
    assert.notInclude(instance3.className, 'rs-picker-has-value');
  });

  it('Should update value', () => {
    const TestApp = React.forwardRef((props, ref) => {
      const [value, setValue] = React.useState(['1']);
      const pickerRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        picker: pickerRef.current,
        setValue
      }));

      return (
        <MultiCascader {...props} ref={pickerRef} defaultOpen data={items} value={value} open />
      );
    });

    TestApp.displayName = 'TestApp';

    const ref = React.createRef();
    act(() => {
      render(<TestApp ref={ref} />);
    });
    const target = ref.current.picker.root;

    assert.equal(target.querySelector('.rs-picker-value-list').textContent, '1');

    act(() => {
      ref.current.setValue([]);
    });

    assert.equal(target.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
  });

  it('Should call onSelect callback with 3 params', () => {
    const onSelectSpy = sinon.spy();

    const instance = getInstance(<MultiCascader defaultOpen data={items} onSelect={onSelectSpy} />);
    const checkbox = instance.overlay.querySelectorAll('.rs-checkbox')[1];
    fireEvent.click(checkbox);

    assert.equal(onSelectSpy.firstCall.firstArg.value, '2');
    assert.equal(onSelectSpy.firstCall.args[1][0].value, '2');
    assert.equal(onSelectSpy.firstCall.lastArg.target, checkbox);
  });

  it('Should item able to stringfy', () => {
    const onSelectSpy = sinon.spy();
    const renderMenuItemSpy = sinon.spy();

    const instance = getInstance(
      <MultiCascader
        defaultOpen
        data={items}
        onSelect={onSelectSpy}
        renderMenuItem={renderMenuItemSpy}
      />
    );
    const checkbox = instance.overlay.querySelectorAll('.rs-checkbox')[2];

    fireEvent.click(checkbox);

    expect(onSelectSpy).to.called;
    expect(renderMenuItemSpy).to.called;
    expect(() => JSON.stringify(items[2])).to.not.throw();
    expect(() => JSON.stringify(onSelectSpy.firstCall.args[1])).to.not.throw();
    expect(() => JSON.stringify(renderMenuItemSpy.lastCall.args[1])).to.not.throw();
  });

  it('Should call onCheck callback ', () => {
    const onCheckSpy = sinon.spy();
    const instance = getInstance(<MultiCascader data={items} defaultOpen onCheck={onCheckSpy} />);
    const checkbox = instance.overlay.querySelector('.rs-checkbox-wrapper');

    fireEvent.click(checkbox);

    assert.equal(onCheckSpy.firstCall.firstArg[0], '1');
    assert.equal(onCheckSpy.firstCall.args[1].value, '1');
    assert.isTrue(onCheckSpy.firstCall.args[2]);
    assert.equal(onCheckSpy.firstCall.lastArg.target, checkbox);
  });

  it('Should update columns', () => {
    const TestApp = React.forwardRef((props, ref) => {
      const [data, setData] = React.useState([]);
      const pickerRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        setData,
        picker: pickerRef.current
      }));

      return <MultiCascader {...props} ref={pickerRef} data={data} open />;
    });

    const ref = React.createRef();

    act(() => {
      render(<TestApp ref={ref} />);
    });

    const overlay = ref.current.picker.overlay;

    expect(overlay.querySelectorAll('.rs-check-item')).to.length(0);

    act(() => {
      ref.current.setData([{ label: 'test', value: 1 }]);
    });

    expect(overlay.querySelectorAll('.rs-check-item')).to.length(1);
    expect(overlay.querySelector('.rs-check-item')).to.text('test');
  });

  it('Should children be loaded lazily', () => {
    const instance = getInstance(
      <MultiCascader
        open
        data={[{ label: '1', value: '1', children: [] }]}
        getChildren={() => {
          return [{ label: '2', value: '2' }];
        }}
      />
    );

    fireEvent.click(
      instance.overlay.querySelector('.rs-picker-cascader-menu-has-children .rs-check-item')
    );

    expect(instance.overlay.querySelectorAll('.rs-check-item')[1]).to.text('2');
  });

  it('Should present an asyn loading state', () => {
    function fetchNodes() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([{ label: '2', value: '2' }]);
        }, 500);
      });
    }

    const instance = getInstance(
      <MultiCascader
        open
        data={[{ label: '1', value: '1', children: [] }]}
        getChildren={fetchNodes}
      />
    );

    fireEvent.click(
      instance.overlay.querySelector('.rs-picker-cascader-menu-has-children .rs-check-item')
    );

    expect(instance.overlay.querySelector('.rs-icon.rs-icon-spin')).to.exist;
  });

  it('Should call `onSearch` callback ', () => {
    const onSearchSpy = sinon.spy();
    const instance = getInstance(<MultiCascader data={items} defaultOpen onSearch={onSearchSpy} />);
    const input = instance.overlay.querySelector('.rs-picker-search-bar-input');

    fireEvent.change(input, { target: { value: '3' } });

    assert.equal(instance.overlay.querySelectorAll('.rs-picker-cascader-row').length, 3);
    assert.ok(onSearchSpy.calledOnce);
  });

  it('Should update the subcolumn when the leaf node is clicked', () => {
    const { queryAllByRole, getByRole } = render(<MultiCascader data={items} open />);

    expect(queryAllByRole('listbox')).to.length(1);

    // Click on a node that has child nodes
    fireEvent.click(getByRole('checkbox', { name: '3' }).parentNode);

    expect(queryAllByRole('listbox')).to.length(2);

    // Click on the leaf node
    fireEvent.click(getByRole('checkbox', { name: '1' }).parentNode);

    expect(queryAllByRole('listbox')).to.length(1);
  });

  describe('Plain text', () => {
    it("Should render selected options' labels (comma-separated) and selected options count", () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <MultiCascader data={items} value={['1', '3-1']} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('1,3-12');
    });
    it('Should render "Not selected" if value is empty', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <MultiCascader data={items} value={[]} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Not selected');
    });
  });
});
