import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getDOMNode, getInstance } from '@test/testUtils';
import CheckTreePicker from '../CheckTreePicker';
import ReactDOM, { findDOMNode } from 'react-dom';
import { assert } from 'chai';

Enzyme.configure({ adapter: new Adapter() });

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

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

describe('CheckTreePicker', () => {
  it('Should render default value', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} defaultValue={['Master']} />);

    expect(
      instance.querySelector('.rs-picker-toggle-value .rs-picker-value-item').innerText
    ).to.equal('Master (All)');
  });

  it('Should clean selected value', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} defaultValue={['Master']} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle').innerText).to.equal('Select');
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} defaultValue={['Master']} />);
    assert.ok(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should render CheckTreePicker Menu', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
    expect(document.querySelectorAll('.rs-picker-check-tree-menu').length).to.equal(1);
  });

  it('Should output a button', () => {
    const instance = getInstance(<CheckTreePicker toggleComponentClass="button" data={[]} />);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<CheckTreePicker disabled data={[]} />);

    assert.ok(instance.className.match(/\bdisabled\b/));
    assert.equal(instance.querySelector('[role=combobox]').getAttribute('aria-disabled'), 'true');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<CheckTreePicker block data={[]} />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active 4 node by `value` when cascade is true', () => {
    const instance = getDOMNode(<CheckTreePicker inline data={data} value={['Master']} />);
    expect(instance.querySelectorAll('.rs-checkbox-checked').length).to.equal(4);
  });

  it('Should active 1 node by `value` when cascade is false', () => {
    const instance = getDOMNode(
      <CheckTreePicker inline cascade={false} data={data} value={['Master']} />
    );
    expect(instance.querySelectorAll('.rs-checkbox-checked').length).to.equal(1);
  });

  it('Should expand children nodes', () => {
    const instance = getDOMNode(
      <CheckTreePicker inline cascade={false} data={data} value={['Master']} />
    );

    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-check-tree-node-expand-icon')[0]);
    expect(instance.querySelectorAll('.rs-check-tree-open').length).to.equal(1);
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} placeholder="test" />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
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
      <CheckTreePicker renderValue={v => [v, placeholder]} data={[]} value={[2]} />
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

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, '1,2');
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').innerText, `2${placeholder}`);
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, placeholder);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<CheckTreePicker data={[]} renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<CheckTreePicker placeholder="test" data={data} value={['4']} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should call `onChange` callback with 1 values', done => {
    const doneOp = values => {
      if (values.length === 1) {
        done();
      }
    };
    const instance = getDOMNode(<CheckTreePicker inline onChange={doneOp} data={data} />);

    ReactTestUtils.Simulate.change(instance.querySelectorAll('.rs-check-tree-node input')[3]);
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <CheckTreePicker data={data} defaultValue={['tester0']} onClean={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onOpen` callback', done => {
    const cb = () => {
      done();
    };

    const instance = getDOMNode(<CheckTreePicker onOpen={cb} data={data} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
  });

  it('Should call `onClose` callback', done => {
    const cb = () => {
      done();
    };

    const instance = getDOMNode(<CheckTreePicker onClose={cb} data={data} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<CheckTreePicker onOpen={doneOp} data={data} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<CheckTreePicker defaultOpen onClose={doneOp} data={data} />);
    picker.close();
  });

  it('Should focus item by keyCode=40 ', () => {
    const instance = getInstance(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);
    const toggle = findDOMNode(instance.getToggleInstance().toggleRef.current);
    ReactTestUtils.Simulate.keyDown(toggle, { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(toggle, { keyCode: 40 });
    assert.equal(document.activeElement.innerText, 'tester0');
  });

  it('Should focus item by keyCode=38 ', () => {
    ReactTestUtils.Simulate.keyDown(document.activeElement, { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(document.activeElement, { keyCode: 38 });
    assert.equal(document.activeElement.innerText, 'tester0');
  });

  it('Should focus item by keyCode=13 ', done => {
    const doneOp = () => {
      done();
    };

    const instance = mount(
      <CheckTreePicker data={data} onChange={doneOp} inline cascade={false} defaultExpandAll />
    );

    instance.find('div[data-key="0-0"]').simulate('click');
    expect(instance.find('div[data-key="0-0"]').getElement() === document.activeElement);
    instance.find('div[data-key="0-0"]').simulate('keydown', {
      keyCode: 13
    });
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<CheckTreePicker className="custom" data={data} />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<CheckTreePicker style={{ fontSize }} data={data} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom menuStyle', () => {
    const fontSize = '12px';
    const instance = getInstance(<CheckTreePicker menuStyle={{ fontSize }} data={data} open />);
    assert.equal(getDOMNode(instance.menuRef.current).style.fontSize, fontSize);
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
    const children = [
      {
        label: 'children1',
        value: 'children1'
      }
    ];

    let newData = [];
    const mockOnExpand = (_expandItemValues, _node, concat) => {
      newData = concat(data, children);
    };

    const instance = mount(
      <CheckTreePicker
        data={data}
        onExpand={mockOnExpand}
        inline
        cascade={false}
        defaultExpandAll
      />
    );
    instance.find('div[data-ref="0-1"]  > .rs-check-tree-node-expand-icon').simulate('click');
    instance.setProps({ data: newData });

    assert.equal(instance.html().indexOf('data-key="0-1-0"') > -1, true);

    instance.unmount();
  });

  it('Should return 2 values', done => {
    const customData = [
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

    const doneOp = values => {
      if (values.length === 2) {
        done();
      }
    };
    const instance = getDOMNode(
      <CheckTreePicker
        data={customData}
        inline
        value={['1-1', '1-2', '1-3']}
        cascade
        defaultExpandAll
        onChange={doneOp}
      />
    );

    assert.equal(instance.querySelectorAll('.rs-checkbox-checked').length, 4);
    ReactTestUtils.Simulate.change(instance.querySelectorAll('.rs-check-tree-node input')[5]);
  });

  it('Should render empty tree when searchKeyword is `name`', () => {
    const instance = mount(<CheckTreePicker data={data} inline searchKeyword="name" />);
    assert.equal(instance.find('.rs-check-tree-node').length, 0);
    instance.unmount();
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<CheckTreePicker data={data} classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('should render tree without checkbox', () => {
    const instance = mount(
      <CheckTreePicker
        data={data}
        inline
        uncheckableItemValues={['tester0', 'disabled', 'tester1', 'tester2', 'Master']}
      />
    );

    assert.equal(instance.find('.rs-check-tree-node-input-wrapper').length, 0);
  });

  it('should render tree node with custom dom', () => {
    const customData = [
      {
        value: '1',
        label: <span className="custom-label">1</span>
      }
    ];
    const instance = mount(<CheckTreePicker data={customData} inline />);

    assert.equal(instance.find('.custom-label').length, 1);
  });

  it('should render with expand master node', () => {
    const instance = mount(<CheckTreePicker data={data} inline expandItemValues={['Master']} />);
    assert.equal(instance.find('.rs-check-tree-node-expanded').length, 1);
  });

  it('should fold all the node when toggle master node', () => {
    let expandItemValues = [];
    const mockOnExpand = values => {
      expandItemValues = values;
    };
    const instance = mount(
      <CheckTreePicker data={data} inline expandItemValues={['Master']} onExpand={mockOnExpand} />
    );

    assert.equal(instance.html().indexOf('rs-check-tree-node-expanded') > -1, true);

    instance.find('div[data-ref="0-0"]  > .rs-check-tree-node-expand-icon').simulate('click');

    instance.setProps({
      expandItemValues
    });
    assert.equal(instance.html().indexOf('rs-check-tree-node-expanded') === -1, true);

    instance.unmount();
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
    const list = getDOMNode(instance.menuRef.current).querySelectorAll('.rs-check-tree-node');
    assert.equal(list.length, 1);
    assert.ok(list[0].innerText, 'Louisa');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<CheckTreePicker value={['test']} renderValue={() => '1'} />);
    const instance2 = getDOMNode(<CheckTreePicker value={['test']} renderValue={() => null} />);
    const instance3 = getDOMNode(
      <CheckTreePicker value={['test']} renderValue={() => undefined} />
    );

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').innerText, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should controlled by value', () => {
    const TestApp = React.forwardRef((props, ref) => {
      const [value, setValue] = React.useState();
      const pickerRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        picker: pickerRef.current,
        setValue
      }));

      return <CheckTreePicker data={data} ref={pickerRef} value={value} defaultExpandAll open />;
    });

    TestApp.displayName = 'TestCheckTreePicker';

    const ref = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(<TestApp ref={ref} />, container);
    });

    assert.equal(
      ref.current.picker.treeViewRef.current.querySelectorAll('.rs-checkbox-checked').length,
      0
    );

    ReactTestUtils.act(() => {
      ref.current.setValue(['Master']);
    });
    assert.equal(
      ref.current.picker.treeViewRef.current.querySelectorAll('.rs-checkbox-checked').length,
      4
    );
  });

  it('Should controlled by expandItemValues', () => {
    const TestApp = React.forwardRef((props, ref) => {
      const [expandItemValues, setExpandItemValues] = React.useState();
      const pickerRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        picker: pickerRef.current,
        setExpandItemValues
      }));

      return (
        <CheckTreePicker data={data} ref={pickerRef} expandItemValues={expandItemValues} open />
      );
    });

    TestApp.displayName = 'TestCheckTreePicker';

    const ref = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(<TestApp ref={ref} />, container);
    });

    assert.equal(
      ref.current.picker.treeViewRef.current.querySelectorAll('.rs-check-tree-node-expanded')
        .length,
      0
    );

    ReactTestUtils.act(() => {
      ref.current.setExpandItemValues(['Master']);
    });
    assert.equal(
      ref.current.picker.treeViewRef.current.querySelectorAll('.rs-check-tree-node-expanded')
        .length,
      1
    );
  });

  it('Should controlled by uncheckableItemValues', () => {
    const TestApp = React.forwardRef((props, ref) => {
      const [uncheckableItemValues, setUncheckableItemValues] = React.useState();
      const pickerRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        picker: pickerRef.current,
        setUncheckableItemValues
      }));

      return (
        <CheckTreePicker
          data={data}
          ref={pickerRef}
          uncheckableItemValues={uncheckableItemValues}
          open
        />
      );
    });

    TestApp.displayName = 'TestCheckTreePicker';

    const ref = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(<TestApp ref={ref} />, container);
    });

    assert.equal(
      ref.current.picker.treeViewRef.current.querySelectorAll('.rs-checkbox-inner').length,
      5
    );

    ReactTestUtils.act(() => {
      ref.current.setUncheckableItemValues(['Master']);
    });
    assert.equal(
      ref.current.picker.treeViewRef.current.querySelectorAll('.rs-checkbox-inner').length,
      4
    );
  });
});
