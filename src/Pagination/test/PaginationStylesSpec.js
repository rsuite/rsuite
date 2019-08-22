import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  getDefaultPalette
} from '@test/testUtils';

import '../styles/index';

const { H700 } = getDefaultPalette();
describe('Pagination styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Pagination ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'display'), 'inline-block', 'Pagination display');
  });

  it('Pagination button should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Pagination ref={instanceRef} pages={2} activePage={2} />,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);

    const paginationButton = dom.children[0].querySelector('a');
    const activePaginationButton = dom.children[1].querySelector('a');
    assert.equal(getStyle(paginationButton, 'color'), toRGB('#8e8e93'), 'Pagination button color');
    assert.equal(getStyle(activePaginationButton, 'color'), H700, 'Active pagination button color');
  });
});
