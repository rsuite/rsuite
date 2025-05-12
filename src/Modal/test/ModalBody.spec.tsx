import React from 'react';
import ModalBody from '../ModalBody';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

const modalBodyText = 'Test';
describe('ModalBody', () => {
  testStandardProps(<ModalBody></ModalBody>);

  it('Should render a modal body', () => {
    render(<ModalBody>{modalBodyText}</ModalBody>);
    expect(screen.getByText(modalBodyText)).to.have.class('rs-modal-body');
  });
});
