import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
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

  it('Should call onSelect callback', () => {
    const onSelect = sinon.spy();
    const instance = getDOMNode(
      <PanelGroup accordion onSelect={onSelect}>
        <Panel eventKey={1} header="Click me">
          111
        </Panel>
        <Panel eventKey={2} header="Click me">
          222
        </Panel>
      </PanelGroup>
    );
    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-panel-header')[1]);

    expect(onSelect).to.have.been.calledWith(2);
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
    const { getByText } = render(
      <PanelGroup accordion defaultActiveKey={1}>
        <Panel header="header-1" eventKey={1} data-testid="panel-1">
          body-1
        </Panel>
        <Panel header="header-2" eventKey={2} data-testid="panel-2">
          body-2
        </Panel>
      </PanelGroup>
    );

    // Expand the first panel by default
    expect(screen.getByTestId('panel-1')).to.have.class('rs-panel-in');
    expect(screen.getByTestId('panel-2')).not.to.have.class('rs-panel-in');

    // Expand the second panel
    fireEvent.click(getByText('header-2'));
    expect(screen.getByTestId('panel-1')).not.to.have.class('rs-panel-in');
    expect(screen.getByTestId('panel-2')).to.have.class('rs-panel-in');

    // Collapse the second panel
    fireEvent.click(getByText('header-2'));
    expect(screen.getByTestId('panel-1')).not.to.have.class('rs-panel-in');
    expect(screen.getByTestId('panel-2')).not.to.have.class('rs-panel-in');
  });
});
