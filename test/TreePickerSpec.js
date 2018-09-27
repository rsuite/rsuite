import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from 'react-test-renderer';
import { findDOMNode } from 'react-dom';
import { namespace } from 'rsuite-utils/lib/Picker/constants';
import TreePicker from '../src/TreePicker/Tree';
import { clone } from '../src/utils';

Enzyme.configure({ adapter: new Adapter() });

const classPrefix = `.${namespace}-tree`;
const TreeMenuCls = `${classPrefix}-menu`;
const treeViewCls = `${classPrefix}-view`;
const treeNodeCls = `${treeViewCls}-node`;
const treeNodeLabelCls = `${treeViewCls}-node-label`;
const expandIconCls = `${treeViewCls}-node-expand-icon`;
const valueCls = `.${namespace}-toggle-value`;
const toggleCls = `.${namespace}-toggle`;
const toggleCleanCls = `.${namespace}-toggle-clean`;
const customToggleClass = `.${namespace}-toggle-custom`;
const placeholderCls = `${toggleCls}-placeholder`;
const treeNodeActiveCls = `${treeViewCls}-node-active`;
const nodeChildrenOpenCls = `${treeViewCls}-open`;
const expandIconWrapperCls = `${treeViewCls}-node-expand-icon-wrapper`;
const searchInput = `${namespace}-search-bar-input`;

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
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker data={data} defaultValue={'Master'} />
    );
    const instanceDOM = findDOMNode(instance);
    expect(instanceDOM.querySelector(valueCls).innerText).to.equal('Master');
  });

  it('Should clean selected value', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker data={data} defaultValue={'Master'} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector(toggleCleanCls));
    expect(instanceDOM.querySelector(toggleCls).innerText).to.equal('Select');
  });

  it('Should output a clean button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker data={data} defaultValue={'Master'} />
    );
    assert.ok(findDOMNode(instance).querySelector(toggleCleanCls));
  });

  it('Should render TreePicker Menu', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TreePicker data={data} />);
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector(toggleCls));
    expect(document.querySelectorAll(TreeMenuCls).length).to.equal(1);
  });

  it('Should output a button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker toggleComponentClass="button" data={[]} />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TreePicker disabled data={[]} />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bdisabled\b/));
  });

  it('Should be block', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TreePicker block data={[]} />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bblock\b/));
  });

  it('Should active 4 node by `value`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker inline data={data} value={'Master'} />
    );
    const instanceDOM = findDOMNode(instance);
    expect(instanceDOM.querySelectorAll(treeNodeActiveCls).length).to.equal(1);
  });

  it('Should expand children nodes', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker inline cascade={false} data={data} value={['Master']} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelectorAll(expandIconCls)[0]);
    expect(instanceDOM.querySelectorAll(nodeChildrenOpenCls).length).to.equal(1);
  });

  it('Should have a placeholder', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker data={data} placeholder="test" />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector(placeholderCls).innerText, 'test');
  });

  it('Should render value by `renderValue`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker
        data={[{ label: '1', value: '1' }, { label: '2', value: '2' }]}
        value={'2'}
        renderValue={activeNode => `Selected: ${activeNode.label}`}
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector(valueCls).innerText, 'Selected: 2');
  });

  it('Should render a placeholder when value error', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker placeholder="test" data={data} value={['4']} />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector(placeholderCls).innerText, 'test');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = values => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker inline onChange={doneOp} data={data} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelectorAll(`${treeNodeLabelCls}`)[0]);
  });

  it('Should call `onOpen` callback', done => {
    const cb = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(<TreePicker onOpen={cb} data={data} />);
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector(toggleCls));
  });

  it('Should call `onClose` callback', done => {
    const cb = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(<TreePicker onClose={cb} data={data} />);
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector(toggleCls));
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector(toggleCls));
  });

  it('Should focus item by keyCode=40', () => {
    const instance = mount(<TreePicker data={data} expandAll />);

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
    const instance = mount(<TreePicker data={data} expandAll />);

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

    const instance = mount(<TreePicker data={data} onChange={doneOp} inline expandAll />);

    instance.find('span[data-key="0-0"]').simulate('click');
    instance.find('span[data-key="0-0"]').simulate('keydown', {
      keyCode: 13
    });
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker className="custom" data={data} />
    );
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker style={{ fontSize }} data={data} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom menuStyle', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker open menuStyle={{ fontSize }} data={data} />
    );
    assert.equal(findDOMNode(instance.menu).style.fontSize, fontSize);
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
    const asyncData = [
      {
        label: 'children1',
        value: 'children1'
      }
    ];
    const mockOnExpand = (node, l) => {
      activeNode = node;
      layer = l;
    };

    const setTreeData = (child, activeNode, layer, treeNodes) => {
      if (layer < 0) {
        return;
      }

      const loop = nodes => {
        nodes.forEach(node => {
          if (node.value === activeNode.value && activeNode.expand) {
            node.children = [...node.children, ...child];
          }
          if (node.children) {
            loop(node.children);
          }
        });
      };

      loop(treeNodes);
      return treeNodes;
    };

    const instance = mount(
      <TreePicker data={data} onExpand={mockOnExpand} inline cascade={false} expandAll />
    );
    instance.find(`div[data-ref="0-1"]  > ${expandIconCls}`).simulate('click');
    const nextTreeData = clone(data);
    setTreeData(asyncData, activeNode, layer, nextTreeData);

    instance.setProps({
      data: nextTreeData
    });

    assert.equal(instance.html().indexOf('data-key="0-1-0"') > -1, true);

    instance.unmount();
  });

  it('Should expandAll nodes when `expandAll` setting true', () => {
    const instance = mount(<TreePicker data={data} inline />);

    instance.setProps({
      expandAll: false
    });
    assert.equal(instance.find(nodeChildrenOpenCls).length, 0);

    instance.setProps({
      expandAll: true
    });
    assert.equal(instance.find(nodeChildrenOpenCls).length, 2);
    instance.unmount();
  });

  it('Should render empty tree when searchKeyword is `1`', () => {
    const instance = mount(<TreePicker data={data} inline searchKeyword="name" />);

    assert.equal(instance.find(treeNodeCls).length, 0);
    instance.unmount();
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TreePicker data={data} classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
