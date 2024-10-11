import React from 'react';
import { format } from 'date-fns';
import { testStandardProps, testControlledUnControlled, testFormControl } from '@test/utils';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockClipboardEvent } from '@test/mocks/data-mock';
import sinon from 'sinon';
import DateRangeInput from '../DateRangeInput';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';
import { keyPressTests } from '../../DateInput/test/testUtils';

const { testKeyPress, testKeyPressAsync, testContinuousKeyPress } = keyPressTests(DateRangeInput);

describe('DateRangeInput', () => {
  testStandardProps(<DateRangeInput />, { sizes: ['lg', 'md', 'sm', 'xs'] });

  testControlledUnControlled(DateRangeInput, {
    defaultValue: [new Date('2023-10-01'), new Date('2023-10-02')],
    value: [new Date('2023-10-01'), new Date('2023-10-02')],
    changedValue: [new Date('2023-10-02'), new Date('2023-10-03')],
    simulateEvent: null,
    componentProps: {
      format: 'yyyy-MM-dd'
    },
    simulateChangeEvents: [
      {
        change: () => {
          (screen.getByRole('textbox') as HTMLInputElement).select();
          userEvent.type(screen.getByRole('textbox'), '2025');
        },
        value: [new Date('2025-10-01'), new Date('2023-10-02')],
        callCount: 4
      },

      {
        change: () => {
          const input = screen.getByRole('textbox') as HTMLInputElement;
          input.selectionStart = 0;
          input.selectionEnd = 3;
          userEvent.type(screen.getByRole('textbox'), '{backspace}');
        },
        value: new Date(''),
        expectedValue: () => {
          expect(screen.getByRole('textbox')).to.value('yyyy-10-01 ~ 2023-10-02');
        }
      }
    ],
    expectedValue: (value: [Date, Date]) => {
      expect(screen.getByRole('textbox')).to.value(
        `${format(value[0], 'yyyy-MM-dd')} ~ ${format(value[1], 'yyyy-MM-dd')}`
      );
    }
  });

  testFormControl(DateRangeInput, {
    value: [new Date('2023-10-01'), new Date('2023-10-02')],
    componentProps: {
      format: 'yyyy-MM-dd'
    }
  });

  it('Should render placeholder according to the default format', () => {
    render(<DateRangeInput format="yyyy-MM-dd" />);

    expect(screen.getByRole('textbox')).to.have.attribute('placeholder', 'yyyy-MM-dd ~ yyyy-MM-dd');

    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).to.have.value('yyyy-MM-dd ~ yyyy-MM-dd');
  });

  it('Should render a custom character', () => {
    const { rerender } = render(<DateRangeInput format="yyyy-MM-dd" character=" to " />);

    expect(screen.getByRole('textbox')).to.have.attribute(
      'placeholder',
      'yyyy-MM-dd to yyyy-MM-dd'
    );

    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).to.have.value('yyyy-MM-dd to yyyy-MM-dd');

    rerender(
      <DateRangeInput
        format="yyyy-MM-dd"
        character=" to "
        value={[new Date('2023-10-01'), new Date('2023-10-02')]}
      />
    );

    expect(screen.getByRole('textbox')).to.have.value('2023-10-01 to 2023-10-02');
  });

  it('Should render placeholder according to the given format', () => {
    render(<DateRangeInput format="dd-MM-yyyy" />);

    expect(screen.getByRole('textbox')).to.have.attribute('placeholder', 'dd-MM-yyyy ~ dd-MM-yyyy');

    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).to.have.value('dd-MM-yyyy ~ dd-MM-yyyy');
  });

  it('Should format the value according to the given `format`', () => {
    render(
      <DateRangeInput
        format="MMMM dd, yyyy"
        value={[new Date('2023-12-08'), new Date('2023-12-09')]}
      />
    );

    expect(screen.getByRole('textbox')).to.value('December 08, 2023 ~ December 09, 2023');
  });

  it('Should get null value in onChange callback', () => {
    const onChange = sinon.spy();

    render(
      <DateRangeInput
        onChange={onChange}
        format="yyyy"
        defaultValue={[new Date('2023-10-01'), null]}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.click(input);
    fireEvent.keyDown(input, { key: 'Backspace' });
    fireEvent.blur(input);

    expect(input).to.value('');
    expect(onChange).to.have.been.calledWith([null, null]);
    expect(onChange).to.have.been.calledOnce;
  });

  it('Should clear the value in the input box', () => {
    const onChange = sinon.spy();

    render(
      <DateRangeInput
        onChange={onChange}
        format="yyyy-MM-dd"
        defaultValue={[new Date('2024-10-09'), new Date('2024-10-09')]}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.click(input);
    input.select();
    fireEvent.keyDown(input, { key: 'Backspace' });
    fireEvent.blur(input);

    expect(input).to.value('');
    expect(onChange).to.have.been.calledWith(null);
    expect(onChange).to.have.been.calledOnce;
  });

  it('Should format dates according to locale configuration', () => {
    const { rerender } = render(
      <CustomProvider locale={zhCN}>
        <DateRangeInput
          value={[new Date('2023-10-01'), new Date('2023-10-02')]}
          format="dd MMMM yyyy"
        />
      </CustomProvider>
    );

    expect(screen.getByRole('textbox')).to.have.value('01 十月 2023 ~ 02 十月 2023');

    rerender(
      <CustomProvider locale={zhCN}>
        <DateRangeInput
          value={[new Date('2023-11-20'), new Date('2023-11-21')]}
          format="dd MMM yyyy"
        />
      </CustomProvider>
    );

    expect(screen.getByRole('textbox')).to.have.value('20 11月 2023 ~ 21 11月 2023');
  });

  describe('DateRangeInput - KeyPress', () => {
    it('Should increase year when pressing ArrowUp ', () => {
      testKeyPress({
        key: '{arrowup}',
        defaultValue: [new Date('2023-10-01'), null],
        expectedValue: '2024-10-01 ~ yyyy-MM-dd'
      });
    });

    it('Should decrement year when pressing ArrowDown ', () => {
      testKeyPress({
        key: '{arrowdown}',
        defaultValue: [new Date('2023-10-01'), null],
        expectedValue: '2022-10-01 ~ yyyy-MM-dd'
      });
    });

    it('Should increase month when pressing ArrowUp ', () => {
      testKeyPress({
        key: '{arrowright}{arrowup}',
        defaultValue: [new Date('2023-10-01'), null],
        expectedValue: '2023-11-01 ~ yyyy-MM-dd'
      });
    });

    it('Should go back to January when it exceeds December', () => {
      testKeyPress({
        key: '{arrowright}{arrowup}',
        defaultValue: [new Date('2023-12-01'), null],
        expectedValue: '2023-01-01 ~ yyyy-MM-dd'
      });
    });

    it('Should go back to December when it exceeds January', () => {
      testKeyPress({
        key: '{arrowright}{arrowdown}',
        defaultValue: [new Date('2023-01-01'), null],
        expectedValue: '2023-12-01 ~ yyyy-MM-dd'
      });
    });

    it('Should decrement month when pressing ArrowDown ', () => {
      testKeyPress({
        key: '{arrowright}{arrowdown}',
        defaultValue: [new Date('2023-10-01'), null],
        expectedValue: '2023-09-01 ~ yyyy-MM-dd'
      });
    });

    it('Should be returned to January when the maximum month is exceeded', () => {
      testKeyPress({
        key: '{arrowright}{arrowup}',
        defaultValue: [new Date('2023-12-01'), null],
        expectedValue: '2023-01-01 ~ yyyy-MM-dd'
      });
    });

    it('Should be returned to December when the minimum month is exceeded', () => {
      testKeyPress({
        key: '{arrowright}{arrowdown}',
        defaultValue: [new Date('2023-01-01'), null],
        expectedValue: '2023-12-01 ~ yyyy-MM-dd'
      });
    });

    it('Should increase day when pressing ArrowUp ', () => {
      testKeyPress({
        key: '{arrowright}{arrowright}{arrowup}',
        defaultValue: [new Date('2023-10-01'), null],
        expectedValue: '2023-10-02 ~ yyyy-MM-dd'
      });
    });

    it('Should be updated for full month', () => {
      testKeyPress({
        defaultValue: [new Date('2023-01-01'), null],
        format: 'dd MMMM yyyy',
        key: '{arrowright}{arrowup}',
        expectedValue: '01 February 2023 ~ dd MMMM yyyy'
      });
    });

    it('Should decrement day when pressing ArrowDown ', () => {
      testKeyPress({
        key: '{arrowright}{arrowright}{arrowdown}',
        defaultValue: [new Date('2023-10-02'), null],
        expectedValue: '2023-10-01 ~ yyyy-MM-dd'
      });
    });

    it('Should return to the first day of this month when the maximum number of days is exceeded', () => {
      testKeyPress({
        key: '{arrowright}{arrowright}{arrowup}',
        defaultValue: [new Date('2023-02-28'), null],
        expectedValue: '2023-02-01 ~ yyyy-MM-dd'
      });
    });

    it('Should return to the last day of the month when the minimum number of days is exceeded', () => {
      testKeyPress({
        key: '{arrowright}{arrowright}{arrowdown}',
        defaultValue: [new Date('2023-02-01'), null],
        expectedValue: '2023-02-28 ~ yyyy-MM-dd'
      });
    });

    it('Should remove the year when delete key is pressed', () => {
      testKeyPress({
        key: '{backspace}',
        defaultValue: [new Date('2023-10-01'), null],
        expectedValue: 'yyyy-10-01 ~ yyyy-MM-dd'
      });
    });

    it('Should remove the month when delete key is pressed', () => {
      testKeyPress({
        key: '{arrowright}{backspace}',
        defaultValue: [new Date('2023-10-01'), null],
        expectedValue: '2023-MM-01 ~ yyyy-MM-dd'
      });
    });

    it('Should remove the day when delete key is pressed', () => {
      testKeyPress({
        key: '{arrowright}{arrowright}{backspace}',
        defaultValue: [new Date('2023-10-01'), null],
        expectedValue: '2023-10-dd ~ yyyy-MM-dd'
      });
    });

    it('Should support the hour format', () => {
      testContinuousKeyPress({
        format: 'HH',
        defaultValue: [new Date('2023-10-01 10:20:30'), null],
        keySequences: [
          { key: '{arrowup}', expected: '11 ~ HH' },
          { key: '{arrowdown}', expected: '10 ~ HH' }
        ]
      });
    });

    it('Should support 12 hour format', () => {
      testContinuousKeyPress({
        format: 'hh',
        defaultValue: [new Date('2023-10-01 12:00:00'), null],
        keySequences: [
          { key: '{arrowup}', expected: '01 ~ hh' },
          { key: '{arrowdown}', expected: '12 ~ hh' }
        ]
      });
    });

    it('Should support the minute format', () => {
      testContinuousKeyPress({
        format: 'mm',
        defaultValue: [new Date('2023-10-01 10:20:30'), null],
        keySequences: [
          { key: '{arrowup}', expected: '21 ~ mm' },
          { key: '{arrowdown}', expected: '20 ~ mm' }
        ]
      });
    });

    it('Should support the second format', () => {
      testContinuousKeyPress({
        format: 'ss',
        defaultValue: [new Date('2023-10-01 10:20:30'), null],
        keySequences: [
          { key: '{arrowup}', expected: '31 ~ ss' },
          { key: '{arrowdown}', expected: '30 ~ ss' }
        ]
      });
    });

    it('Should support the AM/PM format', () => {
      testContinuousKeyPress({
        format: 'aa',
        defaultValue: [new Date('2023-10-01 13:00:00'), null],
        keySequences: [
          { key: '{arrowup}', expected: 'AM ~ aa' },
          { key: '{arrowdown}', expected: 'PM ~ aa' }
        ]
      });
    });

    it('Should show correct AM/PM by changing the hour', () => {
      testContinuousKeyPress({
        format: 'HH aa',
        defaultValue: [new Date('2023-10-01 13:00:00'), null],
        keySequences: [
          { key: '1', expected: '01 AM ~ HH aa' },
          { key: '3', expected: '13 PM ~ HH aa' }
        ]
      });
    });

    it('Should support the year format', () => {
      testContinuousKeyPress({
        format: 'yyyy',
        defaultValue: [new Date('2023-10-01'), null],
        keySequences: [
          { key: '2', expected: '0002 ~ yyyy' },
          { key: '0', expected: '0020 ~ yyyy' },
          { key: '2', expected: '0202 ~ yyyy' },
          { key: '3', expected: '2023 ~ yyyy' },
          { key: '1', expected: '0001 ~ yyyy' },
          { key: '9', expected: '0019 ~ yyyy' },
          { key: '9', expected: '0199 ~ yyyy' },
          { key: '8', expected: '1998 ~ yyyy' }
        ]
      });
    });

    it('Should support the month format', () => {
      testContinuousKeyPress({
        format: 'MM',
        defaultValue: [new Date('2023-10-01'), null],
        keySequences: [
          { key: '2', expected: '02 ~ MM' },
          { key: '1', expected: '01 ~ MM' },
          { key: '2', expected: '12 ~ MM' },
          { key: '9', expected: '09 ~ MM' },
          { key: '1', expected: '01 ~ MM' },
          { key: '1', expected: '11 ~ MM' }
        ]
      });
    });

    it('Should use numeric input to match to month', () => {
      testContinuousKeyPress({
        format: 'MMMM',
        defaultValue: [new Date('2023-10-01'), null],
        keySequences: [
          { key: '2', expected: 'February ~ MMMM' },
          { key: '1', expected: 'January ~ MMMM' },
          { key: '2', expected: 'December ~ MMMM' },
          { key: '9', expected: 'September ~ MMMM' },
          { key: '1', expected: 'January ~ MMMM' },
          { key: '1', expected: 'November ~ MMMM' }
        ]
      });
    });

    it('Should use numeric input to match to abbreviated month', () => {
      testContinuousKeyPress({
        format: 'MMM',
        defaultValue: [new Date('2023-10-01'), null],
        keySequences: [
          { key: '2', expected: 'Feb ~ MMM' },
          { key: '1', expected: 'Jan ~ MMM' },
          { key: '2', expected: 'Dec ~ MMM' },
          { key: '9', expected: 'Sep ~ MMM' },
          { key: '1', expected: 'Jan ~ MMM' },
          { key: '1', expected: 'Nov ~ MMM' }
        ]
      });
    });

    it('Should support the day format', () => {
      testContinuousKeyPress({
        format: 'dd',
        defaultValue: [new Date('2023-10-10'), null],
        keySequences: [
          { key: '3', expected: '03 ~ dd' },
          { key: '1', expected: '31 ~ dd' },
          { key: '2', expected: '02 ~ dd' },
          { key: '9', expected: '29 ~ dd' },
          { key: '1', expected: '01 ~ dd' },
          { key: '1', expected: '11 ~ dd' }
        ]
      });
    });

    it('Should support the hour format', () => {
      testContinuousKeyPress({
        format: 'HH',
        defaultValue: [new Date('2023-10-01 00:00:00'), null],
        keySequences: [
          { key: '2', expected: '02 ~ HH' },
          { key: '1', expected: '21 ~ HH' },
          { key: '5', expected: '05 ~ HH' },
          { key: '9', expected: '09 ~ HH' },
          { key: '1', expected: '01 ~ HH' },
          { key: '1', expected: '11 ~ HH' }
        ]
      });
    });

    it('Should support the minute format', () => {
      testContinuousKeyPress({
        format: 'mm',
        defaultValue: [new Date('2023-10-01 00:00:00'), null],
        keySequences: [
          { key: '2', expected: '02 ~ mm' },
          { key: '1', expected: '21 ~ mm' },
          { key: '5', expected: '05 ~ mm' },
          { key: '9', expected: '59 ~ mm' },
          { key: '6', expected: '06 ~ mm' },
          { key: '1', expected: '01 ~ mm' }
        ]
      });
    });

    it('Should support the second format', () => {
      testContinuousKeyPress({
        format: 'ss',
        defaultValue: [new Date('2023-10-01 00:00:00'), null],
        keySequences: [
          { key: '2', expected: '02 ~ ss' },
          { key: '1', expected: '21 ~ ss' },
          { key: '5', expected: '05 ~ ss' },
          { key: '9', expected: '59 ~ ss' },
          { key: '6', expected: '06 ~ ss' },
          { key: '1', expected: '01 ~ ss' }
        ]
      });
    });

    it('Should be able to enter key input continuously', async () => {
      await testKeyPressAsync({
        keys: '2024010120240202'.split(''),
        expectedValue: '2024-01-01 ~ 2024-02-02'
      });
    });

    it('Should be able to enter key input continuously with custom format', async () => {
      await testKeyPressAsync({
        format: 'MM/dd/yyyy',
        keys: '0101202402022024'.split(''),
        expectedValue: '01/01/2024 ~ 02/02/2024'
      });
    });

    it('Should be able to enter key input continuously with abbreviated month', async () => {
      await testKeyPressAsync({
        format: 'MMM dd,yyyy',
        keys: '0101202402022024'.split(''),
        expectedValue: 'Jan 01,2024 ~ Feb 02,2024'
      });
    });

    it('Should reset the value rather than concatenate the value', async () => {
      await testKeyPressAsync({
        format: 'MM/dd/yyyy',
        defaultValue: [new Date('2024-01-01'), new Date('2024-02-01')],
        keys: '0401',

        // Fix #3828
        // Error value: 10/14/0001
        expectedValue: '04/01/2024 ~ 02/01/2024'
      });
    });
  });

  describe('DateRangeInput - Paste', () => {
    it('Should call `onChange` with pasted value', () => {
      const onChange = sinon.spy();

      render(<DateRangeInput format="yyyy-MM-dd" onChange={onChange} />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const event = mockClipboardEvent('2024-07-21 ~ 2024-07-22');

      fireEvent(input, event);

      expect(input).to.have.value('2024-07-21 ~ 2024-07-22');
      expect(format(onChange.lastCall.firstArg[0], 'yyyy-MM-dd')).to.have.eql('2024-07-21');
      expect(format(onChange.lastCall.firstArg[1], 'yyyy-MM-dd')).to.have.eql('2024-07-22');
    });

    it('Should not call `onChange` with invalid pasted value', () => {
      const onChange = sinon.spy();

      render(
        <DateRangeInput
          format="yyyy-MM-dd"
          onChange={onChange}
          defaultValue={[new Date('2023-10-01'), new Date('2023-10-02')]}
        />
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;

      // Invalid month
      const event = mockClipboardEvent('2024-07-dd ~ 2024-07-22');

      fireEvent(input, event);

      expect(input).to.have.value('2023-10-01 ~ 2023-10-02');
      expect(onChange).to.not.have.been.called;
    });

    it('Should not call `onChange` with invalid pasted value', () => {
      const onChange = sinon.spy();

      render(
        <DateRangeInput
          onChange={onChange}
          format="MM/dd/yyyy"
          defaultValue={[new Date('2023-10-01'), new Date('2023-10-02')]}
        />
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;

      // Invalid date format
      const event = mockClipboardEvent('2024-07-21 ~ 2024-07-22');

      fireEvent(input, event);

      expect(input).to.have.value('10/01/2023 ~ 10/02/2023');
      expect(onChange).to.not.have.been.called;
    });

    it('Should call `onPaste` callback', () => {
      const onPaste = sinon.spy();

      render(<DateRangeInput onPaste={onPaste} />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const event = mockClipboardEvent('2024-07-21 ~ 2024-07-22');

      fireEvent(input, event);
      expect(onPaste).to.have.been.called;
    });
  });
});
