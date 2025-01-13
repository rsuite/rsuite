import React from 'react';
import List from '../index';
import { render } from '@testing-library/react';

import '../styles/index.less';

describe('ListItem styles', () => {
  it('Should render correct toggle styles', () => {
    const { container } = render(
      <List className="rs-list-styles-test">
        <List.Item index={1} />
      </List>
    );
    const dom = container.querySelector('.rs-list-styles-test .rs-list-item') as HTMLElement;
    expect(dom).to.have.style('position', 'relative');
  });
});
