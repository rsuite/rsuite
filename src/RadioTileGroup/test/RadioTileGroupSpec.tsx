import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';
import RadioTileGroup from '../RadioTileGroup';
import RadioTile from '../../RadioTile';
import Sinon from 'sinon';

describe('RadioTileGroup', () => {
  testStandardProps(<RadioTileGroup />);

  it('Should render a radio group', () => {
    render(
      <RadioTileGroup>
        <RadioTile>Test1</RadioTile>
        <RadioTile>Test2</RadioTile>
      </RadioTileGroup>
    );
    expect(screen.getAllByRole('radio')).to.have.lengthOf(2);
  });

  it('Should have a name in input', () => {
    const name = 'Test';
    render(
      <RadioTileGroup name={name}>
        <RadioTile>Test1</RadioTile>
        <RadioTile>Test2</RadioTile>
      </RadioTileGroup>
    );

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).to.have.attr('name', 'Test');
    }
  });

  it('Should call onChange callback', () => {
    const onChange = Sinon.spy();
    const onGroupChange = Sinon.spy();

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
});
