import React from 'react';
import AutoComplete from '../AutoComplete';
import { describe, expect, it, vi } from 'vitest';
import { testStandardProps, testControlledUnControlled, testFormControl } from '@test/cases';
import { render, fireEvent, screen } from '@testing-library/react';

const data = ['item1', 'item2'];

describe('AutoComplete', () => {
  testStandardProps(<AutoComplete data={data} />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => screen.getByRole('combobox')
  });

  testControlledUnControlled(AutoComplete, {
    simulateEvent: {
      changeValue: () => {
        const input = screen.getByRole('combobox');
        fireEvent.change(input, { target: { value: 'a' } });
        return { changedValue: 'a' };
      }
    },
    expectedValue: (value: string) => {
      expect(screen.getByRole('combobox')).to.have.value(value);
    }
  });
  testFormControl(AutoComplete, {
    getUIElement: () => screen.getByRole('combobox')
  });

  it('Should render input', () => {
    render(<AutoComplete data={data} />);

    expect(screen.getByRole('combobox')).to.exist;
  });

  it('Should render 2 `option` when set `open` and `defaultValue`', () => {
    render(<AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" />);
    expect(screen.getAllByRole('option')).to.have.lengthOf(2);
  });

  it('Should call onSelect callback with correct args', () => {
    const onSelect = vi.fn();
    render(<AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('option', { name: 'a' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('a', { value: 'a', label: 'a' }, expect.anything());
  });

  it('Should call onChange callback', () => {
    const onChange = vi.fn();

    render(<AutoComplete data={data} onChange={onChange} />);
    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('a', expect.anything());
  });

  it('Should call onFocus callback', () => {
    const onFocus = vi.fn();
    render(<AutoComplete data={data} onFocus={onFocus} />);
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('Should call onBlur callback', () => {
    const onBlur = vi.fn();

    render(<AutoComplete data={data} onBlur={onBlur} />);
    const input = screen.getByRole('combobox');
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('Should call onKeyDown callback on input', () => {
    const onKeyDown = vi.fn();

    render(<AutoComplete onKeyDown={onKeyDown} data={['a', 'b', 'ab']} open />);
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input);
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('Should call onKeyDown callback on menu', () => {
    const onKeyDown = vi.fn();

    render(<AutoComplete defaultValue="a" onKeyDown={onKeyDown} data={['a', 'b']} open />);

    fireEvent.keyDown(screen.getByTestId('picker-popup'));

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('Should call onMenuFocus callback when key=ArrowDown', () => {
    const onMenuFocus = vi.fn();

    render(
      <AutoComplete defaultValue="a" onMenuFocus={onMenuFocus} data={['a', 'ab', 'ac']} open />
    );

    fireEvent.keyDown(screen.getByTestId('picker-popup'), {
      key: 'ArrowDown'
    });

    expect(onMenuFocus).toHaveBeenCalledTimes(1);
  });

  it('Should call onMenuFocus callback when key=ArrowUp', () => {
    const onMenuFocus = vi.fn();
    render(
      <AutoComplete defaultValue="a" onMenuFocus={onMenuFocus} data={['a', 'ab', 'ac']} open />
    );
    fireEvent.keyDown(screen.getByTestId('picker-popup'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByTestId('picker-popup'), { key: 'ArrowUp' });

    expect(onMenuFocus).toHaveBeenCalledTimes(2);
  });

  it('Should call onChange callback when key=Enter', () => {
    const onChange = vi.fn();
    render(<AutoComplete defaultValue="a" onChange={onChange} data={['a', 'ab', 'ac']} open />);

    fireEvent.keyDown(screen.getByTestId('picker-popup'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByTestId('picker-popup'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should call onSelect callback with selected item when key=Enter', () => {
    const onSelect = vi.fn();

    render(<AutoComplete defaultValue="a" onSelect={onSelect} data={['a', 'ab', 'ac']} open />);

    fireEvent.keyDown(screen.getByTestId('picker-popup'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByTestId('picker-popup'), { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('ab', { value: 'ab', label: 'ab' }, expect.anything());
  });

  it('Shouldn‘t call onSelect nor onChange callback on Enter pressed if selectOnEnter=false', () => {
    const onSelect = vi.fn();

    render(
      <AutoComplete
        defaultValue="a"
        onSelect={onSelect}
        onChange={onSelect}
        selectOnEnter={false}
        data={['a', 'ab', 'ac']}
        open
      />
    );
    fireEvent.keyDown(screen.getByTestId('picker-popup'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByTestId('picker-popup'), { key: 'ArrowUp' });

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('Should call onClose callback when key=Escape', () => {
    const onClose = vi.fn();
    render(<AutoComplete defaultValue="a" onClose={onClose} data={['a', 'ab', 'ac']} open />);
    fireEvent.keyDown(screen.getByTestId('picker-popup'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Should render a icon in li', () => {
    render(
      <AutoComplete
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        renderOption={() => <i className="icon" data-testid="icon" />}
      />
    );

    expect(screen.getAllByTestId('icon')).to.have.lengthOf(2);
  });

  it('Should have a popupClassName', () => {
    render(<AutoComplete popupClassName="custom" data={['a', 'b', 'ab']} open />);

    expect(screen.getByTestId('picker-popup')).to.have.class('custom');
  });

  it('Should have a custom filter function', () => {
    const { rerender } = render(
      <AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" filterBy={() => true} />
    );

    expect(screen.getAllByRole('option')).to.have.lengthOf(3);

    rerender(<AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" filterBy={() => false} />);

    expect(screen.queryAllByRole('option')).to.length(0);

    rerender(
      <AutoComplete
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        // filterBy value only, so all item will be displayed
        filterBy={value => value === 'a'}
      />
    );

    expect(screen.getAllByRole('option')).to.have.lengthOf(3);

    rerender(
      <AutoComplete
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        filterBy={(_, item) => Boolean(item.label) && (item.label as string).length >= 2}
      />
    );

    expect(screen.getAllByRole('option')).to.have.lengthOf(1);
  });

  it('Should set minimum width for listbox', () => {
    render(
      <AutoComplete
        data={['item1', 'item2', 'item3']}
        defaultValue="item"
        open
        popupAutoWidth
        style={{ width: 100 }}
      />
    );

    const listbox = screen.getByRole('listbox');

    expect(listbox.parentNode).to.have.attr('style', '--rs-picker-min-width: 100px;');
  });

  it('Should be autoComplete', () => {
    render(<AutoComplete data={data} autoComplete="on" style={{ width: 100 }} />);
    expect(screen.getByRole('combobox')).to.have.attribute('autocomplete', 'on');
  });

  it('Should not throw an error', () => {
    const callback = vi.fn();
    expect(() => {
      render(
        <AutoComplete data={data} onExit={callback} onExiting={callback} onEnter={callback} />
      );
    }).not.toThrow();
  });

  it('Should only receive input attributes on `<input>`', () => {
    render(<AutoComplete data={data} data-id={1} name="username" data-testid="test" />);

    expect(screen.getByTestId('test')).to.have.attribute('data-id', '1');

    expect(screen.getByTestId('test').querySelector('input')).to.have.attribute('name', 'username');
  });
});
