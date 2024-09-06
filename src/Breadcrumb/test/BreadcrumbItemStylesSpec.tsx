import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '../index';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('BreadcrumbItem styles', () => {
  it('Should render correct styles', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );

    expect(screen.getByText('1')).to.have.style('font-size', '12px');
    expect(screen.getByText('/')).to.have.style('margin', '0px 4px');
  });

  it('Should render active item with correct color', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item active>item</Breadcrumb.Item>
      </Breadcrumb>
    );

    expect(screen.getByText('item')).to.have.style('color', toRGB('#121212'));
  });
});
