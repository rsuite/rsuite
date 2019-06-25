import React from 'react';
import Avatar from '../Avatar';
import { getDOMNode } from '@test/testUtils';

describe('Avatar', () => {
  it('Should render avatar', () => {
    const content = 'RS';
    const instance = getDOMNode(<Avatar>{content}</Avatar>);
    assert.equal(instance.innerText, content);
  });

  it('Change background', () => {
    const background = 'rgb(123, 31, 162)';
    const instance = getDOMNode(<Avatar style={{ background }}>RS</Avatar>);
    assert.equal(instance.style.backgroundColor, background);
  });

  it('Should render image avatar', () => {
    const src = 'https://avatars2.githubusercontent.com/u/12592949?s=460&v=4';
    const alt = 'RS';
    const instance = getDOMNode(
      <Avatar src={src} alt={alt}>
        RS
      </Avatar>
    );
    const avatarImg = instance.getElementsByClassName('rs-avatar-image')[0];
    assert.notEqual(avatarImg, null);
    assert.equal(avatarImg.getAttribute('src'), src);
    assert.equal(avatarImg.getAttribute('alt'), alt);
  });

  it('Should render circle avatar', () => {
    const instance = getDOMNode(<Avatar circle>RS</Avatar>);
    assert.include(instance.className, 'rs-avatar-circle');
  });

  it('Should apply size class', () => {
    const instance = getDOMNode(<Avatar size="lg">RS</Avatar>);
    assert.include(instance.className, 'rs-avatar-lg');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Avatar style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Avatar classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
