import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggle from '../PickerToggle';
import { getDOMNode } from '@test/testUtils';

describe('<PickerToggle>', () => {
  it('Should output a toggle', () => {
    const Title = 'Title';
    const instance = getDOMNode(<Toggle title="title">{Title}</Toggle>);

    assert.equal(instance.tagName, 'DIV');
    assert.include(instance.className, 'toggle');
    assert.equal(instance.textContent, Title);
  });

  it('Should output a button', () => {
    const Title = 'Title';
    const instance = getDOMNode(
      <Toggle title="title" as="button">
        {Title}
      </Toggle>
    );

    assert.equal(instance.tagName, 'BUTTON');
    assert.include(instance.className, 'toggle');
    assert.equal(instance.textContent, Title);
  });

  describe('Cleanable (`cleanable`=true)', () => {
    it('Should render a clear button when value is present', () => {
      const { getByRole } = render(
        <Toggle cleanable hasValue>
          Title
        </Toggle>
      );

      expect(getByRole('button', { name: /clear/i })).to.exist;
    });

    it('Should call `onClean` callback when clicking clear button', () => {
      const onCleanSpy = sinon.spy();

      const { getByRole } = render(
        <Toggle cleanable hasValue onClean={onCleanSpy}>
          Title
        </Toggle>
      );

      fireEvent.click(getByRole('button', { name: /clear/i }));

      expect(onCleanSpy).to.have.been.called;
    });
  });

  describe('Loading state', () => {
    it('Should not apply active state on clicking when loading=true', () => {
      render(
        <Toggle loading data-testid="toggle">
          Text
        </Toggle>
      );

      userEvent.click(screen.getByTestId('toggle'));

      expect(screen.getByTestId('toggle')).not.to.have.class('rs-picker-toggle-active');
    });
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Toggle onBlur={doneOp} />);
    ReactTestUtils.Simulate.blur(instance);
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Toggle onFocus={doneOp} />);

    ReactTestUtils.Simulate.focus(instance);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Toggle className="custom" />);
    assert.include(instance.className, 'custom');
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

  it('Should add value to input', () => {
    const instance = getDOMNode(
      <Toggle title="title" inputValue={['value1', 'value2']}>
        Title
      </Toggle>
    );
    assert.ok(instance.querySelector('[value="value1,value2"]'));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Toggle disabled>Title</Toggle>);
    assert.equal(instance.getAttribute('aria-disabled'), 'true');
    assert.equal(instance.getAttribute('tabindex'), undefined);
  });

  it('Should render a custom caret', () => {
    const MyCaret = props => (
      <span data-testid="caret" {...props}>
        ⬇️
      </span>
    );

    const { getByTestId } = render(<Toggle caretAs={MyCaret} />);

    expect(getByTestId('caret')).to.have.class('rs-picker-toggle-caret');
  });
});
