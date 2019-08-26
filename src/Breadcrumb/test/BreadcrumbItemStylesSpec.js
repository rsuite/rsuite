import React from 'react';
import ReactDOM from 'react-dom';
import Breadcrumb from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('BreadcrumbItem styles', () => {
  it('Should render correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Breadcrumb ref={instanceRef}>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    const li = dom.firstElementChild;
    const a = li.querySelector('a');
    assert.equal(getStyle(li, 'fontSize'), '12px');
    assert.equal(getStyle(a, 'cursor'), 'pointer');
  });

  it('Active item should render correct color', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Breadcrumb ref={instanceRef}>
        <Breadcrumb.Item active>1</Breadcrumb.Item>
      </Breadcrumb>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    const li = dom.firstElementChild;
    assert.equal(getStyle(li, 'color'), toRGB('#8e8e93'));
  });
});
