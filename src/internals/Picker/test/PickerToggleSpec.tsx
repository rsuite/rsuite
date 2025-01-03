import React from 'react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import Toggle from '../PickerToggle';
import CustomProvider from '../../../CustomProvider';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('<PickerToggle>', () => {
  testStandardProps(<Toggle />);

  it('Should output a toggle', () => {
    render(<Toggle title="title">Toggle</Toggle>);

    expect(screen.getByRole('combobox')).to.have.class('rs-picker-toggle');
    expect(screen.getByRole('combobox')).to.have.attr('aria-haspopup', 'listbox');
    expect(screen.getByRole('combobox')).to.have.text('Toggle');
    expect(screen.getByRole('combobox').tagName).to.equal('DIV');
  });

  it('Should output a button', () => {
    render(
      <Toggle title="title" as="button">
        Toggle
      </Toggle>
    );

    expect(screen.getByRole('combobox').tagName).to.equal('BUTTON');
  });

  it('Should render a hidden <input> element with given "name" attribute', () => {
    render(<Toggle name="field" />);

    expect(screen.getByTestId('picker-toggle-input')).to.have.attr('name', 'field');
  });

  describe('Cleanable (`cleanable`=true)', () => {
    it('Should render a clear button when value is present', () => {
      render(
        <Toggle cleanable hasValue>
          Title
        </Toggle>
      );

      expect(screen.getByRole('button', { name: /clear/i })).to.exist;
    });

    it('Should call `onClean` callback when clicking clear button', () => {
      const onClean = sinon.spy();

      render(
        <Toggle cleanable hasValue onClean={onClean}>
          Title
        </Toggle>
      );

      fireEvent.click(screen.getByRole('button', { name: /clear/i }));

      expect(onClean).to.have.been.called;
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

  it('Should call onBlur callback', async () => {
    const onBlur = sinon.spy();

    render(<Toggle onBlur={onBlur} />);

    fireEvent.blur(screen.getByRole('combobox'));

    expect(onBlur).to.have.been.calledOnce;
  });

  it('Should call onFocus callback', async () => {
    const onFocus = sinon.spy();

    render(<Toggle onFocus={onFocus} />);

    fireEvent.focus(screen.getByRole('combobox'));

    expect(onFocus).to.have.been.calledOnce;
  });

  it('Should add value to input', async () => {
    render(
      <Toggle title="title" inputValue={['value1', 'value2']}>
        Title
      </Toggle>
    );

    expect(screen.getByRole('textbox', { hidden: true })).to.have.attr('value', 'value1,value2');
  });

  it('Should be disabled', () => {
    render(<Toggle disabled>Title</Toggle>);

    expect(screen.getByRole('combobox')).to.have.attr('aria-disabled', 'true');
    expect(screen.getByRole('combobox')).to.not.have.attr('tabindex');
  });

  it('Should render a custom caret', () => {
    const MyCaret = props => (
      <span data-testid="caret" {...props}>
        ⬇️
      </span>
    );

    render(<Toggle caretAs={MyCaret} />);

    expect(screen.getByTestId('caret')).to.have.class('rs-picker-caret-icon');
  });

  it('Should not show caret icon when it has value', () => {
    render(<Toggle hasValue cleanable />);

    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
    expect(screen.getByRole('combobox')).to.not.have.contain('.rs-picker-caret-icon');
  });

  describe('Placement', () => {
    const placements: any = [
      'top',
      'bottom',
      'right',
      'left',
      'bottomStart',
      'bottomEnd',
      'topStart',
      'topEnd',
      'rightStart',
      'rightEnd',
      'leftStart',
      'leftEnd'
    ];

    const getArrow = (placement, rtl?: boolean) => {
      switch (true) {
        case /^top/.test(placement):
          return 'arrow up line';
        case /^right/.test(placement):
          return rtl ? 'arrow left line' : 'arrow right line';
        case /^left/.test(placement):
          return rtl ? 'arrow right line' : 'arrow left line';
        case /^bottom/.test(placement):
      }
    };

    placements.forEach(placement => {
      it(`Should have correct caret icon for placement: ${placement}`, () => {
        render(<Toggle placement={placement} />);

        expect(screen.getByTestId('caret')).to.have.attr('aria-label', getArrow(placement));
      });
    });

    placements.forEach(placement => {
      it(`Should have correct caret icon for placement: ${placement} in RTL`, () => {
        render(
          <CustomProvider rtl>
            <Toggle placement={placement} />
          </CustomProvider>
        );

        expect(screen.getByTestId('caret')).to.have.attr('aria-label', getArrow(placement, true));
      });
    });
  });
});
