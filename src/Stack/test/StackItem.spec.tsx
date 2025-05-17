import React from 'react';
import Stack from '../Stack';
import StackItem from '../StackItem';
import Button from '../../Button';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { getCssVarValue } from '@test/utils';

describe('StackItem', () => {
  it('renders a StackItem', () => {
    render(
      <Stack>
        <StackItem className="rs-stack-item">stack item</StackItem>
      </Stack>
    );
    expect(screen.getByText('stack item')).to.have.class('rs-stack-item');

    expect(screen.getByText('stack item').parentNode).to.have.class('rs-stack');
  });

  it('renders a StackItem with flex props', () => {
    render(
      <Stack>
        <StackItem flex="auto" grow={2} alignSelf="flex-end" order={1}>
          stack item
        </StackItem>
      </Stack>
    );

    const item = screen.getByText('stack item');

    expect(getCssVarValue(item, '--rs-stack-item-flex')).to.equal('auto');
    expect(getCssVarValue(item, '--rs-stack-item-align-self')).to.equal('flex-end');
    expect(getCssVarValue(item, '--rs-stack-item-grow')).to.equal('2');
    expect(getCssVarValue(item, '--rs-stack-item-order')).to.equal('1');
  });

  it('Should render a stackitem with custom class name', () => {
    render(
      <Stack>
        <StackItem className="custom">custom element</StackItem>
      </Stack>
    );

    expect(screen.getByText('custom element').className).to.include('custom');
  });

  it('Should render a stackitem as Button', () => {
    render(
      <Stack>
        <StackItem as={Button}>custom element</StackItem>
      </Stack>
    );

    expect(screen.getByText('custom element').className).to.include('rs-btn');
  });
});
