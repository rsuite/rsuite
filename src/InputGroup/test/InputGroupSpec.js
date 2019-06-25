import React from 'react';
import { getDOMNode } from '@test/testUtils';
import InputGroup from '../InputGroup';
import Input from '../../Input/Input';

describe('InputGroup', () => {
  it('Should render a container', () => {
    const title = 'Test';
    const instance = getDOMNode(<InputGroup>{title}</InputGroup>);
    assert.equal(instance.className, 'rs-input-group');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a `input-group-inside` className', () => {
    const instance = getDOMNode(<InputGroup inside />);
    assert.include(instance.className, 'rs-input-group-inside');
  });

  it('Should add size', () => {
    const instance = getDOMNode(<InputGroup size="lg" />);
    assert.include(instance.className, 'rs-input-group-lg');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<InputGroup disabled />);
    assert.include(instance.className, 'rs-input-group-disabled');
  });

  it('Should be disabled for children', () => {
    const instance = getDOMNode(
      <InputGroup disabled>
        <InputGroup.Addon> @</InputGroup.Addon>
        <Input />
      </InputGroup>
    );

    assert.ok(instance.querySelector('.rs-input-group-addon-disabled'));
    assert.ok(instance.querySelector('input[disabled]'));
  });

  it('Should have a children Element and className is `input-group-addon` ', () => {
    const instance = getDOMNode(
      <InputGroup>
        <InputGroup.Addon> @</InputGroup.Addon>
        <Input />
      </InputGroup>
    );
    assert.ok(instance.querySelector('.rs-input-group-addon'));
  });

  it('Should have a children Element and className is `input-group-btn` ', () => {
    const instance = getDOMNode(
      <InputGroup>
        <Input />
        <InputGroup.Button>btn</InputGroup.Button>
      </InputGroup>
    );
    assert.ok(instance.querySelector('.rs-input-group-btn'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<InputGroup className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<InputGroup style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = getDOMNode(<InputGroup style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<InputGroup classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
