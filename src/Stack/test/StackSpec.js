import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';
import Stack from '../Stack';

describe('Stack', () => {
  testStandardProps(<Stack />);

  it('Should output a stack', () => {
    const { getByTestId } = render(<Stack data-testid="test"></Stack>);

    assert.equal(getByTestId('test').className, 'rs-stack');
  });

  it('Should be wrap', () => {
    const { getByTestId } = render(<Stack data-testid="test" wrap></Stack>);

    assert.equal(getByTestId('test').style.flexWrap, 'wrap');
  });

  it('Should have a gap style', () => {
    const { getByTestId } = render(
      <Stack data-testid="test" spacing={10}>
        <i />
      </Stack>
    );

    assert.equal(getByTestId('test').style.gap, '10px');
    assert.isEmpty(getByTestId('test').children[0].style.marginRight);
    assert.isEmpty(getByTestId('test').children[0].style.marginBottom);
  });

  it('Should have a align-items style', () => {
    const { getByTestId } = render(<Stack data-testid="test" alignItems="stretch"></Stack>);
    assert.equal(getByTestId('test').style.alignItems, 'stretch');
  });

  it('Should have a justify-content style', () => {
    const { getByTestId } = render(
      <Stack data-testid="test" justifyContent="space-around"></Stack>
    );
    assert.equal(getByTestId('test').style.justifyContent, 'space-around');
  });

  it('Should be displayed in vertical columns', () => {
    const { getByTestId } = render(<Stack data-testid="test" direction="column"></Stack>);
    assert.equal(getByTestId('test').style.flexDirection, 'column');
  });

  it('Should have a divider', () => {
    const { getByTestId } = render(
      <Stack data-testid="test" direction="column" divider={<span>|</span>}>
        <button>button</button>
        <button>button</button>
      </Stack>
    );

    assert.equal(getByTestId('test').children.length, 3);
    assert.equal(getByTestId('test').children[1].textContent, '|');
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
});
