import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import { globalKey, getDOMNode, getInstance } from '@test/testUtils';

import Dropdown from '../SelectPicker';
import Button from '../../Button';

const namespace = `${globalKey}-picker`;
const classPrefix = `${namespace}-select`;
const groupClassName = `.${classPrefix}-menu-group`;
const itemClassName = `.${classPrefix}-menu-item`;
const itemFocusClassName = `.${classPrefix}-menu-item-focus`;
const itemActiveClassName = `.${classPrefix}-menu-item-active`;
const cleanClassName = `.${namespace}-toggle-clean`;
const placeholderClassName = `.${namespace}-toggle-placeholder`;
const valueClassName = `.${namespace}-toggle-value`;
const searchInputClassName = `.${namespace}-search-bar-input`;

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

describe('SelectPicker', () => {
  it('Should clean selected default value', () => {
    const instance = getDOMNode(<Dropdown defaultOpen data={data} defaultValue={'Eugenia'} />);

    ReactTestUtils.Simulate.click(instance.querySelector(cleanClassName));
    expect(instance.querySelector(placeholderClassName).innerText).to.equal('Select');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<Dropdown defaultOpen data={data} value={'Eugenia'} />);

    ReactTestUtils.Simulate.click(instance.querySelector(cleanClassName));
    expect(instance.querySelector(valueClassName).innerText).to.equal('Eugenia');
  });

  it('Should output a dropdown', () => {
    const Title = 'Title';
    const instance = getDOMNode(<Dropdown>{Title}</Dropdown>);
    const instanceDom = instance;
    assert.ok(instanceDom.className.match(/\bpicker-select\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Dropdown disabled />);
    const instanceDom = instance;
    assert.ok(instanceDom.className.match(/\bdisabled\b/));
  });

  it('Should output a button', () => {
    const instance = getInstance(<Dropdown toggleComponentClass="button" />);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<Dropdown block />);
    const instanceDom = instance;
    assert.ok(instanceDom.className.match(/\bblock\b/));
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    const instance = getInstance(<Dropdown defaultOpen data={data} value={value} />);
    const menu = findDOMNode(instance.menuContainerRef.current);

    assert.equal(getDOMNode(instance).querySelector(valueClassName).innerText, value);
    assert.equal(menu.querySelector(itemActiveClassName).innerText, value);
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={value} />);
    const menu = findDOMNode(instance.menuContainerRef.current);

    assert.equal(getDOMNode(instance).querySelector(valueClassName).innerText, value);
    assert.equal(menu.querySelector(itemActiveClassName).innerText, value);
  });

  it('Should render a group', () => {
    const instance = getInstance(<Dropdown defaultOpen groupBy="role" data={data} />);
    const menu = findDOMNode(instance.menuContainerRef.current);
    assert.ok(menu.querySelector(groupClassName));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<Dropdown className="custom" placeholder="test" />);
    const instanceDom = instance;
    assert.equal(instanceDom.querySelector(placeholderClassName).innerText, 'test');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(
      <Dropdown
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={'4'}
      />
    );
    const instanceDom = instance;
    assert.equal(instanceDom.querySelector(placeholderClassName).innerText, 'test');
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <Dropdown placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );
    const menu = findDOMNode(instance.menuContainerRef.current).querySelector(
      '.rs-picker-select-menu-item-active'
    );
    assert.equal(menu.innerText, '');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <Dropdown
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={'bar'}
        renderValue={(value, item, label) => `${label}-${item.value}`}
      />
    );
    const instanceDom = instance;
    assert.equal(instanceDom.querySelector(valueClassName).innerText, 'foo-bar');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = data => {
      if (data === 'Eugenia') {
        done();
      }
    };
    const instance = getInstance(<Dropdown defaultOpen onChange={doneOp} data={data} />);
    const menu = findDOMNode(instance.menuContainerRef.current);

    ReactTestUtils.Simulate.click(menu.querySelector(itemClassName));
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Dropdown data={data} defaultValue={'Eugenia'} onClean={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should not output a search bar', () => {
    const instance = getInstance(<Dropdown searchable={false} defaultOpen data={data} />);
    const menu = findDOMNode(instance.menuContainerRef.current);

    assert.ok(!menu.querySelector(searchInputClassName));
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<Dropdown data={data} defaultValue={'Louisa'} />);
    assert.ok(instance.querySelector(cleanClassName));
  });

  it('Should call `onSearch` callback', done => {
    const doneOp = key => {
      if (key === 'a') {
        done();
      }
    };
    const instance = getInstance(<Dropdown defaultOpen onSearch={doneOp} data={data} />);
    const searchbox = findDOMNode(instance.searchBarContainerRef.current);

    const input = searchbox.querySelector(searchInputClassName);
    input.value = 'a';

    ReactTestUtils.Simulate.change(input);
  });

  it('Should call `onSelect` by keyCode=13 ', done => {
    const doneOp = (value, item) => {
      if (value === 'Louisa' && item.value === 'Louisa') {
        done();
      }
    };
    const instance = getInstance(
      <Dropdown defaultOpen data={data} onSelect={doneOp} defaultValue={'Kariane'} />
    );

    const toggle = instance.getToggleInstance().toggleRef.current;

    ReactTestUtils.Simulate.keyDown(toggle, { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(toggle, { keyCode: 13 });
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = key => {
      done();
    };
    let picker = null;
    getDOMNode(
      <Dropdown
        ref={ref => {
          picker = ref;
        }}
        onOpen={doneOp}
        data={data}
      />
    );

    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = key => {
      done();
    };
    let picker = null;

    getDOMNode(
      <Dropdown
        defaultOpen
        ref={ref => {
          picker = ref;
        }}
        onClose={doneOp}
        data={data}
      />
    );
    picker.close();
  });

  it('Should focus item by keyCode=40 ', done => {
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={'Eugenia'} />);
    const menu = findDOMNode(instance.menuContainerRef.current);
    const toggle = instance.getToggleInstance().toggleRef.current;
    ReactTestUtils.Simulate.keyDown(toggle, { keyCode: 40 });

    if (menu.querySelector(itemFocusClassName).innerText === 'Kariane') {
      done();
    }
  });

  it('Should focus item by keyCode=38 ', done => {
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={'Kariane'} />);
    const menu = findDOMNode(instance.menuContainerRef.current);
    const toggle = instance.getToggleInstance().toggleRef.current;
    ReactTestUtils.Simulate.keyDown(toggle, { keyCode: 38 });
    if (menu.querySelector(itemFocusClassName).innerText === 'Eugenia') {
      done();
    }
  });

  it('Should call `onChange` by keyCode=13 ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <Dropdown defaultOpen data={data} onChange={doneOp} defaultValue={'Kariane'} />
    );
    const toggle = instance.getToggleInstance().toggleRef.current;

    ReactTestUtils.Simulate.keyDown(toggle, { keyCode: 13 });
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<Dropdown defaultOpen data={data} onBlur={doneOp} />);
    const toggle = instance.getToggleInstance().toggleRef.current;

    ReactTestUtils.Simulate.blur(toggle);
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<Dropdown defaultOpen data={data} onFocus={doneOp} />);
    const toggle = instance.getToggleInstance().toggleRef.current;

    ReactTestUtils.Simulate.focus(toggle);
  });

  it('Should have a custom className', () => {
    const instance = getInstance(<Dropdown className="custom" defaultOpen data={data} />);
    assert.include(getDOMNode(instance).className, 'custom');
    expect(findDOMNode(instance.menuContainerRef.current).className).to.not.include('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Dropdown style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Dropdown classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleComponentClass={Button}', () => {
    const instance = getInstance(<Dropdown open data={data} toggleComponentClass={Button} />);
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-btn');
  });
});
