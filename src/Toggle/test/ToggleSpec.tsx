import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Toggle from '../Toggle';

describe('Toggle', () => {
  testStandardProps(<Toggle />);

  it('Should output a toggle', () => {
    const instance = getDOMNode(<Toggle />);
    assert.equal(instance.className, 'rs-toggle');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Toggle disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be checked', () => {
    const instance = getDOMNode(<Toggle checked />);
    assert.ok(instance.className.match(/\btoggle-checked\b/));
  });

  it('Should apply size class', () => {
    const instance = getDOMNode(<Toggle size="lg" />);
    assert.ok(instance.className.match(/\btoggle-lg\b/));
  });

  it('Should output a `off` in inner ', () => {
    const instance = getDOMNode(<Toggle unCheckedChildren="off" />);
    assert.equal(instance.textContent, 'off');
  });

  it('Should output a `on` in inner ', () => {
    const instance = getDOMNode(<Toggle checkedChildren="on" checked />);
    assert.equal(instance.textContent, 'on');
  });

  describe('onChange', () => {
    it('Should call onChange callback with checked state', () => {
      const onChangeSpy = sinon.spy();

      const { rerender } = render(<Toggle onChange={onChangeSpy} data-testid="toggle" />);
      fireEvent.click(screen.getByTestId('toggle'));
      expect(onChangeSpy).to.have.been.calledWith(true);

      rerender(<Toggle defaultChecked onChange={onChangeSpy} data-testid="toggle" />);
      fireEvent.click(screen.getByTestId('toggle'));
      expect(onChangeSpy).to.have.been.calledWith(false);
    });

    it('Should emit ChangeEvent with correct target name, type and checked state', () => {
      const onChange = sinon.spy();

      const { rerender } = render(
        // FIXME Toggle does not have `name` prop
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Toggle name="toggle" onChange={onChange} data-testid="toggle" />
      );
      fireEvent.click(screen.getByTestId('toggle'));

      let event = onChange.getCall(0).args[1];
      expect(event.target).to.have.property('name', 'toggle');
      expect(event.target).to.have.property('type', 'checkbox');
      expect(event.target).to.have.property('checked', true);

      rerender(
        // FIXME Toggle does not have `name` prop
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Toggle name="toggle" defaultChecked onChange={onChange} data-testid="toggle" />
      );
      fireEvent.click(screen.getByTestId('toggle'));

      event = onChange.getCall(1).args[1];
      expect(event.target).to.have.property('name', 'toggle');
      expect(event.target).to.have.property('type', 'checkbox');
      expect(event.target).to.have.property('checked', false);
    });

    it('Should toggle with the Space key', async () => {
      const onChangeSpy = sinon.spy();

      const { rerender } = render(<Toggle onChange={onChangeSpy} data-testid="toggle" />);
      screen.getByRole('switch').focus();
      userEvent.keyboard(' ');

      await waitFor(() => {
        expect(onChangeSpy).to.have.been.calledWith(true);
      });

      rerender(<Toggle defaultChecked onChange={onChangeSpy} data-testid="toggle" />);

      screen.getByRole('switch').focus();
      userEvent.keyboard(' ');

      await waitFor(() => {
        expect(onChangeSpy).to.have.been.calledWith(false);
      });
    });

    it('Should not call `onChange` callback when disabled', () => {
      const onChangeSpy = sinon.spy();

      render(<Toggle disabled onChange={onChangeSpy} data-testid="toggle" />);
      userEvent.click(screen.getByTestId('toggle'));

      expect(onChangeSpy).not.to.have.been.called;
    });

    it('Should not call `onChange` callback when readOnly', () => {
      const onChangeSpy = sinon.spy();

      render(<Toggle readOnly onChange={onChangeSpy} data-testid="toggle" />);
      userEvent.click(screen.getByTestId('toggle'));

      expect(onChangeSpy).not.to.have.been.called;
    });

    it('Should not call `onChange` callback when loading', () => {
      const onChangeSpy = sinon.spy();

      render(<Toggle loading onChange={onChangeSpy} data-testid="toggle" />);
      userEvent.click(screen.getByTestId('toggle'));

      expect(onChangeSpy).not.to.have.been.called;
    });
  });

  describe('Loading', () => {
    it('Should have "rs-toggle-loading" className', () => {
      render(<Toggle loading data-testid="toggle" />);
      expect(screen.getByTestId('toggle')).to.have.class('rs-toggle-loading');
    });
    it('Should have `aria-busy` attribute set to `true`', () => {
      render(<Toggle loading />);
      expect(screen.getByRole('switch')).to.have.attr('aria-busy', 'true');
    });
  });
});
