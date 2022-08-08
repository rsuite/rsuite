import React from 'react';
import AutoComplete from '../AutoComplete';
import { getDOMNode, getInstance } from '@test/testUtils';
import { render, fireEvent } from '@testing-library/react';

describe('AutoComplete', () => {
  it('Should render input', () => {
    const instance = getDOMNode(<AutoComplete />);

    expect(instance.querySelector('input')).to.exist;
  });

  it('Should render 2 `option` when set `open` and `defaultValue`', () => {
    const instance = getInstance(<AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" />);
    expect(instance.overlay.querySelectorAll('[role="option"]')).to.length(2);
  });

  it('Should be a `top-end` for placement', () => {
    const instance = getInstance(<AutoComplete open placement="topEnd" />);
    expect(instance.overlay.className).to.contain('placement-top-end');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<AutoComplete disabled />);
    expect(instance).to.have.class('rs-auto-complete-disabled');
  });

  it('Should call onSelect callback with correct args', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" onSelect={onSelectSpy} />
    );
    fireEvent.click(instance.overlay.querySelectorAll('.rs-auto-complete-item')[0]);

    expect(onSelectSpy).to.be.calledOnce;
    expect(onSelectSpy).to.be.calledWith('a', { value: 'a', label: 'a' });
  });

  it('Should call onChange callback', () => {
    const onChangeSpy = sinon.spy();

    const instance = getDOMNode(<AutoComplete onChange={onChangeSpy} />);
    const input = instance.querySelector('input');

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onChangeSpy).to.be.calledOnce;
    expect(onChangeSpy).to.be.calledWith('a');
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    const instance = getDOMNode(<AutoComplete onFocus={onFocusSpy} />);
    const input = instance.querySelector('input');
    fireEvent.focus(input);
    expect(onFocusSpy).to.be.calledOnce;
  });

  it('Should call onBlur callback', () => {
    const onBlurSpy = sinon.spy();

    const instance = getDOMNode(<AutoComplete onBlur={onBlurSpy} />);
    const input = instance.querySelector('input');
    fireEvent.blur(input);
    expect(onBlurSpy).to.be.calledOnce;
  });

  it('Should call onKeyDown callback on input', () => {
    const onKeyDownSpy = sinon.spy();

    const instance = getDOMNode(
      <AutoComplete onKeyDown={onKeyDownSpy} data={['a', 'b', 'ab']} open />
    );
    const input = instance.querySelector('input');
    fireEvent.keyDown(input);
    expect(onKeyDownSpy).to.be.calledOnce;
  });

  it('Should call onKeyDown callback on menu', () => {
    const onKeyDownSpy = sinon.spy();
    const instance = getInstance(
      <AutoComplete defaultValue="a" onKeyDown={onKeyDownSpy} data={['a', 'b']} open />
    );
    fireEvent.keyDown(instance.overlay);

    expect(onKeyDownSpy).to.be.calledOnce;
  });

  it('Should call onMenuFocus callback when key=ArrowDown', () => {
    const onMenuFocusSpy = sinon.spy();

    const instance = getInstance(
      <AutoComplete defaultValue="a" onMenuFocus={onMenuFocusSpy} data={['a', 'ab', 'ac']} open />
    );
    fireEvent.keyDown(instance.overlay, {
      key: 'ArrowDown'
    });

    expect(onMenuFocusSpy).to.be.calledOnce;
  });

  it('Should call onMenuFocus callback when key=ArrowUp', () => {
    const onMenuFocusSpy = sinon.spy();
    const instance = getInstance(
      <AutoComplete defaultValue="a" onMenuFocus={onMenuFocusSpy} data={['a', 'ab', 'ac']} open />
    );
    fireEvent.keyDown(instance.overlay, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.overlay, { key: 'ArrowUp' });

    expect(onMenuFocusSpy).to.be.calledTwice;
  });

  it('Should call onChange callback when key=Enter', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(
      <AutoComplete defaultValue="a" onChange={onChangeSpy} data={['a', 'ab', 'ac']} open />
    );

    fireEvent.keyDown(instance.overlay, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.overlay, { key: 'Enter' });
    expect(onChangeSpy).to.be.calledOnce;
  });

  it('Should call onSelect callback with selected item when key=Enter', () => {
    const onSelectSpy = sinon.spy();

    const instance = getInstance(
      <AutoComplete defaultValue="a" onSelect={onSelectSpy} data={['a', 'ab', 'ac']} open />
    );
    fireEvent.keyDown(instance.overlay, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.overlay, { key: 'Enter' });

    expect(onSelectSpy).to.be.calledOnce;
    expect(onSelectSpy).to.be.calledWith('ab', { value: 'ab', label: 'ab' });
  });

  it('Shouldn‘t call onSelect nor onChange callback on Enter pressed if selectOnEnter=false', () => {
    const onSelectSpy = sinon.spy();

    const instance = getInstance(
      <AutoComplete
        defaultValue="a"
        onSelect={onSelectSpy}
        onChange={onSelectSpy}
        selectOnEnter={false}
        data={['a', 'ab', 'ac']}
        open
      />
    );
    fireEvent.keyDown(instance.overlay, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.overlay, { key: 'ArrowUp' });

    expect(onSelectSpy).to.be.not.called;
  });

  it('Should call onClose callback when key=Escape', () => {
    const onCloseSpy = sinon.spy();
    const instance = getInstance(
      <AutoComplete defaultValue="a" onClose={onCloseSpy} data={['a', 'ab', 'ac']} open />
    );
    fireEvent.keyDown(instance.overlay, { key: 'Escape' });
    expect(onCloseSpy).to.be.calledOnce;
  });

  it('Should call onBlur callback', () => {
    const onBlurSpy = sinon.spy();
    const instance = getDOMNode(<AutoComplete data={['a', 'b', 'ab']} onBlur={onBlurSpy} />);
    const input = instance.querySelector('input');
    fireEvent.blur(input);
    expect(onBlurSpy).to.be.calledOnce;
  });

  it('Should render a icon in li', () => {
    const instance = getInstance(
      <AutoComplete
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        renderMenuItem={() => <i className="icon" />}
      />
    );

    expect(instance.overlay.querySelectorAll('.rs-auto-complete-item .icon')).to.length(2);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<AutoComplete className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a menuClassName', () => {
    const instance = getInstance(
      <AutoComplete menuClassName="custom" data={['a', 'b', 'ab']} open />
    );

    expect(instance.overlay.querySelector('[role="listbox"]').className).to.include('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<AutoComplete style={{ fontSize }} />);
    expect(instance.style.fontSize).to.equal(fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<AutoComplete classPrefix="custom-prefix" />);
    expect(instance.className).to.include('custom-prefix');
  });

  it('Should have a custom filter function', () => {
    const instance1 = getInstance(
      <AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" filterBy={() => true} />
    );

    expect(instance1.overlay.querySelectorAll('[role="option"]')).to.length(3);

    const instance2 = getInstance(
      <AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" filterBy={() => false} />
    );

    expect(instance2.overlay.querySelectorAll('[role="option"]')).to.length(0);

    const instance3 = getInstance(
      <AutoComplete
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        // filterBy value only, so all item will be displayed
        filterBy={value => value === 'a'}
      />
    );

    expect(instance3.overlay.querySelectorAll('[role="option"]')).to.length(3);

    const instance4 = getInstance(
      <AutoComplete
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        filterBy={(_, item) => item.label && item.label.length >= 2}
      />
    );

    expect(instance4.overlay.querySelectorAll('[role="option"]')).to.length(1);
  });

  it('Should set minimum width for listbox', () => {
    const { getByRole } = render(
      <AutoComplete
        data={['item1', 'item2', 'item3']}
        defaultValue="item"
        open
        menuAutoWidth
        style={{ width: 100 }}
      />
    );

    const listbox = getByRole('listbox');

    expect(listbox.parentNode.style.minWidth).to.equal('100px');
  });
});
