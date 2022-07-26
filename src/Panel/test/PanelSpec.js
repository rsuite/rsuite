import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Panel from '../Panel';

describe('Panel', () => {
  testStandardProps(<Panel />);

  it('Should render a panel', () => {
    const title = 'Test';
    const instance = getDOMNode(<Panel>{title}</Panel>);
    assert.equal(instance.tagName, 'DIV');
    assert.ok(instance.className.match(/\bpanel\b/));
    assert.equal(instance.textContent, title);
  });

  it('Should default expanded', () => {
    const instance = getDOMNode(<Panel collapsible defaultExpanded />);
    assert.isNotNull(instance.querySelector('.rs-panel-collapse.rs-anim-in'));
  });

  it('Should show border', () => {
    const instance = getDOMNode(<Panel bordered />);
    assert.include(instance.className, 'rs-panel-bordered');
  });

  it('Should with shadow', () => {
    const instance = getDOMNode(<Panel shaded />);
    assert.include(instance.className, 'rs-panel-shaded');
  });

  it('Should be expanded', () => {
    const instance = getDOMNode(<Panel collapsible expanded />);
    assert.isNotNull(instance.querySelector('.rs-panel-collapse.rs-anim-in'));
  });

  it('Should render the custom header', () => {
    const instance = getDOMNode(<Panel header={<a>abc</a>} />);
    assert.equal(instance.querySelector('a.rs-panel-title').textContent, 'abc');
  });

  it('Should have a role in header', () => {
    const instance = getDOMNode(<Panel headerRole="button" collapsible header={'abc'} />);
    assert.equal(instance.querySelector('.rs-panel-header').getAttribute('role'), 'button');
  });

  it('Should have a role in body', () => {
    const instance = getDOMNode(<Panel panelRole="button" collapsible />);
    assert.equal(instance.querySelector('.rs-panel-body').getAttribute('role'), 'button');
  });

  describe('Collapsible - `collapsible=true`', () => {
    it('Should call onSelect callback with correct `eventKey`', () => {
      const onSelectSpy = sinon.spy();
      const instance = getDOMNode(
        <Panel collapsible onSelect={onSelectSpy} eventKey={12} header={'abc'} />
      );

      ReactTestUtils.Simulate.click(instance.querySelector('.rs-panel-header'));
      expect(onSelectSpy).to.have.been.calledWith(12);
    });

    it('Should call onSelect callback with undefined if `eventKey` is not specified', () => {
      const onSelectSpy = sinon.spy();
      const { getByText } = render(<Panel collapsible onSelect={onSelectSpy} header={'abc'} />);

      fireEvent.click(getByText('abc'));
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
