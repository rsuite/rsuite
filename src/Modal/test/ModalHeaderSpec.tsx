import React from 'react';
import ModalHeader from '../ModalHeader';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

const headerText = 'Test';

describe('ModalHeader', () => {
  testStandardProps(<ModalHeader></ModalHeader>);
  it('Should render a modal header', () => {
    render(<ModalHeader>{headerText}</ModalHeader>);
    expect(screen.getByText(headerText)).to.have.class('rs-modal-header');
  });

  it('Should hide close button', () => {
    render(<ModalHeader closeButton={false}>{headerText}</ModalHeader>);
    expect(screen.queryByRole('button')).to.not.exist;
  });

  it('Should call onClose callback', () => {
    const onClose = sinon.spy();
    render(<ModalHeader onClose={onClose} />);
    userEvent.click(screen.getByRole('button'));

    expect(onClose).to.have.been.calledOnce;
  });
});
