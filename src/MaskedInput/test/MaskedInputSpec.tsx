import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import { render, act } from '@testing-library/react';

import MaskedInput from '../MaskedInput';

describe('MaskedInput', () => {
  it('Should render a input', () => {
    const { getByTestId } = render(
      <MaskedInput
        data-testid="test"
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );
    expect(getByTestId('test').className).to.equal('rs-input');
  });

  it('Should render default value', () => {
    const { getByTestId } = render(
      <MaskedInput
        data-testid="test"
        defaultValue="12345"
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );
    expect((getByTestId('test') as HTMLInputElement).value).to.equal('(123) 45_-____');
  });

  it('Should call onChange callback', () => {
    const onChangeSpy = sinon.spy();
    const { getByTestId } = render(
      <MaskedInput
        data-testid="test"
        onChange={onChangeSpy}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );

    act(() => {
      (getByTestId('test') as HTMLInputElement).value = '12345';
      ReactTestUtils.Simulate.change(getByTestId('test'));
    });

    expect(onChangeSpy.calledOnce).to.true;
    expect(onChangeSpy.firstCall.firstArg).to.equal('(123) 45_-____');
  });
});
