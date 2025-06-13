import React from 'react';
import Stack from '../Stack';
import StackItem from '../StackItem';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

import '../styles/index.scss';

describe('Stack', () => {
  testStandardProps(<Stack />);

  it('Should output a stack', () => {
    render(<Stack data-testid="test"></Stack>);

    expect(screen.getByTestId('test')).to.have.class('rs-stack');
  });

  it('Should be wrap', () => {
    render(<Stack data-testid="test" wrap></Stack>);

    expect(screen.getByTestId('test')).to.have.style('flex-wrap', 'wrap');
  });

  it('Should have a gap style', () => {
    render(
      <Stack data-testid="test" spacing={10}>
        <i />
      </Stack>
    );

    expect(screen.getByTestId('test')).to.style('gap', '10px');
    expect((screen.getByTestId('test').firstChild as HTMLElement).style.marginRight).to.be.empty;
    expect((screen.getByTestId('test').firstChild as HTMLElement).style.marginBottom).to.be.empty;
  });

  it('Should have a align-items style', () => {
    render(<Stack data-testid="test" alignItems="stretch"></Stack>);

    expect(screen.getByTestId('test')).to.have.style('align-items', 'stretch');
  });

  it('Should have a justify-content style', () => {
    render(<Stack data-testid="test" justifyContent="space-around"></Stack>);

    expect(screen.getByTestId('test')).to.have.style('justify-content', 'space-around');
  });

  it('Should be displayed in vertical columns', () => {
    render(<Stack data-testid="test" direction="column"></Stack>);

    expect(screen.getByTestId('test')).to.have.style('flex-direction', 'column');
  });

  it('Should have a divider', () => {
    render(
      <Stack data-testid="test" direction="column" divider={<span>|</span>}>
        <button>button</button>
        <button>button</button>
      </Stack>
    );

    expect(screen.getByTestId('test')).to.have.text('button|button');
  });

  it('Should not render empty child', () => {
    render(
      <Stack data-testid="test">
        {0}
        {null}
        {false}
        {''}
        {[1, 2]}
      </Stack>
    );

    expect(screen.getByTestId('test')).to.have.text('012');
  });

  it('Should render deep children, when direct child is a Fragment', () => {
    render(
      <Stack data-testid="test">
        <>
          <button>child one</button>
          <button>child two</button>
        </>
      </Stack>
    );
    expect(screen.getByTestId('test').children).to.have.length(2);
  });

  it('Should clone children instead of wrapping with StackItem', () => {
    const CustomStackItem = ({ children, ...rest }) => <StackItem {...rest}>{children}</StackItem>;

    CustomStackItem.displayName = 'StackItem';

    const { container } = render(
      <Stack>
        <CustomStackItem alignSelf="flex-end">custom stack item</CustomStackItem>
        <StackItem alignSelf="flex-end">stack item</StackItem>
      </Stack>
    );

    expect(screen.getByText('custom stack item')).to.have.class('rs-stack-item');
    expect(screen.getByText('custom stack item').parentNode).to.equal(container.firstChild);
    expect(screen.getByText('custom stack item')).to.have.style('align-self', 'flex-end');

    expect(screen.getByText('stack item')).to.have.class('rs-stack-item');
    expect(screen.getByText('stack item').parentNode).to.equal(container.firstChild);
    expect(screen.getByText('stack item')).to.have.style('align-self', 'flex-end');
  });

  it('Should render a stack with responsive direction', () => {
    render(
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
          md: 'column-reverse',
          lg: 'row-reverse',
          xl: 'row',
          xxl: 'column'
        }}
      >
        Stack
      </Stack>
    );

    const stack = screen.getByText('Stack');

    expect(stack).to.have.class('rs-stack-xs-column');
    expect(stack).to.have.class('rs-stack-sm-row');
    expect(stack).to.have.class('rs-stack-md-column-reverse');
    expect(stack).to.have.class('rs-stack-lg-row-reverse');
    expect(stack).to.have.class('rs-stack-xl-row');
    expect(stack).to.have.class('rs-stack-xxl-column');
  });
});
