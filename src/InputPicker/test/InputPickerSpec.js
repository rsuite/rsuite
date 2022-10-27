import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getDOMNode, getInstance } from '@test/testUtils';

import InputPicker from '../InputPicker';
import Button from '../../Button';

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

describe('InputPicker', () => {
  it('Should clean selected default value', () => {
    const instance = getDOMNode(<InputPicker defaultOpen data={data} defaultValue={'Eugenia'} />);

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<InputPicker data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<InputPicker defaultOpen data={data} value={'Eugenia'} />);

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));

    expect(instance.querySelector('.rs-picker-toggle-value')).to.text('Eugenia');
  });

  it('Should output a dropdown', () => {
    const instance = getDOMNode(<InputPicker data={[]} />);

    expect(instance).to.have.class('rs-picker-input');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<InputPicker data={[]} disabled />);

    expect(instance).to.have.class('rs-picker-disabled');
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
    const input1Ref = React.createRef();
    const input2Ref = React.createRef();

    render(
      <div>
        <InputPicker data={[]} ref={input1Ref} />
        <InputPicker data={[]} ref={input2Ref} readOnly />
      </div>
    );

    fireEvent.focus(input1Ref.current.root.querySelector('.rs-picker-search-input'));
    fireEvent.focus(input2Ref.current.root.querySelector('.rs-picker-search-input'));

    expect(input1Ref.current.overlay).to.exist;
    expect(input2Ref.current.root.querySelector('input[readonly]')).to.exist;
    expect(() => {
      input2Ref.current.overlay;
    }).to.throw('The overlay is not found. Please confirm whether the picker is open.');
  });

  it('Should output a button', () => {
    const instance = getDOMNode(<InputPicker data={[]} toggleAs="button" />);

    expect(instance.querySelector('button')).to.exist;
  });

  it('Should be block', () => {
    const instance = getDOMNode(<InputPicker data={[]} block />);

    expect(instance).to.have.class('rs-picker-block');
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    const instance = getInstance(<InputPicker defaultOpen data={data} value={value} />);

    expect(instance.root.querySelector('.rs-picker-toggle-value')).to.text('Louisa');
    expect(instance.overlay.querySelector('.rs-picker-select-menu-item-active')).to.text('Louisa');
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(<InputPicker defaultOpen data={data} defaultValue={value} />);

    expect(instance.root.querySelector('.rs-picker-toggle-value')).to.text('Louisa');
    expect(instance.overlay.querySelector('.rs-picker-select-menu-item-active')).to.text('Louisa');
  });

  it('Should render a group', () => {
    const instance = getInstance(<InputPicker defaultOpen groupBy="role" data={data} />);

    assert.ok(instance.overlay.querySelector('.rs-picker-menu-group'));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<InputPicker data={[]} className="custom" placeholder="test" />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('test');
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <InputPicker placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );
    const menuContainer = instance.overlay.querySelector('.rs-picker-select-menu-item-active');

    expect(menuContainer).to.text('');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <InputPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={'bar'}
        renderValue={(value, item) => `${item.label}-${value}`}
      />
    );

    expect(instance.querySelector('.rs-picker-toggle-value')).to.text('foo-bar');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <InputPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={1}
      />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <InputPicker renderValue={v => [v, placeholder]} data={[]} value={2} />
    );

    expect(instance.querySelector('.rs-picker-toggle-value')).to.text(`1${placeholder}`);
    expect(instance2.querySelector('.rs-picker-toggle-value')).to.text(`2${placeholder}`);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<InputPicker data={[]} renderValue={() => 'value'} />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<InputPicker data={[]} value={2} placeholder={'test'} />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('test');
  });

  it('Should call `onChange` callback with correct value', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(<InputPicker defaultOpen onChange={onChangeSpy} data={data} />);

    fireEvent.click(instance.overlay.querySelector('.rs-picker-select-menu-item'));

    expect(onChangeSpy).to.calledOnceWith('Eugenia');
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    const instance = getDOMNode(
      <InputPicker data={data} defaultValue={'Eugenia'} onClean={onCleanSpy} />
    );
    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));

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

    expect(onSelectSpy).to.calledOnceWith('Louisa');
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<InputPicker data={data} defaultValue={'Louisa'} />);

    expect(instance.querySelector('.rs-picker-toggle-clean')).to.exist;
  });

  it('Should call `onSearch` callback with correct search keyword', () => {
    const onSearchSpy = sinon.spy();
    const instance = getDOMNode(<InputPicker data={[]} defaultOpen onSearch={onSearchSpy} />);

    const input = instance.querySelector('.rs-picker-search-input');

    fireEvent.change(input, { target: { value: 'a' } });

    expect(onSearchSpy).to.calledOnce;
    expect(onSearchSpy).to.calledWith('a');
  });

  it('Should focus item by key=ArrowDown ', () => {
    const instance = getInstance(<InputPicker defaultOpen data={data} defaultValue={'Eugenia'} />);
    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

    expect(instance.overlay.querySelector('.rs-picker-select-menu-item-focus')).to.text('Kariane');
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(<InputPicker defaultOpen data={data} defaultValue={'Kariane'} />);
    fireEvent.keyDown(instance.target, { key: 'ArrowUp' });

    expect(instance.overlay.querySelector('.rs-picker-select-menu-item-focus')).to.text('Eugenia');
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
    const instance = getDOMNode(<InputPicker data={[]} onBlur={onBlurSpy} />);
    fireEvent.blur(instance.querySelector('.rs-picker-search-input'));

    expect(onBlurSpy).to.calledOnce;
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    const instance = getDOMNode(<InputPicker data={[]} onFocus={onFocusSpy} />);
    fireEvent.focus(instance.querySelector('.rs-picker-search-input'));

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
    const instance = getDOMNode(<InputPicker open data={data} toggleAs={Button} />);

    expect(instance.querySelector('.rs-btn')).to.exist;
  });

  it('Should render the specified menu content by `searchBy`', () => {
    const instance = getInstance(
      <InputPicker defaultOpen data={data} searchBy={(a, b, c) => c.value === 'Louisa'} />
    );
    const list = instance.overlay.querySelectorAll('.rs-picker-select-menu-item');

    expect(list).to.be.lengthOf(1);
    expect(list[0]).to.text('Louisa');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<InputPicker data={[]} value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<InputPicker data={[]} value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(
      <InputPicker data={[]} value="Test" renderValue={() => undefined} />
    );

    expect(instance2.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
    expect(instance3.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');

    expect(instance1).to.have.class('rs-picker-has-value');
    expect(instance2).to.not.have.class('rs-picker-has-value');
    expect(instance3).to.not.have.class('rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const instance = getDOMNode(<InputPicker data={data} value={2} />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
    expect(instance).to.not.have.class('rs-picker-has-value');
  });

  it('Should set a tabindex for input', () => {
    const instance = getDOMNode(<InputPicker data={[]} tabIndex={10} />);

    expect(instance.querySelector('.rs-picker-search-input')).to.have.attribute('tabindex', '10');
  });

  it('Should call `onCreate` callback with correct value', () => {
    const inputRef = React.createRef();

    const onCreateSpy = sinon.spy();
    render(<InputPicker ref={inputRef} defaultOpen data={data} onCreate={onCreateSpy} creatable />);

    fireEvent.focus(inputRef.current.root);

    const input = inputRef.current.root.querySelector('.rs-picker-search-input');

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreateSpy).to.calledOnce;
    expect(onCreateSpy).to.calledWith('abc');
  });

  describe('ref testing', () => {
    it('Should get public objects and methods', () => {
      const instance = getInstance(<InputPicker data={data} open virtualized />);

      expect(instance.root).to.exist;
      expect(instance.target).to.exist;
      expect(instance.updatePosition).to.instanceOf(Function);
      expect(instance.open).to.instanceOf(Function);
      expect(instance.close).to.instanceOf(Function);

      expect(instance.overlay).to.exist;
      expect(instance.list).to.exist;
    });
  });
});
