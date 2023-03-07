import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';
import Stack from '../Stack';

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
    assert.equal(screen.getByTestId('test').style.alignItems, 'stretch');
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

  it('Should wrap children', () => {
    render(
      <Stack data-testid="test">
        <button />
      </Stack>
    );

    expect(screen.getByTestId('test').firstChild).to.tagName('DIV');
    expect(screen.getByTestId('test').firstChild).to.have.class('rs-stack-item');
  });

  it('Should clone children', () => {
    render(
      <Stack data-testid="test" childrenRenderMode="clone">
        <button />
      </Stack>
    );

    expect(screen.getByTestId('test').firstChild).to.tagName('BUTTON');
    expect(screen.getByTestId('test').firstChild).to.have.class('rs-stack-item');
  });
});
