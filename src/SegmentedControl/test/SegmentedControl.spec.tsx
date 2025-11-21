import React from 'react';
import SegmentedControl from '../SegmentedControl';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import { Size } from '@/internals/types';

const testItems = [
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'ng' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' }
];

describe('SegmentedControl', () => {
  testStandardProps(<SegmentedControl data={testItems} />);

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  sizes.forEach(size => {
    it(`Should render ${size} size`, () => {
      render(<SegmentedControl data={testItems} size={size as Size} />);
      expect(screen.getByRole('radiogroup')).to.have.attr('data-size', size);
    });
  });

  it('Should render block style when block is true', () => {
    const { container } = render(<SegmentedControl data={testItems} block />);
    expect(container.querySelector('[data-block]')).to.exist;
  });

  it('Should render as custom element', () => {
    const { container } = render(<SegmentedControl data={testItems} as="section" />);
    expect(container.querySelector('section[role="radiogroup"]')).to.exist;
  });

  it('Should render nothing when data is empty', () => {
    render(<SegmentedControl data={[]} />);
    expect(screen.queryAllByRole('radio')).to.have.lengthOf(0);
  });

  it('Should not render indicator when data is empty', () => {
    render(<SegmentedControl data={[]} value={undefined} />);
    const indicator = document.querySelector('.rs-segmented-control-indicator');
    expect(indicator).not.to.exist;
  });

  it('Should support custom props', () => {
    const { container } = render(
      <SegmentedControl data={testItems} data-testid="segmented-test" />
    );
    expect(container.querySelector('[data-testid="segmented-test"]')).to.exist;
  });

  it('Should not crash when no data prop is provided', () => {
    expect(() => render(<SegmentedControl />)).not.to.throw();
  });

  it('Should work in controlled mode', () => {
    const onChange = vi.fn();
    render(<SegmentedControl data={testItems} value="ng" onChange={onChange} />);
    fireEvent.click(screen.getByText('Vue'));
    expect(onChange).toHaveBeenCalledWith('vue', expect.any(Object));
  });

  it('Should work in uncontrolled mode', () => {
    render(<SegmentedControl data={testItems} defaultValue="ng" />);
    fireEvent.click(screen.getByText('Vue'));
    expect(screen.getByLabelText('Vue')).to.be.checked;
  });

  it('Should render a segmented control', () => {
    render(<SegmentedControl data={testItems} />);
    expect(screen.getAllByRole('radio')).to.have.lengthOf(4);
  });

  it('Should have a name in input', () => {
    const name = 'Test';
    render(<SegmentedControl name={name} data={testItems} />);

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).to.have.attr('name', 'Test');
    }
  });

  it('Should have role="radiogroup" on the container', () => {
    const { container } = render(<SegmentedControl data={testItems} />);
    expect(container.querySelector('[role="radiogroup"]')).to.exist;
  });

  it('Should be checked when set value', () => {
    render(<SegmentedControl value="vue" data={testItems} />);

    expect(screen.getByLabelText('Vue')).to.be.checked;
    expect(screen.getByText('Vue').closest('.rs-segmented-control-item')).to.have.attr(
      'data-active',
      'true'
    );
  });

  it('Should be checked when set defaultValue', () => {
    render(<SegmentedControl defaultValue="ng" data={testItems} />);

    expect(screen.getByLabelText('Angular')).to.be.checked;
    expect(screen.getByText('Angular').closest('.rs-segmented-control-item')).to.have.attr(
      'data-active',
      'true'
    );
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = vi.fn();

    render(<SegmentedControl onChange={onChange} data={testItems} />);

    fireEvent.click(screen.getByText('Vue'));
    expect(onChange).toHaveBeenCalledTimes(1);

    // The event is passed as the second argument
    expect(onChange.mock.calls[0][0]).toBe('vue');
    expect(onChange.mock.calls[0][1]).toBeInstanceOf(Object);
  });

  it('Should call onChange callback with correct event target', () => {
    const onChange = vi.fn();

    render(<SegmentedControl name="test" onChange={onChange} data={testItems} />);

    fireEvent.click(screen.getByText('Vue'));

    expect(onChange).toHaveBeenCalledTimes(1);
    // Check the first argument is the value
    expect(onChange.mock.calls[0][0]).toBe('vue');
    // Check the second argument is the event object
    const event = onChange.mock.calls[0][1];
    expect(event).toBeDefined();
    expect(event.target).toBeDefined();
    expect(event.target.name).toBe('test');
  });

  it('Should not call onChange when component is disabled', () => {
    const onChange = vi.fn();

    render(<SegmentedControl onChange={onChange} disabled data={testItems} />);

    fireEvent.click(screen.getByText('Vue'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('Should render with pill indicator style by default', () => {
    render(<SegmentedControl data={testItems} defaultValue="react" />);

    const container = screen.getByRole('radiogroup');
    expect(container).to.have.attr('data-indicator', 'pill');
  });

  it('Should render with underline indicator style', () => {
    render(<SegmentedControl data={testItems} defaultValue="react" indicator="underline" />);

    const container = screen.getByRole('radiogroup');
    expect(container).to.have.attr('data-indicator', 'underline');
  });

  it('Should render the indicator element when an item is selected', () => {
    render(<SegmentedControl data={testItems} defaultValue="react" />);

    const indicator = document.querySelector('.rs-segmented-control-indicator');
    expect(indicator).to.exist;
  });

  it('Should not render the indicator element when no item is selected', () => {
    render(<SegmentedControl data={testItems} />);

    const indicator = document.querySelector('.rs-segmented-control-indicator');
    expect(indicator).not.to.exist;
  });
});
