import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';

import Toggle from '../Toggle';
import { getDOMNode } from '@test/testUtils';

describe('Toggle', () => {
  it('Should output a toggle', () => {
    const instance = getDOMNode(<Toggle />);
    assert.equal(instance.className, 'rs-btn-toggle');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Toggle disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be checked', () => {
    const instance = getDOMNode(<Toggle checked />);
    assert.ok(instance.className.match(/\bbtn-toggle-checked\b/));
  });

  it('Should apply size class', () => {
    const instance = getDOMNode(<Toggle size="lg" />);
    assert.ok(instance.className.match(/\bbtn-toggle-lg\b/));
  });

  it('Should output a `off` in inner ', () => {
    const instance = getDOMNode(<Toggle unCheckedChildren="off" />);
    assert.equal(instance.textContent, 'off');
  });

  it('Should output a `on` in inner ', () => {
    const instance = getDOMNode(<Toggle checkedChildren="on" checked />);
    assert.equal(instance.textContent, 'on');
  });

  it('Should call onChange callback with correct checked state', done => {
    const doneOp = checked => {
      try {
        assert.isTrue(checked);
        done();
      } catch (err) {
        done(err);
      }
    };
    const instance = getDOMNode(<Toggle onChange={doneOp} />);
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should call onChange callback and the correct arguments returned', done => {
    const doneOp = checked => {
      try {
        assert.isFalse(checked);
        done();
      } catch (err) {
        done(err);
      }
    };

    const instance = getDOMNode(<Toggle defaultChecked={true} onChange={doneOp} />);
    ReactTestUtils.Simulate.click(instance);
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

  it('Should toggle with the space key', done => {
    const doneOp = checked => {
      try {
        assert.isTrue(checked);
        done();
      } catch (err) {
        done(err);
      }
    };

    const instance = getDOMNode(<Toggle onChange={doneOp} />);
    ReactTestUtils.Simulate.keyDown(instance, { key: ' ' });
  });

  describe('Loading', () => {
    it('Should have "rs-btn-toggle-loading" className', () => {
      const { getByTestId } = render(<Toggle loading data-testid="toggle" />);
      expect(getByTestId('toggle')).to.have.class('rs-btn-toggle-loading');
    });
    it('Should have `aria-busy` attribute set to `true`', () => {
      const { getByTestId } = render(<Toggle loading data-testid="toggle" />);
      expect(getByTestId('toggle')).to.have.attr('aria-busy', 'true');
    });
  });
});
