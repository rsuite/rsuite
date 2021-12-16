import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggle from '../Toggle';
import { getDOMNode } from '@test/testUtils';

describe('Toggle', () => {
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

      const { getByTestId, rerender } = render(
        <Toggle onChange={onChangeSpy} data-testid="toggle" />
      );
      userEvent.click(getByTestId('toggle'));
      expect(onChangeSpy).to.have.been.calledWith(true);

      rerender(<Toggle checked onChange={onChangeSpy} data-testid="toggle" />);
      userEvent.click(getByTestId('toggle'));
      expect(onChangeSpy).to.have.been.calledWith(false);
    });

    it('Should toggle with the Space key', () => {
      const onChangeSpy = sinon.spy();

      const { getByRole, rerender } = render(
        <Toggle onChange={onChangeSpy} data-testid="toggle" />
      );
      getByRole('switch').focus();
      userEvent.keyboard('{space}');
      expect(onChangeSpy).to.have.been.calledWith(true);

      rerender(<Toggle checked onChange={onChangeSpy} data-testid="toggle" />);
      getByRole('switch').focus();
      userEvent.keyboard('{space}');
      expect(onChangeSpy).to.have.been.calledWith(false);
    });

    it('Should not call `onChange` callback when disabled', () => {
      const onChangeSpy = sinon.spy();

      const { getByTestId } = render(
        <Toggle disabled onChange={onChangeSpy} data-testid="toggle" />
      );
      userEvent.click(getByTestId('toggle'));

      expect(onChangeSpy).not.to.have.been.called;
    });

    it('Should not call `onChange` callback when readOnly', () => {
      const onChangeSpy = sinon.spy();

      const { getByTestId } = render(
        <Toggle readOnly onChange={onChangeSpy} data-testid="toggle" />
      );
      userEvent.click(getByTestId('toggle'));

      expect(onChangeSpy).not.to.have.been.called;
    });

    it('Should not call `onChange` callback when loading', () => {
      const onChangeSpy = sinon.spy();

      const { getByTestId } = render(
        <Toggle loading onChange={onChangeSpy} data-testid="toggle" />
      );
      userEvent.click(getByTestId('toggle'));

      expect(onChangeSpy).not.to.have.been.called;
    });
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Toggle className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Toggle style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Toggle classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  describe('Loading', () => {
    it('Should have "rs-toggle-loading" className', () => {
      const { getByTestId } = render(<Toggle loading data-testid="toggle" />);
      expect(getByTestId('toggle')).to.have.class('rs-toggle-loading');
    });
    it('Should have `aria-busy` attribute set to `true`', () => {
      const { getByRole } = render(<Toggle loading />);
      expect(getByRole('switch')).to.have.attr('aria-busy', 'true');
    });
  });
});
