import React from 'react';
import ReactDOM from 'react-dom';
import SelectPicker from '../index';
import { createTestContainer, getStyle, toRGB, inChrome, itChrome } from '@test/testUtils';

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

    const pickerNoneDom = document.body.querySelector('.rs-picker-none');
    inChrome &&
      assert.equal(getStyle(instanceRef.current.target, 'border'), `1px solid ${toRGB('#e5e5ea')}`);
    inChrome && assert.equal(getStyle(instanceRef.current.target, 'padding'), '7px 32px 7px 11px');
    assert.equal(getStyle(instanceRef.current.target, 'backgroundColor'), toRGB('#fff'));
    assert.equal(
      instanceRef.current.target
        .querySelector('.rs-picker-toggle-caret')
        .getAttribute('aria-label'),
      'angle down'
    );

    inChrome && assert.equal(getStyle(pickerNoneDom, 'padding'), '6px 12px 12px');
  });

  it('Subtle select picker should render correct toggle styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<SelectPicker appearance="subtle" ref={instanceRef} />, createTestContainer());

    inChrome &&
      assert.equal(getStyle(instanceRef.current.target, 'borderWidth'), '0px', 'Toggle border');
    inChrome &&
      assert.equal(
        getStyle(instanceRef.current.target, 'padding'),
        '8px 32px 8px 12px',
        'Toggle padding'
      );
    assert.equal(
      getStyle(instanceRef.current.target, 'backgroundColor'),
      toRGB('#0000'),
      'Toggle background-color'
    );
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
    const pickerToggles = instanceRef.current.querySelectorAll('.rs-picker-toggle');
    assert.equal(getStyle(pickerToggles[0], 'padding'), '9px 36px 9px 15px');
    assert.equal(getStyle(pickerToggles[1], 'padding'), '7px 32px 7px 11px');
    assert.equal(getStyle(pickerToggles[2], 'padding'), '4px 30px 4px 9px');
    assert.equal(getStyle(pickerToggles[3], 'padding'), '1px 28px 1px 7px');
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
    const pickerToggles = instanceRef.current.querySelectorAll('.rs-picker-toggle');
    assert.equal(getStyle(pickerToggles[0], 'padding'), '10px 36px 10px 16px');
    assert.equal(getStyle(pickerToggles[1], 'padding'), '8px 32px 8px 12px');
    assert.equal(getStyle(pickerToggles[2], 'padding'), '5px 30px 5px 10px');
    assert.equal(getStyle(pickerToggles[3], 'padding'), '2px 28px 2px 8px');
  });

  it('Block select picker should render correct toggle styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<SelectPicker ref={instanceRef} block data={data} />, createTestContainer());
    assert.equal(getStyle(instanceRef.current.root, 'display'), 'block');
  });

  it('Select picker group should render correct styles', () => {
    const ref = React.createRef();
    ReactDOM.render(
      <SelectPicker ref={ref} groupBy="role" data={data} menuClassName="group-test-menu" open />,
      createTestContainer()
    );

    const secondItemGroup = ref.current.overlay.querySelectorAll(
      '.group-test-menu .rs-picker-menu-group'
    )[1];
    inChrome &&
      assert.equal(getStyle(secondItemGroup, 'borderTop'), `1px solid ${toRGB('#e5e5ea')}`);
    assert.equal(getStyle(secondItemGroup, 'marginTop'), '6px');
  });

  it('Disabled select picker should render correct toggle styles', () => {
    const ref = React.createRef();
    ReactDOM.render(<SelectPicker disabled ref={ref} />, createTestContainer());
    const defaultDom = ref.current.root;
    assert.equal(getStyle(defaultDom, 'opacity'), 0.3);
    assert.equal(
      getStyle(defaultDom.querySelector('.rs-picker-toggle'), 'backgroundColor'),
      toRGB('#f7f7fa')
    );

    const ref2 = React.createRef();
    ReactDOM.render(
      <SelectPicker appearance="subtle" disabled ref={ref2} />,
      createTestContainer()
    );
    assert.equal(
      getStyle(ref2.current.root.querySelector('.rs-picker-toggle'), 'backgroundColor'),
      toRGB('#0000')
    );
  });
});
