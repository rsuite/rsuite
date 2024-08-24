import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalBody from '../ModalBody';
import { testStandardProps } from '@test/utils';

const modalBodyText = 'Test';
describe('ModalBody', () => {
  testStandardProps(<ModalBody></ModalBody>);

  it('Should render a modal body', () => {
    render(<ModalBody>{modalBodyText}</ModalBody>);
    expect(screen.getByText(modalBodyText)).to.have.class('rs-modal-body');
  });
});
