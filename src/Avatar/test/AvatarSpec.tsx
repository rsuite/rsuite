import React from 'react';
import { testStandardProps } from '@test/commonCases';
import Avatar from '../Avatar';
import { render, screen } from '@testing-library/react';

describe('Avatar', () => {
  testStandardProps(<Avatar />);

  it('Should render avatar', () => {
    const content = 'RS';
    render(<Avatar>{content}</Avatar>);

    expect(screen.getByText(content)).to.exist;
  });

  it('Change background', () => {
    const background = 'rgb(123, 31, 162)';
    const { container } = render(<Avatar style={{ background }}>RS</Avatar>);
    expect(container.firstChild).to.have.style('background-color', background);
  });

  it('Should render image avatar', () => {
    const src = 'https://avatars2.githubusercontent.com/u/12592949?s=460&v=4';
    const alt = 'RS';
    render(
      <Avatar src={src} alt={alt}>
        RS
      </Avatar>
    );
    const img = screen.getByRole('img');
    expect(img).to.have.attr('src', src);
    expect(img).to.have.attr('alt', alt);
  });

  it('Should render circle avatar', () => {
    const { container } = render(<Avatar circle>RS</Avatar>);
    expect(container.firstChild).to.have.class('rs-avatar-circle');
  });

  it('Should render srcSet', () => {
    const srcSet = 'elva-fairy-320w.jpg 320w,elva-fairy-480w.jpg 480w';
    render(<Avatar srcSet={srcSet} />);
    expect(screen.getByRole('img')).to.have.attr('srcset', srcSet);
  });

  it('Should render sizes', () => {
    const srcSet = 'elva-fairy-320w.jpg 320w,elva-fairy-480w.jpg 480w';
    const sizes = '(max-width: 320px) 280px,(max-width: 480px) 440px, 800px';
    render(<Avatar srcSet={srcSet} sizes={sizes} />);
    expect(screen.getByRole('img')).to.have.attr('sizes', sizes);
  });

  it('Should render imgProps', () => {
    render(<Avatar src="bac.jpg" imgProps={{ id: 'img', title: 'Avatar' }} />);

    expect(screen.getByRole('img')).to.have.id('img');
    expect(screen.getByRole('img')).to.have.attr('title', 'Avatar');
  });

  it('Should apply size class', () => {
    const { container } = render(<Avatar size="lg">RS</Avatar>);

    expect(container.firstChild).to.have.class('rs-avatar-lg');
  });
});
