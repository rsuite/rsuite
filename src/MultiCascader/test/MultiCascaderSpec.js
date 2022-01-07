import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { act, render } from '@testing-library/react';
import { getDOMNode, getInstance, getStyle } from '@test/testUtils';
import MultiCascader from '../MultiCascader';
import Button from '../../Button';

const items = [
  {
    value: 'abc',
    label: 'abc'
  },
  {
    value: 'abcd',
    label: 'abcd'
  },
  {
    value: 'abcde',
    label: 'abcde',
    children: [
      {
        value: 'abcde-1',
        label: 'abcde-1'
      },
      {
        value: 'abcde-2',
        label: 'abcde-2'
      }
    ]
  }
];

describe('MultiCascader', () => {
  it('Should output a dropdown', () => {
    const instance = getDOMNode(<MultiCascader data={[]}>Title</MultiCascader>);

    assert.ok(instance.className.match(/\bpicker-cascader\b/));
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<MultiCascader data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should render number', () => {
    const instance = getDOMNode(<MultiCascader data={items} value={['abcde-1', 'abcde-2']} />);

    assert.equal(instance.querySelector('.rs-picker-value-count').textContent, '1');
    assert.include(instance.className, 'rs-picker-countable');
    assert.equal(getStyle(instance.querySelector('.rs-picker-toggle-value'), 'display'), 'flex');
  });

  it('Should not render number', () => {
    const instance = getDOMNode(
      <MultiCascader data={items} value={['abcde-1', 'abcde-2']} countable={false} />
    );

    assert.isNull(instance.querySelector('.rs-picker-value-count'));
  });

  it('Should render the parent node by children value', () => {
    const instance = getDOMNode(<MultiCascader data={items} value={['abcde-1', 'abcde-2']} />);

    assert.equal(instance.querySelector('.rs-picker-value-list').textContent, 'abcde (All)');
  });

  it('Should render the parent node by children defaultValue', () => {
    const instance = getDOMNode(
      <MultiCascader data={items} defaultValue={['abcde-1', 'abcde-2']} />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').textContent, 'abcde (All)');
  });

  it('Should render the parent node by children value', () => {
    const instance = getDOMNode(
      <MultiCascader data={items} value={['abcde-1']} uncheckableItemValues={['abcde-2']} />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').textContent, 'abcde (All)');
  });

  it('Should render the children nodes', () => {
    const instance = getDOMNode(
      <MultiCascader
        data={items}
        value={['abcde-1', 'abcde-2']}
        uncheckableItemValues={['abcde']}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').textContent, 'abcde-1,abcde-2');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<MultiCascader data={[]} disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be inline', () => {
    const instance = getInstance(<MultiCascader data={[]} inline />);

    assert.ok(instance.overlay.className.match(/\brs-picker-inline\b/));
    assert.ok(instance.overlay.querySelector('.rs-picker-cascader-menu-items'));
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
      <MultiCascader renderValue={() => placeholder} data={items} value={['abc']} />
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
    const value = ['abcd'];
    const instance = getInstance(<MultiCascader defaultOpen data={items} value={value} />);
    assert.equal(instance.overlay.querySelector('.rs-checkbox-checked').textContent, value);
  });

  it('Should be active by defaultValue', () => {
    const value = ['abcd'];
    const instance = getInstance(<MultiCascader defaultOpen data={items} defaultValue={value} />);
    assert.equal(instance.overlay.querySelector('.rs-checkbox-checked').textContent, value);
  });

  it('Should call `onSelect` callback ', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(<MultiCascader data={items} defaultOpen onSelect={onSelectSpy} />);

    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-checkbox'));
    assert.ok(onSelectSpy.calledOnce);
  });

  it('Should call `onChange` callback ', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(<MultiCascader data={items} defaultOpen onChange={onChangeSpy} />);
    const menu = instance.overlay.querySelector('.rs-checkbox-wrapper');

    ReactTestUtils.Simulate.click(menu);
    assert.equal(onChangeSpy.firstCall.firstArg[0], 'abc');
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    const instance = getDOMNode(
      <MultiCascader data={items} defaultValue={['abc']} onClean={onCleanSpy} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    assert.ok(onCleanSpy.calledOnce);
  });

  it('Should call `onOpen` callback', () => {
    const onOpenSpy = sinon.spy();
    const picker = getInstance(<MultiCascader onOpen={onOpenSpy} data={items} />);

    picker.open();
    assert.ok(onOpenSpy.calledOnce);
  });

  it('Should call `onClose` callback', () => {
    const onCloseSpy = sinon.spy();
    const picker = getInstance(<MultiCascader defaultOpen onClose={onCloseSpy} data={items} />);

    picker.close();
    assert.ok(onCloseSpy.calledOnce);
  });

  it('Should clean selected default value', () => {
    const ref = React.createRef();
    act(() => {
      render(<MultiCascader ref={ref} defaultOpen data={items} defaultValue={['abcde-1']} />);
    });

    const target = ref.current.root;

    act(() => {
      ReactTestUtils.Simulate.click(target.querySelector('.rs-picker-toggle-clean'));
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
      const [value, setValue] = React.useState(['abc']);
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

    assert.equal(target.querySelector('.rs-picker-value-list').textContent, 'abc');

    act(() => {
      ref.current.setValue([]);
    });

    assert.equal(target.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
  });

  it('Should call onSelect callback with 3 params', () => {
    const onSelectSpy = sinon.spy();

    const instance = getInstance(<MultiCascader defaultOpen data={items} onSelect={onSelectSpy} />);
    const checkbox = instance.overlay.querySelectorAll('.rs-checkbox')[1];
    ReactTestUtils.Simulate.click(checkbox);

    assert.equal(onSelectSpy.firstCall.firstArg.value, 'abcd');
    assert.equal(onSelectSpy.firstCall.args[1][0].value, 'abcd');
    assert.equal(onSelectSpy.firstCall.lastArg.target, checkbox);
  });

  it('Should call onCheck callback ', () => {
    const onCheckSpy = sinon.spy();
    const instance = getInstance(<MultiCascader data={items} defaultOpen onCheck={onCheckSpy} />);
    const checkbox = instance.overlay.querySelector('.rs-checkbox-wrapper');

    ReactTestUtils.Simulate.click(checkbox);

    assert.equal(onCheckSpy.firstCall.firstArg[0], 'abc');
    assert.equal(onCheckSpy.firstCall.args[1].value, 'abc');
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

    assert.equal(overlay.querySelectorAll('.rs-check-item').length, 0);

    act(() => {
      ref.current.setData([{ label: 'test', value: 1 }]);
    });

    assert.equal(overlay.querySelectorAll('.rs-check-item').length, 1);
    assert.equal(overlay.querySelector('.rs-check-item').textContent, 'test');
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

    ReactTestUtils.Simulate.click(
      instance.overlay.querySelector('.rs-picker-cascader-menu-has-children .rs-check-item')
    );

    assert.equal(instance.overlay.querySelectorAll('.rs-check-item')[1].textContent, '2');
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

    ReactTestUtils.Simulate.click(
      instance.overlay.querySelector('.rs-picker-cascader-menu-has-children .rs-check-item')
    );
    assert.ok(instance.overlay.querySelector('.rs-icon.rs-icon-spin'));
  });

  it('Should call `onSearch` callback ', () => {
    const onSearchSpy = sinon.spy();
    const instance = getInstance(<MultiCascader data={items} defaultOpen onSearch={onSearchSpy} />);
    const input = instance.overlay.querySelector('.rs-picker-search-bar-input');
    input.value = 'abcde';

    ReactTestUtils.Simulate.change(input);
    assert.equal(instance.overlay.querySelectorAll('.rs-picker-cascader-row').length, 3);
    assert.ok(onSearchSpy.calledOnce);
  });

  describe('Plain text', () => {
    it("Should render selected options' labels (comma-separated) and selected options count", () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <MultiCascader data={items} value={['abc', 'abcde-1']} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('abc,abcde-12');
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
