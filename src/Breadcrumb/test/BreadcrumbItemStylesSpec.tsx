import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from '../index';
import { getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index.less';

describe('BreadcrumbItem styles', () => {
  it('Should render correct styles', () => {
    const instanceRef = React.createRef<HTMLOListElement>();
    render(
      <Breadcrumb ref={instanceRef}>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );
    const dom = instanceRef.current as HTMLElement;
    const itemDom = dom.querySelector('.rs-breadcrumb-item') as HTMLElement;
    const separatorDom = dom.querySelector('.rs-breadcrumb-separator') as HTMLElement;
    assert.equal(getStyle(itemDom, 'fontSize'), '12px');
    // @description Can't get margin value in other browser except chrome
    inChrome && assert.equal(getStyle(separatorDom, 'margin'), '0px 4px');
  });

  it('Active item should render correct color', () => {
    const instanceRef = React.createRef<HTMLOListElement>();
    render(
      <Breadcrumb ref={instanceRef}>
        <Breadcrumb.Item active>1</Breadcrumb.Item>
      </Breadcrumb>
    );
    const dom = instanceRef.current as HTMLElement;
    const li = dom.querySelector('.rs-breadcrumb-item') as HTMLElement;

    expect(getStyle(li, 'color')).to.equal(toRGB('#272c36'));
  });
});
