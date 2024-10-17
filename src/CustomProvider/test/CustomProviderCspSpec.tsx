/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render } from '@testing-library/react';
import CustomProvider from '../CustomProvider';
import AddOutline from '@rsuite/icons/AddOutline';

afterEach(() => {
  document.querySelector('style')?.remove();
});

describe('CustomProvider - IconProvider', () => {
  it('Should render the correct nonce attribute on style tag', () => {
    render(
      <CustomProvider csp={{ nonce: '123' }}>
        <AddOutline />
      </CustomProvider>
    );

    expect(document.querySelector('style')).to.have.attribute('nonce', '123');
  });

  it('Should not render inline styles', () => {
    render(
      <CustomProvider disableInlineStyles>
        <AddOutline />
      </CustomProvider>
    );

    expect(document.querySelector('style')).to.be.null;
  });
});
