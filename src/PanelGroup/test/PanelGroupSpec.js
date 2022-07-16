import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { fireEvent, render } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import PanelGroup from '../PanelGroup';
import Panel from '../../Panel';

describe('PanelGroup', () => {
  testStandardProps(<PanelGroup />);

  it('Should render a PanelGroup', () => {
    const title = 'Test';
    const instance = getDOMNode(<PanelGroup>{title}</PanelGroup>);
    const instanceDom = instance;

    assert.equal(instanceDom.tagName, 'DIV');
    assert.ok(instanceDom.className.match(/\bpanel-group\b/));
    assert.equal(instanceDom.textContent, title);
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
      try {
        assert.equal(eventKey, 2);
        done();
      } catch (err) {
        done(err);
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
    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-panel-header')[1]);
  });

  it('Should call `onSelect` with undefined when click on Panel without eventKey', () => {
    const onSelectSpy = sinon.spy();
    const { getByText } = render(
      <PanelGroup accordion onSelect={onSelectSpy}>
        <Panel header="Click me">111</Panel>
      </PanelGroup>
    );

    fireEvent.click(getByText('Click me'));
    expect(onSelectSpy).to.have.been.calledWith(undefined);
  });

  it('Should be a collapsible panel with accordion', () => {
    const { getByText, container } = render(
      <PanelGroup accordion defaultActiveKey={1}>
        <Panel header="header-1" eventKey={1}>
          body-1
        </Panel>
        <Panel header="header-2" eventKey={2}>
          body-2
        </Panel>
      </PanelGroup>
    );

    // Expand the first panel by default
    assert.equal(container.querySelector('.rs-panel-in .rs-panel-body').textContent, 'body-1');

    // Expand the second panel
    fireEvent.click(getByText('header-2'));
    assert.equal(container.querySelector('.rs-panel-in .rs-panel-body').textContent, 'body-2');

    // Collapse the second panel
    fireEvent.click(getByText('header-2'));
    assert.isNull(container.querySelector('.rs-panel-in .rs-panel-body'));
  });
});
