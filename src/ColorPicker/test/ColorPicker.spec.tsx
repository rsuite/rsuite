import React, { useState } from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ColorPicker from '..';
import CustomProvider from '../../CustomProvider';
import Form from '../../Form';
import zhCN from '../../locales/zh_CN';
import ruRU from '../../locales/ru_RU';
import type { PickerHandle } from '@/internals/Picker';
import '../styles/index.scss';

const opened = { defaultOpen: true, responsive: false };
const changeChannel = (name: string, value: number) =>
  fireEvent.change(screen.getByRole('slider', { name }), { target: { value: String(value) } });
const edit = (value: string) => {
  const input = screen.getByRole('textbox', { name: 'Color value' });
  fireEvent.change(input, { target: { value } });
  fireEvent.keyDown(input, { key: 'Enter' });
};

describe('ColorPicker', () => {
  it('renders a named trigger and a labeled dialog with four accessible channels', () => {
    render(<ColorPicker {...opened} label="Brand color" defaultValue="#123456" />);
    const toggle = screen.getByRole('combobox', { name: 'Brand color' });
    const dialog = screen.getByRole('dialog', { name: 'Brand color' });
    expect(toggle.getAttribute('aria-controls')).toBe(dialog.id);
    expect(toggle.getAttribute('aria-haspopup')).toBe('dialog');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(within(dialog).getAllByRole('slider')).toHaveLength(4);
    expect(screen.getByRole('textbox', { name: 'Color value' })).to.have.value('#123456');
  });

  it.each(['Enter', ' ', 'ArrowDown'])('opens from the trigger using %s', key => {
    render(<ColorPicker responsive={false} />);
    fireEvent.keyDown(screen.getByRole('combobox'), { key });
    expect(screen.getByRole('dialog', { name: 'Choose color' })).to.exist;
  });

  it('lets user key handlers cancel built-in opening', () => {
    render(<ColorPicker onKeyDown={event => event.preventDefault()} />);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('updates an uncontrolled color through labeled channel inputs', () => {
    const onChange = vi.fn();
    render(<ColorPicker {...opened} defaultValue="#ff0000" onChange={onChange} />);
    changeChannel('Hue', 120);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe('#00ff00');
    expect(screen.getByRole('textbox', { name: 'Color value' })).to.have.value('#00ff00');
    changeChannel('Opacity', 50);
    expect(onChange.mock.calls[1][0]).toBe('#00ff0080');
  });

  it('keeps a controlled value authoritative when a parent declines an edit', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ColorPicker {...opened} value="#ff0000" onChange={onChange} />);
    changeChannel('Hue', 120);
    expect(onChange.mock.calls[0][0]).toBe('#00ff00');
    expect(screen.getByRole('textbox', { name: 'Color value' })).to.have.value('#ff0000');
    rerender(<ColorPicker {...opened} value="#0000ff" onChange={onChange} />);
    expect(screen.getByRole('slider', { name: 'Hue' })).to.have.value('240');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('retains saturation and hue through black and a controlled value echo', () => {
    const onChange = vi.fn();
    const Example = () => {
      const [value, setValue] = useState('#00ff00');
      return (
        <ColorPicker
          {...opened}
          value={value}
          onChange={(next, event) => {
            onChange(next, event);
            setValue(next!);
          }}
        />
      );
    };
    render(<Example />);
    changeChannel('Brightness', 0);
    changeChannel('Hue', 240);
    expect(screen.getByRole('slider', { name: 'Saturation' })).to.have.value('100');
    changeChannel('Brightness', 100);
    expect(onChange.mock.calls.at(-1)?.[0]).toBe('#0000ff');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['#0f08', '#00ff0088'],
    ['rgb(0 255 0 / 50%)', '#00ff0080'],
    ['hsl(240 100% 50%)', '#0000ff']
  ])('accepts typed %s and emits %s only on commit', (input, expected) => {
    const onChange = vi.fn();
    render(<ColorPicker {...opened} onChange={onChange} />);
    const field = screen.getByRole('textbox', { name: 'Color value' });
    fireEvent.change(field, { target: { value: input } });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.keyDown(field, { key: 'Enter' });
    fireEvent.blur(field);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(expected);
  });

  it('reports invalid input without changing the color and accepts a correction', () => {
    const onChange = vi.fn();
    render(<ColorPicker {...opened} defaultValue="#123456" onChange={onChange} />);
    edit('not a color');
    const input = screen.getByRole('textbox', { name: 'Color value' });
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe(screen.getByRole('alert').id);
    expect(onChange).not.toHaveBeenCalled();
    edit('#fff');
    expect(screen.queryByRole('alert')).toBeNull();
    expect(onChange.mock.calls[0][0]).toBe('#ffffff');
  });

  it('updates the presentation format without changing the selected form value', () => {
    const onChange = vi.fn();
    const onFormatChange = vi.fn();
    render(
      <ColorPicker
        {...opened}
        defaultValue="#ff0000"
        onChange={onChange}
        onFormatChange={onFormatChange}
      />
    );
    fireEvent.change(screen.getByRole('combobox', { name: 'Format' }), {
      target: { value: 'rgb' }
    });
    expect(screen.getByRole('textbox', { name: 'Color value' })).to.have.value('rgb(255, 0, 0)');
    expect(onChange).not.toHaveBeenCalled();
    expect(onFormatChange.mock.calls[0][0]).toBe('rgb');
    changeChannel('Hue', 120);
    expect(onChange.mock.calls[0][0]).toBe('rgb(0, 255, 0)');
  });

  it('honors a controlled output format', () => {
    const onChange = vi.fn();
    render(<ColorPicker {...opened} defaultValue="#ff0000" format="hsl" onChange={onChange} />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Format' }), {
      target: { value: 'hex' }
    });
    changeChannel('Hue', 120);
    expect(onChange.mock.calls[0][0]).toBe('hsl(120, 100%, 50%)');
  });

  it('offers labeled presets and ignores invalid preset values', () => {
    const onChange = vi.fn();
    render(
      <ColorPicker
        {...opened}
        defaultValue="#f00"
        presets={['#ff0000', { value: '#0f0', label: 'Success' }, 'invalid']}
        onChange={onChange}
      />
    );
    const group = screen.getByRole('group', { name: 'Preset colors' });
    expect(within(group).getAllByRole('button')).toHaveLength(2);
    expect(
      within(group).getByRole('button', { name: '#ff0000' }).getAttribute('aria-pressed')
    ).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Success' }));
    expect(onChange.mock.calls[0][0]).toBe('#00ff00');
  });

  it('removes alpha on edits when opacity is disabled, including text and presets', () => {
    const onChange = vi.fn();
    render(<ColorPicker {...opened} disableAlpha presets={['#00ff0080']} onChange={onChange} />);
    expect(screen.queryByRole('slider', { name: 'Opacity' })).toBeNull();
    edit('rgba(255, 0, 0, 0.25)');
    expect(onChange.mock.calls[0][0]).toBe('#ff0000');
    fireEvent.click(screen.getByRole('button', { name: '#00ff0080' }));
    expect(onChange.mock.calls[1][0]).toBe('#00ff00');
  });

  it('clears once using Delete and respects cleanable=false', () => {
    const onChange = vi.fn();
    const onClean = vi.fn();
    const { rerender } = render(
      <ColorPicker defaultValue="#123456" onChange={onChange} onClean={onClean} />
    );
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Delete' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Delete' });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBeNull();
    expect(onClean).toHaveBeenCalledTimes(1);
    rerender(<ColorPicker value="#ff0000" cleanable={false} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Delete' });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it.each(['disabled', 'readOnly', 'plaintext'] as const)(
    'blocks opening and imperative changes when %s',
    lock => {
      const ref = React.createRef<PickerHandle>();
      const onOpen = vi.fn();
      render(
        <ColorPicker ref={ref} open defaultValue="#ff0000" {...{ [lock]: true }} onOpen={onOpen} />
      );
      act(() => ref.current?.open?.());
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(onOpen).not.toHaveBeenCalled();
    }
  );

  it('supports controlled popup state and restores focus after Escape closes it', async () => {
    const onClose = vi.fn();
    const Example = () => {
      const [open, setOpen] = useState(true);
      return (
        <ColorPicker
          responsive={false}
          open={open}
          onClose={() => {
            onClose();
            setOpen(false);
          }}
        />
      );
    };
    render(<Example />);
    const toggle = screen.getByRole('combobox', { name: 'Select color' });
    fireEvent.keyDown(screen.getByRole('slider', { name: 'Hue' }), { key: 'Escape' });
    await waitFor(() => expect(toggle.getAttribute('aria-expanded')).toBe('false'));
    expect(document.activeElement).toBe(toggle);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('combines provider locale, component defaults and per-instance labels', () => {
    render(
      <CustomProvider
        locale={zhCN}
        components={{
          ColorPicker: { defaultProps: { defaultValue: '#00ff00', locale: { hue: 'Default hue' } } }
        }}
      >
        <ColorPicker {...opened} locale={{ hue: 'Instance hue' }} />
      </CustomProvider>
    );
    expect(screen.getByRole('slider', { name: 'Instance hue' })).to.exist;
    expect(screen.getByRole('slider', { name: '饱和度' })).to.exist;
    expect(screen.getByRole('textbox', { name: '颜色值' })).to.have.value('#00ff00');
  });

  it('falls back to English labels for locales without ColorPicker translations', () => {
    render(
      <CustomProvider locale={ruRU}>
        <ColorPicker {...opened} />
      </CustomProvider>
    );
    expect(screen.getByRole('slider', { name: 'Brightness' })).to.exist;
  });

  it('integrates with Form.Control values and labels', () => {
    const onChange = vi.fn();
    render(
      <Form formDefaultValue={{ color: '#ff0000' }} onChange={onChange}>
        <Form.Group controlId="brand">
          <Form.ControlLabel>Brand</Form.ControlLabel>
          <Form.Control name="color" accepter={ColorPicker} {...opened} />
        </Form.Group>
      </Form>
    );
    expect(screen.getByRole('combobox', { name: 'Brand' }).id).toBe('brand');
    changeChannel('Hue', 240);
    expect(onChange.mock.calls[0][0]).toEqual({ color: '#0000ff' });
  });

  it('associates Form validation errors and excludes a disabled form value', () => {
    const fixture = (disabled: boolean) => (
      <Form
        disabled={disabled}
        formDefaultValue={{ color: '#ff0000' }}
        formError={{ color: 'Choose another color' }}
      >
        <Form.Group controlId="brand">
          <Form.ControlLabel>Brand</Form.ControlLabel>
          <Form.Control name="color" accepter={ColorPicker} />
        </Form.Group>
      </Form>
    );
    const { container, rerender } = render(fixture(false));
    const trigger = screen.getByRole('combobox', { name: 'Brand' });
    expect(trigger.getAttribute('aria-invalid')).toBe('true');
    const errorId = trigger.getAttribute('aria-errormessage')!;
    expect(document.getElementById(errorId)?.textContent).toContain('Choose another color');
    const form = container.querySelector('form')!;
    expect(new FormData(form).getAll('color')).toEqual(['#ff0000']);
    rerender(fixture(true));
    expect(trigger).to.have.attribute('aria-disabled', 'true');
    expect(form.querySelector('input[name="color"]')).to.have.attribute('disabled');
    fireEvent.click(trigger);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(new FormData(form).getAll('color')).toEqual([]);
  });

  it('submits exactly one selected value and excludes disabled fields', () => {
    const { container, rerender } = render(
      <form>
        <ColorPicker name="color" defaultValue="#ff0000" />
      </form>
    );
    const form = container.querySelector('form')!;
    expect(new FormData(form).getAll('color')).toEqual(['#ff0000']);
    rerender(
      <form>
        <ColorPicker name="color" value="#00ff00" disabled />
      </form>
    );
    expect(new FormData(form).getAll('color')).toEqual([]);
    rerender(
      <form>
        <ColorPicker name="color" value="#0000ff" readOnly />
      </form>
    );
    expect(new FormData(form).getAll('color')).toEqual(['#0000ff']);
  });

  it('associates an external form and resets uncontrolled state without firing onChange', async () => {
    const onChange = vi.fn();
    render(
      <>
        <form id="palette" />
        <ColorPicker
          {...opened}
          name="color"
          form="palette"
          defaultValue="#ff0000"
          onChange={onChange}
        />
      </>
    );
    const form = document.getElementById('palette') as HTMLFormElement;
    changeChannel('Hue', 120);
    expect(new FormData(form).get('color')).toBe('#00ff00');
    await act(async () => form.reset());
    expect(new FormData(form).get('color')).toBe('#ff0000');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('respects cancelled native resets and controlled values', async () => {
    const { container, rerender } = render(
      <form onReset={event => event.preventDefault()}>
        <ColorPicker {...opened} name="color" defaultValue="#ff0000" />
      </form>
    );
    const form = container.querySelector('form')!;
    changeChannel('Hue', 120);
    await act(async () => form.reset());
    expect(new FormData(form).get('color')).toBe('#00ff00');
    rerender(
      <form>
        <ColorPicker name="color" value="#123456" defaultValue="#ff0000" />
      </form>
    );
    await act(async () => form.reset());
    expect(new FormData(form).get('color')).toBe('#123456');
  });
});
