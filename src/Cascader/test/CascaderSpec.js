import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Cascader from '../Cascader';
import Button from '../../Button';
import { getDOMNode, getInstance, createTestContainer } from '@test/testUtils';

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

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Cascader', () => {
  it('Should output a picker', () => {
    const Title = 'Title';
    const instance = getDOMNode(<Cascader>{Title}</Cascader>);

    assert.ok(instance.className.match(/\bpicker-cascader\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Cascader disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be inline', () => {
    const instance = getInstance(<Cascader inline />);
    assert.ok(instance.overlay.className.match(/\brs-picker-inline\b/));
    assert.ok(instance.overlay.querySelector('.rs-picker-cascader-menu-items'));
  });

  it('Should output a placeholder', () => {
    const placeholder = 'foobar';
    const instance = getDOMNode(<Cascader placeholder={placeholder} />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, placeholder);
  });

  it('Should output a button', () => {
    const instance = getInstance(<Cascader toggleAs="button" />);
    assert.ok(instance.root.querySelector('button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<Cascader block />);

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
    const instance3 = getDOMNode(<Cascader renderValue={v => [v, placeholder]} value={''} />);

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').innerText, `2${placeholder}`);
    assert.equal(instance3.querySelector('.rs-picker-toggle-value').innerText, placeholder);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<Cascader renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<Cascader value={2} placeholder={'test'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should be active by value', () => {
    const value = '2';
    const instance = getInstance(<Cascader defaultOpen data={items} value={value} />);

    assert.equal(
      instance.overlay.querySelector('.rs-picker-cascader-menu-item-active').innerText,
      value
    );
  });

  it('Should be active by defaultValue', () => {
    const value = '2';
    const instance = getInstance(<Cascader defaultOpen data={items} defaultValue={value} />);

    assert.equal(
      instance.overlay.querySelector('.rs-picker-cascader-menu-item-active').innerText,
      value
    );
  });

  it('Should call onSelect callback ', done => {
    const doneOp = node => {
      if (node.value === '2') {
        done();
      }
    };
    const instance = getInstance(<Cascader data={items} defaultOpen onSelect={doneOp} />);
    ReactTestUtils.Simulate.click(
      instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[1]
    );
  });

  it('Should call onChange callback ', done => {
    const doneOp = value => {
      if (value === '2') {
        done();
      }
    };

    const instance = getInstance(<Cascader data={items} defaultOpen onChange={doneOp} />);
    ReactTestUtils.Simulate.click(
      instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[1]
    );
  });

  it('Should call onChange callback by `parentSelectable`', done => {
    const doneOp = value => {
      if (value === '3') {
        done();
      }
    };

    const instance = getInstance(
      <Cascader data={items} defaultOpen parentSelectable onChange={doneOp} />
    );
    ReactTestUtils.Simulate.click(
      instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[2]
    );
  });

  it('Should call onClean callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Cascader data={items} defaultValue={'3-1'} onClean={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<Cascader onOpen={doneOp} data={items} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<Cascader defaultOpen onClose={doneOp} data={items} />);
    picker.close();
  });

  it('Should clean selected default value', () => {
    const instance = getDOMNode(<Cascader defaultOpen data={items} defaultValue={'3-1'} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-placeholder').innerText).to.equal('Select');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Cascader className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Cascader style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Cascader classPrefix="custom-prefix" />);
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

    ReactTestUtils.Simulate.click(
      instance.overlay.querySelector(
        '.rs-picker-cascader-menu-has-children .rs-picker-cascader-menu-item'
      )
    );

    assert.equal(
      instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[1].innerText,
      '2'
    );
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
      <Cascader open data={[{ label: '1', value: '1', children: [] }]} getChildren={fetchNodes} />
    );

    ReactTestUtils.Simulate.click(
      instance.overlay.querySelector(
        '.rs-picker-cascader-menu-has-children .rs-picker-cascader-menu-item'
      )
    );
    assert.ok(instance.overlay.querySelector('.rs-icon.rs-icon-spin'));
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<Cascader value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<Cascader value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(<Cascader value="Test" renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').innerText, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');

    assert.include(instance1.className, 'rs-picker-has-value');
    assert.notInclude(instance2.className, 'rs-picker-has-value');
    assert.notInclude(instance3.className, 'rs-picker-has-value');
  });

  it('Should update path', () => {
    const TestApp = React.forwardRef((props, ref) => {
      const [value, setValue] = React.useState('2');
      const pickerRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        picker: pickerRef.current,
        setValue
      }));

      return <Cascader {...props} ref={pickerRef} defaultOpen data={items} value={value} open />;
    });

    TestApp.displayName = 'TestApp';

    const ref = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(<TestApp ref={ref} />, container);
    });

    assert.equal(ref.current.picker.root.querySelector('.rs-picker-toggle-value').innerText, '2');
    assert.equal(
      ref.current.picker.overlay.querySelector('.rs-picker-cascader-menu-item-active').innerText,
      '2'
    );

    ReactTestUtils.act(() => {
      ref.current.setValue(null);
    });

    assert.equal(
      ref.current.picker.root.querySelector('.rs-picker-toggle-placeholder').innerText,
      'Select'
    );
  });

  it('Should update columns', () => {
    const TestApp = React.forwardRef((props, ref) => {
      const [data, setData] = React.useState([]);
      const pickerRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        picker: pickerRef.current,
        setData
      }));

      return <Cascader {...props} ref={pickerRef} data={data} open />;
    });

    TestApp.displayName = 'TestApp';

    const ref = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(<TestApp ref={ref} />, container);
    });

    assert.equal(
      ref.current.picker.overlay.querySelectorAll('.rs-picker-cascader-menu-item').length,
      0
    );

    ReactTestUtils.act(() => {
      ref.current.setData([{ label: 'test', value: 1 }]);
    });

    assert.equal(
      ref.current.picker.overlay.querySelectorAll('.rs-picker-cascader-menu-item').length,
      1
    );
    assert.equal(
      ref.current.picker.overlay.querySelector('.rs-picker-cascader-menu-item').innerText,
      'test'
    );
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

    const cascaderRef = React.createRef();

    ReactTestUtils.act(() => {
      ReactDOM.render(
        <Cascader
          ref={cascaderRef}
          defaultOpen
          data={itemsWithChildrenKey.data}
          childrenKey={itemsWithChildrenKey.childrenKey}
        />,
        createTestContainer()
      );
    });

    ReactTestUtils.act(() => {
      const input = cascaderRef.current.overlay.querySelector('.rs-picker-search-bar-input');

      ReactTestUtils.Simulate.focus(input);

      input.value = 'g';
      ReactTestUtils.Simulate.change(input);
    });

    ReactTestUtils.act(() => {
      const searchResult = cascaderRef.current.overlay.querySelectorAll('.rs-picker-cascader-row');

      assert.equal(searchResult.length, 2);
    });
  });

  describe('ref testing', () => {
    it('Should call onOpen', done => {
      const doneOp = () => {
        done();
      };

      const instance = getInstance(<Cascader onOpen={doneOp} data={items} />);
      instance.open();
    });

    it('Should call onClose', done => {
      const doneOp = () => {
        done();
      };

      const instance = getInstance(<Cascader onClose={doneOp} data={items} />);
      instance.open();
      instance.close();
    });
  });

  it('Should update columns', () => {
    const TestApp = React.forwardRef((props, ref) => {
      const [data, setData] = React.useState([]);
      const pickerRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        setData,
        picker: pickerRef.current
      }));

      return <Cascader {...props} ref={pickerRef} data={data} open />;
    });
    const ref = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(<TestApp ref={ref} />, container);
    });

    const overlay = ref.current.picker.overlay;

    assert.equal(overlay.querySelectorAll('.rs-picker-cascader-menu-item').length, 0);

    ReactTestUtils.act(() => {
      ref.current.setData([{ label: 'test', value: 1 }]);
    });

    assert.equal(overlay.querySelectorAll('.rs-picker-cascader-menu-item').length, 1);
    assert.equal(overlay.querySelector('.rs-picker-cascader-menu-item').innerText, 'test');
  });
});
