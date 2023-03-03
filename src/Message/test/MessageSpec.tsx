import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import sinon from 'sinon';
import { testStandardProps } from '@test/commonCases';
import Message from '../Message';
import ToastContext from '../../toaster/ToastContext';

describe('Message', () => {
  testStandardProps(<Message />);

  it('Should render a Message', () => {
    render(<Message />);

    expect(screen.getByRole('alert')).to.class('rs-message');
  });

  it('Should render a title', () => {
    render(<Message header="title" />);

    expect(screen.getByRole('alert').className).to.include('rs-message-has-title');
    expect(screen.getByRole('alert')).to.text('title');
  });

  it('Should render a description', () => {
    render(<Message>description</Message>);

    expect(screen.getByRole('alert')).to.text('description');
  });

  it('Should have a type', () => {
    render(<Message type="info" />);

    expect(screen.getByRole('alert').className).to.include('rs-message-info');
  });

  it('Should display icon', () => {
    render(<Message showIcon type="info" />);

    expect(screen.getByRole('alert').querySelector('.rs-icon')).to.exist;
    expect(screen.getByRole('alert').className).to.include('rs-message-has-icon');
  });

  it('Should be full', () => {
    render(<Message full />);
    expect(screen.getByRole('alert').className).to.include('rs-message-full');
  });

  it('Should be closable', () => {
    render(<Message closable />);

    expect(screen.getByRole('alert').querySelector('.rs-btn-close')).to.exist;
  });

  it('Should call onClose callback', () => {
    const onCloseSpy = sinon.spy();
    render(<Message closable onClose={onCloseSpy} />);
    const closeButton = screen.getByRole('alert').querySelector('.rs-btn-close') as HTMLElement;

    fireEvent.click(closeButton);

    expect(onCloseSpy).to.have.been.calledOnce;
  });

  it('Should call onClose callback by usedToaster', async () => {
    const onCloseSpy = sinon.spy();
    render(
      <ToastContext.Provider value={{ usedToaster: true }}>
        <Message duration={1} onClose={onCloseSpy} />
      </ToastContext.Provider>
    );

    await waitFor(() => {
      expect(onCloseSpy).to.have.been.calledOnce;
    });
  });
});
