import React from 'react';
import { render, fireEvent, waitFor, screen, within } from '@testing-library/react';
import sinon from 'sinon';
import { parseISO } from 'date-fns';
import { testStandardProps } from '@test/utils';
import Calendar from '../Calendar';

describe('Calendar', () => {
  testStandardProps(<Calendar />);

  it('Should render a div with `calendar` class', () => {
    render(<Calendar data-testid="calendar" />);

    expect(screen.getByTestId('calendar')).to.have.class('rs-calendar');
  });

  it('Should be compact', () => {
    render(<Calendar compact data-testid="calendar" />);

    expect(screen.getByTestId('calendar')).to.have.class('rs-calendar-compact');
  });

  it('Should be rendered custom elements', () => {
    render(
      <Calendar
        defaultValue={parseISO('2018-07-01')}
        renderCell={() => {
          return <i data-testid="custom-content">test</i>;
        }}
      />
    );

    expect(screen.getAllByTestId('custom-content')).to.have.lengthOf(42);
  });

  it('Should be bordered', () => {
    render(<Calendar bordered data-testid="calendar" />);

    expect(screen.getByTestId('calendar')).to.have.class('rs-calendar-bordered');
  });

  it('Should output valid one day', () => {
    render(<Calendar format="yyyy-MM-dd" defaultValue={parseISO('2018-07-01')} />);

    expect(within(screen.getAllByRole('row')[1]).getAllByRole('gridcell')[0]).to.have.text('1');
  });

  it('Should call `onSelect` callback', () => {
    const onSelectSpy = sinon.spy();
    render(<Calendar format="yyyy-MM-dd" onSelect={onSelectSpy} data-testid="calendar" />);

    fireEvent.click(screen.getByTitle(/today/i));

    expect(onSelectSpy).to.have.been.calledOnce;
  });

  it('Should be a controlled value', async () => {
    type AppInstance = {
      calendar: HTMLDivElement;
      setDate: (date: Date) => void;
    };
    const ref = React.createRef<AppInstance>();
    const App = React.forwardRef((_props, ref) => {
      const [value, setValue] = React.useState(new Date('6/10/2021'));
      const calendarRef = React.useRef();

      React.useImperativeHandle(ref, () => ({
        calendar: calendarRef.current,
        setDate: date => {
          setValue(date);
        }
      }));
      return <Calendar value={value} ref={calendarRef} format="yyyy-MM-dd" />;
    });

    render(<App ref={ref} />);

    const calendar = (ref.current as AppInstance).calendar;

    expect(calendar.querySelector('.rs-calendar-header-title')).text('Jun 2021');

    (ref.current as AppInstance).setDate(new Date('7/11/2021'));

    await waitFor(() => {
      expect(calendar.querySelector('.rs-calendar-header-title')).text('Jul 2021');
    });
  });

  it('Should be to not highlight dates that are not in this month', () => {
    render(<Calendar defaultValue={new Date('2023-04-01')} />);

    const cells = Array.from(
      screen
        .getByRole('grid', { name: 'Apr 2023' })

        .querySelectorAll('.rs-calendar-table-cell-un-same-month')
    ).map(cell => (cell as HTMLDivElement).innerText);

    expect(cells).to.deep.equal(['26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6']);
  });

  it('Should call `onMonthChange` callback when the display month changes', () => {
    const onMonthChangeSpy = sinon.spy();

    const { rerender } = render(
      <Calendar defaultValue={new Date(2023, 0, 1)} onMonthChange={onMonthChangeSpy} />
    );

    // Change month with Next/Previous month button
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(onMonthChangeSpy).to.have.been.calledOnce;

    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(onMonthChangeSpy).to.have.been.calledTwice;

    // Change month with Month dropdown
    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    fireEvent.click(
      screen.getByRole('gridcell', { name: 'Jan 2023' })?.nextElementSibling as HTMLDivElement
    );

    expect(onMonthChangeSpy).to.have.been.calledThrice;

    // Change month by clicking on a date in a different month
    rerender(<Calendar value={new Date(2023, 0, 1)} onMonthChange={onMonthChangeSpy} />);
    fireEvent.click(screen.getByTitle('01 Feb 2023')); // TODO-Doma Add accessible name to the button via aria-label
    expect(onMonthChangeSpy).to.have.callCount(4);
    expect((onMonthChangeSpy.getCall(3).args[0] as Date).getFullYear()).to.equal(2023);
    expect((onMonthChangeSpy.getCall(3).args[0] as Date).getMonth()).to.equal(1);

    // Change month with "Today" button
    const clock = sinon.useFakeTimers(new Date(2023, 0, 1));
    rerender(<Calendar value={new Date(2023, 1, 1)} onMonthChange={onMonthChangeSpy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Today' }));
    expect(onMonthChangeSpy).to.have.callCount(5);
    expect((onMonthChangeSpy.getCall(4).args[0] as Date).getFullYear()).to.equal(2023);
    expect((onMonthChangeSpy.getCall(4).args[0] as Date).getMonth()).to.equal(0);
    clock.restore();
  });

  it('Should  not call `onMonthChange` callback when same month is clicked', () => {
    const onMonthChangeSpy = sinon.spy();
    const onToggleMonthDropdownSpy = sinon.spy();

    render(
      <Calendar
        defaultValue={new Date('2023-01-01')}
        onMonthChange={onMonthChangeSpy}
        onToggleMonthDropdown={onToggleMonthDropdownSpy}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));
    fireEvent.click(screen.getByRole('gridcell', { name: 'Jan 2023' }));

    expect(onMonthChangeSpy).to.have.been.not.called;
    expect(onToggleMonthDropdownSpy).to.have.been.called;
  });

  describe('Custom week ', () => {
    it('Should render the correct week numbers', () => {
      const { rerender } = render(<Calendar value={new Date('2020-12-01')} showWeekNumbers />);

      expect(screen.queryByRole('rowheader', { name: 'Week 53' })).to.be.exist;

      rerender(<Calendar value={new Date('2022-12-01')} showWeekNumbers />);

      expect(screen.queryByRole('rowheader', { name: 'Week 53' })).to.not.exist;
    });

    it('Should render the correct week start', () => {
      render(<Calendar value={new Date('2024-05-21')} weekStart={2} />);

      const weeks = ['Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo'];
      const rows = screen.getAllByRole('columnheader');
      const gridcells = screen.getAllByRole('gridcell');

      rows.forEach((row, index) => {
        expect(row).to.have.text(weeks[index]);
      });

      expect(gridcells[0]).to.have.attribute('aria-label', '30 Apr 2024');
      expect(gridcells[gridcells.length - 1]).to.have.attribute('aria-label', '10 Jun 2024');
    });

    it('Should render the correct week start with `isoWeek`', () => {
      render(<Calendar value={new Date('2024-05-21')} isoWeek />);

      const weeks = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
      const rows = screen.getAllByRole('columnheader');
      const gridcells = screen.getAllByRole('gridcell');

      rows.forEach((row, index) => {
        expect(row).to.have.text(weeks[index]);
      });

      expect(gridcells[0]).to.have.attribute('aria-label', '29 Apr 2024');
      expect(gridcells[gridcells.length - 1]).to.have.attribute('aria-label', '09 Jun 2024');
    });
  });

  describe('Custom Month Dropdown', () => {
    it('Should render custom month dropdown', () => {
      render(
        <Calendar
          monthDropdownProps={{
            className: 'custom-dropdown',
            itemClassName: 'custom-item',
            as: 'ul',
            itemAs: 'li'
          }}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

      const dropdown = screen.getByTestId('calendar-month-dropdown');
      const item = within(dropdown).getAllByRole('row')[0];

      expect(dropdown).to.contain('.custom-dropdown');
      expect(item).to.have.class('custom-item');
      expect(item).to.be.tagName('li');
      expect(item.parentNode).to.be.tagName('ul');
    });

    it('Should render custom month dropdown with custom components', () => {
      const Menu = props => {
        const { className, ...rest } = props;
        return <ul className={`${className} custom-menu`} {...rest} />;
      };

      const Item = props => {
        const { className, ...rest } = props;
        return <li className={`${className} custom-item`} {...rest} />;
      };

      render(
        <Calendar
          monthDropdownProps={{
            as: Menu,
            itemAs: Item
          }}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

      const dropdown = screen.getByTestId('calendar-month-dropdown');
      const item = within(dropdown).getAllByRole('row')[0];

      expect(dropdown).to.contain('.custom-menu');
      expect(item).to.have.class('custom-item');

      expect(item).to.be.tagName('li');
      expect(item.parentNode).to.be.tagName('ul');
    });
  });
});
