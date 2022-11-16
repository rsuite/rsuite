import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Avatar from '../Avatar';

describe('Avatar', () => {
  testStandardProps(<Avatar />);

  it('Should render avatar', () => {
    const content = 'RS';
    const instance = getDOMNode(<Avatar>{content}</Avatar>);
    assert.equal(instance.textContent, content);
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

  it('Should render srcSet', () => {
    const srcSet = 'elva-fairy-320w.jpg 320w,elva-fairy-480w.jpg 480w';
    const instance = getDOMNode(<Avatar srcSet={srcSet} />);
    assert.equal(
      (instance.querySelector('img') as HTMLImageElement).getAttribute('srcset'),
      srcSet
    );
  });

  it('Should render sizes', () => {
    const srcSet = 'elva-fairy-320w.jpg 320w,elva-fairy-480w.jpg 480w';
    const sizes = '(max-width: 320px) 280px,(max-width: 480px) 440px, 800px';
    const instance = getDOMNode(<Avatar srcSet={srcSet} sizes={sizes} />);
    assert.equal((instance.querySelector('img') as HTMLImageElement).getAttribute('sizes'), sizes);
  });

  it('Should render imgProps', () => {
    const instance = getDOMNode(<Avatar src="bac.jpg" imgProps={{ id: 'img', title: 'Avatar' }} />);
    assert.equal((instance.querySelector('img') as HTMLImageElement).getAttribute('id'), 'img');
    assert.equal(
      (instance.querySelector('img') as HTMLImageElement).getAttribute('title'),
      'Avatar'
    );
  });

  it('Should apply size class', () => {
    const instance = getDOMNode(<Avatar size="lg">RS</Avatar>);
    assert.include(instance.className, 'rs-avatar-lg');
  });
});
