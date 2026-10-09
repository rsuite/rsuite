import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import InputPicker from '..';
import TagPicker from '../../TagPicker';
import Form from '../../Form';

const data = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' }
];
const components = [
  { name: 'InputPicker', Picker: InputPicker },
  { name: 'TagPicker', Picker: TagPicker }
];

describe.each(components)('$name editable input semantics', ({ Picker }) => {
  it('associates Form labels, help text and errors with the actual input and retains the frame ref', () => {
    render(
      <Form formError={{ country: 'Required country' }}>
        <Form.Group controlId="country">
          <Form.ControlLabel>Country</Form.ControlLabel>
          <Form.Control name="country" accepter={Picker} data={data} />
          <Form.HelpText>Select a country</Form.HelpText>
        </Form.Group>
      </Form>
    );
    const input = screen.getByRole('combobox', { name: 'Country' });
    expect(input).to.have.tagName('INPUT');
    expect(input).to.have.attr('id', 'country');
    expect(input).to.have.attr('aria-invalid', 'true');
    expect(document.getElementById(input.getAttribute('aria-describedby')!)).to.have.text(
      'Select a country'
    );
    expect(document.getElementById(input.getAttribute('aria-errormessage')!)).to.have.text(
      'Required country'
    );
    expect(document.querySelector('.rs-picker-toggle')).to.have.attr('id', 'country-toggle');
    expect(screen.getByTestId('picker')).not.to.have.attr('role');
  });

  it('applies explicit input ARIA without copying a second combobox role onto the frame', () => {
    render(
      <Picker
        data={data}
        role="combobox"
        aria-label="Country"
        aria-describedby="hint"
        tabIndex={3}
      />
    );
    const input = screen.getByRole('combobox', { name: 'Country' });
    expect(input).to.have.attr('aria-describedby', 'hint');
    expect(input).to.have.attr('tabindex', '3');
    expect(document.querySelector('.rs-picker-toggle')).to.have.attr('tabindex', '-1');
    expect(screen.getAllByRole('combobox')).to.have.length(1);
  });

  it.each([false, true])(
    'keeps a real controls target when filtering returns no options (virtualized: %s)',
    virtualized => {
      render(<Picker data={data} defaultOpen virtualized={virtualized} />);
      const input = screen.getByRole('combobox');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input).to.have.attr(
        'aria-activedescendant',
        screen.getByRole('option', { name: 'Alpha' }).id
      );
      fireEvent.change(input, { target: { value: 'No matching option' } });
      expect(input).not.to.have.attr('aria-activedescendant');
      expect(document.getElementById(input.getAttribute('aria-controls')!)).to.equal(
        document.querySelector('.rs-picker-listbox')
      );
      expect(screen.queryAllByRole('option')).to.have.length(0);
      expect(screen.getByText('No results found')).to.exist;
    }
  );

  it('clears the active descendant when the highlighted option is disabled or removed', () => {
    const { rerender } = render(<Picker data={data} defaultOpen />);
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).to.have.attr(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Alpha' }).id
    );
    rerender(<Picker data={data} defaultOpen disabledItemValues={['a']} />);
    expect(input).not.to.have.attr('aria-activedescendant');
    rerender(<Picker data={[data[1]]} defaultOpen />);
    expect(input).to.have.attr(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Beta' }).id
    );
    expect(document.getElementById(input.getAttribute('aria-activedescendant')!)).to.exist;
  });

  it('reports current descendants after changing from noneditable to editable', () => {
    const { rerender } = render(<Picker data={data} defaultOpen searchable={false} />);
    rerender(<Picker data={data} defaultOpen />);
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).to.have.attr(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Alpha' }).id
    );
    rerender(<Picker data={[]} defaultOpen />);
    expect(input).not.to.have.attr('aria-activedescendant');
  });

  it('leaves editing Home, End and composing Arrow keys to the input', () => {
    const onSelect = vi.fn();
    render(<Picker data={data} defaultOpen onSelect={onSelect} />);
    const input = screen.getByRole('combobox');
    for (const key of ['Home', 'End']) {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
      fireEvent(input, event);
      expect(event.defaultPrevented).to.be.false;
    }
    fireEvent.keyDown(input, { key: 'ArrowDown', isComposing: true });
    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
    expect(input).not.to.have.attr('aria-activedescendant');
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe('editable descendant and description boundaries', () => {
  it.each(['undefined', 'null'])(
    'does not confuse an unset value with the literal %s option',
    value => {
      const options = [{ label: value, value }];
      const { rerender } = render(<InputPicker data={options} defaultOpen />);
      const input = screen.getByRole('combobox');
      expect(input).not.to.have.attr('aria-activedescendant');
      rerender(<InputPicker data={options} defaultOpen value={null} />);
      expect(input).not.to.have.attr('aria-activedescendant');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input).to.have.attr('aria-activedescendant', screen.getByRole('option').id);
    }
  );

  it.each(['undefined', 'null'])(
    'clears the active descendant without matching the literal %s option',
    value => {
      render(<InputPicker data={[{ label: value, value }]} defaultValue={value} defaultOpen />);
      const input = screen.getByRole('combobox');
      expect(input).to.have.attr('aria-activedescendant', screen.getByRole('option').id);
      fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
      expect(input).not.to.have.attr('aria-activedescendant');
    }
  );

  it('only describes a single selection when the description node is rendered', () => {
    render(<InputPicker data={data} defaultValue="a" defaultOpen id="single" />);
    const input = screen.getByRole('combobox');
    expect(document.getElementById(input.getAttribute('aria-describedby')!)).to.have.text('Alpha');
    fireEvent.change(input, { target: { value: 'b' } });
    expect(input).not.to.have.attr('aria-describedby');
    expect(document.getElementById('single-describe')).to.be.null;
  });

  it('does not describe selected tags using a missing toggle description', () => {
    render(<TagPicker data={data} defaultValue={['a']} id="tags" />);
    expect(screen.getByRole('combobox')).not.to.have.attr('aria-describedby');
    expect(document.getElementById('tags-describe')).to.be.null;
    const ids = Array.from(screen.getByTestId('picker').querySelectorAll('[id]'), node => node.id);
    expect(new Set(ids).size).to.equal(ids.length);
  });

  it('clears a mounted-descendant report on unmount using the latest callback', async () => {
    // Changing searchable updates an already mounted Listbox's opt-in reporter.
    const { rerender } = render(<InputPicker data={data} open searchable={false} />);
    rerender(<InputPicker data={data} open />);
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    await act(async () => {
      rerender(<InputPicker data={data} open={false} />);
    });
    expect(input).not.to.have.attr('aria-activedescendant');
    expect(input).not.to.have.attr('aria-controls');
  });
});
