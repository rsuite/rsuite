import React from 'react';
import ReactDOM from 'react-dom';
import ErrorMessage from '../index';
import { createTestContainer, getStyle, getDOMNode, toRGB, inChrome } from '@test/testUtils';

import '../styles/index';

describe('ErrorMessage styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <div className="rs-form-control-wrapper">
        <ErrorMessage show ref={instanceRef}>
          Text
        </ErrorMessage>
      </div>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    const errorMessageDom = dom.querySelector('.rs-error-message');
    assert.equal(getStyle(errorMessageDom, 'color'), toRGB('#f44336'), 'ErrorMessage color');
    assert.equal(
      getStyle(errorMessageDom, 'backgroundColor'),
      toRGB('#fff'),
      'ErrorMessage background-color'
    );
    inChrome &&
      assert.equal(
        getStyle(errorMessageDom, 'border'),
        `1px solid ${toRGB('#e5e5ea')}`,
        'ErrorMessage border'
      );
  });
});
