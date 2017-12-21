import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import PanelGroup from '../src/PanelGroup';
import Panel from '../src/Panel';
import innerText from './innerText';
import { globalKey } from '../src/utils/prefix';

describe('PanelGroup', () => {

  it('Should render a PanelGroup', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup>{title}</PanelGroup>
    );
    const instanceDom = findDOMNode(instance);

    assert.equal(instanceDom.tagName, 'DIV');
    assert.ok(instanceDom.className.match(/\bpanel-group\b/));
    assert.equal(innerText(instanceDom), title);
  });

  it('Should render 2 Panels', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup>
        <Panel>111</Panel>
        <Panel>222</Panel>
      </PanelGroup>
    );
    const instanceDom = findDOMNode(instance);

    assert.equal(instanceDom.querySelectorAll(`.${globalKey}panel`).length, 2);
  });

  it('Should call onSelect callback', (done) => {
    const doneOp = (eventKey) => {
      if (eventKey === 2) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup accordion onSelect={doneOp}>
        <Panel eventKey={1} header="Click me">111</Panel>
        <Panel eventKey={2} header="Click me">222</Panel>
      </PanelGroup>
    );
    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDom.querySelectorAll(`.${globalKey}panel-heading`)[1]);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
