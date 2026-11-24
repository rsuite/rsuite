import React from 'react';
import Avatar from '../Avatar';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { testStandardProps, testStyleProps } from '@test/cases';

const imageSrc = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="blue"/></svg>'
)}`;
const brokenImageSrc = 'data:image/png;base64,broken';

describe('Avatar', () => {
  testStandardProps(<Avatar />);

  testStyleProps(Avatar, {
    sizes: ['xs', 'sm', 'md', 'lg'],
    colors: ['red', 'green', 'blue', 'cyan', 'orange', 'yellow']
  });

  it('Should render default avatar', () => {
    render(<Avatar />);

    expect(screen.getByRole('img')).to.have.attribute('aria-label', 'Avatar');
  });

  it('Should be circle avatar', () => {
    render(
      <Avatar circle role="img">
        R
      </Avatar>
    );
    expect(screen.getByRole('img')).to.have.class('rs-avatar-circle');
  });

  it('Should be bordered', () => {
    render(
      <Avatar bordered role="img">
        R
      </Avatar>
    );
    expect(screen.getByRole('img')).to.have.class('rs-avatar-bordered');
  });

  it('Should render default icon avatar when src is broken', async () => {
    const onError = vi.fn();
    render(<Avatar src={brokenImageSrc} onError={onError} />);

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));

    expect(screen.getByRole('img')).to.have.attribute('aria-label', 'Avatar');
    expect(screen.getByRole('img')).to.have.class('rs-avatar-icon');
    expect(screen.getByRole('img')).to.be.tagName('svg');
  });

  it('Should render alt text when src is broken', async () => {
    const onError = vi.fn();
    render(<Avatar src={brokenImageSrc} alt="Name" onError={onError} />);

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));

    expect(screen.getByRole('img')).to.have.attribute('aria-label', 'Name');
    expect(screen.getByRole('img')).to.be.tagName('span');
  });

  it('Should render children when src is broken', async () => {
    const onError = vi.fn();
    render(
      <Avatar src={brokenImageSrc} onError={onError}>
        <div role="img">My Avatar</div>
      </Avatar>
    );

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));

    expect(screen.getByRole('img')).to.have.text('My Avatar');
  });

  it('Should render image avatar when src is valid', async () => {
    const src = imageSrc;

    render(<Avatar src={src}>RS</Avatar>);

    const img = await screen.findByRole('img');

    expect(img).to.have.attribute('src', src);
    expect(img).to.be.tagName('img');

    await waitFor(() => {
      expect((img as HTMLImageElement).complete).toBe(true);
      expect((img as HTMLImageElement).naturalWidth).toBe(48);
    });
  });

  it('Should hava a srcSet attribute when srcSet is passed', async () => {
    const srcSet = `${imageSrc} 320w, ${imageSrc} 480w`;

    render(<Avatar src={imageSrc} srcSet={srcSet} />);

    await waitFor(() => {
      expect(screen.getByRole('img')).to.have.attribute('srcset', srcSet);
    });
  });

  it('Should hava a sizes attribute when sizes is passed', async () => {
    const srcSet = `${imageSrc} 320w, ${imageSrc} 480w`;
    const sizes = '(max-width: 320px) 280px,(max-width: 480px) 440px, 800px';

    render(<Avatar src={imageSrc} srcSet={srcSet} sizes={sizes} />);

    await waitFor(() => {
      expect(screen.getByRole('img')).to.have.attribute('sizes', sizes);
    });
  });

  it(' Should set the value of imgProps to the image', async () => {
    render(
      <Avatar src={imageSrc} imgProps={{ title: 'Avatar Title', 'aria-label': 'Avatar Name' }} />
    );

    await waitFor(() => {
      expect(screen.getByRole('img')).to.have.attribute('aria-label', 'Avatar Name');
      expect(screen.getByRole('img')).to.have.attribute('title', 'Avatar Title');
    });
  });
});
