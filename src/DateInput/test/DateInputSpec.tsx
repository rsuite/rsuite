import React from 'react';
import { testStandardProps } from '@test/commonCases';
import { render, screen, fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import DateInput from '../DateInput';

describe('DatePicker', () => {
  testStandardProps(<DateInput />);

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

  it('Should be controlled value', () => {
    const { rerender } = render(
      <DateInput value={new Date('2023-12-08')} format="MMMM dd, yyyy" />
    );

    expect(screen.getByRole('textbox')).to.value('December 08, 2023');

    rerender(<DateInput value={new Date('2023-12-09')} format="MMMM dd, yyyy" />);

    expect(screen.getByRole('textbox')).to.value('December 09, 2023');
  });

  it('Should call `onChange` with the new value', () => {
    const onChange = sinon.spy();
    render(
      <DateInput onChange={onChange} format="yyyy-MM-dd" defaultValue={new Date('2023-10-01')} />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    input.setSelectionRange(0, 3);
    fireEvent.keyDown(input, { key: '2024' });

    expect(onChange).to.be.calledWithMatch(new Date('2024-10-01'));
    expect(input).to.value('2024-10-01');
  });
});
