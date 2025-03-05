import React from 'react';
import sinon from 'sinon';
import RadioTileGroup from '../RadioTileGroup';
import RadioTile from '../../RadioTile';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('RadioTileGroup', () => {
  testStandardProps(<RadioTileGroup />);

  it('Should render 2 radio', () => {
    render(
      <RadioTileGroup>
        <RadioTile>Test1</RadioTile>
        <RadioTile>Test2</RadioTile>
      </RadioTileGroup>
    );
    expect(screen.getAllByRole('radio')).to.have.lengthOf(2);
  });

  it('Should be inline layout', () => {
    render(
      <RadioTileGroup inline>
        <RadioTile>Test1</RadioTile>
        <RadioTile>Test2</RadioTile>
      </RadioTileGroup>
    );

    expect(screen.getByRole('radiogroup')).to.have.style('flex-direction', 'row');
  });

  it('Should be disabled', () => {
    render(
      <RadioTileGroup disabled>
        <RadioTile>Test1</RadioTile>
        <RadioTile>Test2</RadioTile>
      </RadioTileGroup>
    );

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).to.have.attr('disabled');
    }
  });

  it('Should have a name in input', () => {
    render(
      <RadioTileGroup name="Test">
        <RadioTile>Test1</RadioTile>
        <RadioTile>Test2</RadioTile>
      </RadioTileGroup>
    );

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).to.have.attr('name', 'Test');
    }
  });

  it('Should checked radio with a value of 1', () => {
    render(
      <RadioTileGroup value={1}>
        <RadioTile value={1}>Test1</RadioTile>
        <RadioTile value={2}>Test2</RadioTile>
      </RadioTileGroup>
    );

    expect(screen.getByRole('radio', { checked: true })).to.have.value('1');
  });

  it('Should checked radio with a value of 1 using defaultValue', () => {
    render(
      <RadioTileGroup defaultValue={1}>
        <RadioTile value={1}>Test1</RadioTile>
        <RadioTile value={2}>Test2</RadioTile>
      </RadioTileGroup>
    );

    expect(screen.getByRole('radio', { checked: true })).to.have.value('1');
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();
    const onGroupChange = sinon.spy();

    render(
      <RadioTileGroup onChange={onGroupChange}>
        <RadioTile value={1}>Test1</RadioTile>
        <RadioTile value={2}>Test2</RadioTile>
        <RadioTile value={3} onChange={onChange}>
          Test3
        </RadioTile>
        <RadioTile value={4}>Test4</RadioTile>
      </RadioTileGroup>
    );

    fireEvent.click(screen.getByText('Test3'));

    expect(onChange).to.have.been.calledOnce;
    expect(onGroupChange).to.have.been.calledOnce;
  });

  it('Should return undefined when no value is set', () => {
    const onChange = sinon.spy();
    const onGroupChange = sinon.spy();

    render(
      <RadioTileGroup onChange={onGroupChange}>
        <RadioTile onChange={onChange}>Test1</RadioTile>
        <RadioTile value={2}>Test2</RadioTile>
      </RadioTileGroup>
    );

    fireEvent.click(screen.getByText('Test1'));

    expect(onChange).to.have.been.calledWith(undefined);
    expect(onGroupChange).to.have.been.calledWith(undefined);
  });
});
