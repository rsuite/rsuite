import React from 'react';
import { getDOMNode } from '@test/testUtils';
import Rate from '../Rate';
import ReactTestUtils from 'react-dom/test-utils';
import Icon from '../../Icon';

describe('Rate', () => {
  it('Should render a default Rate', () => {
    const instance = getDOMNode(<Rate />);
    assert.equal(instance.querySelectorAll('li.rs-rate-character-empty').length, 5);
  });

  it('Should allow half select, value is 0.5', () => {
    const instance = getDOMNode(<Rate allowHalf defaultValue={0.5} />);
    assert.equal(instance.querySelectorAll('.rs-rate-character-half').length, 1);
  });

  it('Should allow clean full value', () => {
    const instance = getDOMNode(<Rate defaultValue={1} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-rate-character-full'));
    assert.equal(instance.querySelectorAll('.rs-rate-character-full').length, 0);
  });

  it('Should allow clean half value', () => {
    const instance = getDOMNode(<Rate defaultValue={0.5} allowHalf />);
    ReactTestUtils.Simulate.mouseMove(instance.querySelector('.rs-rate-character-before'));
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-rate-character-before'));
    assert.equal(instance.querySelectorAll('.rs-rate-character-full').length, 0);
  });

  it('Should cant clean value', () => {
    const instance = getDOMNode(<Rate defaultValue={0.5} allowHalf cleanable={false} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-rate-character-before'));
    assert.equal(instance.querySelectorAll('.rs-rate-character-half').length, 1);
  });

  it('Should render same value when click again after clean', () => {
    // half
    const instance1 = getDOMNode(<Rate defaultValue={0.5} allowHalf />);
    ReactTestUtils.Simulate.click(instance1.querySelector('.rs-rate-character-before'));
    ReactTestUtils.Simulate.click(instance1.querySelector('.rs-rate-character-before'));
    assert.equal(instance1.querySelectorAll('.rs-rate-character-half').length, 1);

    // full
    const instance2 = getDOMNode(<Rate defaultValue={1} />);
    ReactTestUtils.Simulate.click(instance2.querySelector('.rs-rate-character'));
    ReactTestUtils.Simulate.click(instance2.querySelector('.rs-rate-character'));
    assert.equal(instance2.querySelectorAll('.rs-rate-character-full').length, 1);
  });

  it('Should render A character', () => {
    const instance = getDOMNode(<Rate defaultValue={1} character="A" />);
    assert.equal(instance.querySelector('.rs-rate-character-before').innerText, 'A');
  });

  it('Should render a custom character', () => {
    const instance = getDOMNode(
      <Rate
        defaultValue={4}
        renderCharacter={value => {
          if (value > 2) {
            return <Icon icon="camera-retro" className="custom" />;
          }
          return <Icon icon="star" />;
        }}
      />
    );
    assert.include(
      instance.querySelector('.rs-rate-character-before').firstChild.className,
      'custom'
    );
  });

  it('Should disabled,cant click', () => {
    const instance = getDOMNode(<Rate defaultValue={1} disabled />);
    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-rate-character')[3]);
    assert.equal(instance.querySelectorAll('.rs-rate-character-full').length, 1);
  });

  it('Should disabled,cant hover', () => {
    const instance = getDOMNode(<Rate defaultValue={1} disabled />);
    ReactTestUtils.Simulate.mouseMove(instance.querySelectorAll('.rs-rate-character')[3]);
    assert.equal(instance.querySelectorAll('.rs-rate-character-full').length, 1);
  });

  it('Should render 10 characters', () => {
    const instance = getDOMNode(<Rate max={10} />);
    assert.equal(instance.querySelectorAll('.rs-rate-character').length, 10);
  });

  it('Should render lg size character', () => {
    const instance = getDOMNode(<Rate size="lg" character="A" />);
    assert.include(instance.className, 'rs-rate-lg');
  });

  it('Should call onChange callback', done => {
    const doneOp = value => {
      if (value === 3) {
        done();
      }
    };
    const instance = getDOMNode(<Rate defaultValue={1} onChange={doneOp} />);
    ReactTestUtils.Simulate.mouseMove(instance.querySelectorAll('.rs-rate-character-before')[2]);
    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-rate-character')[2]);
  });

  it('Should call onChange callback by KeyDown event', done => {
    const doneOp = value => {
      if (value === 3) {
        done();
      }
    };
    const instance = getDOMNode(<Rate defaultValue={1} onChange={doneOp} />);
    const characters = instance.querySelectorAll('.rs-rate-character');
    ReactTestUtils.Simulate.keyDown(characters[1], { keyCode: 39 });
    ReactTestUtils.Simulate.keyDown(characters[2], { keyCode: 39 });
    ReactTestUtils.Simulate.keyDown(characters[2], { keyCode: 13 });
  });

  it('Should be vertical', () => {
    const instance = getDOMNode(<Rate defaultValue={1.5} vertical allowHalf />);
    assert.ok(instance.querySelectorAll('.rs-rate-character-vertical').length);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Rate className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Rate style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Rate classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
