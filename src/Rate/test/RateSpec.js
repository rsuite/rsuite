import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import CameraRetro from '@rsuite/icons/legacy/CameraRetro';
import Star from '@rsuite/icons/legacy/Star';
import Rate from '../Rate';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

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
    const ref = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(<Rate defaultValue={1} ref={ref} />, container);
    });

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.click(ref.current.querySelector('.rs-rate-character-full'));
    });

    assert.equal(ref.current.querySelectorAll('.rs-rate-character-full').length, 0);
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
            return <CameraRetro />;
          }
          return <Star />;
        }}
      />
    );
    assert.isNotNull(instance.querySelector('[aria-label="camera retro"]'));
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

    const ref = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(<Rate ref={ref} defaultValue={1} onChange={doneOp} />, container);
    });

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.mouseMove(
        ref.current.querySelectorAll('.rs-rate-character-before')[2]
      );
    });

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.click(ref.current.querySelectorAll('.rs-rate-character')[2]);
    });
  });

  it('Should call onChange callback by KeyDown event', done => {
    const doneOp = value => {
      if (value === 3) {
        done();
      }
    };

    const ref = React.createRef();

    ReactTestUtils.act(() => {
      ReactDOM.render(<Rate ref={ref} defaultValue={1} onChange={doneOp} />, container);
    });

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.keyDown(ref.current.querySelectorAll('.rs-rate-character')[1], {
        keyCode: 39
      });
    });

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.keyDown(ref.current.querySelectorAll('.rs-rate-character')[2], {
        keyCode: 39
      });
    });

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.keyDown(ref.current.querySelectorAll('.rs-rate-character')[2], {
        keyCode: 13
      });
    });
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

  it('Should update characterMap when value is updated', () => {
    const TestApp = React.forwardRef((props, ref) => {
      const [value, setValue] = React.useState(2);
      const rootRef = React.useRef();
      React.useImperativeHandle(ref, () => ({
        root: rootRef.current,
        setValue
      }));

      return <Rate {...props} ref={rootRef} value={value} />;
    });

    TestApp.displayName = 'TestApp';

    const ref = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(<TestApp ref={ref} />, container);
    });

    assert.equal(
      ref.current.root.querySelector('[aria-checked="true"]').getAttribute('aria-posinset'),
      '2'
    );

    ReactTestUtils.act(() => {
      ref.current.setValue(0);
    });

    assert.equal(ref.current.root.querySelectorAll('[aria-checked="false"]').length, 5);
  });
});
