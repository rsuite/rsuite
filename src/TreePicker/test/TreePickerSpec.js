import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findDOMNode } from 'react-dom';
import { getDOMNode, getInstance } from '@test/testUtils';
import TreePicker from '../TreePicker';

Enzyme.configure({ adapter: new Adapter() });

export const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

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
    const instance = getDOMNode(<TreePicker data={data} defaultValue={'Master'} />);

    expect(instance.querySelector('.rs-picker-toggle-value').innerText).to.equal('Master');
  });

  it('Should clean selected value', () => {
    const instance = getDOMNode(<TreePicker data={data} defaultValue={'Master'} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle').innerText).to.equal('Select');
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<TreePicker data={data} defaultValue={'Master'} />);
    assert.ok(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should render TreePicker Menu', () => {
    const instance = getDOMNode(<TreePicker data={data} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
    expect(document.querySelectorAll('.rs-picker-tree-menu').length).to.equal(1);
  });

  it('Should output a button', () => {
    const instance = getInstance(<TreePicker toggleComponentClass="button" data={[]} />);

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<TreePicker disabled data={[]} />);

    assert.ok(instance.className.match(/\bdisabled\b/));
    assert.equal(instance.querySelector('[role=combobox]').getAttribute('aria-disabled'), 'true');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<TreePicker block data={[]} />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active 4 node by `value`', () => {
    const instance = getDOMNode(<TreePicker inline data={data} value={'Master'} />);

    expect(instance.querySelectorAll('.rs-tree-node-active').length).to.equal(1);
  });

  it('Should expand children nodes', () => {
    const instance = getDOMNode(
      <TreePicker inline cascade={false} data={data} value={['Master']} />
    );

    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-tree-node-expand-icon')[0]);
    expect(instance.querySelectorAll('.rs-tree-open').length).to.equal(1);
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<TreePicker data={data} placeholder="test" />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
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

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').innerText, 'Selected: 2');
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').innerText, `5${placeholder}`);
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, placeholder);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<TreePicker data={[]} renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<TreePicker placeholder="test" data={data} value={['4']} />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = values => {
      done();
    };
    const instance = getDOMNode(<TreePicker inline onChange={doneOp} data={data} />);

    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-tree-node-label')[0]);
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <TreePicker data={data} defaultValue={'tester0'} onClean={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onOpen` callback', done => {
    const cb = () => {
      done();
    };

    const instance = getDOMNode(<TreePicker onOpen={cb} data={data} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
  });

  it('Should call `onClose` callback', done => {
    const cb = () => {
      done();
    };

    const instance = getDOMNode(<TreePicker onClose={cb} data={data} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
  });

  it('Should focus item by keyCode=40', done => {
    const instance = getInstance(
      <TreePicker
        open
        data={data}
        defaultExpandAll
        value="tester1"
        onChange={value => {
          if (value === 'tester2') {
            done();
          }
        }}
      />
    );
    const tree = instance.treeViewRef.current;
    tree.querySelector('span[title="tester1"]').focus();

    ReactTestUtils.Simulate.keyDown(tree, { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(tree, { keyCode: 13 });

    assert.equal(document.activeElement.innerText, 'tester2');
  });

  it('Should focus item by keyCode=38 ', done => {
    const instance = getInstance(
      <TreePicker
        open
        data={data}
        defaultExpandAll
        value="tester1"
        onChange={value => {
          if (value === 'tester0') {
            done();
          }
        }}
      />
    );
    const tree = instance.treeViewRef.current;

    tree.querySelector('span[title="tester1"]').focus();

    ReactTestUtils.Simulate.keyDown(tree, { keyCode: 38 });
    ReactTestUtils.Simulate.keyDown(tree, { keyCode: 13 });

    assert.equal(document.activeElement.innerText, 'tester0');
  });

  it('Should focus item by keyCode=13 ', done => {
    const doneOp = values => {
      done();
    };
    const instance = mount(<TreePicker data={data} onChange={doneOp} inline defaultExpandAll />);
    instance.find('span[data-key="0-0"]').simulate('click');
    instance.find('span[data-key="0-0"]').simulate('keydown', {
      keyCode: 13
    });
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TreePicker className="custom" data={data} />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TreePicker style={{ fontSize }} data={data} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom menuStyle', () => {
    const fontSize = '12px';
    const instance = getInstance(<TreePicker open menuStyle={{ fontSize }} data={data} />);
    assert.equal(findDOMNode(instance.menuRef.current).style.fontSize, fontSize);
  });

  it('Should load data async', () => {
    let activeNode = null;
    let layer = 0;
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
    const mockOnExpand = (node, l, concat) => {
      activeNode = node;
      layer = l;
      newData = concat(data, children);
    };

    const instance = mount(
      <TreePicker data={data} onExpand={mockOnExpand} inline cascade={false} defaultExpandAll />
    );
    instance.find('div[data-ref="0-1"]  > .rs-tree-node-expand-icon').simulate('click');

    instance.setProps({
      data: newData
    });

    assert.equal(instance.html().indexOf('data-key="0-1-0"') > -1, true);

    instance.unmount();
  });

  it('Should render one node when searchKeyword is `M`', () => {
    const instance = mount(<TreePicker data={data} inline searchKeyword="M" />);

    assert.equal(instance.find('.rs-tree-node').length, 1);
    instance.unmount();
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TreePicker data={data} classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('should render tree node with custom dom', () => {
    const customData = [
      {
        value: '1',
        label: <span className="custom-label">1</span>
      }
    ];
    const instance = mount(<TreePicker data={customData} inline />);
    assert.equal(instance.find('.custom-label').length, 1);
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<TreePicker onOpen={doneOp} data={data} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<TreePicker defaultOpen onClose={doneOp} data={data} />);
    picker.close();
  });

  it('should render with expand master node', () => {
    const instance = mount(<TreePicker data={data} inline expandItemValues={['Master']} />);
    assert.equal(instance.find('.rs-tree-node-expanded').length, 1);
  });

  it('should fold all the node when toggle master node', () => {
    let expandItemValues = [];
    const mockOnExpand = values => {
      expandItemValues = values;
    };
    const instance = mount(
      <TreePicker data={data} inline expandItemValues={['Master']} onExpand={mockOnExpand} />
    );

    assert.equal(instance.html().indexOf('rs-tree-node-expanded') > -1, true);

    instance.find('div[data-ref="0-0"]  > .rs-tree-node-expand-icon').simulate('click');

    instance.setProps({
      expandItemValues
    });
    assert.equal(instance.html().indexOf('rs-tree-node-expanded') === -1, true);

    instance.unmount();
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
    const list = getDOMNode(instance.menuRef.current).querySelectorAll('.rs-tree-node');
    assert.equal(list.length, 1);
    assert.ok(list[0].innerText, 'Louisa');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<TreePicker value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<TreePicker value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(<TreePicker value="Test" renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').innerText, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });
});
