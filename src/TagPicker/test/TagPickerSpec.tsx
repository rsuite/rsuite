import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import {
  getDOMNode,
  getInstance,
  testStandardProps,
  testControlledUnControlled,
  testFormControl,
  testPickers
} from '@test/utils';
import TagPicker from '../index';
import Button from '../../Button';
import { PickerHandle } from '../../Picker';

const data = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    role: 'Master'
  },
  {
    label: <span>Kariane</span>,
    value: 'Kariane',
    role: 'Master'
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master'
  }
];

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
    render(<TagPicker defaultOpen data={data} value={['Eugenia']} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByText('Eugenia', { selector: '.rs-tag-text' })).to.exist;
  });

  it('Should output a TagPicker', () => {
    const instance = getDOMNode(<TagPicker data={[]} />);

    expect(instance).to.have.class('rs-picker-tag');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<TagPicker disabled data={data} value={['Eugenia']} />);

    expect(instance).to.have.class('rs-picker-disabled');
    expect(screen.queryByRole('button', { name: /clear/i })).not.to.exist;
  });

  it('Should output a button', () => {
    render(<TagPicker data={[]} toggleAs="button" />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<TagPicker data={[]} block />);

    expect(instance).to.have.class('rs-picker-block');
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    render(<TagPicker defaultOpen data={data} value={[value]} />);

    expect(screen.getByText(value, { selector: '.rs-tag-text' })).to.exist;
    expect(screen.getByRole('option', { name: value, selected: true })).to.exist;
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    render(<TagPicker defaultOpen data={data} defaultValue={[value]} />);

    expect(screen.getByText(value, { selector: '.rs-tag-text' })).to.exist;
    expect(screen.getByRole('option', { name: value, selected: true })).to.exist;
    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
  });

  it('Should render a group', () => {
    const instance = getInstance(<TagPicker defaultOpen groupBy="role" data={data} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.overlay.querySelector('.rs-picker-menu-group')).to.exist;
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
    const instance = getDOMNode(
      <TagPicker renderValue={v => [v, 'value']} data={[{ value: 1, label: '1' }]} value={[1]} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.querySelector('.rs-picker-tag-wrapper')).to.have.text('1value');

    // Invalid value
    const instance2 = getDOMNode(
      <TagPicker renderValue={v => [v, 'value']} data={[]} value={[2]} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance2.querySelector('.rs-picker-tag-wrapper')).to.have.text('2value');

    const instance3 = getDOMNode(
      <TagPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={['bar']}
        renderValue={(_value, items) => `${items[0].label}-${items[0].value}`}
      />
    );

    // TODO Use `aria-owns` to bind .rs-picker-tag-wrapper with combobox
    // eslint-disable-next-line testing-library/no-node-access
    expect(instance3.querySelector('.rs-picker-tag-wrapper')).to.have.text('foo-bar');
  });

  it('Should renderMenuItemCheckbox render correct', () => {
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
    const instance = getDOMNode(
      <TagPicker defaultOpen data={data} onSelect={onSelect} defaultValue={['Kariane']} />
    );

    fireEvent.keyDown(instance, { key: 'ArrowDown' });
    fireEvent.keyDown(instance, { key: 'Enter' });

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
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Eugenia']} />);
    fireEvent.keyDown(instance.overlay, { key: 'ArrowDown' });

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.overlay.querySelector('.rs-check-item-focus')).to.have.text('Kariane');
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Kariane']} />);
    fireEvent.keyDown(instance.overlay, { key: 'ArrowUp' });

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.overlay.querySelector('.rs-check-item-focus')).to.have.text('Eugenia');
  });

  it('Should call `onChange` by key=Enter ', () => {
    const onChange = sinon.spy();
    const instance = getDOMNode(
      <TagPicker defaultOpen data={data} onChange={onChange} defaultValue={['Kariane']} />
    );

    fireEvent.keyDown(instance, { key: 'Enter' });

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
    const instance = getDOMNode(
      <TagPicker
        data={data}
        defaultValue={['Kariane']}
        tagProps={{
          as: 'span'
        }}
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.querySelector('.rs-tag')?.tagName).to.equal('SPAN');
  });

  it('Should not be call renderValue()', () => {
    render(<TagPicker data={[]} renderValue={() => 'value'} />);
    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<TagPicker data={[]} value={['Test']} renderValue={() => '1'} />);
    const instance2 = getDOMNode(<TagPicker data={[]} value={['Test']} renderValue={() => null} />);
    const instance3 = getDOMNode(
      <TagPicker data={[]} value={['Test']} renderValue={() => undefined} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance1.querySelector('.rs-picker-tag-wrapper')).to.have.text('1');
    // eslint-disable-next-line testing-library/no-node-access
    expect(instance2.querySelector('.rs-picker-toggle-placeholder')).to.have.text('Select');
    // eslint-disable-next-line testing-library/no-node-access
    expect(instance3.querySelector('.rs-picker-toggle-placeholder')).to.have.text('Select');

    expect(instance1).to.have.class('rs-picker-has-value');
    expect(instance2).not.to.have.class('rs-picker-has-value');
    expect(instance3).not.to.have.class('rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const instance = getDOMNode(<TagPicker data={data} value={[2]} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(instance).not.to.have.class('rs-picker-has-value');
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
    const instance1 = getInstance(<TagPicker plaintext data={data} value={['Eugenia']} />);
    const instance2 = getInstance(<TagPicker plaintext data={data} />);
    const instance3 = getInstance(<TagPicker plaintext data={data} placeholder="-" />);
    const instance4 = getInstance(
      <TagPicker plaintext data={data} placeholder="-" value={['Eugenia']} />
    );

    expect(instance1.target).to.have.text('Eugenia');
    expect(instance2.target).to.have.text('Not selected');
    expect(instance3.target).to.have.text('-');
    expect(instance4.target).to.have.text('Eugenia');

    expect(instance1.target).to.style('margin-left', '-6px');
    expect(instance2.target).to.not.have.style('margin-left', '');
    expect(instance3.target).to.not.have.style('margin-left', '');
    expect(instance4.target).to.style('margin-left', '-6px');
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

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.activeElement).to.have.text('Eugenia');
    });
  });
});
