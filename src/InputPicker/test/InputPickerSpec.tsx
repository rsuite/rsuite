import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import sinon from 'sinon';
import {
  getDOMNode,
  getInstance,
  testStandardProps,
  testControlledUnControlled,
  testFormControl,
  testPickers
} from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import InputPicker from '../InputPicker';
import Button from '../../Button';
import { PickerHandle } from '@/internals/Picker';
import userEvent from '@testing-library/user-event';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('InputPicker', () => {
  testStandardProps(<InputPicker data={data} />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('combobox');
    }
  });
  testPickers(InputPicker, { virtualized: true });
  testControlledUnControlled(InputPicker, {
    componentProps: { data, defaultOpen: true },
    value: 'Eugenia',
    defaultValue: 'Kariane',
    changedValue: 'Louisa',
    simulateEvent: {
      changeValue: () => {
        const input = screen.getAllByRole('option')[2];
        userEvent.click(input);

        return { changedValue: 'Louisa' };
      }
    },
    expectedValue: (value: string) => {
      expect(screen.getByTestId('picker-toggle-input')).to.have.attribute(
        'value',
        value.toString()
      );
    }
  });

  testFormControl(InputPicker, {
    value: 'Eugenia',
    componentProps: { data },
    getUIElement: () => screen.getByRole('combobox')
  });

  it('Should clean selected default value', () => {
    render(<InputPicker data={data} defaultValue={'Eugenia'} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<InputPicker data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should not clean selected value', () => {
    render(<InputPicker data={data} value={'Eugenia'} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('combobox')).to.have.text('Eugenia');
  });

  it('Should output a dropdown', () => {
    const instance = getDOMNode(<InputPicker data={[]} />);

    expect(instance).to.have.class('rs-picker-input');
  });

  it('Should be plaintext', () => {
    const instance1 = getInstance(<InputPicker plaintext data={data} value={'Eugenia'} />);
    const instance2 = getInstance(<InputPicker plaintext data={data} />);
    const instance3 = getInstance(<InputPicker plaintext data={data} placeholder="-" />);
    const instance4 = getInstance(
      <InputPicker plaintext data={data} placeholder="-" value={'Eugenia'} />
    );

    expect(instance1.target).to.text('Eugenia');
    expect(instance2.target).to.text('Not selected');
    expect(instance3.target).to.text('-');
    expect(instance4.target).to.text('Eugenia');
  });

  it('Should be readOnly', () => {
    const input1Ref = React.createRef<PickerHandle>();
    const input2Ref = React.createRef<PickerHandle>();

    render(
      <div>
        <InputPicker data={[]} ref={input1Ref} />
        <InputPicker data={[]} ref={input2Ref} readOnly />
      </div>
    );

    fireEvent.focus(screen.getAllByRole('textbox')[0]);
    fireEvent.focus(screen.getAllByRole('textbox')[1]);

    expect((input1Ref.current as PickerHandle).overlay).to.exist;
    expect(screen.getAllByRole('textbox')[1]).to.have.attr('readonly');
    expect(() => {
      (input2Ref.current as PickerHandle).overlay;
    }).to.throw('The overlay is not found. Please confirm whether the picker is open.');
  });

  it('Should output a button', () => {
    render(<InputPicker data={[]} toggleAs="button" />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should update display options when `data` is updated', () => {
    const { rerender } = render(<InputPicker open data={[{ label: 'Item', value: 1 }]} />);

    expect(screen.getAllByRole('option').map(option => option.textContent)).to.deep.equal(['Item']);

    rerender(<InputPicker open data={[{ label: 'New Item', value: 1 }]} />);

    expect(screen.getAllByRole('option').map(option => option.textContent)).to.deep.equal([
      'New Item'
    ]);
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    render(<InputPicker defaultOpen data={data} value={value} />);

    expect(screen.getByRole('combobox')).to.have.text(value);
    expect(screen.getByRole('option', { name: value })).to.have.attr('aria-selected', 'true');
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    render(<InputPicker defaultOpen data={data} defaultValue={value} />);

    expect(screen.getByRole('combobox')).to.have.text(value);
    expect(screen.getByRole('option', { name: value })).to.have.attr('aria-selected', 'true');
  });

  it('Should render a group', () => {
    render(<InputPicker defaultOpen groupBy="role" data={data} />);

    expect(within(screen.getByRole('listbox')).getByRole('group')).to.exist;
  });

  it('Should toggle expansion of a group by clicking on the group title', () => {
    render(<InputPicker defaultOpen groupBy="role" data={data} />);

    expect(screen.getAllByRole('option')).to.have.lengthOf(3);

    // Fold group "Master"
    userEvent.click(screen.getByText('Master'));
    expect(screen.queryAllByRole('option')).to.have.lengthOf(0);

    // Expand group "Master"
    userEvent.click(screen.getByText('Master'));
    expect(screen.getAllByRole('option')).to.have.lengthOf(3);
  });

  it('Should have a placeholder', () => {
    render(<InputPicker data={[]} className="custom" placeholder="test" />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Allow `label` to be an empty string', () => {
    render(
      <InputPicker placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );

    expect(screen.getByRole('option', { selected: true })).to.text('');
  });

  it('Should render value by `renderValue`', () => {
    render(
      <InputPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={'bar'}
        renderValue={(value, item) => `${(item as any).label as string}-${value}`}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text('foo-bar');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const { rerender } = render(
      <InputPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={1}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text(`1${placeholder}`);

    // Invalid value
    rerender(<InputPicker renderValue={v => [v, placeholder]} data={[]} value={2} />);

    expect(screen.getByRole('combobox')).to.have.text(`2${placeholder}`);
  });

  it('Should not be call renderValue()', () => {
    render(<InputPicker data={[]} renderValue={() => 'value'} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should render a placeholder when value error', () => {
    render(<InputPicker data={[]} value={2} placeholder={'test'} />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should call `onChange` callback with correct value', () => {
    const onChangeSpy = sinon.spy();
    render(<InputPicker defaultOpen onChange={onChangeSpy} data={data} />);

    fireEvent.click(screen.getByRole('option', { name: 'Eugenia' }));

    expect(onChangeSpy).to.have.been.calledWith('Eugenia');
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    render(<InputPicker data={data} defaultValue={'Eugenia'} onClean={onCleanSpy} />);
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onCleanSpy).to.calledOnce;
  });

  it('Should call `onClean` callback by keyDown', () => {
    const onCleanSpy = sinon.spy();
    const instance = getInstance(
      <InputPicker data={data} defaultOpen defaultValue={'Eugenia'} onClean={onCleanSpy} />
    );
    fireEvent.keyDown(instance.target, { key: 'Backspace' });

    expect(onCleanSpy).to.calledOnce;
  });

  it('Should call `onSelect` with correct args by key=Enter ', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <InputPicker defaultOpen data={data} onSelect={onSelectSpy} defaultValue={'Kariane'} />
    );

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.target, { key: 'Enter' });

    expect(onSelectSpy).to.have.been.calledWith('Louisa');
  });

  it('Should output a clean button', () => {
    render(<InputPicker data={data} defaultValue={'Louisa'} />);

    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
  });

  it('Should call `onSearch` callback with correct search keyword', () => {
    const onSearchSpy = sinon.spy();
    render(<InputPicker data={[]} defaultOpen onSearch={onSearchSpy} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'a' } });

    expect(onSearchSpy).to.have.been.calledOnce;
    expect(onSearchSpy).to.have.been.calledWith('a');
  });

  it('Should focus item by key=ArrowDown ', () => {
    const instance = getInstance(<InputPicker defaultOpen data={data} defaultValue={'Eugenia'} />);
    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

    expect(screen.getByRole('option', { name: 'Kariane' }).firstChild).to.have.class(
      'rs-picker-select-menu-item-focus'
    );
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(<InputPicker defaultOpen data={data} defaultValue={'Kariane'} />);
    fireEvent.keyDown(instance.target, { key: 'ArrowUp' });

    expect(screen.getByRole('option', { name: 'Eugenia' }).firstChild).to.have.class(
      'rs-picker-select-menu-item-focus'
    );
  });

  it('Should call `onChange` by key=Enter ', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(
      <InputPicker defaultOpen data={data} onChange={onChangeSpy} defaultValue={'Kariane'} />
    );

    fireEvent.keyDown(instance.target, { key: 'Enter' });

    expect(onChangeSpy).to.calledOnce;
  });

  it('Should call onBlur callback', () => {
    const onBlurSpy = sinon.spy();
    render(<InputPicker data={[]} onBlur={onBlurSpy} />);
    fireEvent.blur(screen.getByRole('textbox'));

    expect(onBlurSpy).to.calledOnce;
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    render(<InputPicker data={[]} onFocus={onFocusSpy} />);
    fireEvent.focus(screen.getByRole('textbox'));

    expect(onFocusSpy).to.called;
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<InputPicker data={[]} className="custom" defaultOpen />);

    expect(instance).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const instance = getDOMNode(<InputPicker data={[]} style={{ fontSize: 12 }} />);

    expect(instance).to.have.style('font-size', '12px');
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<InputPicker data={[]} classPrefix="custom-prefix" />);

    expect(instance).to.have.class('rs-custom-prefix');
  });

  it('Should render a button by toggleAs={Button}', () => {
    render(<InputPicker open data={data} toggleAs={Button} />);

    expect(screen.getByRole('combobox')).to.have.class('rs-btn');
  });

  it('Should render the specified menu content by `searchBy`', () => {
    render(<InputPicker defaultOpen data={data} searchBy={(_a, _b, c) => c.value === 'Louisa'} />);
    const list = screen.getAllByRole('option');

    expect(list).to.be.lengthOf(1);
    expect(list[0]).to.text('Louisa');
  });

  it('Should call renderValue', () => {
    const { container, rerender } = render(
      <InputPicker data={[]} value="Test" renderValue={() => '1'} />
    );

    expect(container.firstChild).to.have.class('rs-picker-has-value');

    rerender(<InputPicker data={[]} value="Test" renderValue={() => null} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');

    rerender(<InputPicker data={[]} value="Test" renderValue={() => undefined} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const { container } = render(<InputPicker data={data} value={2} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');
  });

  it('Should call `onCreate` callback with correct value', () => {
    const inputRef = React.createRef<PickerHandle>();

    const onCreate = sinon.spy();
    render(<InputPicker ref={inputRef} defaultOpen data={data} onCreate={onCreate} creatable />);

    fireEvent.focus((inputRef.current as PickerHandle).root as HTMLElement);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreate).to.calledOnce;
    expect(onCreate).to.calledWith('abc');
  });

  it('Should hide "Create option" action if `shouldDisplayCreateOption` returns false', () => {
    const data = [
      { label: 'Alice', value: 1 },
      { label: 'Bob', value: 2 }
    ];

    // Display "Create option" action only when no item's `label` matches searchKeyword
    const shouldDisplayCreateOption = sinon.spy((searchKeyword, filteredData) =>
      filteredData.every(item => item.label !== searchKeyword)
    );
    render(
      <InputPicker
        defaultOpen
        data={data}
        creatable
        shouldDisplayCreateOption={shouldDisplayCreateOption}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Alice' } });

    expect(shouldDisplayCreateOption).to.have.been.calledWith('Alice', [
      { label: 'Alice', value: 1 }
    ]);
    expect(screen.queryByText(/^Create option/)).to.not.exist;
  });

  describe('Accessibility', () => {
    it('Should have a role combobox', () => {
      render(<InputPicker data={data} />);

      expect(screen.getByRole('combobox')).to.exist;
    });

    it('Should have a role listbox', () => {
      render(<InputPicker data={data} defaultOpen />);

      expect(screen.getByRole('listbox')).to.exist;
    });

    it('Should have a role option', () => {
      render(<InputPicker data={data} defaultOpen />);

      expect(screen.getAllByRole('option')).to.have.lengthOf(3);
    });

    it('Should set a tabindex for input', () => {
      render(<InputPicker data={[]} tabIndex={10} />);

      expect(screen.getByRole('combobox')).to.have.attribute('tabindex', '10');
    });

    it('Should be the focus switch option via keyboard', () => {
      render(<InputPicker data={data} />);
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.activeElement).to.have.text('Eugenia');
    });
  });
});
