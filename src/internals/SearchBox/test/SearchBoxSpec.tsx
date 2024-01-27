import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../SearchBox';
import { testStandardProps } from '@test/utils';
import Sinon from 'sinon';

describe('SearchBox', () => {
  testStandardProps(<SearchBox />);

  it('Should output a input', () => {
    render(<SearchBox />);
    expect(screen.getByRole('searchbox')).to.be.exist;
  });

  it('Should call `onChange` callback', () => {
    const onChange = Sinon.spy();
    render(<SearchBox onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'a' } });

    expect(onChange).to.have.been.calledOnce;
  });
});
