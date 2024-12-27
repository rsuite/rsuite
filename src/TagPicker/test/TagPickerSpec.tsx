import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import {
  testStandardProps,
  testControlledUnControlled,
  testFormControl,
  testPickers
} from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import TagPicker from '../index';
import Button from '../../Button';
import { PickerHandle } from '@/internals/Picker';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], {
  role: 'Master',
  labelElementType: React.Fragment
});

describe('TagPicker', () => {
  testStandardProps(<TagPicker data={data} />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('combobox');
    }
  });
  testPickers(TagPicker, { virtualized: true });
  testControlledUnControlled(TagPicker, {
    componentProps: { data, defaultOpen: true },
    value: ['Eugenia'],
    defaultValue: ['Kariane'],
    changedValue: ['Louisa'],
    simulateEvent: {
      changeValue: (prevValue: any) => {
        const input = screen.getAllByRole('checkbox')[2];
        userEvent.click(input);
        return { changedValue: [...prevValue, 'Louisa'] };
      }
    },
    expectedValue: (value: string) => {
      expect(screen.getByTestId('picker-toggle-input')).to.have.attribute(
        'value',
        value.toString()
      );
    }
  });

  testFormControl(TagPicker, {
    value: ['Eugenia'],
    componentProps: { data },
    getUIElement: () => screen.getByRole('combobox')
  });

  it('Should clean selected default value', () => {
    render(<TagPicker defaultOpen data={data} defaultValue={['Eugenia']} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should not clean selected value', () => {
    render(<TagPicker data={data} value={['Eugenia']} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('option', { name: 'Eugenia' })).to.exist;
  });

  it('Should output a TagPicker', () => {
    const { container } = render(<TagPicker data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-tag');
  });

  it('Should output a button', () => {
    render(<TagPicker data={[]} toggleAs="button" />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    render(<TagPicker defaultOpen data={data} value={[value]} />);

    expect(screen.queryAllByRole('option', { name: value })).to.have.lengthOf(2);
    expect(screen.getByRole('option', { name: value, selected: true })).to.exist;
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    render(<TagPicker defaultOpen data={data} defaultValue={[value]} />);

    expect(screen.queryAllByRole('option', { name: value })).to.have.lengthOf(2);
    expect(screen.getByRole('option', { name: value, selected: true })).to.exist;
    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
  });

  it('Should render a group', () => {
    render(<TagPicker defaultOpen groupBy="role" data={data} />);

    expect(screen.queryByRole('group')).to.have.class('rs-picker-menu-group');
  });

  it('Should display custom placeholder', () => {
    render(<TagPicker data={[]} className="custom" placeholder="test" />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should display placeholder when value does not exist in data', () => {
    render(
      <TagPicker
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={['4']}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Allow `label` to be an empty string', () => {
    render(
      <TagPicker placeholder="test" data={[{ label: '', value: '1' }]} value={['1']} defaultOpen />
    );

    expect(screen.getByRole('option', { selected: true })).to.have.text('');
  });

  it('Should output a value by renderValue()', () => {
    // Valid value
    const { rerender } = render(
      <TagPicker renderValue={v => [v, 'value']} data={[{ value: 1, label: '1' }]} value={[1]} />
    );

    expect(screen.getByRole('listbox')).to.have.text('1value');

    // Invalid value
    rerender(<TagPicker renderValue={v => [v, 'value']} data={[]} value={[2]} />);

    expect(screen.getByRole('listbox')).to.have.text('2value');

    rerender(
      <TagPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={['bar']}
        renderValue={(_value, items) => {
          return `${items[0]?.label}-${items[0]?.value}`;
        }}
      />
    );

    expect(screen.getByRole('listbox')).to.have.text('foo-bar');
  });

  it('Should renderCheckbox render correct', () => {
    render(
      <TagPicker
        data={data}
        defaultOpen
        value={['Eugenia']}
        renderMenuItemCheckbox={checkboxProps => {
          const { value, checked, onChange } = checkboxProps;
          return (
            <input
              type="checkbox"
              value={value}
              checked={checked}
              onChange={event => {
                onChange?.(value, !checked, event);
              }}
            />
          );
        }}
      />
    );

    screen.getAllByRole('checkbox').forEach((checkbox, index) => {
      expect(checkbox).to.have.property('checked', index === 0);
    });
  });

  it('Should call `onChange` callback', () => {
    const onChangeSpy = sinon.spy();
    render(<TagPicker defaultOpen onChange={onChangeSpy} data={[{ label: '1', value: '1' }]} />);

    fireEvent.click(screen.getByLabelText('1'));

    expect(onChangeSpy).to.have.been.calledOnce;
  });

  it('Should call `onClean` callback', () => {
    const onClean = sinon.spy();
    render(<TagPicker data={data} defaultValue={['Kariane']} onClean={onClean} />);
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onClean).to.have.been.calledOnce;
  });

  it('Should call `onSelect` with correct args by key=Enter ', () => {
    const onSelect = sinon.spy();
    render(<TagPicker defaultOpen data={data} onSelect={onSelect} defaultValue={['Kariane']} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(onSelect).to.have.been.calledWith(
      ['Kariane', 'Louisa'],
      sinon.match({
        value: 'Louisa'
      })
    );
  });

  it('Should output a clean button', () => {
    render(<TagPicker data={data} defaultValue={['Louisa']} />);

    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
  });

  it('Should call `onSearch` callback with correct search keyword', () => {
    const onSearch = sinon.spy();
    render(<TagPicker data={[]} defaultOpen onSearch={onSearch} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'a' } });

    expect(onSearch).to.have.been.calledWith('a');
  });

  it('Should focus item by key=ArrowDown ', () => {
    render(<TagPicker defaultOpen data={data} defaultValue={['Eugenia']} />);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

    expect(screen.getByRole('option', { name: 'Kariane' })).to.contain('.rs-check-item-focus');
  });

  it('Should focus item by key=ArrowUp ', () => {
    render(<TagPicker defaultOpen data={data} defaultValue={['Kariane']} />);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' });

    expect(screen.getByRole('option', { name: 'Eugenia' })).to.contain('.rs-check-item-focus');
  });

  it('Should call `onChange` by key=Enter ', () => {
    const onChange = sinon.spy();
    render(<TagPicker defaultOpen data={data} onChange={onChange} defaultValue={['Kariane']} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should call `onChange` by remove last item ', () => {
    const onChange = sinon.spy();
    render(
      <TagPicker
        defaultOpen
        data={data}
        onChange={onChange}
        defaultValue={['Kariane', 'Eugenia']}
      />
    );
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Backspace' });

    expect(onChange).to.have.been.calledWith(['Kariane']);
  });

  it('Should call `onChange` by removeTag ', () => {
    const onChange = sinon.spy();
    render(
      <TagPicker
        defaultOpen
        data={data}
        onChange={onChange}
        defaultValue={['Kariane', 'Eugenia']}
      />
    );
    fireEvent.click(screen.getAllByRole('button', { name: /Remove/i })[0]);

    expect(onChange).to.have.been.calledWith(['Eugenia']);
  });

  it('Should render a button by toggleAs={Button}', () => {
    render(<TagPicker open data={data} toggleAs={Button} />);

    expect(screen.getByRole('combobox')).to.have.class('rs-btn');
  });

  it('Should call `tagProps.onClose` ', () => {
    const onClose = sinon.spy();
    render(
      <TagPicker
        defaultOpen
        data={data}
        defaultValue={['Kariane', 'Eugenia']}
        tagProps={{
          onClose
        }}
      />
    );
    fireEvent.click(screen.getAllByRole('button', { name: /Remove/i })[0]);

    expect(onClose).to.have.been.calledOnce;
  });

  it('Should not render tag close icon', () => {
    render(
      <TagPicker
        data={data}
        defaultValue={['Kariane']}
        tagProps={{
          closable: false
        }}
      />
    );

    expect(screen.queryAllByRole('button', { name: /Remove/i })).to.have.lengthOf(0);
  });

  it('Should render a span tag', () => {
    render(
      <TagPicker
        data={data}
        defaultValue={['Kariane']}
        tagProps={{
          as: 'span'
        }}
      />
    );

    expect(screen.getByRole('listbox')).to.be.contain('.rs-tag');
  });

  it('Should not be call renderValue()', () => {
    render(<TagPicker data={[]} renderValue={() => 'value'} />);
    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should call renderValue', () => {
    const { rerender } = render(<TagPicker data={[]} value={['Test']} renderValue={() => '1'} />);

    expect(screen.getByRole('listbox')).to.have.text('1');

    expect(screen.getByRole('combobox').parentNode).to.have.class('rs-picker-has-value');

    rerender(<TagPicker data={[]} value={['Test']} renderValue={() => null} />);

    expect(screen.getByTestId('picker-describe')).to.have.class('rs-picker-toggle-placeholder');
    expect(screen.getByTestId('picker-describe')).to.have.text('Select');
    expect(screen.getByTestId('picker-describe')).to.not.have.class('rs-picker-has-value');

    rerender(<TagPicker data={[]} value={['Test']} renderValue={() => undefined} />);

    expect(screen.getByTestId('picker-describe')).to.have.class('rs-picker-toggle-placeholder');
    expect(screen.getByTestId('picker-describe')).to.have.text('Select');
    expect(screen.getByTestId('picker-describe')).to.not.have.class('rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    render(<TagPicker data={data} value={[2]} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(screen.getByTestId('picker-describe')).to.have.text('Select');
    expect(screen.getByTestId('picker-describe')).to.not.have.class('rs-picker-has-value');
  });

  it('Should call `onCreate` with correct value', async () => {
    const onCreate = sinon.spy();

    const inputRef = React.createRef<PickerHandle>();

    render(<TagPicker ref={inputRef} data={[]} onCreate={onCreate} creatable />);

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreate).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Space" ', () => {
    const onCreate = sinon.spy();

    const inputRef = React.createRef<PickerHandle>();

    render(<TagPicker ref={inputRef} data={[]} onCreate={onCreate} creatable trigger="Space" />);

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: ' ' });

    expect(onCreate).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Comma" ', () => {
    const onCreate = sinon.spy();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagPicker ref={inputRef} data={[]} onCreate={onCreate} creatable trigger="Comma" />);

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: ',' });

    expect(onCreate).to.have.been.calledWith(['abc']);
  });

  it('Should be plaintext', () => {
    const { rerender } = render(<TagPicker plaintext data={data} value={['Eugenia']} />);

    expect(screen.getByRole('text')).to.have.text('Eugenia');

    rerender(<TagPicker plaintext data={data} />);
    expect(screen.getByRole('text')).to.have.text('Not selected');

    rerender(<TagPicker plaintext data={data} placeholder="-" />);
    expect(screen.getByRole('text')).to.have.text('-');

    rerender(<TagPicker plaintext data={data} placeholder="-" value={['Eugenia']} />);

    expect(screen.getByRole('text')).to.have.text('Eugenia');
  });

  it('Should call `onTagRemove` callback', () => {
    const onTagRemove = sinon.spy();
    render(<TagPicker data={data} defaultValue={['Kariane']} onTagRemove={onTagRemove} />);
    fireEvent.click(screen.getAllByRole('button', { name: /Remove/i })[0]);

    expect(onTagRemove).to.have.been.calledOnce;
    expect(onTagRemove).to.have.been.calledWith('Kariane');
  });

  describe('Accessibility', () => {
    it('Should have a role combobox', () => {
      render(<TagPicker data={data} />);

      expect(screen.getByRole('combobox')).to.exist;
    });

    it('Should have a role listbox', () => {
      render(<TagPicker data={data} defaultOpen />);

      expect(screen.getByRole('listbox')).to.exist;
    });

    it('Should have a role option', () => {
      render(<TagPicker data={data} defaultOpen />);

      expect(screen.getAllByRole('option')).to.have.lengthOf(3);
    });

    it('Should set a tabindex for input', () => {
      render(<TagPicker data={[]} tabIndex={10} />);

      expect(screen.getByRole('combobox')).to.have.attribute('tabindex', '10');
    });

    it('Should be the focus switch option via keyboard', () => {
      render(<TagPicker data={data} />);
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

      expect(document.activeElement).to.have.text('Eugenia');
    });
  });
});
