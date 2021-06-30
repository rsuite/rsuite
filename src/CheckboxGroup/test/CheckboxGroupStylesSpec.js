import React from 'react';
import ReactDOM from 'react-dom';
import CheckboxGroup from '../index';
import Checkbox from '../../Checkbox';
import { createTestContainer, getDOMNode } from '@test/testUtils';

import '../styles/index.less';
import { getStyle } from '../../../test/testUtils';

describe('CheckboxGroup styles', () => {
  it('Should render the correct margin', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <CheckboxGroup inline ref={instanceRef}>
        <Checkbox />
        <Checkbox />
      </CheckboxGroup>,
      createTestContainer()
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'margin-left'), '-10px');
  });
});
