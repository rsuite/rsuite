import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';

import Toolbar from '../Toolbar';

describe('DatePicker - Toolbar', () => {
  it('Should render a div with `rs-picker-toolbar` class', () => {
    const instance = getDOMNode(<Toolbar calendarDate={new Date(2021, 11, 24)} locale={{}} />);

    assert.equal(instance.nodeName, 'DIV');
    assert.include(instance.className, 'rs-picker-toolbar');
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
    const onOkSpy = sinon.spy();
    render(<Toolbar calendarDate={new Date(2021, 11, 24)} onOk={onOkSpy} locale={{ ok: 'OK' }} />);
    ReactTestUtils.Simulate.click(screen.getByRole('button', { name: /ok/i }));

    expect(onOkSpy).to.have.been.calledOnce;
  });

  it('Should call `onClickShortcut` callback', () => {
    const onClickShortcutSpy = sinon.spy();
    render(
      <Toolbar
        calendarDate={new Date(2021, 11, 24)}
        onClickShortcut={onClickShortcutSpy}
        locale={{
          today: 'Today'
        }}
      />
    );
    ReactTestUtils.Simulate.click(screen.getByRole('button', { name: 'Today' }));
    assert.isTrue(onClickShortcutSpy.calledOnce);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} className="custom" locale={{}} />
    );
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} style={{ fontSize }} locale={{}} />
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} classPrefix="custom-prefix" locale={{}} />
    );
    assert.include(instance.className, 'custom-prefix');
  });

  it('Should not render the ok button', () => {
    render(<Toolbar calendarDate={new Date(2021, 11, 24)} hideOkBtn locale={{ ok: 'OK' }} />);

    expect(screen.queryByRole('button', { name: 'OK' })).to.not.exist;
  });

  it('Should not render any elements', () => {
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} hideOkBtn ranges={[]} locale={{}} />
    );
    assert.isNull(instance);
  });

  it('Should be wrap in ranges', () => {
    const { container } = render(<Toolbar calendarDate={new Date()} locale={{}} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.rs-picker-toolbar-ranges')).to.have.style('flex-wrap', 'wrap');
  });
});
