import React from 'react';
import { format, parseISO } from '../../utils/dateUtils';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import Header from '../Header';

describe('Calendar-Header', () => {
  it('Should render a div with "calendar-header" class', () => {
    const instance = getDOMNode(<Header date={new Date()} />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\bcalendar-header\b/));
  });

  it('Should output a time for `HH:ss`', () => {
    const date = new Date('2019-04-01 12:20:00');
    const formatType = 'HH:ss';
    const instance = getDOMNode(<Header showTime date={date} format={formatType} />);

    assert.equal(
      instance.querySelector('.rs-calendar-header-title-time').innerText,
      format(parseISO('2019-04-01 12:20:00'), formatType)
    );
  });

  it('Should output a date for `yyyy-MM-dd`', () => {
    const date = new Date();
    const formatType = 'yyyy-MM-dd';
    const instance = getDOMNode(<Header showDate date={date} format={formatType} />);

    assert.equal(
      instance.querySelector('.rs-calendar-header-title-date').innerText,
      format(new Date(), formatType)
    );
  });

  it('Should output a date for `yyyy-MM`', () => {
    const date = new Date();
    const formatType = 'yyyy-MM';
    const instance = getDOMNode(<Header showMonth date={date} format={formatType} />);

    assert.equal(
      instance.querySelector('.rs-calendar-header-title-date').innerText,
      format(new Date(), formatType)
    );
  });

  it('Should call `onMoveForward` callback', done => {
    const doneOp = () => {
      done();
    };

    const date = new Date();
    const formatType = 'yyyy-MM';
    const instance = getDOMNode(
      <Header showMonth date={date} format={formatType} onMoveForward={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-header-forward'));
  });

  it('Should call `onMoveBackward` callback', done => {
    const doneOp = () => {
      done();
    };

    const date = new Date();
    const formatType = 'yyyy-MM';
    const instance = getDOMNode(
      <Header showMonth date={date} format={formatType} onMoveBackward={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-header-backward'));
  });

  it('Should call `onToggleMonthDropdown` callback', done => {
    const doneOp = () => {
      done();
    };

    const date = new Date();
    const formatType = 'yyyy-MM';
    const instance = getDOMNode(
      <Header showMonth date={date} format={formatType} onToggleMonthDropdown={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-header-title-date'));
  });

  it('Should call `onToggleTimeDropdown` callback', done => {
    const doneOp = () => {
      done();
    };

    const date = new Date();
    const formatType = 'HH:mm:ss';
    const instance = getDOMNode(
      <Header showTime date={date} format={formatType} onToggleTimeDropdown={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-header-title-time'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Header className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Header style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Header classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
