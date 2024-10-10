import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import { testStandardProps } from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import InlineEdit from '../InlineEdit';
import SelectPicker from '../../SelectPicker';
import InputPicker from '../../InputPicker';
import Input from '../../Input';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('InlineEdit', () => {
  testStandardProps(<InlineEdit />);

  it('Should render placeholder in InlineEdit', () => {
    render(<InlineEdit placeholder="input something" />);

    expect(screen.getByText('input something')).to.exist;
  });

  it('Should call onEdit callback', () => {
    const onEdit = sinon.spy();

    render(<InlineEdit onEdit={onEdit} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));

    expect(onEdit).to.have.been.calledOnce;
  });

  it('Should call onCancel callback', () => {
    const onCancel = sinon.spy();

    render(<InlineEdit onCancel={onCancel} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).to.have.been.calledOnce;
  });

  it('Should call onCancel callback and reset value', () => {
    const onCancel = sinon.spy();

    render(<InlineEdit onCancel={onCancel} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).to.have.been.calledOnce;
    expect(screen.getByText('input something')).to.exist;
  });

  it('Should call onCancel callback and reset value when blur', () => {
    const onCancel = sinon.spy();

    render(<InlineEdit onCancel={onCancel} stateOnBlur="cancel" defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.blur(screen.getByRole('textbox'), { relatedTarget: document.body });

    expect(onCancel).to.have.been.calledOnce;
    expect(screen.getByText('input something')).to.exist;
  });

  it('Should call onSave callback', () => {
    const onSave = sinon.spy();

    render(<InlineEdit onSave={onSave} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSave).to.have.been.calledOnce;
  });

  it('Should call onSave callback and update value', () => {
    const onSave = sinon.spy();

    render(<InlineEdit onSave={onSave} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSave).to.have.been.calledOnce;
    expect(screen.getByText('new value')).to.exist;
  });

  it('Should call onSave callback and update value when blur', () => {
    const onSave = sinon.spy();

    render(<InlineEdit onSave={onSave} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.blur(screen.getByRole('textbox'), { relatedTarget: document.body });

    expect(onSave).to.have.been.calledOnce;
    expect(screen.getByText('new value')).to.exist;
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();

    render(<InlineEdit onChange={onChange} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });

    expect(onChange).to.have.been.calledOnce;
    expect(onChange).to.have.been.calledWith('new value');
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
    const onEdit = sinon.spy();
    render(<InlineEdit disabled onEdit={onEdit} defaultValue="input something" />);

    expect(screen.getByText('input something')).to.exist;

    fireEvent.click(screen.getByText('input something'));

    expect(onEdit).to.not.have.been.called;
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
      const onSave = sinon.spy();
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
      const onSave = sinon.spy();
      const onExit = sinon.spy();
      render(
        <InlineEdit value="Louisa" onSave={onSave}>
          <InputPicker data={data} onExit={onExit} />
        </InlineEdit>
      );

      fireEvent.click(screen.getByText('Louisa'));

      await screen.findByRole('listbox');

      fireEvent.click(screen.getByRole('option', { name: 'Kariane' }));

      expect(onSave).to.have.been.calledOnce;
      expect(onExit).to.have.been.calledOnce;
    });

    it('Should call onSave callback when clicked on clear button', async () => {
      const onSave = sinon.spy();
      const onClean = sinon.spy();
      render(
        <InlineEdit value="Louisa" onSave={onSave}>
          <InputPicker data={data} onClean={onClean} />
        </InlineEdit>
      );

      fireEvent.click(screen.getByText('Louisa'));

      await screen.findByRole('listbox');

      fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

      expect(onSave).to.have.been.calledOnce;
      expect(onClean).to.have.been.calledOnce;
    });
  });

  describe('InlineEdit with keyboard', () => {
    it('Should change value by pressing Enter', () => {
      const onSave = sinon.spy();

      render(<InlineEdit onSave={onSave} defaultValue="input something" />);
      fireEvent.click(screen.getByText('input something'));
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

      expect(screen.getByText('new value')).to.exist;
      expect(onSave).to.have.been.calledOnce;
    });

    it('Should not change value by pressing Enter when the input is a textarea', () => {
      const onSave = sinon.spy();

      render(
        <InlineEdit onSave={onSave} defaultValue="input something">
          <Input as="textarea" />
        </InlineEdit>
      );
      fireEvent.click(screen.getByText('input something'));
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

      expect(screen.getByRole('textbox')).to.exist;
      expect(onSave).to.not.have.been.called;
    });

    it('Should cancel editing by pressing Escape', () => {
      const onCancel = sinon.spy();

      render(<InlineEdit onCancel={onCancel} defaultValue="input something" />);
      fireEvent.click(screen.getByText('input something'));
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });

      expect(screen.getByText('input something')).to.exist;
      expect(onCancel).to.have.been.calledOnce;
    });
  });
});
