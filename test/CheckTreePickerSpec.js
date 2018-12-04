import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from 'react-test-renderer';
import { findDOMNode } from 'react-dom';
import { namespace } from 'rsuite-utils/lib/Picker/constants';
import CheckTreePicker from '../src/CheckTreePicker/CheckTree';
import { clone } from '../src/utils';

Enzyme.configure({ adapter: new Adapter() });

const classPrefix = `.${namespace}-checktree`;
const checkTreeMenuCls = `${classPrefix}-menu`;
const treeViewCls = `${classPrefix}-view`;
const treeNodeCls = `${treeViewCls}-node`;
const treeNodeLabelCls = `${treeViewCls}-checknode-label`;
const expandIconCls = `${treeViewCls}-node-expand-icon`;
const valueCls = `.${namespace}-toggle-value`;
const selectedItemsCls = `.${namespace}-value-item`;
const toggleCls = `.${namespace}-toggle`;
const toggleCleanCls = `.${namespace}-toggle-clean`;
const customToggleClass = `.${namespace}-toggle-custom`;
const placeholderCls = `${toggleCls}-placeholder`;
const treeNodeCheckedCls = `${treeViewCls}-node-checked`;
const nodeChildrenOpenCls = `${treeViewCls}-open`;
const expandIconWrapperCls = `${treeViewCls}-node-expand-icon-wrapper`;
const searchInput = `${namespace}-search-bar-input`;
const inputWrapperCls = `${treeViewCls}-input-wrapper`;

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
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker data={data} defaultValue={['Master']} />
    );
    const instanceDOM = findDOMNode(instance);
    expect(instanceDOM.querySelector(`${valueCls} ${selectedItemsCls}`).innerText).to.equal(
      'Master (All)'
    );
  });

  it('Should clean selected value', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker data={data} defaultValue={['Master']} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector(toggleCleanCls));
    expect(instanceDOM.querySelector(toggleCls).innerText).to.equal('Select');
  });

  it('Should output a clean button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker data={data} defaultValue={['Master']} />
    );
    assert.ok(findDOMNode(instance).querySelector(toggleCleanCls));
  });

  it('Should render CheckTreePicker Menu', () => {
    const instance = ReactTestUtils.renderIntoDocument(<CheckTreePicker data={data} />);
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector(toggleCls));
    expect(document.querySelectorAll(checkTreeMenuCls).length).to.equal(1);
  });

  it('Should output a button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker toggleComponentClass="button" data={[]} />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<CheckTreePicker disabled data={[]} />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bdisabled\b/));
  });

  it('Should be block', () => {
    const instance = ReactTestUtils.renderIntoDocument(<CheckTreePicker block data={[]} />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bblock\b/));
  });

  it('Should active 4 node by `value` when cascade is true', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker inline data={data} value={['Master']} />
    );
    const instanceDOM = findDOMNode(instance);
    expect(instanceDOM.querySelectorAll(treeNodeCheckedCls).length).to.equal(4);
  });

  it('Should active 1 node by `value` when cascade is false', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker inline cascade={false} data={data} value={['Master']} />
    );
    const instanceDOM = findDOMNode(instance);
    expect(instanceDOM.querySelectorAll(treeNodeCheckedCls).length).to.equal(1);
  });

  it('Should expand children nodes', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker inline cascade={false} data={data} value={['Master']} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelectorAll(expandIconCls)[0]);
    expect(instanceDOM.querySelectorAll(nodeChildrenOpenCls).length).to.equal(1);
  });

  it('Should have a placeholder', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker data={data} placeholder="test" />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector(placeholderCls).innerText, 'test');
  });

  it('Should render value by `renderValue`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker
        data={[{ label: '1', value: '1' }, { label: '2', value: '2' }]}
        value={['1', '2']}
        renderValue={value => value.join(',')}
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector(valueCls).innerText, '1,2');
  });

  it('Should render a placeholder when value error', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker placeholder="test" data={data} value={['4']} />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector(placeholderCls).innerText, 'test');
  });

  it('Should call `onChange` callback with 1 values', done => {
    const doneOp = values => {
      if (values.length === 1) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker inline onChange={doneOp} data={data} />
    );
    const instanceDOM = findDOMNode(instance);

    ReactTestUtils.Simulate.change(instanceDOM.querySelectorAll(`${treeNodeCls} input`)[3]);
  });

  it('Should call `onOpen` callback', done => {
    const cb = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(<CheckTreePicker onOpen={cb} data={data} />);
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector(toggleCls));
  });

  it('Should call `onClose` callback', done => {
    const cb = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker onClose={cb} data={data} />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector(toggleCls));
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector(toggleCls));
  });

  it('Should focus item by keyCode=40 ', () => {
    const instance = mount(<CheckTreePicker data={data} cascade={false} expandAll />);

    instance.find(toggleCls).simulate('click');
    instance.find(toggleCls).simulate('keydown', {
      keyCode: 40
    });
    instance.find('span[data-key="0-0"]').simulate('keydown', {
      keyCode: 40
    });

    assert.equal(instance.find('span[data-key="0-0-0"]').text(), document.activeElement.innerText);
    instance.unmount();
  });

  it('Should focus item by keyCode=38 ', () => {
    const instance = mount(<CheckTreePicker data={data} cascade={false} expandAll />);

    instance.find(toggleCls).simulate('click');
    instance.find(toggleCls).simulate('keydown', {
      keyCode: 40
    });
    instance.find('span[data-key="0-0"]').simulate('keydown', {
      keyCode: 38
    });

    assert.equal(instance.find('span[data-key="0-1"]').text(), document.activeElement.innerText);
    instance.unmount();
  });

  it('Should focus item by keyCode=13 ', done => {
    const doneOp = values => {
      done();
    };

    const instance = mount(
      <CheckTreePicker data={data} onChange={doneOp} inline cascade={false} expandAll />
    );

    instance.find('span[data-key="0-0"]').simulate('click');
    expect(instance.find('span[data-key="0-0"]').getElement() === document.activeElement);

    instance.find('span[data-key="0-0"]').simulate('keydown', {
      keyCode: 13
    });
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker className="custom" data={data} />
    );
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker style={{ fontSize }} data={data} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom menuStyle', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker menuStyle={{ fontSize }} data={data} open />
    );
    assert.equal(findDOMNode(instance.menu).style.fontSize, fontSize);
  });

  it('Should render node without checkbox', () => {
    const data = [
      {
        value: 1,
        label: 1
      }
    ];
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker data={data} disabledCheckboxValues={[1]} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector(toggleCls));
    assert.equal(instanceDOM.querySelectorAll(`${treeNodeCls}`).length, 0);
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
      <CheckTreePicker data={data} onExpand={mockOnExpand} inline cascade={false} expandAll />
    );
    instance.find(`div[data-ref="0-1"]  > ${expandIconCls}`).simulate('click');
    instance.setProps({
      data: newData
    });

    assert.equal(instance.html().indexOf('data-key="0-1-0"') > -1, true);

    instance.unmount();
  });

  it('Should expandAll nodes when `expandAll` setting true', () => {
    const instance = mount(<CheckTreePicker data={data} inline />);

    instance.setProps({
      expandAll: false
    });
    assert.equal(instance.find(`${nodeChildrenOpenCls}`).length, 0);

    instance.setProps({
      expandAll: true
    });
    assert.equal(instance.find(`${nodeChildrenOpenCls}`).length, 2);
    instance.unmount();
  });

  it('Should render empty tree when searchKeyword is `name`', () => {
    const instance = mount(<CheckTreePicker data={data} inline searchKeyword="name" />);
    assert.equal(instance.find(treeNodeCls).length, 0);
    instance.unmount();
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker data={data} classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });

  it('should render tree without checkbox', () => {
    const instance = mount(
      <CheckTreePicker
        data={data}
        inline
        uncheckableItemValues={['tester0', 'disabled', 'tester1', 'tester2', 'Master']}
      />
    );

    assert.equal(instance.find(inputWrapperCls).length, 0);
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
});
