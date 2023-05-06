import React from 'react';
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
    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(instance.querySelectorAll('.rs-panel').length, 2);
  });

  it('Should call onSelect callback', () => {
    const onSelect = sinon.spy();
    render(
      <PanelGroup accordion onSelect={onSelect}>
        <Panel eventKey={1} header="Click me 1">
          111
        </Panel>
        <Panel eventKey={2} header="Click me 2">
          222
        </Panel>
      </PanelGroup>
    );

    fireEvent.click(screen.getByText('Click me 2'));
    expect(onSelect).to.have.been.calledWith(2);
  });

  it('Should call `onSelect` with undefined when click on Panel without eventKey', () => {
    const onSelectSpy = sinon.spy();
    render(
      <PanelGroup accordion onSelect={onSelectSpy}>
        <Panel header="Click me">111</Panel>
      </PanelGroup>
    );

    fireEvent.click(screen.getByText('Click me'));
    expect(onSelectSpy).to.have.been.calledWith(undefined);
  });

  it('Should be a collapsible panel with accordion', () => {
    render(
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
    fireEvent.click(screen.getByText('header-2'));
    expect(screen.getByTestId('panel-1')).not.to.have.class('rs-panel-in');
    expect(screen.getByTestId('panel-2')).to.have.class('rs-panel-in');

    // Collapse the second panel
    fireEvent.click(screen.getByText('header-2'));
    expect(screen.getByTestId('panel-1')).not.to.have.class('rs-panel-in');
    expect(screen.getByTestId('panel-2')).not.to.have.class('rs-panel-in');
  });
});
