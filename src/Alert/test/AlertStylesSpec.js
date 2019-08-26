import React from 'react';
import Alert from '../index';
import { getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('Alert styles', () => {
  it('Should render the correct background color', () => {
    Alert.info('This is a informations.', 0);
    const dom = document.body.querySelector('.rs-alert');
    assert.equal(
      getStyle(dom.querySelector('.rs-alert-item-content'), 'backgroundColor'),
      toRGB('#e9f5fe')
    );
  });
});
