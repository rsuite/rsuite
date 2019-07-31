import React from 'react';
import { findDOMNode } from 'react-dom';
import { format } from 'date-fns';
import ReactTestUtils from 'react-dom/test-utils';

import Header from '../Header';

describe('Calendar-Header', () => {
  it('Should render a div with "calendar-header" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Header date={new Date()} />);
    const instanceDOM = findDOMNode(instance);

    assert.equal(instanceDOM.nodeName, 'DIV');
    assert.ok(instanceDOM.className.match(/\bcalendar-header\b/));
  });

  it('Should output a time for `HH:ss`', () => {
    const date = new Date('2019-04-01 12:20:00');
    const formatType = 'HH:ss';
    const instance = ReactTestUtils.renderIntoDocument(
      <Header showTime date={date} format={formatType} />
    );

    const instanceDOM = findDOMNode(instance);
    assert.equal(
      instanceDOM.querySelector('.rs-calendar-header-title-time').innerText,
      format(new Date('2019-04-01 12:20:00'), formatType)
    );
  });

  it('Should output a date for `YYYY-MM-DD`', () => {
    const date = new Date();
    const formatType = 'YYYY-MM-DD';
    const instance = ReactTestUtils.renderIntoDocument(
      <Header showDate date={date} format={formatType} />
    );

    const instanceDOM = findDOMNode(instance);
    assert.equal(
      instanceDOM.querySelector('.rs-calendar-header-title-date').innerText,
      format(new Date(), formatType)
    );
  });

  it('Should output a date for `YYYY-MM`', () => {
    const date = new Date();
    const formatType = 'YYYY-MM';
    const instance = ReactTestUtils.renderIntoDocument(
      <Header showMonth date={date} format={formatType} />
    );

    const instanceDOM = findDOMNode(instance);
    assert.equal(
      instanceDOM.querySelector('.rs-calendar-header-title-date').innerText,
      format(new Date(), formatType)
    );
  });

  it('Should call `onMoveForword` callback', done => {
    const doneOp = () => {
      done();
    };

    const date = new Date();
    const formatType = 'YYYY-MM';
    const instance = ReactTestUtils.renderIntoDocument(
      <Header showMonth date={date} format={formatType} onMoveForword={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-calendar-header-forward'));
  });

  it('Should call `onMoveBackward` callback', done => {
    const doneOp = () => {
      done();
    };

    const date = new Date();
    const formatType = 'YYYY-MM';
    const instance = ReactTestUtils.renderIntoDocument(
      <Header showMonth date={date} format={formatType} onMoveBackward={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-calendar-header-backward'));
  });

  it('Should call `onToggleMonthDropdown` callback', done => {
    const doneOp = () => {
      done();
    };

    const date = new Date();
    const formatType = 'YYYY-MM';
    const instance = ReactTestUtils.renderIntoDocument(
      <Header showMonth date={date} format={formatType} onToggleMonthDropdown={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-calendar-header-title-date'));
  });

  it('Should call `onToggleTimeDropdown` callback', done => {
    const doneOp = () => {
      done();
    };

    const date = new Date();
    const formatType = 'HH:mm:ss';
    const instance = ReactTestUtils.renderIntoDocument(
      <Header showTime date={date} format={formatType} onToggleTimeDropdown={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-calendar-header-title-time'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Header className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Header style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Header classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
