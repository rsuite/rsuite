import React from 'react';
import sinon from 'sinon';
import Notification from '../Notification';
import ToastContext from '../../toaster/ToastContext';
import { waitFor, render, fireEvent, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Notification', () => {
  testStandardProps(<Notification />);

  it('Should output a notification', () => {
    render(<Notification />);

    expect(screen.getByRole('alert')).to.have.class('rs-notification');
  });

  it('Should render content', () => {
    render(<Notification>text</Notification>);

    expect(screen.getByRole('alert')).to.have.text('text');
  });

  it('Should be closable', () => {
    render(<Notification closable />);

    expect(screen.getByRole('button', { name: /close/i })).to.exist;
  });

  it('Should have a type', () => {
    render(<Notification type="info" header="info" />);

    expect(screen.getByRole('alert')).to.have.class('rs-notification-info');

    expect(screen.getByRole('alert').querySelector('.rs-icon')).to.have.attribute(
      'aria-label',
      'info round'
    );
  });

  it('Should have a header', () => {
    render(<Notification header="header" />);

    expect(screen.getByRole('alert')).to.have.text('header');
  });

  it('Should call onClose callback', () => {
    const onClose = sinon.spy();
    render(<Notification closable onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(onClose).to.have.been.calledOnce;
  });

  it('Should call onClose callback by usedToaster', async () => {
    const onCloseSpy = sinon.spy();
    render(
      <ToastContext.Provider value={{ usedToaster: true }}>
        <Notification duration={1} onClose={onCloseSpy} />
      </ToastContext.Provider>
    );

    await waitFor(() => {
      expect(onCloseSpy).to.have.been.calledOnce;
    });
  });
});
