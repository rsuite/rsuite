import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { testStandardProps } from '@test/utils';
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

    expect(screen.getByText(text).parentNode).to.have.class('rs-panel-body-collapse');
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

  it('Should body fill', () => {
    render(<Panel data-testid="panel" bodyFill />);

    expect(screen.getByTestId('panel')).to.have.contain('.rs-panel-body-fill');
  });

  it('Should be expanded', () => {
    const text = 'Text';
    render(
      <Panel collapsible expanded>
        {text}
      </Panel>
    );

    expect(screen.getByText(text).parentNode).to.have.class('rs-panel-body-collapse');
    expect(screen.getByText(text).parentNode).to.have.class('rs-anim-in');
  });

  it('Should be disabled', () => {
    render(
      <Panel disabled collapsible header="title">
        Text
      </Panel>
    );

    expect(screen.getByRole('button')).to.have.attribute('disabled');
    expect(screen.getByRole('button')).to.have.attribute('aria-disabled', 'true');
  });

  it('Should render the custom header', () => {
    render(<Panel header={<a data-testid="custom-header">abc</a>} />);

    expect(screen.getByTestId('custom-header')).to.exist;
  });

  it('Should custom a indicator', () => {
    render(<Panel collapsible header="title" caretAs="span" />);

    expect(screen.getByTestId('caret icon')).to.have.tagName('span');
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

  // fix: https://github.com/rsuite/rsuite/issues/4043
  it('Should not call onSubmit on form when click on header', () => {
    const onSubmit = sinon.spy();
    render(
      <form
        onSubmit={event => {
          onSubmit();
          event.preventDefault();
        }}
      >
        <Panel header="Panel title" collapsible>
          Panel content
        </Panel>
      </form>
    );

    userEvent.click(screen.getByRole('button', { name: 'Panel title' }));

    expect(onSubmit).to.not.have.been.called;
  });

  describe('Collapsible - `collapsible=true`', () => {
    it('Should call onSelect callback with correct `eventKey`', () => {
      const onSelect = sinon.spy();
      render(<Panel collapsible onSelect={onSelect} eventKey={12} header={'abc'} />);

      fireEvent.click(screen.getByText('abc'));
      expect(onSelect).to.have.been.calledWith(12);
    });

    it('Should call onSelect callback with undefined if `eventKey` is not specified', () => {
      const onSelect = sinon.spy();
      render(<Panel collapsible onSelect={onSelect} header={'abc'} />);

      fireEvent.click(screen.getByText('abc'));
      expect(onSelect).to.have.been.calledWith(undefined);
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

  it('Should have a custom className in body by bodyProps', () => {
    render(<Panel collapsible header="title" bodyProps={{ className: 'custom-class' }} />);

    expect(screen.getByTestId('scroll-view')).to.have.class('custom-class');
  });

  describe('Accessibility', () => {
    it('Should have a button role in header', () => {
      render(<Panel collapsible header="title" />);

      expect(screen.getByRole('button')).to.have.class('rs-panel-btn');
      expect(screen.getByRole('button')).to.have.text('title');
    });

    it('Should have a region role in body', () => {
      render(
        <Panel collapsible header="title" expanded>
          body content
        </Panel>
      );

      expect(screen.getByRole('region')).to.have.class('rs-panel-body');
      expect(screen.getByRole('region')).to.have.text('body content');
    });

    it('Should customize role in header', () => {
      render(<Panel collapsible header="title" headerRole="tab" />);

      expect(screen.getByRole('tab')).to.have.class('rs-panel-btn');
    });

    it('Should customize role in body', () => {
      render(<Panel panelRole="tabpanel" collapsible expanded />);

      expect(screen.getByRole('tabpanel')).to.have.class('rs-panel-body');
    });

    it('Should have aria-expanded in header', () => {
      render(<Panel collapsible header="title" />);

      expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'false');
    });

    it('Should have aria-controls in header', () => {
      render(<Panel collapsible header="title" />);

      expect(screen.getByRole('button')).to.have.attribute('aria-controls');
    });

    it('Should have aria-disabled in header', () => {
      render(<Panel collapsible header="title" disabled />);

      expect(screen.getByRole('button')).to.have.attribute('aria-disabled', 'true');
    });

    it('Should have aria-labelledby in body', () => {
      render(<Panel collapsible header="title" expanded />);

      expect(screen.getByRole('region')).to.have.attribute('aria-labelledby');
    });

    it('Should expand panel when click on header', () => {
      render(<Panel collapsible header="title" />);

      expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'false');

      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'true');
    });

    it('Should collapse panel when click on header', () => {
      render(<Panel collapsible header="title" defaultExpanded />);

      expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'true');

      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'false');
    });
  });
});
