import React from 'react';
import ReactDOM from 'react-dom';
import ButtonToolbar from '../ButtonToolbar';
import ButtonGroup from '../../ButtonGroup';
import Button from '../../Button';

import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('ButtonToolbar styles', () => {
  it('Should render the correct vertical align', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<ButtonToolbar ref={instanceRef} />, createTestContainer());
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'line-height'), '0px');
  });

  it('Should render the correct margin left', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <ButtonToolbar ref={instanceRef}>
        <Button>Title</Button>
        <Button>Title</Button>
      </ButtonToolbar>,
      createTestContainer()
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current).children[1], 'marginLeft'), '5px');
  });
});
