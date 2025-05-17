import React from 'react';
import Image from '../Image';
import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

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

  it('Should load fallback image when main image fails to load', async () => {
    const invalidSrc = 'invalid-image-url';
    const fallbackSrc = 'fallback-image-url';

    render(<Image src={invalidSrc} fallbackSrc={fallbackSrc} />);

    const img = screen.getByRole('img');

    // Trigger the error event
    img.dispatchEvent(new Event('error'));

    await waitFor(
      () => {
        expect(screen.getByRole('img')).to.have.attr('src', 'fallback-image-url');
      },
      { timeout: 5000 }
    );
  });

  it('Should handle loading states correctly', async () => {
    render(
      <Image
        src="https://example.com/image.jpg"
        placeholder={<div data-testid="placeholder">Loading...</div>}
      />
    );

    // Initially should show placeholder and be in loading state
    expect(screen.getByTestId('placeholder')).to.exist;

    const img = screen.getByRole('img');

    // Simulate successful image load
    img.dispatchEvent(new Event('load'));

    await waitFor(() => {
      // Placeholder should be removed after load
      expect(screen.queryByTestId('placeholder')).to.not.exist;
    });
  });

  it('Should handle src changes correctly', async () => {
    const { rerender } = render(<Image src="https://example.com/image1.jpg" />);
    const img = screen.getByRole('img');

    // Initial src should be set
    expect(img).to.have.attr('src', 'https://example.com/image1.jpg');

    // Change src
    rerender(<Image src="https://example.com/image2.jpg" />);

    // Should update src and be in loading state
    expect(img).to.have.attr('src', 'https://example.com/image2.jpg');

    // Simulate load complete
    img.dispatchEvent(new Event('load'));

    await waitFor(() => {
      expect(img).to.have.attr('src', 'https://example.com/image2.jpg');
    });
  });

  it('Should handle empty src correctly', () => {
    render(<Image />);
    const img = screen.getByRole('img');

    // Should not have src attribute when no src provided
    expect(img).to.not.have.attr('src');
  });

  it('Should support lazy loading with fallback', async () => {
    render(
      <Image
        src="https://example.com/lazy-image.jpg"
        loading="lazy"
        fallbackSrc="https://example.com/fallback.jpg"
        placeholder={<div data-testid="placeholder">Loading...</div>}
      />
    );

    const img = screen.getByRole('img');

    // Should have lazy loading attribute
    expect(img).to.have.attr('loading', 'lazy');

    // Should show placeholder initially
    expect(screen.getByTestId('placeholder')).to.exist;

    // Simulate load error and fallback
    img.dispatchEvent(new Event('error'));

    await waitFor(() => {
      expect(img).to.have.attr('src', 'https://example.com/fallback.jpg');
    });

    // Simulate successful load of fallback
    img.dispatchEvent(new Event('load'));

    await waitFor(() => {
      // Placeholder should be removed
      expect(screen.queryByTestId('placeholder')).to.not.exist;
    });
  });
});
