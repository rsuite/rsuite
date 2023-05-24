import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonGroup from '../ButtonGroup';
import Button from '../../Button';
import { getStyle, itChrome } from '@test/testUtils';

import '../../Button/styles/index.less';
import '../styles/index.less';

describe('Button Group styles', () => {
  it('Should render the correct width', () => {
    render(
      <ButtonGroup justified>
        <Button>Text</Button>
        <Button>Text2</Button>
      </ButtonGroup>
    );
    const buttons = screen.getAllByRole('button');

    assert.equal(getStyle(buttons[0], 'width'), getStyle(buttons[1], 'width'));
  });

  itChrome('Should render the correct padding', () => {
    render(
      <ButtonGroup size="lg">
        <Button data-testid="button">Text</Button>
      </ButtonGroup>
    );

    expect(screen.getByTestId('button')).to.have.style('padding', '10px 16px');
  });
});
