import React from 'react';
import { render, screen } from '@testing-library/react';

import ModalTitle from '../ModalTitle';
import { testStandardProps } from '@test/utils';

const titleText = 'Test';
describe('ModalTitle', () => {
  testStandardProps(<ModalTitle></ModalTitle>);
  it('Should render a modal title', () => {
    render(<ModalTitle>{titleText}</ModalTitle>);
    expect(screen.getByText(titleText)).to.have.class('rs-modal-title');
  });
});
