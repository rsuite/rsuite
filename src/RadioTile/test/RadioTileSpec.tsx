import React from 'react';
import sinon from 'sinon';
import RadioTile from '../RadioTile';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('RadioTile', () => {
  testStandardProps(<RadioTile />);

  it('Should render a radio', () => {
    render(<RadioTile>Test</RadioTile>);
    expect(screen.getByRole('radio')).to.exist;
    expect(screen.getByText('Test')).to.have.class('rs-radio-tile-content');
  });

  it('Should have a `Test` label', () => {
    render(<RadioTile label="Test" />);

    expect(screen.getByText('Test')).to.have.class('rs-radio-tile-label');
  });

  it('Should have a `Test` icon', () => {
    render(<RadioTile icon="Test" />);

    expect(screen.getByText('Test')).to.have.class('rs-radio-tile-icon');
  });

  it('Should be disabled', () => {
    render(
      <RadioTile disabled data-testid="radio">
        Test
      </RadioTile>
    );

    expect(screen.getByRole('radio')).to.have.attr('disabled');
    expect(screen.getByTestId('radio')).to.have.class('rs-radio-tile-disabled');
  });

  it('Should be checked', () => {
    render(
      <RadioTile checked data-testid="radio">
        Test
      </RadioTile>
    );

    expect(screen.getByRole('radio')).to.have.attr('checked');
    expect(screen.getByTestId('radio')).to.have.class('rs-radio-tile-checked');
  });

  it('Should be defaultChecked', () => {
    render(
      <RadioTile defaultChecked data-testid="radio">
        Test
      </RadioTile>
    );

    expect(screen.getByRole('radio')).to.have.attr('checked');
    expect(screen.getByTestId('radio')).to.have.class('rs-radio-tile-checked');
  });

  it('Should have a `Test` value', () => {
    render(<RadioTile defaultValue="text">Test</RadioTile>);

    expect(screen.getByRole('radio')).to.have.attr('value', 'text');
  });

  it('Should call onClick callback', () => {
    const onClickSpy = sinon.spy();

    render(<RadioTile onClick={onClickSpy}>Title</RadioTile>);
    fireEvent.click(screen.getByText('Title'));

    expect(onClickSpy).to.have.been.calledOnce;
  });

  it('Should call onChange callback with correct value', () => {
    const onChangeSpy = sinon.spy();
    render(
      <RadioTile onChange={onChangeSpy} value="100">
        Title
      </RadioTile>
    );
    fireEvent.click(screen.getByText('Title'));

    expect(onChangeSpy).to.have.been.calledWith('100');
  });

  it('Should call onBlur callback', () => {
    const onBlurSpy = sinon.spy();

    render(<RadioTile onBlur={onBlurSpy}>Title</RadioTile>);
    fireEvent.blur(screen.getByRole('radio'));

    expect(onBlurSpy).to.have.been.calledOnce;
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();

    render(<RadioTile onFocus={onFocusSpy}>Title</RadioTile>);
    fireEvent.focus(screen.getByRole('radio'));

    expect(onFocusSpy).to.have.been.calledOnce;
  });
});
