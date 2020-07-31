import React from 'react';
import ReactDOM from 'react-dom';
import FormErrorMessage from '../index';
import { createTestContainer, getStyle, getDOMNode, toRGB, inChrome } from '@test/testUtils';

import '../styles/index';

describe('FormErrorMessage styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <div className="rs-form-control-wrapper">
        <FormErrorMessage show ref={instanceRef}>
          Text
        </FormErrorMessage>
      </div>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    const errorMessageDom = dom.querySelector('.rs-form-error-message');
    assert.equal(getStyle(errorMessageDom, 'color'), toRGB('#f44336'), 'FormErrorMessage color');
    assert.equal(
      getStyle(errorMessageDom, 'backgroundColor'),
      toRGB('#fff'),
      'FormErrorMessage background-color'
    );
    inChrome &&
      assert.equal(
        getStyle(errorMessageDom, 'border'),
        `1px solid ${toRGB('#e5e5ea')}`,
        'FormErrorMessage border'
      );
  });
});
