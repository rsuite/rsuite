import React from 'react';
import { format } from 'date-fns';
import { testStandardProps } from '@test/commonCases';
import { testControlledUnControlled } from '@test/utils';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import DateInput from '../DateInput';

import { testKeyPress, testContinuousKeyPress } from './testUtils';

describe('DateInput', () => {
  testStandardProps(<DateInput />);

  testControlledUnControlled(DateInput, {
    defaultValue: new Date(),
    value: new Date('2023-10-01'),
    changedValue: new Date('2023-10-02'),
    triggerChangeValue: () => {
      const input = screen.getByRole('textbox') as HTMLInputElement;
      userEvent.type(input, '2025');
      return [new Date('2025-10-01'), 4];
    },
    expectedValue: (value: Date) => {
      expect(screen.getByRole('textbox')).to.value(format(value, 'yyyy-MM-dd'));
    },
    expectedTextValue: (value: Date) => {
      expect(screen.getByRole('text')).to.have.text(format(value, 'yyyy-MM-dd'));
    }
  });

  it('Should render values according to the default format', () => {
    render(<DateInput />);

    expect(screen.getByRole('textbox')).to.value('yyyy-MM-dd');
  });

  it('Should render values according to the given format', () => {
    render(<DateInput format="dd-MM-yyyy" />);

    expect(screen.getByRole('textbox')).to.value('dd-MM-yyyy');
  });

  it('Should format the value according to the given `format`', () => {
    render(<DateInput format="MMMM dd, yyyy" value={new Date('2023-12-08')} />);

    expect(screen.getByRole('textbox')).to.value('December 08, 2023');
  });

  it('Should call `onChange` with the new value', () => {
    const onChange = sinon.spy();
    render(
      <DateInput onChange={onChange} format="yyyy-MM-dd" defaultValue={new Date('2023-10-01')} />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.click(input);
    fireEvent.keyDown(input, { key: '2024' });

    expect(onChange).to.be.calledWithMatch(new Date('2024-10-01'));
    expect(input).to.value('2024-10-01');
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
        keySequences: [
          { key: '{arrowup}', expected: 'AM' },
          { key: '{arrowdown}', expected: 'PM' }
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
  });
});
