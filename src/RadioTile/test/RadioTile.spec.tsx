import React from 'react';
import sinon from 'sinon';
import RadioTile from '../RadioTile';
import { describe, expect, it } from 'vitest';
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
    const onClick = sinon.spy();

    render(<RadioTile onClick={onClick}>Title</RadioTile>);
    fireEvent.click(screen.getByText('Title'));

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = sinon.spy();
    render(
      <RadioTile onChange={onChange} value="100">
        Title
      </RadioTile>
    );
    fireEvent.click(screen.getByText('Title'));

    expect(onChange).to.have.been.calledWith('100');
  });

  it('Should call onBlur callback', () => {
    const onBlur = sinon.spy();

    render(<RadioTile onBlur={onBlur}>Title</RadioTile>);
    fireEvent.blur(screen.getByRole('radio'));

    expect(onBlur).to.have.been.calledOnce;
  });

  it('Should call onFocus callback', () => {
    const onFocus = sinon.spy();

    render(<RadioTile onFocus={onFocus}>Title</RadioTile>);
    fireEvent.focus(screen.getByRole('radio'));

    expect(onFocus).to.have.been.calledOnce;
  });
});
