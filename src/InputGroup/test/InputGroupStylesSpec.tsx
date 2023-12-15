import React from 'react';
import { render, screen } from '@testing-library/react';
import InputGroup from '../index';
import Input from '../../Input';
import { getStyle } from '@test/utils';

import '../styles/index.less';

describe('InputGroup styles', () => {
  it('Should be set to a larger height', () => {
    render(
      <InputGroup inside size="lg" data-testid="input-lg">
        <Input />
        <InputGroup.Button>Search</InputGroup.Button>
      </InputGroup>
    );

    expect(getStyle(screen.getByTestId('input-lg'), 'height')).to.equal('42px');
  });

  it('Should be set to a default height', () => {
    render(
      <InputGroup inside size="md" data-testid="input-md">
        <Input />
        <InputGroup.Button>Search</InputGroup.Button>
      </InputGroup>
    );
    expect(getStyle(screen.getByTestId('input-md'), 'height')).to.equal('36px');
  });

  it('Should be set to a smaller height', () => {
    render(
      <InputGroup inside size="sm" data-testid="input-sm">
        <Input />
        <InputGroup.Button>Search</InputGroup.Button>
      </InputGroup>
    );
    expect(getStyle(screen.getByTestId('input-sm'), 'height')).to.equal('30px');
  });

  it('Should be set to a Xsmall height', () => {
    render(
      <InputGroup inside size="xs" data-testid="input-xs">
        <Input />
        <InputGroup.Button>Search</InputGroup.Button>
      </InputGroup>
    );
    expect(getStyle(screen.getByTestId('input-xs'), 'height')).to.equal('24px');
  });
});
