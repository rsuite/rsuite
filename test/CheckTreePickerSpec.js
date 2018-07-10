import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import { namespace } from 'rsuite-utils/lib/Picker/constants';
import CheckTreePicker from '../src/CheckTreePicker';

const classPrefix = `.${namespace}-checktree`;
const checkTreeMenuCls = `${classPrefix}-menu`;
const treeViewCls = `${classPrefix}-view`;
const treeNodeCls = `${treeViewCls}-node`;
const expandIconCls = `${treeViewCls}-node-expand-icon`;
const valueCls = `.${namespace}-toggle-value`;
const toggleCls = `.${namespace}-toggle`;
const toggleCleanCls = `.${namespace}-toggle-clean`;
const customToggleClass = `.${namespace}-toggle-custom`;
const placeholderCls = `${toggleCls}-placeholder`;
const treeNodeCheckedCls = `${treeViewCls}-node-checked`;
const nodeChildrenOpenCls = `${treeViewCls}-open`;
const expandIconWrapperCls = `${treeViewCls}-node-expand-icon-wrapper`;

const data = [
  {
    label: 'Master',
    value: 'Master',
    children: [
      {
        label: 'tester0',
        value: 'Eugenia'
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
    expect(instanceDOM.querySelector(valueCls).innerText).to.equal('4 selected');
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

  it('Shoule active 4 node by `value` when cascade is true', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker inline data={data} value={['Master']} />
    );
    const instanceDOM = findDOMNode(instance);
    expect(instanceDOM.querySelectorAll(treeNodeCheckedCls).length).to.equal(4);
  });

  it('Shoule active 1 node by `value` when cascade is false', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker inline cascade={false} data={data} value={['Master']} />
    );
    const instanceDOM = findDOMNode(instance);
    expect(instanceDOM.querySelectorAll(treeNodeCheckedCls).length).to.equal(1);
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

  it('Should call `onChange` callback', done => {
    const doneOp = values => {
      // console.log(values);
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker inline onChange={doneOp} data={data} />
    );
    const instanceDOM = findDOMNode(instance);

    ReactTestUtils.Simulate.change(instanceDOM.querySelectorAll(`${treeNodeCls} input`)[0]);
  });

  it('Should focus item by keyCode=40 ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker data={data} defaultValue={['Master']} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector(toggleCls));
    ReactTestUtils.Simulate.keyDown(instanceDOM, { keyCode: 40 });
    expect(document.querySelector('span[data-key="0-0"]').innerText).to.equal(
      document.activeElement.innerText
    );

    ReactTestUtils.Simulate.keyDown(instanceDOM, { keyCode: 40 });
    expect(document.querySelector('span[data-key="0-1"]').innerText).to.equal(
      document.activeElement.innerText
    );
  });

  it('Should focus item by keyCode=38 ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker data={data} defaultValue={['Master']} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector(toggleCls));
    ReactTestUtils.Simulate.keyDown(instanceDOM, { keyCode: 38 });

    expect(document.querySelector('span[data-key="0-1"]').innerText).to.equal(
      document.activeElement.innerText
    );
  });

  it('Should focus item by keyCode=13 ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckTreePicker data={data} defaultValue={['Master']} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector(toggleCls));
    ReactTestUtils.Simulate.keyDown(instanceDOM, { keyCode: 40 });
    expect(document.querySelector('span[data-key="0-0"]').innerText).to.equal(
      document.activeElement.innerText
    );
  });
});
