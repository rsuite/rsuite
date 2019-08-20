import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import SelectPicker from '../index';
import Button from '../../Button';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

const data = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    role: 'Master'
  },
  {
    label: <span>Kariane</span>,
    value: 'Kariane',
    role: 'Developer'
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master'
  }
];

describe('SelectPicker styles', () => {
  it('Default select picker should render correct toggle styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<SelectPicker ref={instanceRef} />, createTestContainer());
    const toggleDom = getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle');
    toggleDom.click();
    const pickerNoneDom = document.body.querySelector('.rs-picker-none');

    assert.equal(getStyle(toggleDom, 'border'), `1px solid ${toRGB('#e5e5ea')}`, 'Toggle border');
    assert.equal(getStyle(toggleDom, 'padding'), '7px 32px 7px 11px', 'Toggle padding');
    assert.equal(getStyle(toggleDom, 'backgroundColor'), toRGB('#fff'), 'Toggle background-color');
    assert.equal(
      window.getComputedStyle(toggleDom.querySelector('.rs-picker-toggle-caret'), '::before')
        .content,
      `"${String.fromCharCode(0xea08)}"`,
      'Toggle caret content'
    );
    assert.equal(getStyle(pickerNoneDom, 'padding'), '6px 12px 12px', 'Picker none item');
  });

  it('Subtle select picker should render correct toggle styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<SelectPicker appearance="subtle" ref={instanceRef} />, createTestContainer());
    const toggleDom = getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle');

    assert.equal(getStyle(toggleDom, 'borderWidth'), '0px', 'Toggle border');
    assert.equal(getStyle(toggleDom, 'padding'), '8px 32px 8px 12px', 'Toggle padding');
    assert.equal(getStyle(toggleDom, 'backgroundColor'), toRGB('#0000'), 'Toggle background-color');
  });

  it('Select picker should render correct size', () => {
    const instanceRef = React.createRef();
    const instance = (
      <div ref={instanceRef}>
        <SelectPicker toggleComponentClass={Button} size="lg" placeholder="Large" data={data} />
        <SelectPicker toggleComponentClass={Button} size="md" placeholder="Medium" data={data} />
        <SelectPicker toggleComponentClass={Button} size="sm" placeholder="Small" data={data} />
        <SelectPicker toggleComponentClass={Button} size="xs" placeholder="Xsmall" data={data} />
      </div>
    );

    ReactDOM.render(instance, createTestContainer());
    const pickerToggles = findDOMNode(instanceRef.current).querySelectorAll(
      '.rs-picker-toggle-custom'
    );
    assert.equal(
      getStyle(pickerToggles[0], 'padding'),
      '9px 32px 9px 16px',
      'Large Toggle padding'
    );
    assert.equal(
      getStyle(pickerToggles[1], 'padding'),
      '7px 32px 7px 12px',
      'Medium Toggle padding'
    );
    assert.equal(
      getStyle(pickerToggles[2], 'padding'),
      '4px 32px 4px 10px',
      'Small Toggle padding'
    );
    assert.equal(
      getStyle(pickerToggles[3], 'padding'),
      '1px 32px 1px 8px',
      'Xsmall Toggle padding'
    );
  });

  it('Block select picker should render correct toggle styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<SelectPicker ref={instanceRef} block data={data} />, createTestContainer());
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'display'), 'block');
  });

  it('Select picker group should render correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <SelectPicker ref={instanceRef} groupBy="role" data={data} />,
      createTestContainer()
    );
    const toggleDom = getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle');
    toggleDom.click();
    const secondItemGroup = document.body.querySelector(
      '.rs-picker-select-menu-group:nth-child(2)'
    );
    assert.equal(
      getStyle(secondItemGroup, 'borderTop'),
      `1px solid ${toRGB('#e5e5ea')}`,
      'Picker menu group border'
    );
    assert.equal(getStyle(secondItemGroup, 'marginTop'), '6px', 'Picker menu group margin');
  });

  it('Disabled select picker should render correct toggle styles', () => {
    const defaultInstanceRef = React.createRef();
    ReactDOM.render(<SelectPicker disabled ref={defaultInstanceRef} />, createTestContainer());
    const defaultDom = getDOMNode(defaultInstanceRef.current);
    assert.equal(getStyle(defaultDom, 'opacity'), 0.3);
    assert.equal(
      getStyle(defaultDom.querySelector('.rs-picker-toggle'), 'backgroundColor'),
      toRGB('#f7f7fa'),
      'Default picker toggle disabled background'
    );

    const subtleInstanceRef = React.createRef();
    ReactDOM.render(
      <SelectPicker appearance="subtle" disabled ref={subtleInstanceRef} />,
      createTestContainer()
    );
    assert.equal(
      getStyle(
        getDOMNode(subtleInstanceRef.current).querySelector('.rs-picker-toggle'),
        'backgroundColor'
      ),
      toRGB('#0000'),
      'Subtle picker toggle disabled background'
    );
  });
});
