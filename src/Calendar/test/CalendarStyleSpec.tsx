import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from '../Calendar';
import { getDefaultPalette, itChrome, toRGB } from '@test/utils';
import { CalendarState } from '../hooks';
import '../styles/index.less';

const { H500, H700 } = getDefaultPalette();

describe('Calendar styles', () => {
  it('MonthToolbar should render correct styles', () => {
    render(<Calendar />);

    const toolbar = screen
      .getByTestId('calendar')
      ?.querySelector('.rs-calendar-header-month-toolbar');

    expect(toolbar).to.have.style('float', 'left');
    expect(toolbar).to.have.style('display', 'block');
    expect(toolbar).to.have.style('text-align', 'center');
  });

  it('TodayButton should render correct styles', () => {
    render(<Calendar />);

    const button = screen.getByRole('button', { name: 'Today' });

    expect(button).to.have.style('background-color', toRGB('#f7f7fa'));
    expect(button).to.have.style('padding', '5px 10px');
  });

  it('Selected item should render correct styles', () => {
    render(<Calendar value={new Date('2024-05-01')} />);

    const selectedCell = screen.getByRole('gridcell', { name: '01 May 2024' }).firstChild;

    expect(selectedCell).to.have.style('box-shadow', `${H500} 0px 0px 0px 1px inset`);
  });

  it('Click date title button should render correct styles', () => {
    render(<Calendar value={new Date('2024-05-01')} />);

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    expect(screen.queryByRole('button', { name: 'Previous month' })).to.not.exist;
    expect(screen.queryByRole('button', { name: 'Next month' })).to.not.exist;
    expect(screen.getByTestId('calendar-month-dropdown')).to.have.style('display', 'block');
    expect(screen.getByRole('rowheader', { name: '2024' })).to.have.style('color', H700);

    const selectedCell = screen.getByRole('gridcell', { name: 'May 2024' }).firstChild;

    expect(selectedCell).to.have.style('background-color', H500);
    expect(selectedCell).to.have.style('color', toRGB('#fff'));
  });

  itChrome('Should be bordered on cell', () => {
    render(<Calendar bordered value={new Date('2024-05-01')} />);

    expect(screen.getByRole('gridcell', { name: '01 May 2024' })).to.have.style(
      'border-bottom',
      '1px solid rgb(242, 242, 245)'
    );
  });

  itChrome('Should be bordered on month row', () => {
    render(<Calendar defaultState={CalendarState.MONTH} bordered value={new Date('2024-05-01')} />);

    expect(screen.queryByRole('row', { name: '2024' })).to.have.style(
      'border-bottom',
      `1px dashed ${toRGB('#e5e5ea')}`
    );
  });

  it('Should render compact calendar', () => {
    render(<Calendar compact value={new Date('2024-05-01')} />);

    expect(screen.queryByRole('gridcell', { name: '01 May 2024' })).to.have.style('height', '38px');
  });
});
