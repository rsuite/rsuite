import React from 'react';
import { render } from '@testing-library/react';
import List from '../index';
import { getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('ListItem styles', () => {
  it('Should render correct toggle styles', () => {
    render(
      <List className="rs-list-styles-test">
        <List.Item index={1} />
      </List>
    );
    const dom = document.querySelector('.rs-list-styles-test .rs-list-item') as HTMLElement;
    assert.equal(getStyle(dom, 'position'), 'relative', 'List item position');
  });
});
