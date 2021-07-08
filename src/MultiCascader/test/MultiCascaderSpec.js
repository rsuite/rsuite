import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { globalKey, getDOMNode, getInstance } from '@test/testUtils';
import MultiCascader from '../MultiCascader';
import Button from '../../Button';

const namespace = `${globalKey}-picker`;
const toggleClassName = `.${namespace}-toggle-placeholder`;

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

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('MultiCascader', () => {
  it('Should output a dropdown', () => {
    const instance = getDOMNode(<MultiCascader>Title</MultiCascader>);

    assert.ok(instance.className.match(/\bpicker-cascader\b/));
  });

  it('Should render number', () => {
    const instance = getDOMNode(<MultiCascader data={items} value={['abcde-1', 'abcde-2']} />);

    assert.equal(instance.querySelector('.rs-picker-value-count').innerText, '1');
  });

  it('Should not render number', () => {
    const instance = getDOMNode(
      <MultiCascader data={items} value={['abcde-1', 'abcde-2']} countable={false} />
    );

    assert.ok(!instance.querySelector('.rs-picker-value-count'));
  });

  it('Should render the parent node by children value', () => {
    const instance = getDOMNode(<MultiCascader data={items} value={['abcde-1', 'abcde-2']} />);

    assert.equal(instance.querySelector('.rs-picker-value-list').innerText, 'abcde (All)');
  });

  it('Should render the parent node by children defaultValue', () => {
    const instance = getDOMNode(
      <MultiCascader data={items} defaultValue={['abcde-1', 'abcde-2']} />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').innerText, 'abcde (All)');
  });

  it('Should render the parent node by children value', () => {
    const instance = getDOMNode(
      <MultiCascader data={items} value={['abcde-1']} uncheckableItemValues={['abcde-2']} />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').innerText, 'abcde (All)');
  });

  it('Should render the children nodes', () => {
    const instance = getDOMNode(
      <MultiCascader
        data={items}
        value={['abcde-1', 'abcde-2']}
        uncheckableItemValues={['abcde']}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').innerText, 'abcde-1,abcde-2');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<MultiCascader disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be inline', () => {
    const instance = getInstance(<MultiCascader inline />);

    assert.ok(instance.overlay.className.match(/\brs-picker-inline\b/));
    assert.ok(instance.overlay.querySelector('.rs-picker-cascader-menu-items'));
  });

  it('Should output a placeholder', () => {
    const placeholder = 'foobar';
    const instance = getDOMNode(<MultiCascader placeholder={placeholder} />);

    assert.equal(instance.querySelector(toggleClassName).innerText, placeholder);
  });

  it('Should output a button', () => {
    const instance = getInstance(<MultiCascader toggleAs="button" />);
    assert.ok(instance.root.querySelector('button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<MultiCascader block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should output a placeholder by renderValue()', () => {
    const placeholder = 'foobar';
    const instance = getDOMNode(
      <MultiCascader renderValue={() => placeholder} data={items} value={['abc']} />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, placeholder);

    const instance2 = getDOMNode(<MultiCascader renderValue={() => placeholder} />);
    assert.equal(instance2.querySelector(toggleClassName).innerText, 'Select');
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

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').innerText, `2${placeholder}`);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<MultiCascader renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
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

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should be active by value', () => {
    const value = ['abcd'];
    const instance = getInstance(<MultiCascader defaultOpen data={items} value={value} />);
    assert.equal(instance.overlay.querySelector('.rs-checkbox-checked').innerText, value);
  });

  it('Should be active by defaultValue', () => {
    const value = ['abcd'];
    const instance = getInstance(<MultiCascader defaultOpen data={items} defaultValue={value} />);
    assert.equal(instance.overlay.querySelector('.rs-checkbox-checked').innerText, value);
  });

  it('Should call onSelect callback ', done => {
    const doneOp = () => {
      done();
    };

    const instance = getInstance(<MultiCascader data={items} defaultOpen onSelect={doneOp} />);
    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-checkbox'));
  });

  it('Should call onChange callback ', done => {
    const doneOp = value => {
      if (value[0] === 'abc') {
        done();
      }
    };

    const instance = getInstance(<MultiCascader data={items} defaultOpen onChange={doneOp} />);
    const menu = instance.overlay.querySelector('.rs-checkbox-wrapper');

    ReactTestUtils.Simulate.click(menu);
  });

  it('Should call onClean callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <MultiCascader data={items} defaultValue={['abc']} onClean={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<MultiCascader onOpen={doneOp} data={items} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<MultiCascader defaultOpen onClose={doneOp} data={items} />);
    picker.close();
  });

  it('Should clean selected default value', () => {
    const ref = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(
        <MultiCascader ref={ref} defaultOpen data={items} defaultValue={['abcde-1']} />,
        container
      );
    });

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.click(ref.current.root.querySelector('.rs-picker-toggle-clean'));
    });

    assert.equal(
      ref.current.root.querySelector('.rs-picker-toggle-placeholder').innerText,
      'Select'
    );
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<MultiCascader className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<MultiCascader style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<MultiCascader classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getInstance(<MultiCascader open data={items} toggleAs={Button} />);
    assert.ok(instance.root.querySelector('.rs-btn'));
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<MultiCascader value={['Test']} renderValue={() => '1'} />);
    const instance2 = getDOMNode(<MultiCascader value={['Test']} renderValue={() => null} />);
    const instance3 = getDOMNode(<MultiCascader value={['Test']} renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').innerText, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');

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
    ReactTestUtils.act(() => {
      ReactDOM.render(<TestApp ref={ref} />, container);
    });

    assert.equal(ref.current.picker.root.querySelector('.rs-picker-value-list').innerText, 'abc');

    ReactTestUtils.act(() => {
      ref.current.setValue([]);
    });

    assert.equal(
      ref.current.picker.root.querySelector('.rs-picker-toggle-placeholder').innerText,
      'Select'
    );
  });

  it('Should call onSelect callback with 3 params', done => {
    let checkbox = null;
    const doneOp = (node, cascadeData, event) => {
      if (node.value === 'abcd' && cascadeData[0].value === 'abcd' && event.target === checkbox) {
        done();
      }
    };

    const instance = getInstance(<MultiCascader defaultOpen data={items} onSelect={doneOp} />);
    checkbox = instance.overlay.querySelectorAll('.rs-checkbox')[1];
    ReactTestUtils.Simulate.click(checkbox);
  });

  it('Should call onCheck callback ', done => {
    let checkbox = null;
    const doneOp = (value, item, checked, event) => {
      if (value[0] === 'abc' && item.value === 'abc' && checked && event.target === checkbox) {
        done();
      }
    };

    const instance = getInstance(<MultiCascader data={items} defaultOpen onCheck={doneOp} />);
    checkbox = instance.overlay.querySelector('.rs-checkbox-wrapper');
    ReactTestUtils.Simulate.click(checkbox);
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
    ReactTestUtils.act(() => {
      ReactDOM.render(<TestApp ref={ref} />, container);
    });

    const overlay = ref.current.picker.overlay;

    assert.equal(overlay.querySelectorAll('.rs-check-item').length, 0);

    ReactTestUtils.act(() => {
      ref.current.setData([{ label: 'test', value: 1 }]);
    });

    assert.equal(overlay.querySelectorAll('.rs-check-item').length, 1);
    assert.equal(overlay.querySelector('.rs-check-item').innerText, 'test');
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

    assert.equal(instance.overlay.querySelectorAll('.rs-check-item')[1].innerText, '2');
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
});
