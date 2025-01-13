import React from 'react';
import Image from '../Image';
import { render, screen, waitFor } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Image', () => {
  testStandardProps(<Image />);

  it('Should render with correct src', () => {
    render(<Image src="https://placehold.co/300x200" />);
    expect(screen.getByRole('img')).to.have.attr('src', 'https://placehold.co/300x200');
  });

  it('Should apply bordered style', () => {
    render(<Image src="https://placehold.co/300x200" bordered />);
    expect(screen.getByRole('img')).to.have.class('rs-image-bordered');
  });

  it('Should apply rounded style', () => {
    render(<Image src="https://placehold.co/300x200" rounded />);
    expect(screen.getByRole('img')).to.have.class('rs-image-rounded');
  });

  it('Should apply shaded style', () => {
    render(<Image src="https://placehold.co/300x200" shaded />);
    expect(screen.getByRole('img')).to.have.class('rs-image-shaded');
  });

  it('Should apply circle style', () => {
    render(<Image src="https://placehold.co/300x200" circle />);
    expect(screen.getByRole('img')).to.have.class('rs-image-circle');
  });

  it('Should apply zoomed style', () => {
    render(<Image src="https://placehold.co/300x200" zoomed />);
    expect(screen.getByRole('img')).to.have.class('rs-image-zoomed');
  });

  it('Should display placeholder', () => {
    render(<Image src="https://placehold.co/300x200" placeholder={<div>placeholder</div>} />);
    expect(screen.getByText('placeholder')).to.exist;
  });

  it('Should apply fit style', () => {
    render(<Image src="https://placehold.co/300x200" fit="cover" />);
    expect(screen.getByRole('img')).to.have.style('--rs-object-fit', 'cover');
  });

  it('Should apply position style', () => {
    render(<Image src="https://placehold.co/300x200" position="center" />);
    expect(screen.getByRole('img')).to.have.style('--rs-object-position', 'center');
  });

  it('Should apply width', () => {
    render(<Image src="https://placehold.co/300x200" width={100} />);
    expect(screen.getByRole('img')).to.have.style('width', '100px');
  });

  it('Should apply height', () => {
    render(<Image src="https://placehold.co/300x200" height={100} />);
    expect(screen.getByRole('img')).to.have.style('height', '100px');
  });

  it('Should apply crossOrigin', () => {
    render(<Image src="https://placehold.co/300x200" crossOrigin="anonymous" />);
    expect(screen.getByRole('img')).to.have.attr('crossorigin', 'anonymous');
  });

  it('Should apply srcSet', () => {
    render(<Image src="https://placehold.co/300x200" srcSet="https://placehold.co/300x200 1x" />);
    expect(screen.getByRole('img')).to.have.attr('srcset', 'https://placehold.co/300x200 1x');
  });

  it('Should apply sizes', () => {
    render(<Image src="https://placehold.co/300x200" sizes="100vw" />);
    expect(screen.getByRole('img')).to.have.attr('sizes', '100vw');
  });

  it('Should apply loading', () => {
    render(<Image src="https://placehold.co/300x200" loading="lazy" />);
    expect(screen.getByRole('img')).to.have.attr('loading', 'lazy');
  });

  it('Should render with fallbackSrc', async () => {
    render(
      <Image
        src="https://rsuitejs.com/nonexistent-image.jpg"
        fallbackSrc="https://placehold.co/300x200"
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('img')).to.have.attr('src', 'https://placehold.co/300x200');
    });
  });
});
