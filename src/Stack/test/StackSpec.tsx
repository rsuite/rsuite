import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';
import Stack from '../Stack';

describe('Stack', () => {
  testStandardProps(<Stack />);

  it('Should output a stack', () => {
    const { getByTestId } = render(<Stack data-testid="test"></Stack>);

    expect(getByTestId('test')).to.have.class('rs-stack');
  });

  it('Should be wrap', () => {
    const { getByTestId } = render(<Stack data-testid="test" wrap></Stack>);

    expect(getByTestId('test')).to.have.style('flex-wrap', 'wrap');
  });

  it('Should have a gap style', () => {
    const { getByTestId } = render(
      <Stack data-testid="test" spacing={10}>
        <i />
      </Stack>
    );

    expect(getByTestId('test')).to.style('gap', '10px');
    expect((getByTestId('test').firstChild as HTMLElement).style.marginRight).to.be.empty;
    expect((getByTestId('test').firstChild as HTMLElement).style.marginBottom).to.be.empty;
  });

  it('Should have a align-items style', () => {
    const { getByTestId } = render(<Stack data-testid="test" alignItems="stretch"></Stack>);
    assert.equal(getByTestId('test').style.alignItems, 'stretch');
  });

  it('Should have a justify-content style', () => {
    const { getByTestId } = render(
      <Stack data-testid="test" justifyContent="space-around"></Stack>
    );

    expect(getByTestId('test')).to.have.style('justify-content', 'space-around');
  });

  it('Should be displayed in vertical columns', () => {
    const { getByTestId } = render(<Stack data-testid="test" direction="column"></Stack>);

    expect(getByTestId('test')).to.have.style('flex-direction', 'column');
  });

  it('Should have a divider', () => {
    const { getByTestId } = render(
      <Stack data-testid="test" direction="column" divider={<span>|</span>}>
        <button>button</button>
        <button>button</button>
      </Stack>
    );

    expect(getByTestId('test').children).to.length(3);
    expect(getByTestId('test').children[1].textContent).to.equal('|');
  });

  it('Should not render empty child', () => {
    const { getByTestId } = render(
      <Stack data-testid="test">
        {0}
        {null}
        {false}
        {''}
        {[1, 2]}
      </Stack>
    );
    expect(getByTestId('test').children).to.length(4);
  });

  it('Should wrap children', () => {
    const { getByTestId } = render(
      <Stack data-testid="test">
        <button />
      </Stack>
    );

    expect(getByTestId('test').firstChild).to.tagName('DIV');
    expect(getByTestId('test').firstChild).to.have.class('rs-stack-item');
  });

  it('Should clone children', () => {
    const { getByTestId } = render(
      <Stack data-testid="test" childrenRenderMode="clone">
        <button />
      </Stack>
    );

    expect(getByTestId('test').firstChild).to.tagName('BUTTON');
    expect(getByTestId('test').firstChild).to.have.class('rs-stack-item');
  });
});
