import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';
import Message from '../Message';

describe('Message', () => {
  testStandardProps(<Message />);

  it('Should render a Message', () => {
    const { getByRole } = render(<Message />);

    expect(getByRole('alert')).to.class('rs-message');
  });

  it('Should render a title', () => {
    const { getByRole } = render(<Message header="title" />);

    expect(getByRole('alert').className).to.include('rs-message-has-title');
    expect(getByRole('alert')).to.text('title');
  });

  it('Should render a description', () => {
    const { getByRole } = render(<Message>description</Message>);

    expect(getByRole('alert')).to.text('description');
  });

  it('Should have a type', () => {
    const { getByRole } = render(<Message type="info" />);

    expect(getByRole('alert').className).to.include('rs-message-info');
  });

  it('Should display icon', () => {
    const { getByRole } = render(<Message showIcon type="info" />);

    expect(getByRole('alert').querySelector('.rs-icon')).to.exist;
    expect(getByRole('alert').className).to.include('rs-message-has-icon');
  });

  it('Should be full', () => {
    const { getByRole } = render(<Message full />);
    expect(getByRole('alert').className).to.include('rs-message-full');
  });

  it('Should be closable', () => {
    const { getByRole } = render(<Message closable />);

    expect(getByRole('alert').querySelector('.rs-btn-close')).to.exist;
  });

  it('Should call onClose callback', () => {
    const onCloseSpy = sinon.spy();
    const { getByRole } = render(<Message closable onClose={onCloseSpy} />);
    const closeButton = getByRole('alert').querySelector('.rs-btn-close');

    fireEvent.click(closeButton);

    expect(onCloseSpy).to.have.been.calledOnce;
  });
});
