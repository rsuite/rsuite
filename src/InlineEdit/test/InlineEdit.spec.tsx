import React from 'react';
import userEvent from '@testing-library/user-event';
import InlineEdit from '../InlineEdit';
import SelectPicker from '../../SelectPicker';
import InputPicker from '../../InputPicker';
import Input from '../../Input';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import { mockGroupData } from '@test/mocks/data-mock';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('InlineEdit', () => {
  testStandardProps(<InlineEdit />);

  it('Should render placeholder in InlineEdit', () => {
    render(<InlineEdit placeholder="input something" />);

    expect(screen.getByText('input something')).to.exist;
  });

  it('Should call onEdit callback', () => {
    const onEdit = vi.fn();

    render(<InlineEdit onEdit={onEdit} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('Should call onCancel callback', () => {
    const onCancel = vi.fn();

    render(<InlineEdit onCancel={onCancel} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('Should call onCancel callback and reset value', () => {
    const onCancel = vi.fn();

    render(<InlineEdit onCancel={onCancel} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(screen.getByText('input something')).toBeTruthy();
  });

  it('Should call onCancel callback and reset value when blur', () => {
    const onCancel = vi.fn();

    render(<InlineEdit onCancel={onCancel} stateOnBlur="cancel" defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.blur(screen.getByRole('textbox'), { relatedTarget: document.body });

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(screen.getByText('input something')).toBeTruthy();
  });

  it('Should call onSave callback', () => {
    const onSave = vi.fn();

    render(<InlineEdit onSave={onSave} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('Should call onSave callback and update value', () => {
    const onSave = vi.fn();

    render(<InlineEdit onSave={onSave} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(screen.getByText('new value')).toBeTruthy();
  });

  it('Should call onSave callback and update value when blur', () => {
    const onSave = vi.fn();

    render(<InlineEdit onSave={onSave} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.blur(screen.getByRole('textbox'), { relatedTarget: document.body });

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(screen.getByText('new value')).toBeTruthy();
  });

  it('Should call onChange callback', () => {
    const onChange = vi.fn();

    render(<InlineEdit onChange={onChange} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
  });

  it('Should render controls', () => {
    render(<InlineEdit showControls defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));

    expect(screen.getByRole('button', { name: 'Save' })).to.exist;
    expect(screen.getByRole('button', { name: 'Cancel' })).to.exist;
  });

  it('Should not render controls', () => {
    render(<InlineEdit showControls={false} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));

    expect(screen.queryByRole('button', { name: 'Save' })).to.not.exist;
    expect(screen.queryByRole('button', { name: 'Cancel' })).to.not.exist;
  });

  it('Should be disabled', () => {
    const onEdit = vi.fn();
    render(<InlineEdit disabled onEdit={onEdit} defaultValue="input something" />);

    expect(screen.getByText('input something')).to.exist;

    fireEvent.click(screen.getByText('input something'));

    expect(onEdit).not.toHaveBeenCalled();
  });

  it('Should call onFocus and set editing state when not editing', () => {
    const onFocus = vi.fn();

    render(<InlineEdit onFocus={onFocus} defaultValue="test value" />);

    const element = screen.getByText('test value');
    fireEvent.focus(element);

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('Should not call onFocus again if already editing', () => {
    const onFocus = vi.fn();

    render(<InlineEdit onFocus={onFocus} defaultValue="test value" />);

    const element = screen.getByText('test value');
    fireEvent.focus(element);
    // By the second focus call, isEditing is already set.
    fireEvent.focus(element);

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('Should have a custom size', () => {
    const { container } = render(<InlineEdit size="lg" defaultValue="input something" />);

    expect(container.firstChild).to.have.class('rs-inline-edit-lg');

    fireEvent.click(screen.getByText('input something'));

    expect(screen.getByRole('textbox')).to.have.class('rs-input-lg');
  });

  it('Should custom render a input element', () => {
    render(
      <InlineEdit defaultValue="input something">
        {(props, ref) => {
          const { onChange, value, size, plaintext, ...rest } = props;

          if (plaintext) {
            return <span>{value}</span>;
          }

          return (
            <input
              type="text"
              ref={ref}
              value={value}
              className={size}
              onChange={event => {
                onChange(event.target.value, event);
              }}
              {...rest}
            />
          );
        }}
      </InlineEdit>
    );

    expect(screen.getByText('input something')).to.have.tagName('span');

    fireEvent.click(screen.getByText('input something'));

    expect(screen.getByRole('textbox')).to.have.value('input something');
  });

  describe('InlineEdit with SelectPicker', () => {
    it('Should render value in InlineEdit with SelectPicker', () => {
      render(
        <InlineEdit value="Louisa">
          <SelectPicker data={data} />
        </InlineEdit>
      );

      expect(screen.getByText('Louisa')).to.exist;
    });

    it("Should render children's value in InlineEdit", () => {
      render(
        <InlineEdit>
          <SelectPicker data={data} defaultValue="Louisa" />
        </InlineEdit>
      );

      expect(screen.getByText('Louisa')).to.exist;
    });
  });

  describe('InlineEdit with InputPicker', () => {
    it('Should open the popup picker automatically when clicked', async () => {
      const onSave = vi.fn();
      render(
        <InlineEdit value="Louisa" onSave={onSave}>
          <InputPicker data={data} />
        </InlineEdit>
      );

      fireEvent.click(screen.getByText('Louisa'));

      await waitFor(() => {
        expect(screen.getByRole('listbox')).to.exist;
      });
    });

    it('Should call onSave callback when clicked on an option', async () => {
      const onSave = vi.fn();
      const onExit = vi.fn();
      render(
        <InlineEdit value="Louisa" onSave={onSave}>
          <InputPicker data={data} onExit={onExit} />
        </InlineEdit>
      );

      fireEvent.click(screen.getByText('Louisa'));

      await screen.findByRole('listbox');

      fireEvent.click(screen.getByRole('option', { name: 'Kariane' }));

      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onExit).toHaveBeenCalledTimes(1);
    });

    it('Should call onSave callback when clicked on clear button', async () => {
      const onSave = vi.fn();
      const onClean = vi.fn();
      render(
        <InlineEdit value="Louisa" onSave={onSave}>
          <InputPicker data={data} onClean={onClean} />
        </InlineEdit>
      );

      fireEvent.click(screen.getByText('Louisa'));

      await screen.findByRole('listbox');

      fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onClean).toHaveBeenCalledTimes(1);
    });
  });

  describe('InlineEdit with keyboard', () => {
    it('Should change value by pressing Enter', () => {
      const onSave = vi.fn();

      render(<InlineEdit onSave={onSave} defaultValue="input something" />);
      fireEvent.click(screen.getByText('input something'));
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

      expect(screen.getByText('new value')).toBeTruthy();
      expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('Should not change value by pressing Enter when the input is a textarea', () => {
      const onSave = vi.fn();

      render(
        <InlineEdit onSave={onSave} defaultValue="input something">
          <Input as="textarea" />
        </InlineEdit>
      );
      fireEvent.click(screen.getByText('input something'));
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

      expect(screen.getByRole('textbox')).to.exist;
      expect(onSave).not.toHaveBeenCalled();
    });

    it('Should cancel editing by pressing Escape', () => {
      const onCancel = vi.fn();

      render(<InlineEdit onCancel={onCancel} defaultValue="input something" />);
      fireEvent.click(screen.getByText('input something'));
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });

      expect(screen.getByText('input something')).to.exist;
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    [
      { showControls: false, expectedTabs: 1 },
      { showControls: true, expectedTabs: 3 }
    ].forEach(({ showControls, expectedTabs }) => {
      it(`Should move to second input with ${expectedTabs} TAB(s) when showControls is ${showControls}`, () => {
        render(
          <>
            <InlineEdit defaultValue="first input" showControls={showControls} />
            <InlineEdit defaultValue="second input" />
          </>
        );

        userEvent.click(screen.getByText('first input'));

        for (let i = 0; i < expectedTabs; i++) {
          userEvent.tab();
        }

        const inputs = screen.getAllByRole('textbox');
        expect(inputs[inputs.length - 1] instanceof HTMLInputElement).to.be.true;
        expect((inputs[inputs.length - 1] as HTMLInputElement).value).to.equal('second input');
      });
    });
  });
});
