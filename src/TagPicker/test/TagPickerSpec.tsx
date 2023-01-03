import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode, getInstance, render } from '@test/testUtils';

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
  it('Should clean selected default value', () => {
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Eugenia']} />);

    fireEvent.click(instance.root.querySelector('.rs-picker-toggle-clean'));

    expect(instance.root.querySelector('.rs-picker-toggle-placeholder').textContent).to.equal(
      'Select'
    );
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<TagPicker defaultOpen data={data} value={['Eugenia']} />);
    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean') as HTMLElement);
    expect(instance.querySelectorAll('.rs-tag').length).to.equal(1);
    expect((instance.querySelector('.rs-tag-text') as HTMLElement).textContent).to.equal('Eugenia');
  });

  it('Should output a TagPicker', () => {
    const Title = 'Title';
    const instance = getDOMNode(<TagPicker data={[]}>{Title}</TagPicker>);
    assert.include(instance.className, 'rs-picker-tag');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<TagPicker disabled data={data} value={['Eugenia']} />);

    assert.ok(instance.className.match(/\bdisabled\b/));
    assert.ok(!instance.querySelector('.rs-tag-icon-close'));
  });

  it('Should output a button', () => {
    const instance = getInstance(<TagPicker data={[]} toggleAs="button" />);
    assert.ok(instance.root.querySelector('button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<TagPicker data={[]} block />);
    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    const instance = getInstance(<TagPicker defaultOpen data={data} value={[value]} />);
    assert.equal(instance.root.querySelector('.rs-tag-text').textContent, value);
    assert.equal(instance.overlay.querySelector('.rs-checkbox-checked').textContent, value);
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={[value]} />);

    assert.equal(instance.root.querySelector('.rs-tag-text').textContent, value);
    assert.equal(instance.overlay.querySelector('.rs-checkbox-checked').textContent, value);
    assert.ok(instance.root.querySelector('.rs-tag-icon-close'));
  });

  it('Should render a group', () => {
    const instance = getInstance(<TagPicker defaultOpen groupBy="role" data={data} />);
    assert.ok(instance.overlay.querySelector('.rs-picker-menu-group'));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<TagPicker data={[]} className="custom" placeholder="test" />);

    assert.equal(
      (instance.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'test'
    );
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(
      <TagPicker
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={['4']}
      />
    );
    assert.equal(
      (instance.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'test'
    );
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <TagPicker placeholder="test" data={[{ label: '', value: '1' }]} value={['1']} defaultOpen />
    );
    const checkbox = instance.overlay.querySelector('.rs-checkbox-checked');

    assert.equal(checkbox.textContent, '');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <TagPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={['bar']}
        renderValue={(_value, items) => `${items[0].label}-${items[0].value}`}
      />
    );

    assert.equal(
      (instance.querySelector('.rs-picker-tag-wrapper') as HTMLElement).textContent,
      'foo-bar'
    );
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <TagPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={[1]}
      />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <TagPicker renderValue={v => [v, placeholder]} data={[]} value={[2]} />
    );

    assert.equal(
      (instance.querySelector('.rs-picker-tag-wrapper') as HTMLElement).textContent,
      `1${placeholder}`
    );
    assert.equal(
      (instance2.querySelector('.rs-picker-tag-wrapper') as HTMLElement).textContent,
      `2${placeholder}`
    );
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<TagPicker data={[]} value={[2]} placeholder={'test'} />);
    assert.equal(
      (instance.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'test'
    );
  });

  it('Should call `onChange` callback', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(
      <TagPicker defaultOpen onChange={onChangeSpy} data={[{ label: '1', value: '1' }]} />
    );

    fireEvent.click(instance.overlay.querySelector('input'));

    expect(onChangeSpy).to.calledOnce;
  });

  it('Should call `onClean` callback', () => {
    const onClean = sinon.spy();
    const instance = getDOMNode(
      <TagPicker data={data} defaultValue={['Kariane']} onClean={onClean} />
    );
    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean') as HTMLElement);

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
    const instance = getInstance(<TagPicker data={data} defaultValue={['Louisa']} />);
    assert.ok(instance.root.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onSearch` callback with correct search keyword', () => {
    const onSearch = sinon.spy();
    const instance = getDOMNode(<TagPicker data={[]} defaultOpen onSearch={onSearch} />);
    const input = instance.querySelector('.rs-picker-search-input input') as HTMLElement;

    fireEvent.change(input, { target: { value: 'a' } });

    expect(onSearch).to.have.been.calledWith('a');
  });

  it('Should focus item by key=ArrowDown ', () => {
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Eugenia']} />);
    fireEvent.keyDown(instance.overlay, { key: 'ArrowDown' });
    assert.equal(instance.overlay.querySelector('.rs-check-item-focus').textContent, 'Kariane');
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Kariane']} />);
    fireEvent.keyDown(instance.overlay, { key: 'ArrowUp' });
    assert.equal(instance.overlay.querySelector('.rs-check-item-focus').textContent, 'Eugenia');
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
    const instance = getDOMNode(
      <TagPicker
        defaultOpen
        data={data}
        onChange={onChange}
        defaultValue={['Kariane', 'Eugenia']}
      />
    );
    assert.equal(instance.querySelectorAll('.rs-tag').length, 2);
    fireEvent.keyDown(instance.querySelector('input') as HTMLElement, { key: 'Backspace' });

    expect(onChange).to.have.been.calledWith(['Kariane']);
  });

  it('Should call `onChange` by removeTag ', () => {
    const onChange = sinon.spy();
    const instance = getDOMNode(
      <TagPicker
        defaultOpen
        data={data}
        onChange={onChange}
        defaultValue={['Kariane', 'Eugenia']}
      />
    );
    assert.equal(instance.querySelectorAll('.rs-tag').length, 2);
    fireEvent.click(instance.querySelector('.rs-tag-icon-close') as HTMLElement);

    expect(onChange).to.have.been.calledWith(['Eugenia']);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TagPicker data={[]} className="custom" defaultOpen />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TagPicker data={[]} style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TagPicker data={[]} classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getDOMNode(<TagPicker open data={data} toggleAs={Button} />);
    assert.ok(instance.querySelector('.rs-btn'));
  });

  it('Should call `tagProps.onClose` ', () => {
    const onClose = sinon.spy();
    const instance = getDOMNode(
      <TagPicker
        defaultOpen
        data={data}
        defaultValue={['Kariane', 'Eugenia']}
        tagProps={{
          onClose
        }}
      />
    );
    assert.equal(instance.querySelectorAll('.rs-tag').length, 2);
    fireEvent.click(instance.querySelector('.rs-tag-icon-close') as HTMLElement);

    expect(onClose).to.have.been.calledOnce;
  });

  it('Should not render tag close icon', () => {
    const instance = getDOMNode(
      <TagPicker
        data={data}
        defaultValue={['Kariane']}
        tagProps={{
          closable: false
        }}
      />
    );

    assert.ok(!instance.querySelector('.rs-tag-icon-close'));
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
    assert.equal((instance.querySelector('.rs-tag') as HTMLElement).tagName, 'SPAN');
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<TagPicker data={[]} renderValue={() => 'value'} />);
    assert.equal(
      (instance.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'Select'
    );
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<TagPicker data={[]} value={['Test']} renderValue={() => '1'} />);
    const instance2 = getDOMNode(<TagPicker data={[]} value={['Test']} renderValue={() => null} />);
    const instance3 = getDOMNode(
      <TagPicker data={[]} value={['Test']} renderValue={() => undefined} />
    );

    assert.equal(
      (instance1.querySelector('.rs-picker-tag-wrapper') as HTMLElement).textContent,
      '1'
    );
    assert.equal(
      (instance2.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'Select'
    );
    assert.equal(
      (instance3.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'Select'
    );

    assert.include(instance1.className, 'rs-picker-has-value');
    assert.notInclude(instance2.className, 'rs-picker-has-value');
    assert.notInclude(instance3.className, 'rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const instance = getDOMNode(<TagPicker data={data} value={[2]} />);
    assert.equal(
      (instance.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'Select'
    );
    assert.notInclude(instance.className, 'rs-picker-has-value');
  });

  it('Should set a tabindex for input', () => {
    const instance = getDOMNode(<TagPicker data={[]} tabIndex={10} />);
    assert.equal(
      (instance.querySelector('input[type="text"]') as HTMLElement).getAttribute('tabindex'),
      '10'
    );
  });

  it('Should call `onCreate` with correct value', () => {
    const onCreate = sinon.spy();

    const inputRef = React.createRef<PickerHandle>();

    act(() => {
      render(<TagPicker ref={inputRef} data={[]} onCreate={onCreate} creatable />);
    });

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = picker.querySelector('.rs-picker-search input') as HTMLElement;

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreate).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Space" ', () => {
    const onCreate = sinon.spy();

    const inputRef = React.createRef<PickerHandle>();

    act(() => {
      render(<TagPicker ref={inputRef} data={[]} onCreate={onCreate} creatable trigger="Space" />);
    });

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = picker.querySelector('.rs-picker-search input') as HTMLElement;

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: ' ' });

    expect(onCreate).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Comma" ', () => {
    const onCreate = sinon.spy();

    const inputRef = React.createRef<PickerHandle>();

    act(() => {
      render(<TagPicker ref={inputRef} data={[]} onCreate={onCreate} creatable trigger="Comma" />);
    });

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = picker.querySelector('.rs-picker-search input') as HTMLElement;

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

    assert.equal(instance1.target.textContent, 'Eugenia');
    assert.equal(instance2.target.textContent, 'Not selected');
    assert.equal(instance3.target.textContent, '-');
    assert.equal(instance4.target.textContent, 'Eugenia');

    assert.equal(instance1.target.style.marginLeft, '-6px');
    assert.isEmpty(instance2.target.style.marginLeft);
    assert.isEmpty(instance3.target.style.marginLeft);
    assert.equal(instance4.target.style.marginLeft, '-6px');
  });
});
