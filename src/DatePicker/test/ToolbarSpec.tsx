import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import { testStandardProps } from '@test/utils';

import Toolbar from '../Toolbar';

describe('DatePicker - Toolbar', () => {
  testStandardProps(
    <Toolbar
      calendarDate={new Date(2021, 11, 24)}
      className="custom"
      classPrefix="custom-prefix"
      locale={{}}
    />
  );

  it('Should render a div with `rs-picker-toolbar` class', () => {
    const { container } = render(<Toolbar calendarDate={new Date(2021, 11, 24)} locale={{}} />);

    expect(container.firstChild).to.have.tagName('DIV');
    expect(container.firstChild).to.have.class('rs-picker-toolbar');
  });

  it('Should render a custom option', () => {
    render(
      <Toolbar
        calendarDate={new Date(2021, 11, 24)}
        ranges={[
          {
            label: (
              <div className="btn-today" data-testid="today">
                today
              </div>
            ),
            value: new Date(),
            closeOverlay: true
          }
        ]}
        locale={{}}
      />
    );
    expect(screen.getByTestId('today')).to.exist;
  });

  it('Should call `onOk` callback', () => {
    const onOk = sinon.spy();
    render(<Toolbar calendarDate={new Date(2021, 11, 24)} onOk={onOk} locale={{ ok: 'OK' }} />);

    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(onOk).to.have.been.calledOnce;
  });

  it('Should call `onShortcutClick` callback', () => {
    const onShortcutClick = sinon.spy();
    render(
      <Toolbar
        calendarDate={new Date(2021, 11, 24)}
        onShortcutClick={onShortcutClick}
        locale={{
          today: 'Today'
        }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Today' }));
    expect(onShortcutClick).to.have.been.calledOnce;
  });

  it('Should not render the ok button', () => {
    render(<Toolbar calendarDate={new Date(2021, 11, 24)} hideOkBtn locale={{ ok: 'OK' }} />);

    expect(screen.queryByRole('button', { name: 'OK' })).to.not.exist;
  });

  it('Should not render any elements', () => {
    const { container } = render(
      <Toolbar calendarDate={new Date(2021, 11, 24)} hideOkBtn ranges={[]} locale={{}} />
    );

    expect(container.querySelector('button')).to.not.exist;
  });

  it('Should be wrap in ranges', () => {
    const { container } = render(<Toolbar calendarDate={new Date()} locale={{}} />);

    expect(container.querySelector('.rs-picker-toolbar-ranges')).to.have.style('flex-wrap', 'wrap');
  });
});
