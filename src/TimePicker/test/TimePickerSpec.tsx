import React from 'react';
import {
  testStandardProps,
  testControlledUnControlled,
  testFormControl,
  testPickers
} from '@test/utils';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { format } from 'date-fns';
import TimePicker from '../TimePicker';

afterEach(() => {
  sinon.restore();
});

describe('TimePicker', () => {
  testStandardProps(<TimePicker />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('textbox').parentElement as HTMLElement;
    }
  });

  testPickers(TimePicker, { role: 'textbox', ariaHaspopup: 'dialog' });

  testControlledUnControlled(TimePicker, {
    defaultValue: new Date('2023-10-01 01:00:00'),
    value: new Date('2023-10-01 01:00:00'),
    changedValue: new Date('2023-10-01 02:04:00'),
    componentProps: { defaultOpen: true },
    simulateEvent: {
      changeValue: () => {
        userEvent.click(screen.getByRole('option', { name: '2 hours' }));
        userEvent.click(screen.getByRole('option', { name: '4 minutes' }));
        userEvent.click(screen.getByRole('button', { name: 'OK' }));
        return { changedValue: new Date('2023-10-01 02:04:00') };
      }
    },
    expectedValue: (value: Date) => {
      expect(screen.getByRole('textbox')).to.value(format(value, 'HH:mm'));
    }
  });

  testFormControl(TimePicker, {
    value: new Date('2023-10-01'),
    valueType: 'time',
    getUIElement: () => screen.getByRole('textbox')
  });

  describe('Ranges', () => {
    it('Should render the Now button', () => {
      render(<TimePicker open />);

      expect(screen.getByRole('button', { name: 'Now' })).to.exist;
    });
  });

  describe('AM/PM', () => {
    it('Should be show meridiem', async () => {
      render(
        <TimePicker value={new Date('2017-08-14 13:00:00')} format="hh:mm:ss a" open showMeridiem />
      );

      expect(screen.getByRole('listbox', { name: 'Select meridiem' })).to.exist;

      expect(screen.getByRole('option', { name: 'AM' })).to.exist;
      expect(screen.getByRole('option', { name: 'PM' })).to.exist;

      expect(screen.getByRole('listbox', { name: 'Select hours' })?.children).to.have.length(12);
    });

    it('Should keep AM PM unchanged', () => {
      render(
        <TimePicker
          value={new Date('2017-08-14 13:00:00')}
          format="hh:mm:ss a"
          defaultOpen
          showMeridiem
        />
      );

      fireEvent.click(screen.getByRole('option', { name: '0 hours' }));

      expect(screen.getByRole('option', { name: 'PM' })).to.be.attribute('aria-selected', 'true');

      fireEvent.click(screen.getByRole('button', { name: 'OK' }));

      expect(screen.getByRole('textbox')).to.have.value('01:00:00 PM');
    });

    it('Should change AM PM', () => {
      const onChange = sinon.spy();
      render(
        <TimePicker
          defaultValue={new Date('2017-08-14 13:00:00')}
          format="hh:mm:ss a"
          onChange={onChange}
          defaultOpen
          showMeridiem
        />
      );

      expect(screen.getByRole('option', { name: 'PM' })).to.be.attribute('aria-selected', 'true');

      fireEvent.click(screen.getByRole('option', { name: 'AM' }));
      fireEvent.click(screen.getByRole('button', { name: 'OK' }));

      expect(screen.getByRole('textbox')).to.have.value('01:00:00 AM');
      expect(onChange).to.have.been.calledWith(new Date('2017-08-14 01:00:00'));
    });

    it('Should call onSelect when meridiem is changed', () => {
      const onSelect = sinon.spy();

      render(
        <TimePicker
          value={new Date('2017-08-14 13:00:00')}
          format="hh:mm:ss a"
          defaultOpen
          showMeridiem
          onSelect={onSelect}
        />
      );

      expect(screen.getByRole('option', { name: 'PM' })).to.be.attribute('aria-selected', 'true');

      fireEvent.click(screen.getByRole('option', { name: 'AM' }));

      expect(onSelect).to.have.been.calledWith(new Date('2017-08-14 01:00:00'));
    });
  });
});
