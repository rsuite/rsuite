import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import PanelGroup from '../PanelGroup';
import Panel from '../../Panel';
import { innerText, getDOMNode } from '@test/testUtils';

describe('PanelGroup', () => {
  it('Should render a PanelGroup', () => {
    const title = 'Test';
    const instance = getDOMNode(<PanelGroup>{title}</PanelGroup>);
    const instanceDom = instance;

    assert.equal(instanceDom.tagName, 'DIV');
    assert.ok(instanceDom.className.match(/\bpanel-group\b/));
    assert.equal(innerText(instanceDom), title);
  });

  it('Should render 2 Panels', () => {
    const instance = getDOMNode(
      <PanelGroup>
        <Panel>111</Panel>
        <Panel>222</Panel>
      </PanelGroup>
    );
    assert.equal(instance.querySelectorAll('.rs-panel').length, 2);
  });

  it('Should call onSelect callback', done => {
    const doneOp = eventKey => {
      if (eventKey === 2) {
        done();
      }
    };
    const instance = getDOMNode(
      <PanelGroup accordion onSelect={doneOp}>
        <Panel eventKey={1} header="Click me">
          111
        </Panel>
        <Panel eventKey={2} header="Click me">
          222
        </Panel>
      </PanelGroup>
    );
    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-panel-heading')[1]);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<PanelGroup className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<PanelGroup style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<PanelGroup classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
