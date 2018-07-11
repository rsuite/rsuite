import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import { namespace } from 'rsuite-utils/lib/Picker/constants';
import { getDOMNode, getInstance } from '../TestWrapper';

import TagPicker from '../../src/InputPicker/Dropdown';

const classPrefix = '.rs-picker-input';
const groupClassName = '.rs-picker-check-menu-group';
const itemFocusClassName = '.rs-picker-check-menu-item-focus';
const itemActiveClassName = '.rs-picker-check-menu-item-active';
const cleanClassName = '.rs-picker-toggle-clean';
const placeholderClassName = '.rs-picker-toggle-placeholder';
const valueClassName = '.rs-picker-toggle-value';
const searchInputClassName = '.rs-picker-search-bar-input';

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
    const instance = getDOMNode(
      <TagPicker multi defaultOpen data={data} defaultValue={['Eugenia']} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector(cleanClassName));
    expect(instance.querySelector(placeholderClassName).innerText).to.equal('Select');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<TagPicker multi defaultOpen data={data} value={['Eugenia']} />);
    ReactTestUtils.Simulate.click(instance.querySelector(cleanClassName));
    expect(instance.querySelectorAll('.rs-tag').length).to.equal(1);
    expect(instance.querySelector('.rs-tag').innerText).to.equal('Eugenia');
  });

  it('Should output a TagPicker', () => {
    const Title = 'Title';
    const instance = getDOMNode(<TagPicker multi>{Title}</TagPicker>);
    assert.include(instance.className, 'rs-picker-tag');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<TagPicker multi disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should output a button', () => {
    const instance = getInstance(<TagPicker multi toggleComponentClass="button" />);
    ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<TagPicker block multi />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    const instance = getInstance(<TagPicker multi defaultOpen data={data} value={[value]} />);
    const menuContainer = getDOMNode(instance.menuContainer);
    assert.equal(getDOMNode(instance).querySelector('.rs-tag').innerText, value);
    assert.equal(menuContainer.querySelector(itemActiveClassName).innerText, value);
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(
      <TagPicker multi defaultOpen data={data} defaultValue={[value]} />
    );
    const menuContainer = getDOMNode(instance.menuContainer);

    assert.equal(getDOMNode(instance).querySelector('.rs-tag').innerText, value);
    assert.equal(menuContainer.querySelector(itemActiveClassName).innerText, value);
  });

  it('Should render a group', () => {
    const instance = getInstance(<TagPicker multi defaultOpen groupBy="role" data={data} />);
    const menuContainer = getDOMNode(instance.menuContainer);
    assert.ok(menuContainer.querySelector(groupClassName));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<TagPicker multi className="custom" placeholder="test" />);

    assert.equal(instance.querySelector(placeholderClassName).innerText, 'test');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(
      <TagPicker
        multi
        placeholder="test"
        data={[{ label: '1', value: '1' }, { label: '2', value: '2' }]}
        value={['4']}
      />
    );
    assert.equal(instance.querySelector(placeholderClassName).innerText, 'test');
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <TagPicker
        multi
        placeholder="test"
        data={[{ label: '', value: '1' }]}
        value={['1']}
        defaultOpen
      />
    );
    const menuContainer = getDOMNode(instance.menuContainer).querySelector(
      '.rs-picker-check-menu-item-active'
    );
    assert.equal(menuContainer.innerText, '');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <TagPicker
        multi
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={['bar']}
        renderValue={(value, item) => `${item.label}-${value}`}
      />
    );
    assert.equal(instance.querySelector('.rs-tag').innerText, 'foo-bar');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = value => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <TagPicker multi defaultOpen onChange={doneOp} data={[{ label: '1', value: '1' }]} />
    );
    const instanceDOM = findDOMNode(instance.menuContainer);

    ReactTestUtils.Simulate.change(instanceDOM.querySelector('.rs-picker-check-menu-item input'));
  });

  it('Should call `onSelect` by keyCode=13 ', done => {
    const doneOp = (value, item) => {
      if (value[1] === 'Louisa' && item.value === 'Louisa') {
        done();
      }
    };
    const instance = getDOMNode(
      <TagPicker multi defaultOpen data={data} onSelect={doneOp} defaultValue={['Kariane']} />
    );

    ReactTestUtils.Simulate.keyDown(instance, { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(instance, { keyCode: 13 });
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<TagPicker multi data={data} defaultValue={['Louisa']} />);
    assert.ok(findDOMNode(instance).querySelector(cleanClassName));
  });

  it('Should call `onSearch` callback', done => {
    const doneOp = key => {
      if (key === 'a') {
        done();
      }
    };
    const instance = getDOMNode(<TagPicker multi defaultOpen onSearch={doneOp} />);
    const input = instance.querySelector('.rs-picker-search-input input');
    input.value = 'a';

    ReactTestUtils.Simulate.change(input);
  });

  it('Should focus item by keyCode=40 ', () => {
    const instance = getInstance(
      <TagPicker multi defaultOpen data={data} defaultValue={['Eugenia']} />
    );

    const menuDOM = getDOMNode(instance.menuContainer);
    ReactTestUtils.Simulate.keyDown(getDOMNode(instance), { keyCode: 40 });

    assert.equal(menuDOM.querySelector(itemFocusClassName).innerText, 'Kariane');
  });

  it('Should focus item by keyCode=38 ', () => {
    const instance = getInstance(
      <TagPicker multi defaultOpen data={data} defaultValue={['Kariane']} />
    );

    const menuDOM = getDOMNode(instance.menuContainer);
    ReactTestUtils.Simulate.keyDown(getDOMNode(instance), { keyCode: 38 });

    assert.equal(menuDOM.querySelector(itemFocusClassName).innerText, 'Eugenia');
  });

  it('Should call `onChange` by keyCode=13 ', done => {
    const doneOp = key => {
      done();
    };
    const instance = getDOMNode(
      <TagPicker multi defaultOpen data={data} onChange={doneOp} defaultValue={['Kariane']} />
    );

    ReactTestUtils.Simulate.keyDown(instance, { keyCode: 13 });
  });

  it('Should call `onChange` by remove last item ', done => {
    const doneOp = value => {
      if (value.length === 1 && value[0] === 'Kariane') {
        done();
      }
    };
    const instance = getDOMNode(
      <TagPicker
        multi
        defaultOpen
        data={data}
        onChange={doneOp}
        defaultValue={['Kariane', 'Eugenia']}
      />
    );
    assert.equal(instance.querySelectorAll('.rs-tag').length, 2);
    ReactTestUtils.Simulate.keyDown(instance, { keyCode: 8 });
  });

  it('Should call `onChange` by removeTag ', done => {
    const doneOp = value => {
      if (value.length === 1 && value[0] === 'Eugenia') {
        done();
      }
    };
    const instance = getDOMNode(
      <TagPicker
        multi
        defaultOpen
        data={data}
        onChange={doneOp}
        defaultValue={['Kariane', 'Eugenia']}
      />
    );
    assert.equal(instance.querySelectorAll('.rs-tag').length, 2);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-tag-icon-close'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TagPicker multi className="custom" defaultOpen />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TagPicker multi style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });
});
