import React from 'react';
import ReactDOM from 'react-dom';
import InputPicker from '../index';
import Button from '../../Button';
import { createTestContainer, getStyle, toRGB, getDefaultPalette, inChrome } from '@test/testUtils';

import '../styles/index.less';

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

const { H500 } = getDefaultPalette();

describe('InputPicker styles', () => {
  it('Should render correct toggle styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<InputPicker ref={instanceRef} data={data} />, createTestContainer());
    const dom = instanceRef.current.root;
    const toggleDom = dom.querySelector('.rs-picker-toggle');
    const toggleInputDom = dom.querySelector('.rs-picker-search-input');
    inChrome &&
      assert.equal(getStyle(dom, 'border'), `1px solid ${toRGB('#e5e5ea')}`, 'Picker border');

    assert.equal(getStyle(dom, 'backgroundColor'), `${toRGB('#fff')}`, 'Toggle background color');
    assert.equal(getStyle(toggleDom, 'height'), '34px', 'Toggle height');
    inChrome &&
      assert.equal(getStyle(toggleInputDom, 'border-style'), 'none', 'Toggle input border');
  });

  it('Should render correct large size', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <InputPicker toggleAs={Button} size="lg" ref={instanceRef} data={data} />,
      createTestContainer()
    );
    const dom = instanceRef.current.root;
    assert.equal(getStyle(dom, 'height'), '42px', 'Toggle height');
  });

  it('Should render correct middle size ', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <InputPicker toggleAs={Button} size="md" ref={instanceRef} data={data} />,
      createTestContainer()
    );
    const dom = instanceRef.current.root;
    assert.equal(getStyle(dom, 'height'), '36px', 'Toggle height');
  });

  it('Should render correct small size ', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <InputPicker toggleAs={Button} size="sm" ref={instanceRef} data={data} />,
      createTestContainer()
    );
    const dom = instanceRef.current.root;
    assert.equal(getStyle(dom, 'height'), '30px', 'Toggle height');
  });

  it('Should render correct xsmall size ', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <InputPicker toggleAs={Button} size="xs" ref={instanceRef} data={data} />,
      createTestContainer()
    );
    const dom = instanceRef.current.root;
    assert.equal(getStyle(dom, 'height'), '24px', 'Toggle height');
  });

  it('Should render correct toggle styles when open', done => {
    const instanceRef = React.createRef();
    let dom;
    ReactDOM.render(
      <InputPicker
        ref={instanceRef}
        data={data}
        onOpen={() => {
          inChrome &&
            assert.equal(getStyle(dom, 'border'), `1px solid ${H500}`, 'Picker active border');
          done();
        }}
        // For the test set transition to none.
        style={{ transition: 'none' }}
      />,
      createTestContainer()
    );
    dom = instanceRef.current.root;
    instanceRef.current.open();
  });

  it('Should have correct height when disabled', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<InputPicker ref={instanceRef} data={data} disabled />, createTestContainer());
    const dom = instanceRef.current.root;

    assert.equal(getStyle(dom, 'height'), '36px', 'InputPicker height');
  });
});
