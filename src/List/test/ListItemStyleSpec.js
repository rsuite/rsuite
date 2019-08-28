import React from 'react';
import ReactDOM from 'react-dom';
import List from '../index';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('ListItem styles', () => {
  it('Should render correct toggle styles', () => {
    ReactDOM.render(
      <List className="rs-list-styles-test">
        <List.Item index={1} />
      </List>,
      createTestContainer()
    );
    const dom = document.querySelector('.rs-list-styles-test .rs-list-item');
    assert.equal(getStyle(dom, 'position'), 'relative', 'List item position');
  });
});
