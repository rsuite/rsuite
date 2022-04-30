import React from 'react';
import { render } from '@testing-library/react';
import ButtonToolbar from '../ButtonToolbar';
import Button from '../../Button';

import { getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('ButtonToolbar styles', () => {
  it('Should render the correct vertical align', () => {
    const instanceRef = React.createRef();
    render(<ButtonToolbar ref={instanceRef} />);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'line-height'), '0px');
  });

  it('Should render the correct margin left', () => {
    const instanceRef = React.createRef();
    render(
      <ButtonToolbar ref={instanceRef}>
        <Button>Title</Button>
        <Button>Title</Button>
      </ButtonToolbar>
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current).children[1], 'marginLeft'), '10px');
  });
});
