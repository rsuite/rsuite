import React from 'react';
import ButtonGroup from '../ButtonGroup';
import Button from '../../Button';
import { render, screen } from '@testing-library/react';
import { getStyle, itChrome } from '@test/utils';

import '../../Button/styles/index.less';
import '../styles/index.less';

describe('Button Group styles', () => {
  it('Should render the correct width', () => {
    render(
      <ButtonGroup justified>
        <Button>button1</Button>
        <Button>button2</Button>
      </ButtonGroup>
    );

    expect(getStyle(screen.getByRole('button', { name: 'button1' }), 'width')).to.equal(
      getStyle(screen.getByRole('button', { name: 'button2' }), 'width')
    );
  });

  itChrome('Should render the correct padding', () => {
    render(
      <ButtonGroup size="lg">
        <Button data-testid="button">Text</Button>
      </ButtonGroup>
    );

    expect(screen.getByRole('button')).to.have.style('padding', '10px 16px');
  });
});
