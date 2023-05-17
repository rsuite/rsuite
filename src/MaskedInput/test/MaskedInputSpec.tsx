import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import { render, act, screen } from '@testing-library/react';

import MaskedInput from '../MaskedInput';

describe('MaskedInput', () => {
  it('Should render a input', () => {
    render(
      <MaskedInput
        data-testid="test"
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );
    expect(screen.getByTestId('test').className).to.equal('rs-input');
  });

  it('Should render default value', () => {
    render(
      <MaskedInput
        data-testid="test"
        defaultValue="12345"
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );
    expect((screen.getByTestId('test') as HTMLInputElement).value).to.equal('(123) 45_-____');
  });

  it('Should call onChange callback', () => {
    const onChangeSpy = sinon.spy();
    render(
      <MaskedInput
        data-testid="test"
        onChange={onChangeSpy}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );

    act(() => {
      (screen.getByTestId('test') as HTMLInputElement).value = '12345';
      ReactTestUtils.Simulate.change(screen.getByTestId('test'));
    });

    expect(onChangeSpy.calledOnce).to.true;
    expect(onChangeSpy.firstCall.firstArg).to.equal('(123) 45_-____');
  });
});
