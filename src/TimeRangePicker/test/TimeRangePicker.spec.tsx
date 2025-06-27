import React from 'react';
import userEvent from '@testing-library/user-event';
import TimeRangePicker from '../TimeRangePicker';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { format } from 'date-fns/format';
import { startOfToday } from 'date-fns/startOfToday';
import { addHours } from 'date-fns/addHours';
import {
  testStandardProps,
  testControlledUnControlled,
  testFormControl,
  testPickers
} from '@test/cases';

describe('TimeRangePicker', () => {
  testStandardProps(<TimeRangePicker />, {
    sizes: ['lg', 'md', 'sm', 'xs'],

    getUIElement: () => {
      return screen.getByRole('textbox').parentElement as HTMLElement;
    }
  });

  testPickers(TimeRangePicker, { role: 'textbox', ariaHaspopup: 'dialog' });

  testControlledUnControlled(TimeRangePicker, {
    defaultValue: [new Date('2024-10-01'), new Date('2024-10-01')],
    value: [new Date('2024-10-01'), new Date('2024-10-01')],
    changedValue: [new Date('2024-10-01'), new Date('2024-10-01')],
    componentProps: { defaultOpen: true, format: 'HH:mm:ss' },

    simulateEvent: {
      changeValue: () => {
        userEvent.click(screen.getAllByRole('option', { name: '2 hours' })[0]);
        userEvent.click(screen.getAllByRole('option', { name: '4 minutes' })[0]);

        userEvent.click(screen.getAllByRole('option', { name: '3 hours' })[1]);
        userEvent.click(screen.getAllByRole('option', { name: '5 minutes' })[1]);

        userEvent.click(screen.getByRole('button', { name: 'OK' }));
        return { changedValue: [new Date('2024-10-01 02:04:00'), new Date('2024-10-01 03:05:00')] };
      }
    },
    expectedValue: (value: [Date, Date]) => {
      expect(screen.getByRole('textbox')).to.value(
        value.map(v => format(v, 'HH:mm:ss')).join(' ~ ')
      );
    }
  });

  testFormControl(TimeRangePicker, {
    value: [new Date('2023-10-01'), new Date('2023-10-02')],
    valueType: 'time',
    getUIElement: () => screen.getByRole('textbox'),
    componentProps: {
      format: 'HH:mm'
    }
  });

  describe('AM/PM', () => {
    it('Should show AM/PM when showMeridiem is true', () => {
      render(
        <TimeRangePicker
          value={[new Date('2024-10-01 13:00:00'), new Date('2024-10-01 13:00:00')]}
          format="hh:mm:ss a"
          defaultOpen
          showMeridiem
        />
      );

      expect(screen.getAllByRole('listbox', { name: 'Select meridiem' })).to.have.length(2);

      expect(screen.getAllByRole('option', { name: 'AM' })).to.have.length(2);
      expect(screen.getAllByRole('option', { name: 'PM' })).to.have.length(2);

      expect(screen.getAllByRole('listbox', { name: 'Select hours' })[0]?.children).to.have.length(
        12
      );
      expect(screen.getAllByRole('listbox', { name: 'Select hours' })[1]?.children).to.have.length(
        12
      );
    });

    it('Should keep AM PM unchanged', () => {
      render(
        <TimeRangePicker
          value={[new Date('2024-10-01 13:00:00'), new Date('2024-10-01 13:00:00')]}
          format="hh:mm:ss a"
          defaultOpen
          showMeridiem
        />
      );

      fireEvent.click(screen.getAllByRole('option', { name: '0 hours' })[0]);
      fireEvent.click(screen.getAllByRole('option', { name: '1 hours' })[1]);

      expect(screen.getAllByRole('option', { name: 'PM' })[0]).to.be.attribute(
        'aria-selected',
        'true'
      );

      fireEvent.click(screen.getByRole('button', { name: 'OK' }));

      expect(screen.getByRole('textbox')).to.have.value('01:00:00 PM ~ 01:00:00 PM');
    });

    it('Should change AM/PM when click on AM/PM', () => {
      const onChange = vi.fn();
      render(
        <TimeRangePicker
          defaultValue={[new Date('2024-10-01 13:00:00'), new Date('2024-10-01 13:00:00')]}
          format="hh:mm:ss aa"
          defaultOpen
          showMeridiem
          onChange={onChange}
        />
      );

      expect(screen.getAllByRole('option', { name: 'PM' })[0]).to.be.attribute(
        'aria-selected',
        'true'
      );
      expect(screen.getAllByRole('option', { name: 'PM' })[1]).to.be.attribute(
        'aria-selected',
        'true'
      );

      fireEvent.click(screen.getAllByRole('option', { name: 'AM' })[0]);
      fireEvent.click(screen.getAllByRole('option', { name: 'AM' })[1]);
      fireEvent.click(screen.getByRole('button', { name: 'OK' }));

      expect(screen.getByRole('textbox')).to.have.value('01:00:00 AM ~ 01:00:00 AM');

      expect(onChange).toHaveBeenCalledWith(
        [new Date('2024-10-01 01:00:00'), new Date('2024-10-01 01:00:00')],
        expect.any(Object)
      );
    });
  });

  it('Should not show header when only show time', () => {
    render(<TimeRangePicker defaultOpen />);

    expect(screen.queryByTestId('daterange-header')).to.not.exist;
    expect(screen.queryByRole('button', { name: 'Select time' })).to.not.exist;
  });

  it('Should not show predefined ranges when only show time', () => {
    render(<TimeRangePicker defaultOpen />);
    expect(screen.queryByTestId('daterange-predefined-bottom')).to.not.exist;
  });

  it('Should change time to start of day', () => {
    const onChange = vi.fn();
    render(<TimeRangePicker defaultOpen onChange={onChange} />);

    expect(screen.getByRole('textbox')).to.have.attribute('placeholder', 'HH:mm ~ HH:mm');
    expect(screen.getByRole('textbox')).to.have.value('');

    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(screen.getByRole('textbox')).to.have.value('00:00 ~ 00:00');
    expect(onChange).toHaveBeenCalledWith([startOfToday(), startOfToday()], expect.any(Object));
  });

  it('Should not be able to click OK button when start time is greater than end time', () => {
    const onChange = vi.fn();
    render(<TimeRangePicker defaultOpen onChange={onChange} />);

    fireEvent.click(screen.getAllByRole('option', { name: '1 hours' })[0]);
    expect(screen.getByRole('button', { name: 'OK' })).to.have.attribute('disabled');

    fireEvent.click(screen.getAllByRole('option', { name: '1 hours' })[1]);
    expect(screen.getByRole('button', { name: 'OK' })).to.not.have.attribute('disabled');

    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(screen.getByRole('textbox')).to.have.value('01:00 ~ 01:00');
    expect(onChange).toHaveBeenCalledWith(
      [addHours(startOfToday(), 1), addHours(startOfToday(), 1)],
      expect.any(Object)
    );
  });

  it('Should render custom locale', () => {
    render(
      <TimeRangePicker
        locale={{
          hours: '时',
          minutes: '分',
          seconds: '秒'
        }}
        format="hh:mm:ss"
        defaultOpen
      />
    );

    expect(screen.getAllByText('时')[0]).to.have.class('rs-calendar-time-dropdown-column-title');
    expect(screen.getAllByText('分')[0]).to.have.class('rs-calendar-time-dropdown-column-title');
    expect(screen.getAllByText('秒')[0]).to.have.class('rs-calendar-time-dropdown-column-title');
  });
});
