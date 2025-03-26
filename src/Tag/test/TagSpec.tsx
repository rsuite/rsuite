import React from 'react';
import sinon from 'sinon';
import Tag from '../Tag';
import { testStandardProps } from '@test/utils';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Tag', () => {
  testStandardProps(<Tag />, {
    sizes: ['lg', 'md', 'sm'],
    colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  });

  it('Should output a Tag', () => {
    render(<Tag data-testid="tag" />);

    expect(screen.getByTestId('tag')).to.have.class('rs-tag');
    expect(screen.getByTestId('tag')).to.have.class('rs-tag-md');
  });

  it('Should call onClose callback', () => {
    const onClose = sinon.spy();
    render(
      <Tag closable onClose={onClose}>
        tag
      </Tag>
    );

    fireEvent.click(screen.getByRole('button', { name: /Remove/i }));

    expect(onClose).to.have.been.calledOnce;
  });

  it('Should render with custom color', () => {
    const customColor = '#ff5733';
    const { container } = render(<Tag color={customColor} />);
    const tagElement = container.firstChild as HTMLElement;

    expect(tagElement).to.have.style('--rs-tag-bg', customColor);
    expect(tagElement).to.have.style('--rs-tag-text', '#ffffff');
  });

  it('Should render with custom light color and dark text', () => {
    const customColor = '#ffeb3b';
    const { container } = render(<Tag color={customColor} />);
    const tagElement = container.firstChild as HTMLElement;

    expect(tagElement).to.have.style('--rs-tag-bg', customColor);
    expect(tagElement).to.have.style('--rs-tag-text', '#000000');
  });

  it('Should render with short hex color', () => {
    const shortHex = '#f00';
    const fullHex = '#ff0000';
    const { container } = render(<Tag color={shortHex} />);
    const tagElement = container.firstChild as HTMLElement;

    expect(tagElement).to.have.style('--rs-tag-bg', fullHex);
    expect(tagElement).to.have.style('--rs-tag-text', '#ffffff');
  });

  it('Should not apply custom color styles for preset colors', () => {
    const { container } = render(<Tag color="red" />);
    const tagElement = container.firstChild as HTMLElement;

    expect(tagElement).to.have.class('rs-tag-red');
    expect(tagElement.style.getPropertyValue('--rs-tag-bg')).to.equal('');
    expect(tagElement.style.getPropertyValue('--rs-tag-text')).to.equal('');
  });
});
