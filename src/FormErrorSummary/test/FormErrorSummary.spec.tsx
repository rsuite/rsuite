import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { testStandardProps } from '@test/cases';
import FormErrorSummary from '../FormErrorSummary';
import CustomProvider from '../../CustomProvider';
import Form from '../../Form';

const items = [
  { name: 'email', label: 'Email:', message: 'Enter a valid address.', controlId: 'summary-email' }
] as const;

describe('FormErrorSummary', () => {
  testStandardProps(<FormErrorSummary header="Check your information" items={items} />);

  it('is also available as Form.ErrorSummary', () => {
    expect(Form.ErrorSummary).toBe(FormErrorSummary);
  });

  it('does not render when there are no errors', () => {
    const { container } = render(<FormErrorSummary header="Errors" items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a labelled region, heading and ordered messages without an implicit live region', () => {
    render(
      <FormErrorSummary
        header="请修正以下信息"
        items={[
          ...items,
          { name: 'server', label: 'Submission:', message: <strong>Please try again.</strong> }
        ]}
      />
    );
    const summary = screen.getByRole('region', { name: '请修正以下信息' });
    const heading = screen.getByRole('heading', { name: '请修正以下信息', level: 2 });
    expect(summary).toHaveAttribute('aria-labelledby', heading.id);
    expect(summary).toHaveAttribute('tabindex', '-1');
    expect(summary).not.toHaveAttribute('aria-live');
    expect(screen.getAllByRole('listitem').map(item => item.textContent)).toEqual([
      'Email: Enter a valid address.',
      'Submission: Please try again.'
    ]);
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByText('Please try again.').tagName).toBe('STRONG');
  });

  it('keeps control IDs literal while encoding the link fragment', () => {
    const controlId = 'payment[0].账户"\\';
    render(<FormErrorSummary header="Errors" items={[{ ...items[0], controlId }]} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `#${encodeURIComponent(controlId)}`);
  });

  it('allows callers to override the region name and role', () => {
    const { rerender } = render(
      <FormErrorSummary header="Heading" items={items} aria-label="Custom summary" />
    );
    expect(screen.getByRole('region', { name: 'Custom summary' })).not.toHaveAttribute(
      'aria-labelledby'
    );
    rerender(
      <>
        <span id="summary-custom-label">Caller label</span>
        <FormErrorSummary
          header="Heading"
          items={items}
          role="group"
          aria-labelledby="summary-custom-label"
        />
      </>
    );
    expect(screen.getByRole('group', { name: 'Caller label' })).toHaveAttribute(
      'aria-labelledby',
      'summary-custom-label'
    );
  });

  it('forwards the root ref without moving focus on mount, reorder or removal', () => {
    const ref = React.createRef<HTMLDivElement>();
    const second = { name: 'tax', label: 'Tax:', message: 'Enter the tax ID.' };
    const { rerender } = render(
      <>
        <button>Outside</button>
        <FormErrorSummary ref={ref} header="Errors" items={[...items, second]} />
      </>
    );
    const outside = screen.getByRole('button');
    act(() => outside.focus());
    const emailRow = screen.getAllByRole('listitem')[0];
    rerender(
      <>
        <button>Outside</button>
        <FormErrorSummary ref={ref} header="Errors" items={[second, ...items]} />
      </>
    );
    expect(screen.getAllByRole('listitem')[1]).toBe(emailRow);
    expect(ref.current).toBe(screen.getByRole('region'));
    expect(outside).toHaveFocus();
    rerender(
      <>
        <button>Outside</button>
        <FormErrorSummary ref={ref} header="Errors" items={[]} />
      </>
    );
    expect(ref.current).toBeNull();
    expect(outside).toHaveFocus();
  });

  it('supports provider defaults with explicit component props taking precedence', () => {
    render(
      <CustomProvider
        components={{
          FormErrorSummary: { defaultProps: { header: 'Provider', className: 'preset' } }
        }}
      >
        <FormErrorSummary header="Local" items={items} />
      </CustomProvider>
    );
    expect(screen.getByRole('region', { name: 'Local' })).toHaveClass('preset');
  });

  it('lets onSelect cancel navigation and receives the original item', () => {
    const onSelect = vi.fn((_item, event) => event.preventDefault());
    render(
      <>
        <FormErrorSummary header="Errors" items={items} onSelect={onSelect} />
        <input id="summary-email" aria-label="Email" />
      </>
    );
    const input = screen.getByRole('textbox');
    const focus = vi.spyOn(input, 'focus');
    fireEvent.click(screen.getByRole('link'));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect.mock.calls[0][0]).toBe(items[0]);
    expect(focus).not.toHaveBeenCalled();
  });
});
