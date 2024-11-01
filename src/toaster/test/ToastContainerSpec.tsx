import React from 'react';
import ToastContainer from '../ToastContainer';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('toaster - ToastContainer', () => {
  testStandardProps(<ToastContainer />);

  it('Should output a container', () => {
    const { container } = render(<ToastContainer />);
    expect(container.firstChild).to.have.class('rs-toast-container');
  });

  it('Should output a placement', () => {
    const { container } = render(<ToastContainer placement="topStart" />);
    expect(container.firstChild).to.have.class('rs-toast-container-top-start');
  });
});
