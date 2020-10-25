import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { format, parseISO } from '../../utils/dateUtils';
import { getDOMNode } from '@test/testUtils';
import CalendarPanel from '../CalendarPanel';

describe('Calendar - Panel', () => {
  it('Should render a div with `calendar` class', () => {
    const instance = getDOMNode(<CalendarPanel />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\bcalendar\b/));
  });

  it('Should be compact', () => {
    const instance = getDOMNode(<CalendarPanel compact />);
    assert.ok(instance.className.match(/\bcompact\b/));
  });

  it('Should be rendered custom elements', () => {
    const instance = getDOMNode(
      <CalendarPanel
        defaultValue={parseISO('2018-07-01')}
        renderCell={() => {
          return <i className="text">test</i>;
        }}
      />
    );
    assert.equal(instance.querySelectorAll('.text').length, 42);
  });

  it('Should be bordered', () => {
    const instance = getDOMNode(<CalendarPanel bordered />);
    assert.ok(instance.className.match(/\bbordered\b/));
  });

  it('Should output valid one day', () => {
    const instance = getDOMNode(
      <CalendarPanel format="yyyy-MM-dd" defaultValue={parseISO('2018-07-01')} />
    );
    assert.equal(
      instance
        .querySelectorAll('.rs-calendar-table-row')[1]
        .querySelector('.rs-calendar-table-cell-content').innerText,
      '1'
    );
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(<CalendarPanel format="yyyy-MM-dd" onSelect={doneOp} />);

    ReactTestUtils.Simulate.click(
      instance.querySelector('.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content')
    );
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<CalendarPanel className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<CalendarPanel style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<CalendarPanel classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should call `onSelect` callback in zoned date', done => {
    const timeZone = 'Africa/Abidjan';
    const instance = getDOMNode(
      <CalendarPanel
        timeZone={timeZone}
        onSelect={value => {
          assert.equal(format(value, 'HH:mm'), format(new Date(), 'HH:mm'));
          done();
        }}
      />
    );
    ReactTestUtils.Simulate.click(
      instance.querySelector('.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content')
    );
  });
});
