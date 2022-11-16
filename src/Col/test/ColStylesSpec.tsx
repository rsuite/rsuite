import React from 'react';
import { render } from '@testing-library/react';
import Col from '../index';
import { getDOMNode, getStyle, itChrome } from '@test/testUtils';
import '../../Grid/styles/index.less';

describe('Col styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(
      <Col ref={instanceRef} md={1}>
        Title
      </Col>
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'padding'), '0px 5px');
  });
});
