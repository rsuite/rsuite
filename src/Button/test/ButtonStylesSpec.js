import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../index';
import ButtonToolbar from '../../ButtonToolbar';
import {
  createTestContainer,
  getDOMNode,
  getDefaultPalette,
  toRGB,
  getStyle,
  itChrome
} from '@test/testUtils';

import '../styles/index';

const { H500, H700, H800, H900 } = getDefaultPalette();

describe('Button styles', () => {
  it('Default button should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Button ref={instanceRef}>Title</Button>, createTestContainer());
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'backgroundColor'),
      toRGB('#f7f7fa'),
      'Default button background-color'
    );
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'color'),
      toRGB('#575757'),
      'Default button font-color'
    );
  });

  it('Primary button should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button appearance="primary" ref={instanceRef}>
        Title
      </Button>,
      createTestContainer()
    );
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'backgroundColor'),
      H500,
      'Primary button background-color'
    );
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'color'),
      toRGB('#fff'),
      'Primary button font-color'
    );
  });

  it('Link button should render the correct font color', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button appearance="link" ref={instanceRef}>
        Title
      </Button>,
      createTestContainer()
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'color'), H700);
  });

  it('Subtle button should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button appearance="subtle" ref={instanceRef}>
        Title
      </Button>,
      createTestContainer()
    );
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'color'),
      toRGB('#8e8e93'),
      'Subtle button font-color'
    );
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'backgroundColor'),
      toRGB('#0000'),
      'Subtle button background-color'
    );
  });

  it('Ghost button should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button appearance="ghost" ref={instanceRef}>
        Title
      </Button>,
      createTestContainer()
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'color'), H700);
  });

  itChrome('Button should render the correct padding', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <ButtonToolbar ref={instanceRef}>
        <Button size="lg">Large</Button>
        <Button size="md">Medium</Button>
        <Button size="sm">Small</Button>
        <Button size="xs">Xsmall</Button>
      </ButtonToolbar>,
      createTestContainer()
    );
    const buttons = getDOMNode(instanceRef.current).children;
    const lg = buttons[0];
    const md = buttons[1];
    const sm = buttons[2];
    const xs = buttons[3];
    assert.equal(getStyle(lg, 'padding'), '10px 16px', 'Large button padding');
    assert.equal(getStyle(md, 'padding'), '8px 12px', 'Middle button padding');
    assert.equal(getStyle(sm, 'padding'), '5px 10px', 'Small button padding');
    assert.equal(getStyle(xs, 'padding'), '2px 8px', 'Xsmall button padding');
  });

  it('Color button should render the correct color', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button color="red" ref={instanceRef}>
        Red
      </Button>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    assert.equal(
      getStyle(dom, 'backgroundColor'),
      toRGB('#f44336'),
      'Color button background-color'
    );
    assert.equal(getStyle(dom, 'color'), toRGB('#fff'), 'Color button font-color');
  });

  it('Button should render the correct display', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button block ref={instanceRef}>
        Tittle
      </Button>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'display'), 'block');
  });

  it('Disabled button should render the correct opacity', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <ButtonToolbar ref={instanceRef}>
        <Button appearance="default" disabled>
          Default
        </Button>
        <Button appearance="primary" disabled>
          Primary
        </Button>
        <Button appearance="link" disabled>
          Link
        </Button>
        <Button appearance="subtle" disabled>
          Subtle
        </Button>
        <Button appearance="ghost" disabled>
          Ghost
        </Button>
      </ButtonToolbar>,
      createTestContainer()
    );
    const buttons = getDOMNode(instanceRef.current).children;
    const defaultButton = buttons[0];
    const primaryButton = buttons[1];
    const linkButton = buttons[2];
    const subtleButton = buttons[3];
    const ghostButton = buttons[4];

    assert.equal(getStyle(defaultButton, 'opacity'), '1');
    assert.equal(getStyle(primaryButton, 'opacity'), '0.3');
    assert.equal(getStyle(linkButton, 'opacity'), '0.3');
    assert.equal(getStyle(subtleButton, 'opacity'), '1');
    assert.equal(getStyle(ghostButton, 'opacity'), '0.3');
  });

  it('Default button should render the correct styles when set active', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button ref={instanceRef} active>
        Title
      </Button>,
      createTestContainer()
    );
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'backgroundColor'),
      toRGB('#d9d9d9'),
      'Default button background-color'
    );
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'color'),
      toRGB('#575757'),
      'Default button font-color'
    );
  });

  it('Primary button should render the correct styles when set active', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button appearance="primary" ref={instanceRef} active>
        Title
      </Button>,
      createTestContainer()
    );
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'backgroundColor'),
      H700,
      'Primary button background-color'
    );
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'color'),
      toRGB('#fff'),
      'Primary button font-color'
    );
  });

  it('Link button should render the correct font color when set active', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button appearance="link" ref={instanceRef} active>
        Title
      </Button>,
      createTestContainer()
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'color'), H900);
  });

  it('Subtle button should render the correct styles when set active', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button appearance="subtle" ref={instanceRef} active>
        Title
      </Button>,
      createTestContainer()
    );
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'color'),
      toRGB('#272c36'),
      'Subtle button font-color'
    );
    assert.equal(
      getStyle(getDOMNode(instanceRef.current), 'backgroundColor'),
      toRGB('#e5e5ea'),
      'Subtle button background-color'
    );
  });

  it('Ghost button should render the correct styles when set active', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button appearance="ghost" ref={instanceRef} active>
        Title
      </Button>,
      createTestContainer()
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'color'), H900);
  });
});
