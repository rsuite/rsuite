import React from 'react';
import { render, screen } from '@testing-library/react';

import ModalFooter from '../ModalFooter';
import { testStandardProps } from '@test/utils';

const footerText = 'Test';

describe('ModalFooter', () => {
  testStandardProps(<ModalFooter></ModalFooter>);

  it('Should render a modal footer', () => {
    render(<ModalFooter>{footerText}</ModalFooter>);
    expect(screen.getByText(footerText)).to.have.class('rs-modal-footer');
  });
});
