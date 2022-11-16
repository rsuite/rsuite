import React from 'react';
import { render } from '@testing-library/react';
import FormErrorMessage from '../index';
import { getStyle, getDOMNode, toRGB, inChrome } from '@test/testUtils';

import '../styles/index.less';

describe('FormErrorMessage styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(
      <div className="rs-form-control-wrapper">
        <FormErrorMessage show ref={instanceRef}>
          Text
        </FormErrorMessage>
      </div>
    );
    const dom = getDOMNode(instanceRef.current);
    const errorMessageDom = dom.querySelector('.rs-form-error-message') as HTMLElement;
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
