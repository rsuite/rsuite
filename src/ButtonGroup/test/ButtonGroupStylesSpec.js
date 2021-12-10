import React from 'react';
import { render } from '@testing-library/react';
import ButtonGroup from '../ButtonGroup';
import Button from '../../Button';
import { getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Button Group styles', () => {
  it('Should render the correct width', () => {
    const instanceRef = React.createRef();
    render(
      <ButtonGroup justified ref={instanceRef}>
        <Button>Text</Button>
        <Button>Text2</Button>
      </ButtonGroup>
    );
    const buttons = getDOMNode(instanceRef.current).children;

    assert.equal(getStyle(buttons[0], 'width'), getStyle(buttons[1], 'width'));
  });

  itChrome('Should render the correct padding', () => {
    const instanceRef = React.createRef();
    render(
      <ButtonGroup size="lg" ref={instanceRef}>
        <Button>Text</Button>
      </ButtonGroup>
    );
    const buttons = getDOMNode(instanceRef.current).children;

    assert.equal(getStyle(buttons[0], 'padding'), '10px 16px');
  });
});
