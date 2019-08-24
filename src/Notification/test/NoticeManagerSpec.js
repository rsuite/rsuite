import React from 'react';
import NoticeManager from '../NoticeManager';
import { getDOMNode, getInstance } from '@test/testUtils';

describe('Notification - NoticeManager', () => {
  it('Should output a container', () => {
    const instance = getDOMNode(<NoticeManager classPrefix="rs-container" />);

    assert.ok(instance.className.match(/\brs-container\b/));
  });

  it('Should output a container', () => {
    const instance = getInstance(<NoticeManager classPrefix="rs-container" />);

    instance.add({ key: 1, content: 'text' });

    assert.equal(
      getDOMNode(instance).querySelector('.rs-container-item-content').innerText,
      'text'
    );
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<NoticeManager classPrefix="rs" className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<NoticeManager classPrefix="rs" style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });
});
