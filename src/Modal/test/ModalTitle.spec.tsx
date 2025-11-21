import React from 'react';
import ModalTitle from '../ModalTitle';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

const titleText = 'Test';
describe('ModalTitle', () => {
  testStandardProps(<ModalTitle></ModalTitle>);
  it('Should render a modal title', () => {
    render(<ModalTitle>{titleText}</ModalTitle>);
    expect(screen.getByText(titleText)).to.have.class('rs-modal-title');
  });
});
