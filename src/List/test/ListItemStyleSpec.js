import React from 'react';
import ReactDOM from 'react-dom';
import List from '../index';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('ListItem styles', () => {
  it('Should render correct toggle styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <List>
        <List.Item ref={instanceRef} index={1} />
      </List>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'position'), 'relative', 'List item position');
  });
});
