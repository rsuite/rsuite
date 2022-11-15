import React from 'react';
import { render } from '@testing-library/react';
import InputGroup from '../index';
import Input from '../../Input';
import { getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('InputGroup styles', () => {
  it('Should be set to a larger height', () => {
    const { getByTestId } = render(
      <InputGroup inside size="lg" data-testid="input-lg">
        <Input />
        <InputGroup.Button>Search</InputGroup.Button>
      </InputGroup>
    );

    expect(getStyle(getByTestId('input-lg'), 'height')).to.equal('42px');
  });

  it('Should be set to a default height', () => {
    const { getByTestId } = render(
      <InputGroup inside size="md" data-testid="input-md">
        <Input />
        <InputGroup.Button>Search</InputGroup.Button>
      </InputGroup>
    );
    expect(getStyle(getByTestId('input-md'), 'height')).to.equal('36px');
  });

  it('Should be set to a smaller height', () => {
    const { getByTestId } = render(
      <InputGroup inside size="sm" data-testid="input-sm">
        <Input />
        <InputGroup.Button>Search</InputGroup.Button>
      </InputGroup>
    );
    expect(getStyle(getByTestId('input-sm'), 'height')).to.equal('30px');
  });

  it('Should be set to a Xsmall height', () => {
    const { getByTestId } = render(
      <InputGroup inside size="xs" data-testid="input-xs">
        <Input />
        <InputGroup.Button>Search</InputGroup.Button>
      </InputGroup>
    );
    expect(getStyle(getByTestId('input-xs'), 'height')).to.equal('24px');
  });
});
