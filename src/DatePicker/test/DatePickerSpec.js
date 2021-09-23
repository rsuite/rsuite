import React from 'react';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { format, isSameDay, parseISO } from '../../utils/dateUtils';
import { getDOMNode, getInstance, render } from '@test/testUtils';
import DatePicker from '../DatePicker';

describe('DatePicker ', () => {
  it('Should render a div with "rs-picker-date" class', () => {
    const instance = getDOMNode(<DatePicker />);
    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\brs-picker-date\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DatePicker disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be not cleanable', () => {
    const instance = getDOMNode(<DatePicker cleanable={false} value={new Date()} />);
    assert.ok(!instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should output a button', () => {
    const instance = getDOMNode(<DatePicker toggleAs="button" />);
    assert.equal(instance.querySelector('[role="combobox"]').tagName, 'BUTTON');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<DatePicker block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should output a date', () => {
    const instance = getDOMNode(<DatePicker defaultValue={parseISO('2017-08-14')} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, '2017-08-14');
  });

  it('Should output custom value', () => {
    const instance = getDOMNode(
      <DatePicker
        value={parseISO('2017-08-14')}
        renderValue={value => {
          return format(value, 'MM/dd/yyyy');
        }}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, '08/14/2017');
  });

  it('Should output a date', () => {
    const instance = getDOMNode(<DatePicker value={parseISO('2017-08-14')} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, '2017-08-14');
  });

  it('Should get panel container ref', function () {
    const instance = getDOMNode(<DatePicker defaultOpen />);
    assert.equal(instance.tagName, 'DIV');
  });

  it('Should call `onChange` callback', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(<DatePicker onChange={onChangeSpy} defaultOpen />);

    ReactTestUtils.Simulate.click(
      instance.overlay.querySelector('.rs-picker-toolbar-right .rs-btn')
    );

    assert.isTrue(onChangeSpy.calledOnce);
  });

  it('Should call `onChange` callback when click shortcut', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DatePicker onChange={onChangeSpy} defaultOpen />);
    const today = instance.overlay.querySelector('.rs-picker-toolbar-ranges button');

    ReactTestUtils.Simulate.click(today);

    assert.isTrue(isSameDay(onChangeSpy.firstCall.firstArg, new Date()));
  });

  it('Should call `onChange` callback when input change', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DatePicker onChange={onChangeSpy} />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    act(() => {
      input.value = '2021-10-01';
      ReactTestUtils.Simulate.change(input);
    });
    act(() => {
      ReactTestUtils.Simulate.blur(input);
    });

    assert.isTrue(onChangeSpy.calledOnce);
  });

  it('Should be prompted for an error date', () => {
    const instance = getInstance(<DatePicker />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    input.value = 'abc';
    ReactTestUtils.Simulate.change(input);

    assert.isNotNull(instance.root.querySelector('.rs-picker-error'));
  });

  it('Should be prompted for an error date by isValid', () => {
    const instance = getInstance(<DatePicker />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    input.value = '2021-00-00';
    ReactTestUtils.Simulate.change(input);

    assert.isNotNull(instance.root.querySelector('.rs-picker-error'));
  });

  it('Should be prompted for an error date by disabledDate', () => {
    const instance = getInstance(
      <DatePicker
        disabledDate={value => {
          return format(value, 'yyyy-MM-dd') === '2021-10-01';
        }}
      />
    );
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    input.value = '2021-10-02';
    ReactTestUtils.Simulate.change(input);

    assert.isNull(instance.root.querySelector('.rs-picker-error'));

    input.value = '2021-10-01';
    ReactTestUtils.Simulate.change(input);

    assert.isNotNull(instance.root.querySelector('.rs-picker-error'));
  });

  it('Should allow only time', () => {
    const instance = getInstance(<DatePicker format="HH:mm:ss" />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    act(() => {
      input.value = '10:00:00';
      ReactTestUtils.Simulate.change(input);
    });

    act(() => {
      ReactTestUtils.Simulate.blur(input);
    });

    assert.equal(instance.root.querySelector('.rs-picker-toggle-value').innerText, '10:00:00');
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    const instance = getDOMNode(<DatePicker defaultValue={new Date()} onClean={onCleanSpy} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    assert.isTrue(onCleanSpy.calledOnce);
  });

  it('Should call `onSelect` callback', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(<DatePicker onSelect={onSelectSpy} defaultOpen />);
    ReactTestUtils.Simulate.click(
      instance.overlay.querySelector(
        '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
      )
    );
    assert.isTrue(onSelectSpy.calledOnce);
  });

  it('Should call `onOk` callback', () => {
    const onOkSpy = sinon.spy();
    const instance = getInstance(<DatePicker onOk={onOkSpy} defaultOpen />);
    ReactTestUtils.Simulate.click(
      instance.overlay.querySelector('.rs-picker-toolbar-right .rs-btn')
    );
    assert.isTrue(onOkSpy.calledOnce);
  });

  it('Should call `onNextMonth` callback', () => {
    const onNextMonthSpy = sinon.spy();
    const instance = getInstance(<DatePicker onNextMonth={onNextMonthSpy} defaultOpen />);
    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-calendar-header-forward'));
    assert.isTrue(onNextMonthSpy.calledOnce);
  });

  it('Should call `onPrevMonth` callback', () => {
    const onPrevMonthSpy = sinon.spy();
    const instance = getInstance(<DatePicker onPrevMonth={onPrevMonthSpy} defaultOpen />);
    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-calendar-header-backward'));
    assert.isTrue(onPrevMonthSpy.calledOnce);
  });

  it('Should call `onToggleMonthDropdown` callback when click title', () => {
    const onToggleMonthDropdownSpy = sinon.spy();
    const instance = getInstance(
      <DatePicker
        onToggleMonthDropdown={onToggleMonthDropdownSpy}
        defaultOpen
        format="yyyy-MM-dd HH:mm:ss"
      />
    );

    const month = instance.overlay.querySelector('.rs-calendar-header-title-date');

    act(() => {
      ReactTestUtils.Simulate.click(month);
    });

    assert.isNotNull(instance.overlay.querySelector('.rs-calendar-month-dropdown.show'));
    assert.isTrue(onToggleMonthDropdownSpy.calledOnce);

    act(() => {
      ReactTestUtils.Simulate.click(month);
    });

    assert.isNull(instance.overlay.querySelector('.rs-calendar-month-dropdown.show'));
    assert.isTrue(onToggleMonthDropdownSpy.calledTwice);
  });

  it('Should call `onToggleTimeDropdown` callback when click time', () => {
    const onToggleTimeDropdownSpy = sinon.spy();
    const instance = getInstance(
      <DatePicker
        onToggleTimeDropdown={onToggleTimeDropdownSpy}
        defaultOpen
        format="yyyy-MM-dd HH:mm:ss"
      />
    );
    const time = instance.overlay.querySelector('.rs-calendar-header-title-time');

    act(() => {
      ReactTestUtils.Simulate.click(time);
    });

    assert.isNotNull(instance.overlay.querySelector('.rs-calendar-show-time-dropdown'));
    assert.isTrue(onToggleTimeDropdownSpy.calledOnce);

    act(() => {
      ReactTestUtils.Simulate.click(time);
    });

    assert.isNull(instance.overlay.querySelector('.rs-calendar-show-time-dropdown'));
    assert.isTrue(onToggleTimeDropdownSpy.calledTwice);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DatePicker className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DatePicker style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should call `onChangeCalendarDate` callback when click backward', done => {
    const doneOp = () => {
      done();
    };

    const instance = getInstance(<DatePicker onChangeCalendarDate={doneOp} defaultOpen />);

    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-calendar-header-backward'));
  });

  it('Should call `onChangeCalendarDate` callback when click forward', done => {
    const doneOp = () => {
      done();
    };

    const instance = getInstance(<DatePicker onChangeCalendarDate={doneOp} defaultOpen />);
    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-calendar-header-forward'));
  });

  it('Should call `onChangeCalendarDate` callback when click today ', done => {
    const doneOp = () => {
      done();
    };

    const instance = getInstance(<DatePicker onChangeCalendarDate={doneOp} defaultOpen />);
    const today = instance.overlay.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );
    ReactTestUtils.Simulate.click(today);
  });

  it('Should call `onChangeCalendarDate` callback when click month ', done => {
    const doneOp = () => {
      done();
    };

    const instance = getInstance(<DatePicker onChangeCalendarDate={doneOp} defaultOpen />);

    act(() => {
      const title = instance.overlay.querySelector('.rs-calendar-header-title-date');
      ReactTestUtils.Simulate.click(title);
    });

    act(() => {
      const month = instance.overlay.querySelector('.rs-calendar-month-dropdown-cell');
      ReactTestUtils.Simulate.click(month);
    });
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(<DatePicker onOpen={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('[role="combobox"]'));
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getInstance(<DatePicker onClose={doneOp} defaultOpen />);
    ReactTestUtils.Simulate.click(
      instance.overlay.querySelector('.rs-picker-toolbar-right .rs-btn')
    );
  });

  it('Should not change for the value  when it is controlled', done => {
    const doneOp = () => {
      if (instance.target.querySelector('.rs-picker-toggle-value').innerText === '2018-01-05') {
        done();
      }
    };

    const instance = getInstance(
      <DatePicker value={parseISO('2018-01-05')} onChange={doneOp} defaultOpen />
    );

    const allCells = instance.overlay.querySelectorAll(
      '.rs-calendar-table-cell .rs-calendar-table-cell-content'
    );

    ReactTestUtils.Simulate.click(allCells[allCells.length - 1]);
    ReactTestUtils.Simulate.click(
      instance.overlay.querySelector('.rs-picker-toolbar-right .rs-btn')
    );
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<DatePicker onBlur={doneOp} />);

    const toggle = instance.querySelector('.rs-picker-toggle');

    ReactTestUtils.Simulate.blur(toggle);
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<DatePicker onFocus={doneOp} />);
    const toggle = instance.querySelector('.rs-picker-toggle');

    ReactTestUtils.Simulate.focus(toggle);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DatePicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should call onChange after setting oneTap', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DatePicker onChange={onChangeSpy} oneTap defaultOpen />);

    const today = instance.overlay.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    ReactTestUtils.Simulate.click(today);
    assert.isTrue(isSameDay(onChangeSpy.firstCall.firstArg, new Date()));
  });

  it('Should be show meridian', () => {
    const instance = getInstance(
      <DatePicker
        value={parseISO('2017-08-14 13:00:00')}
        format="dd MMM yyyy hh:mm:ss a"
        defaultOpen
        showMeridian
      />
    );
    const picker = instance.overlay;

    assert.equal(picker.querySelector('.rs-calendar-header-meridian').innerText, 'PM');
    assert.equal(picker.querySelector('.rs-calendar-header-title-time').innerText, '01:00:00');
    assert.equal(
      picker.querySelector('.rs-calendar-time-dropdown-column').querySelectorAll('li').length,
      12
    );
    assert.equal(picker.querySelector('.rs-calendar-time-dropdown-column li').innerText, '12');
  });

  it('Should show dates that are not in the same month', () => {
    const instance = getInstance(<DatePicker value={new Date('6/10/2021')} open />);
    const picker = instance.overlay;
    const days = picker.querySelectorAll('.rs-calendar-table-cell-un-same-month');

    assert.equal(days[0].innerText, '30');
    assert.equal(days[1].innerText, '31');
    assert.equal(days[2].innerText, '1');
  });

  it('Should be a controlled value', () => {
    const instanceRef = React.createRef();
    const App = React.forwardRef((props, ref) => {
      const [value, setValue] = React.useState(new Date('6/10/2021'));
      const pickerRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        picker: pickerRef.current,
        setDate: date => {
          setValue(date);
        }
      }));
      return <DatePicker value={value} open ref={pickerRef} format="yyyy-MM-dd" />;
    });

    render(<App ref={instanceRef} />);

    act(() => {
      instanceRef.current.setDate(new Date('7/11/2021'));
    });

    const picker = instanceRef.current.picker;

    assert.equal(picker.root.querySelector('.rs-picker-toggle-value').innerText, '2021-07-11');
    assert.equal(
      picker.overlay.querySelector('.rs-calendar-header-title').innerText,
      '11 Jul 2021'
    );
  });

  it('Should be a controlled value, null is allowed', () => {
    const instanceRef = React.createRef();
    const App = React.forwardRef((props, ref) => {
      const [value, setValue] = React.useState(new Date('6/10/2021'));
      const pickerRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        picker: pickerRef.current,
        setDate: date => {
          setValue(date);
        }
      }));
      return <DatePicker value={value} open ref={pickerRef} format="yyyy-MM-dd" />;
    });

    render(<App ref={instanceRef} />);

    const picker = instanceRef.current.picker.root;
    assert.equal(picker.querySelector('.rs-picker-toggle-value').innerText, '2021-06-10');
    instanceRef.current.setDate(null);
    assert.equal(picker.querySelector('.rs-picker-toggle-placeholder').innerText, 'yyyy-MM-dd');
  });

  it('Should keep AM PM unchanged', () => {
    const instance = getInstance(
      <DatePicker
        value={parseISO('2017-08-14 13:00:00')}
        format="hh:mm:ss a"
        defaultOpen
        showMeridian
      />
    );

    const picker = instance.overlay;

    assert.equal(picker.querySelector('.rs-calendar-header-title-time').innerText, '01:00:00');

    ReactTestUtils.Simulate.click(picker.querySelector('.rs-calendar-time-dropdown-cell'));

    assert.equal(picker.querySelector('.rs-calendar-header-meridian').innerText, 'PM');
    assert.equal(picker.querySelector('.rs-calendar-header-title-time').innerText, '12:00:00');
  });

  it('Should change AM/PM ', () => {
    const instance = getInstance(
      <DatePicker
        value={parseISO('2017-08-14 13:00:00')}
        format="hh:mm:ss a"
        defaultOpen
        showMeridian
      />
    );

    const meridian = instance.overlay.querySelector('.rs-calendar-header-meridian');
    assert.equal(meridian.innerText, 'PM');
    ReactTestUtils.Simulate.click(meridian);
    assert.equal(meridian.innerText, 'AM');
  });
});
