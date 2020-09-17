import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import SelectPicker from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  inChrome,
  itChrome
} from '@test/testUtils';

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
    ReactDOM.render(<SelectPicker ref={instanceRef} open />, createTestContainer());
    const toggleDom = findDOMNode(
      getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle')
    );
    const pickerNoneDom = document.body.querySelector('.rs-picker-none');
    inChrome &&
      assert.equal(getStyle(toggleDom, 'border'), `1px solid ${toRGB('#e5e5ea')}`, 'Toggle border');
    inChrome && assert.equal(getStyle(toggleDom, 'padding'), '7px 32px 7px 11px', 'Toggle padding');
    assert.equal(getStyle(toggleDom, 'backgroundColor'), toRGB('#fff'), 'Toggle background-color');
    assert.equal(
      window.getComputedStyle(toggleDom.querySelector('.rs-picker-toggle-caret'), '::before')
        .content,
      `"${String.fromCharCode(0xea08)}"`,
      'Toggle caret content'
    );
    inChrome &&
      assert.equal(getStyle(pickerNoneDom, 'padding'), '6px 12px 12px', 'Picker none item');
  });

  it('Subtle select picker should render correct toggle styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<SelectPicker appearance="subtle" ref={instanceRef} />, createTestContainer());
    const toggleDom = getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle');

    inChrome && assert.equal(getStyle(toggleDom, 'borderWidth'), '0px', 'Toggle border');
    inChrome && assert.equal(getStyle(toggleDom, 'padding'), '8px 32px 8px 12px', 'Toggle padding');
    assert.equal(getStyle(toggleDom, 'backgroundColor'), toRGB('#0000'), 'Toggle background-color');
  });

  itChrome('Select picker default toggle should render correct size', () => {
    const instanceRef = React.createRef();
    const instance = (
      <div ref={instanceRef}>
        <SelectPicker size="lg" placeholder="Large" data={data} />
        <SelectPicker size="md" placeholder="Medium" data={data} />
        <SelectPicker size="sm" placeholder="Small" data={data} />
        <SelectPicker size="xs" placeholder="Xsmall" data={data} />
      </div>
    );

    ReactDOM.render(instance, createTestContainer());
    const pickerToggles = findDOMNode(instanceRef.current).querySelectorAll('.rs-picker-toggle');
    assert.equal(
      getStyle(pickerToggles[0], 'padding'),
      '9px 36px 9px 15px',
      'Large Toggle padding'
    );
    assert.equal(
      getStyle(pickerToggles[1], 'padding'),
      '7px 32px 7px 11px',
      'Medium Toggle padding'
    );
    assert.equal(getStyle(pickerToggles[2], 'padding'), '4px 30px 4px 9px', 'Small Toggle padding');
    assert.equal(
      getStyle(pickerToggles[3], 'padding'),
      '1px 28px 1px 7px',
      'Xsmall Toggle padding'
    );
  });

  itChrome('Select picker subtle toggle should render correct size', () => {
    const instanceRef = React.createRef();
    const instance = (
      <div ref={instanceRef}>
        <SelectPicker size="lg" appearance="subtle" placeholder="Large" data={data} />
        <SelectPicker size="md" appearance="subtle" placeholder="Medium" data={data} />
        <SelectPicker size="sm" appearance="subtle" placeholder="Small" data={data} />
        <SelectPicker size="xs" appearance="subtle" placeholder="Xsmall" data={data} />
      </div>
    );

    ReactDOM.render(instance, createTestContainer());
    const pickerToggles = findDOMNode(instanceRef.current).querySelectorAll('.rs-picker-toggle');
    assert.equal(
      getStyle(pickerToggles[0], 'padding'),
      '10px 36px 10px 16px',
      'Large Toggle padding'
    );
    assert.equal(
      getStyle(pickerToggles[1], 'padding'),
      '8px 32px 8px 12px',
      'Medium Toggle padding'
    );
    assert.equal(
      getStyle(pickerToggles[2], 'padding'),
      '5px 30px 5px 10px',
      'Small Toggle padding'
    );
    assert.equal(
      getStyle(pickerToggles[3], 'padding'),
      '2px 28px 2px 8px',
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
      <SelectPicker
        ref={instanceRef}
        groupBy="role"
        data={data}
        menuClassName="group-test-menu"
        open
      />,
      createTestContainer()
    );
    const secondItemGroup = document.body.querySelectorAll(
      '.group-test-menu .rs-picker-select-menu-group'
    )[1];
    inChrome &&
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
