/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { testStandardProps } from '@test/commonCases';
import Panel from '../Panel';

describe('Panel', () => {
  testStandardProps(<Panel />);

  it('Should render a panel', () => {
    const title = 'Test';
    render(<Panel data-testid="panel">{title}</Panel>);
    const panel = screen.getByTestId('panel');

    expect(panel).to.have.tagName('div');
    expect(panel).to.have.class(/\bpanel\b/);
    expect(panel).to.have.text(title);
  });

  it('Should default expanded', () => {
    const text = 'Text';
    render(
      <Panel collapsible defaultExpanded>
        {text}
      </Panel>
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText(text).parentNode).to.have.class('rs-panel-collapse');
    expect(screen.getByText(text).parentNode).to.have.class('rs-anim-in');
  });

  it('Should show border', () => {
    render(<Panel data-testid="panel" bordered />);

    expect(screen.getByTestId('panel')).to.have.class('rs-panel-bordered');
  });

  it('Should with shadow', () => {
    render(<Panel data-testid="panel" shaded />);

    expect(screen.getByTestId('panel')).to.have.class('rs-panel-shaded');
  });

  it('Should be expanded', () => {
    const text = 'Text';
    render(
      <Panel collapsible expanded>
        {text}
      </Panel>
    );

    expect(screen.getByText(text).parentNode).to.have.class('rs-panel-collapse');
    expect(screen.getByText(text).parentNode).to.have.class('rs-anim-in');
  });

  it('Should render the custom header', () => {
    render(<Panel header={<a data-testid="custom-header">abc</a>} />);

    expect(screen.getByTestId('custom-header')).to.exist;
  });

  it('Should have a role in header', () => {
    const headerText = 'abc';
    const headerRole = 'button';
    render(<Panel headerRole={headerRole} collapsible header={headerText} />);

    expect(screen.getByRole(headerRole)).to.have.text(headerText);
    expect(screen.getByRole(headerRole)).to.have.class('rs-panel-header');
  });

  it('Should have a role in body', () => {
    render(<Panel panelRole="button" collapsible />);

    expect(screen.getByRole('button')).to.have.class('rs-panel-body');
  });

  describe('Collapsible - `collapsible=true`', () => {
    it('Should call onSelect callback with correct `eventKey`', () => {
      const onSelectSpy = sinon.spy();
      render(<Panel collapsible onSelect={onSelectSpy} eventKey={12} header={'abc'} />);

      fireEvent.click(screen.getByText('abc'));
      expect(onSelectSpy).to.have.been.calledWith(12);
    });

    it('Should call onSelect callback with undefined if `eventKey` is not specified', () => {
      const onSelectSpy = sinon.spy();
      render(<Panel collapsible onSelect={onSelectSpy} header={'abc'} />);

      fireEvent.click(screen.getByText('abc'));
      expect(onSelectSpy).to.have.been.calledWith(undefined);
    });

    it('Should not hide caret icon when header prop is passed an element', () => {
      render(
        <Panel header={<span>Panel title</span>} bordered collapsible>
          Panel content
        </Panel>
      );

      expect(screen.getByTestId('caret icon')).to.exist;
    });
  });

  it('Should pass transition callbacks to Collapse', async () => {
    const onEnter = sinon.spy();
    const onEntering = sinon.spy();
    const onEntered = sinon.spy();
    const onExit = sinon.spy();
    const onExiting = sinon.spy();
    const onExited = sinon.spy();

    render(
      <Panel
        collapsible
        defaultExpanded={false}
        header="Click me"
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        Panel content
      </Panel>
    );

    userEvent.click(screen.getByText('Click me'));
    await waitFor(() => expect(onEnter).to.have.been.called);
    await waitFor(() => expect(onEntering).to.have.been.called);
    await waitFor(() => expect(onEntered).to.have.been.called);

    userEvent.click(screen.getByText('Click me'));
    await waitFor(() => expect(onExit).to.have.been.called);
    await waitFor(() => expect(onExiting).to.have.been.called);
    await waitFor(() => expect(onExited).to.have.been.called);
  });
});
