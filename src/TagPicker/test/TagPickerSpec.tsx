import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode, getInstance } from '@test/testUtils';

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
    const Title = 'Title';
    const { container } = render(<TagPicker data={[]}>{Title}</TagPicker>);

    expect(container.firstChild).to.have.class('rs-picker-tag');
  });

  it('Should be disabled', () => {
    const { container } = render(<TagPicker disabled data={data} value={['Eugenia']} />);

    expect(container.firstChild).to.have.class('rs-picker-disabled');
    expect(screen.queryByRole('button', { name: /clear/i })).not.to.exist;
  });

  it('Should output a button', () => {
    render(<TagPicker data={[]} toggleAs="button" />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<TagPicker data={[]} block />);
    assert.ok(instance.className.match(/\bblock\b/));
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
    assert.ok(instance.overlay.querySelector('.rs-picker-menu-group'));
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
      // TODO Use `aria-owns` to bind .rs-picker-tag-wrapper with combobox
      // eslint-disable-next-line testing-library/no-node-access
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
      // eslint-disable-next-line testing-library/no-node-access
      (instance.querySelector('.rs-picker-tag-wrapper') as HTMLElement).textContent,
      `1${placeholder}`
    );
    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access
      (instance2.querySelector('.rs-picker-tag-wrapper') as HTMLElement).textContent,
      `2${placeholder}`
    );
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
    assert.equal(instance.overlay.querySelector('.rs-check-item-focus').textContent, 'Kariane');
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(<TagPicker defaultOpen data={data} defaultValue={['Kariane']} />);
    fireEvent.keyDown(instance.overlay, { key: 'ArrowUp' });
    // eslint-disable-next-line testing-library/no-node-access
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
    // TODO Change accessible name to "Remove"
    fireEvent.click(screen.getAllByRole('button', { name: /close/i })[0]);

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
    fireEvent.click(screen.getAllByRole('button', { name: /close/i })[0]);

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

    expect(screen.queryAllByRole('button', { name: /close/i })).to.have.lengthOf(0);
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
    assert.equal((instance.querySelector('.rs-tag') as HTMLElement).tagName, 'SPAN');
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

    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access
      (instance1.querySelector('.rs-picker-tag-wrapper') as HTMLElement).textContent,
      '1'
    );
    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access
      (instance2.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'Select'
    );
    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access
      (instance3.querySelector('.rs-picker-toggle-placeholder') as HTMLElement).textContent,
      'Select'
    );

    assert.include(instance1.className, 'rs-picker-has-value');
    assert.notInclude(instance2.className, 'rs-picker-has-value');
    assert.notInclude(instance3.className, 'rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const { container } = render(<TagPicker data={data} value={[2]} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(container.firstChild).not.to.have.class('rs-picker-has-value');
  });

  it('Should set a tabindex for input', () => {
    render(<TagPicker data={[]} tabIndex={10} />);

    expect(screen.getByRole('textbox')).to.have.attr('tabIndex', '10');
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
