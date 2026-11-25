import React from 'react';
import Stack from '../Stack';
import StackItem from '../StackItem';
import Button from '../../Button';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../styles/index.scss';

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
        <StackItem flex="auto" grow="2" self="flex-end" order="1">
          stack item
        </StackItem>
      </Stack>
    );

    const item = screen.getByText('stack item');

    expect(item).to.have.style('flex', '2 1 auto');
    expect(item).to.have.style('align-self', 'flex-end');
    expect(item).to.have.style('flex-grow', '2');
    expect(item).to.have.style('order', '1');
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
