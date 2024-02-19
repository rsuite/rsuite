import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sinon from 'sinon';
import { testStandardProps } from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import InlineEdit from '../InlineEdit';
import SelectPicker from '../../SelectPicker';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('InlineEdit', () => {
  testStandardProps(<InlineEdit />);

  it('Should render value in InlineEdit with SelectPicker', () => {
    render(
      <InlineEdit value="Louisa">
        <SelectPicker data={data} />
      </InlineEdit>
    );

    expect(screen.getByText('Louisa')).to.exist;
  });

  it('Should render placeholder in InlineEdit', () => {
    render(<InlineEdit placeholder="input something" />);

    expect(screen.getByText('input something')).to.exist;
  });

  it("Should render children's value in InlineEdit", () => {
    render(
      <InlineEdit>
        <SelectPicker data={data} defaultValue="Louisa" />
      </InlineEdit>
    );

    expect(screen.getByText('Louisa')).to.exist;
  });

  it('Should call onEdit callback', () => {
    const onEdit = Sinon.spy();

    render(<InlineEdit onEdit={onEdit} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));

    expect(onEdit).to.have.been.calledOnce;
  });

  it('Should call onCancel callback', () => {
    const onCancel = Sinon.spy();

    render(<InlineEdit onCancel={onCancel} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).to.have.been.calledOnce;
  });

  it('Should call onCancel callback and reset value', () => {
    const onCancel = Sinon.spy();

    render(<InlineEdit onCancel={onCancel} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).to.have.been.calledOnce;
    expect(screen.getByText('input something')).to.exist;
  });

  it('Should call onCancel callback and reset value when blur', () => {
    const onCancel = Sinon.spy();

    render(<InlineEdit onCancel={onCancel} stateOnBlur="cancel" defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.blur(screen.getByRole('textbox'), { relatedTarget: document.body });

    expect(onCancel).to.have.been.calledOnce;
    expect(screen.getByText('input something')).to.exist;
  });

  it('Should call onSave callback', () => {
    const onSave = Sinon.spy();

    render(<InlineEdit onSave={onSave} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSave).to.have.been.calledOnce;
  });

  it('Should call onSave callback and update value', () => {
    const onSave = Sinon.spy();

    render(<InlineEdit onSave={onSave} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSave).to.have.been.calledOnce;
    expect(screen.getByText('new value')).to.exist;
  });

  it('Should call onSave callback and update value when blur', () => {
    const onSave = Sinon.spy();

    render(<InlineEdit onSave={onSave} defaultValue="input something" />);

    fireEvent.click(screen.getByText('input something'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    fireEvent.blur(screen.getByRole('textbox'), { relatedTarget: document.body });

    expect(onSave).to.have.been.calledOnce;
    expect(screen.getByText('new value')).to.exist;
  });

  it('Should call onChange callback', () => {
    const onChange = Sinon.spy();

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
    const onEdit = Sinon.spy();
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
});
