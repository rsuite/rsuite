import React from 'react';
import { format, isValid } from 'date-fns';
import { testStandardProps, testControlledUnControlled, testFormControl } from '@test/utils';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockClipboardEvent } from '@test/mocks/data-mock';
import sinon from 'sinon';
import DateInput from '../DateInput';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';
import { keyPressTests } from './testUtils';

const { testKeyPress, testKeyPressAsync, testContinuousKeyPress } = keyPressTests(DateInput);

describe('DateInput', () => {
  testStandardProps(<DateInput />, { sizes: ['lg', 'md', 'sm', 'xs'] });

  testControlledUnControlled(DateInput, {
    defaultValue: new Date('2023-10-01'),
    value: new Date('2023-10-01'),
    changedValue: new Date('2023-10-02'),
    simulateEvent: null,
    componentProps: {
      format: 'yyyy-MM-dd'
    },
    simulateChangeEvents: [
      {
        change: () => {
          userEvent.type(screen.getByRole('textbox'), '2025');
        },
        value: new Date('2025-10-01'),
        callCount: 4
      },
      {
        change: () => {
          userEvent.type(screen.getByRole('textbox'), '{backspace}');
        },
        value: new Date(''),
        expectedValue: () => {
          expect(screen.getByRole('textbox')).to.value('yyyy-10-01');
        }
      }
    ],
    expectedValue: (value: Date) => {
      expect(screen.getByRole('textbox')).to.value(format(value, 'yyyy-MM-dd'));
    }
  });

  testFormControl(DateInput, {
    value: new Date('2023-10-01'),
    componentProps: {
      format: 'yyyy-MM-dd'
    }
  });

  it('Should render placeholder according to the default format', () => {
    render(<DateInput format="yyyy-MM-dd" />);

    expect(screen.getByRole('textbox')).to.have.attribute('placeholder', 'yyyy-MM-dd');

    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).to.have.value('yyyy-MM-dd');
  });

  it('Should render placeholder according to the given format', () => {
    render(<DateInput format="dd-MM-yyyy" />);

    expect(screen.getByRole('textbox')).to.have.attribute('placeholder', 'dd-MM-yyyy');

    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).to.have.value('dd-MM-yyyy');
  });

  it('Should format the value according to the given `format`', () => {
    render(<DateInput format="MMMM dd, yyyy" value={new Date('2023-12-08')} />);

    expect(screen.getByRole('textbox')).to.value('December 08, 2023');
  });

  it('Should call `onChange` with the new value', () => {
    const onChange = sinon.spy();
    render(<DateInput onChange={onChange} format="yyyy-MM-dd" data-test="true" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.click(input);
    userEvent.type(input, '2024');

    expect(isNaN(onChange.getCall(3).firstArg.getTime())).to.be.true;
    expect(input).to.value('2024-MM-dd');

    userEvent.type(input, '{arrowright}12');

    expect(isNaN(onChange.getCall(5).firstArg.getTime())).to.be.true;
    expect(input).to.value('2024-12-dd');

    userEvent.type(input, '{arrowright}{arrowright}20');

    expect(format(onChange.lastCall.firstArg, 'yyyy-MM-dd')).to.be.eql('2024-12-20');
    expect(input).to.value('2024-12-20');

    expect(onChange).to.be.callCount(8);
  });

  it('Should get null value in onChange callback', () => {
    const onChange = sinon.spy();

    render(<DateInput onChange={onChange} format="yyyy" defaultValue={new Date('2023-10-01')} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.click(input);
    fireEvent.keyDown(input, { key: 'Backspace' });
    fireEvent.blur(input);

    expect(input).to.value('');
    expect(onChange).to.have.been.calledWith(null);

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should clear the value in the input box', () => {
    const onChange = sinon.spy();

    render(
      <DateInput onChange={onChange} format="yyyy-MM-dd" defaultValue={new Date('2023-10-01')} />
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
        <DateInput value={new Date('2023-10-01')} format="dd MMMM yyyy" />
      </CustomProvider>
    );

    expect(screen.getByRole('textbox')).to.have.value('01 十月 2023');

    rerender(
      <CustomProvider locale={zhCN}>
        <DateInput value={new Date('2023-11-20')} format="dd MMM yyyy" />
      </CustomProvider>
    );

    expect(screen.getByRole('textbox')).to.have.value('20 11月 2023');
  });

  // fix: #3715
  it('Should return invalid value in `onChange` callback', () => {
    const onChange = sinon.spy();

    render(<DateInput onChange={onChange} format="dd" />);

    const input = screen.getByRole('textbox');

    userEvent.click(input);
    userEvent.keyboard('0');

    expect(isValid(onChange.lastCall.firstArg)).to.be.false;

    userEvent.keyboard('05');

    expect(isValid(onChange.lastCall.firstArg)).to.be.true;
  });

  describe('DateInput - KeyPress', () => {
    it('Should increase year when pressing ArrowUp ', () => {
      testKeyPress({
        key: '{arrowup}',
        defaultValue: new Date('2023-10-01'),
        expectedValue: '2024-10-01'
      });
    });

    it('Should decrement year when pressing ArrowDown ', () => {
      testKeyPress({
        key: '{arrowdown}',
        defaultValue: new Date('2023-10-01'),
        expectedValue: '2022-10-01'
      });
    });

    it('Should increase month when pressing ArrowUp ', () => {
      testKeyPress({
        key: '{arrowright}{arrowup}',
        defaultValue: new Date('2023-10-01'),
        expectedValue: '2023-11-01'
      });
    });

    it('Should go back to January when it exceeds December', () => {
      testKeyPress({
        key: '{arrowright}{arrowup}',
        defaultValue: new Date('2023-12-01'),
        expectedValue: '2023-01-01'
      });
    });

    it('Should go back to December when it exceeds January', () => {
      testKeyPress({
        key: '{arrowright}{arrowdown}',
        defaultValue: new Date('2023-01-01'),
        expectedValue: '2023-12-01'
      });
    });

    it('Should decrement month when pressing ArrowDown ', () => {
      testKeyPress({
        key: '{arrowright}{arrowdown}',
        defaultValue: new Date('2023-10-01'),
        expectedValue: '2023-09-01'
      });
    });

    it('Should be returned to January when the maximum month is exceeded', () => {
      testKeyPress({
        key: '{arrowright}{arrowup}',
        defaultValue: new Date('2023-12-01'),
        expectedValue: '2023-01-01'
      });
    });

    it('Should be returned to December when the minimum month is exceeded', () => {
      testKeyPress({
        key: '{arrowright}{arrowdown}',
        defaultValue: new Date('2023-01-01'),
        expectedValue: '2023-12-01'
      });
    });

    it('Should increase day when pressing ArrowUp ', () => {
      testKeyPress({
        key: '{arrowright}{arrowright}{arrowup}',
        defaultValue: new Date('2023-10-01'),
        expectedValue: '2023-10-02'
      });
    });

    it('Should be updated for full month', () => {
      testKeyPress({
        defaultValue: new Date('2023-01-01'),
        format: 'dd MMMM yyyy',
        key: '{arrowright}{arrowup}',
        expectedValue: '01 February 2023'
      });
    });

    it('Should decrement day when pressing ArrowDown ', () => {
      testKeyPress({
        key: '{arrowright}{arrowright}{arrowdown}',
        defaultValue: new Date('2023-10-02'),
        expectedValue: '2023-10-01'
      });
    });

    it('Should return to the first day of this month when the maximum number of days is exceeded', () => {
      testKeyPress({
        key: '{arrowright}{arrowright}{arrowup}',
        defaultValue: new Date('2023-02-28'),
        expectedValue: '2023-02-01'
      });
    });

    it('Should return to the last day of the month when the minimum number of days is exceeded', () => {
      testKeyPress({
        key: '{arrowright}{arrowright}{arrowdown}',
        defaultValue: new Date('2023-02-01'),
        expectedValue: '2023-02-28'
      });
    });

    it('Should remove the year when delete key is pressed', () => {
      testKeyPress({
        key: '{backspace}',
        defaultValue: new Date('2023-10-01'),
        expectedValue: 'yyyy-10-01'
      });
    });

    it('Should remove the month when delete key is pressed', () => {
      testKeyPress({
        key: '{arrowright}{backspace}',
        defaultValue: new Date('2023-10-01'),
        expectedValue: '2023-MM-01'
      });
    });

    it('Should remove the day when delete key is pressed', () => {
      testKeyPress({
        key: '{arrowright}{arrowright}{backspace}',
        defaultValue: new Date('2023-10-01'),
        expectedValue: '2023-10-dd'
      });
    });

    it('Should support the hour format', () => {
      testContinuousKeyPress({
        format: 'HH',
        defaultValue: new Date('2023-10-01 10:20:30'),
        keySequences: [
          { key: '{arrowup}', expected: '11' },
          { key: '{arrowdown}', expected: '10' }
        ]
      });
    });

    it('Should support the hour format', () => {
      testContinuousKeyPress({
        format: 'HH',
        defaultValue: new Date('2024-01-01 01:00:00'),
        keySequences: [
          { key: '{arrowdown}', expected: '00' },
          { key: '{arrowdown}', expected: '23' }
        ]
      });
    });

    it('Should support 12 hour format', () => {
      testContinuousKeyPress({
        format: 'hh',
        defaultValue: new Date('2023-10-01 12:00:00'),
        keySequences: [
          { key: '{arrowup}', expected: '01' },
          { key: '{arrowdown}', expected: '12' }
        ]
      });
    });

    it('Should support the minute format', () => {
      testContinuousKeyPress({
        format: 'mm',
        defaultValue: new Date('2023-10-01 10:20:30'),
        keySequences: [
          { key: '{arrowup}', expected: '21' },
          { key: '{arrowdown}', expected: '20' }
        ]
      });
    });

    it('Should support the second format', () => {
      testContinuousKeyPress({
        format: 'ss',
        defaultValue: new Date('2023-10-01 10:20:30'),
        keySequences: [
          { key: '{arrowup}', expected: '31' },
          { key: '{arrowdown}', expected: '30' }
        ]
      });
    });

    it('Should support the AM/PM format', () => {
      testContinuousKeyPress({
        format: 'aa',
        defaultValue: new Date('2023-10-01 13:00:00'),
        keySequences: [
          { key: '{arrowup}', expected: 'AM' },
          { key: '{arrowdown}', expected: 'PM' }
        ]
      });
    });

    it('Should show correct AM/PM by changing the hour', () => {
      testContinuousKeyPress({
        format: 'HH aa',
        defaultValue: new Date('2023-10-01 13:00:00'),
        keySequences: [
          { key: '1', expected: '01 AM' },
          { key: '3', expected: '13 PM' }
        ]
      });
    });

    it('Should support the year format', () => {
      testContinuousKeyPress({
        format: 'yyyy',
        keySequences: [
          { key: '2', expected: '0002' },
          { key: '0', expected: '0020' },
          { key: '2', expected: '0202' },
          { key: '3', expected: '2023' },
          { key: '1', expected: '0001' },
          { key: '9', expected: '0019' },
          { key: '9', expected: '0199' },
          { key: '8', expected: '1998' }
        ]
      });
    });

    it('Should support the month format', () => {
      testContinuousKeyPress({
        format: 'MM',
        keySequences: [
          { key: '2', expected: '02' },
          { key: '1', expected: '01' },
          { key: '2', expected: '12' },
          { key: '9', expected: '09' },
          { key: '1', expected: '01' },
          { key: '1', expected: '11' }
        ]
      });
    });

    it('Should use numeric input to match to month', () => {
      testContinuousKeyPress({
        format: 'MMMM',
        keySequences: [
          { key: '2', expected: 'February' },
          { key: '1', expected: 'January' },
          { key: '2', expected: 'December' },
          { key: '9', expected: 'September' },
          { key: '1', expected: 'January' },
          { key: '1', expected: 'November' }
        ]
      });
    });

    it('Should use numeric input to match to abbreviated month', () => {
      testContinuousKeyPress({
        format: 'MMM',
        keySequences: [
          { key: '2', expected: 'Feb' },
          { key: '1', expected: 'Jan' },
          { key: '2', expected: 'Dec' },
          { key: '9', expected: 'Sep' },
          { key: '1', expected: 'Jan' },
          { key: '1', expected: 'Nov' }
        ]
      });
    });

    it('Should support the day format', () => {
      testContinuousKeyPress({
        format: 'dd',
        keySequences: [
          { key: '3', expected: '03' },
          { key: '1', expected: '31' },
          { key: '2', expected: '02' },
          { key: '9', expected: '29' },
          { key: '1', expected: '01' },
          { key: '1', expected: '11' }
        ]
      });
    });

    it('Should support the hour format', () => {
      testContinuousKeyPress({
        format: 'HH',
        keySequences: [
          { key: '2', expected: '02' },
          { key: '1', expected: '21' },
          { key: '5', expected: '05' },
          { key: '9', expected: '09' },
          { key: '1', expected: '01' },
          { key: '1', expected: '11' }
        ]
      });
    });

    it('Should support the minute format', () => {
      testContinuousKeyPress({
        format: 'mm',
        keySequences: [
          { key: '2', expected: '02' },
          { key: '1', expected: '21' },
          { key: '5', expected: '05' },
          { key: '9', expected: '59' },
          { key: '6', expected: '06' },
          { key: '1', expected: '01' }
        ]
      });
    });

    it('Should support the second format', () => {
      testContinuousKeyPress({
        format: 'ss',
        keySequences: [
          { key: '2', expected: '02' },
          { key: '1', expected: '21' },
          { key: '5', expected: '05' },
          { key: '9', expected: '59' },
          { key: '6', expected: '06' },
          { key: '1', expected: '01' }
        ]
      });
    });

    it('Should be able to enter key input continuously', async () => {
      await testKeyPressAsync({
        keys: '20240101',
        expectedValue: '2024-01-01'
      });
    });

    it('Should be able to enter key input continuously with 24 hour format', async () => {
      await testKeyPressAsync({
        format: 'MM/dd/yyyy HH:mm:ss',
        keys: '01012024120130',
        expectedValue: '01/01/2024 12:01:30'
      });
    });

    it('Should be able to enter key input continuously with 12 hour format', async () => {
      await testKeyPressAsync({
        format: 'MM/dd/yyyy hh:mm:ss',
        keys: '01012024140130',
        expectedValue: '01/01/2024 02:01:30'
      });
    });

    it('Should be able to enter key input continuously with abbreviated month', async () => {
      await testKeyPressAsync({
        format: 'MMM dd,yyyy',
        keys: '01012024',
        expectedValue: 'Jan 01,2024'
      });
    });

    it('Should reset the value rather than concatenate the value', async () => {
      await testKeyPressAsync({
        format: 'MM/dd/yyyy',
        defaultValue: new Date('2024-01-01'),
        keys: '0401',

        // Fix #3828
        // Error value: 10/14/0001
        expectedValue: '04/01/2024'
      });
    });
  });

  describe('DateInput - Paste', () => {
    it('Should call `onChange` with pasted value', () => {
      const onChange = sinon.spy();

      render(<DateInput onChange={onChange} format="yyyy-MM-dd" />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const event = mockClipboardEvent('2024-07-21');

      fireEvent(input, event);

      expect(input).to.have.value('2024-07-21');
      expect(format(onChange.lastCall.firstArg, 'yyyy-MM-dd')).to.have.eql('2024-07-21');
    });

    it('Should not call `onChange` with invalid pasted value', () => {
      const onChange = sinon.spy();

      render(
        <DateInput onChange={onChange} format="yyyy-MM-dd" defaultValue={new Date('2023-10-01')} />
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;

      // Invalid month
      const event = mockClipboardEvent('2024-07-dd');

      fireEvent(input, event);

      expect(onChange).to.not.have.been.called;
      expect(input).to.have.value('2023-10-01');
    });

    it('Should not call `onChange` with invalid pasted value', () => {
      const onChange = sinon.spy();

      render(
        <DateInput onChange={onChange} format="MM/dd/yyyy" defaultValue={new Date('2023-10-01')} />
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;

      // Invalid date format
      const event = mockClipboardEvent('2024-07-21');

      fireEvent(input, event);

      expect(onChange).to.not.have.been.called;
      expect(input).to.have.value('10/01/2023');
    });

    it('Should call `onPaste` callback', () => {
      const onPaste = sinon.spy();

      render(<DateInput onPaste={onPaste} />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const event = mockClipboardEvent('2024-07-21');

      fireEvent(input, event);

      expect(onPaste).to.have.been.called;
    });
  });
});
