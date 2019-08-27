import React from 'react';
import Alert from '../index';
import { getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index';

describe('Alert styles', () => {
  it('Should render the correct background color', () => {
    Alert.info('This is a informations.', 0);
    const dom = document.body.querySelector('.rs-alert');
    const contentDom = dom.querySelector('.rs-alert-item-content');
    assert.equal(
      getStyle(contentDom, 'backgroundColor'),
      toRGB('#e9f5fe'),
      'Alert content background-color'
    );

    // @description Can't get border-radius value in other browser except chrome
    inChrome &&
      assert.equal(getStyle(contentDom, 'borderRadius'), '6px', 'Alert content border-radius');

    assert.equal(
      getStyle(dom.querySelector('.rs-alert-item-close'), 'color'),
      toRGB('#2196f3'),
      'Alert close button color'
    );
  });
});
