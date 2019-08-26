import React from 'react';
import Notification from '../index';
import { getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('Notification styles', () => {
  it('Should render the correct styles', () => {
    Notification.open({
      title: 'Notify',
      duration: 0
    });
    const dom = document.body.querySelector('.rs-notification');
    assert.equal(getStyle(dom, 'position'), 'fixed', 'Notification position');
    assert.equal(getStyle(dom, 'zIndex'), '1080', 'Notification position');
    assert.equal(
      getStyle(dom.querySelector('.rs-notification-item-content'), 'backgroundColor'),
      toRGB('#fff')
    );
  });
});
