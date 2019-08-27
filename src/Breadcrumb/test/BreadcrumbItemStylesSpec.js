import React from 'react';
import ReactDOM from 'react-dom';
import Breadcrumb from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB, inChrome } from '@test/testUtils';

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
    const itemDom = dom.firstElementChild;
    const separatorDom = dom.querySelector('.rs-breadcrumb-separator');
    const a = itemDom.querySelector('a');
    assert.equal(getStyle(itemDom, 'fontSize'), '12px');
    assert.equal(getStyle(a, 'cursor'), 'pointer');
    // @description Can't get margin value in other browser except chrome
    inChrome && assert.equal(getStyle(separatorDom, 'margin'), '0px 4px');
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
