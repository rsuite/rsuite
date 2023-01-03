import React from 'react';
import { render, act } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import CameraRetro from '@rsuite/icons/legacy/CameraRetro';
import Star from '@rsuite/icons/legacy/Star';
import Rate from '../Rate';
import Sinon from 'sinon';

describe('Rate', () => {
  testStandardProps(<Rate />);

  it('Should render a default Rate', () => {
    const instance = getDOMNode(<Rate />);
    assert.equal(instance.querySelectorAll('li.rs-rate-character-empty').length, 5);
  });

  it('Should allow half select, value is 0.5', () => {
    const instance = getDOMNode(<Rate allowHalf defaultValue={0.5} />);
    assert.equal(instance.querySelectorAll('.rs-rate-character-half').length, 1);
  });

  it('Should allow clean full value', () => {
    const ref = React.createRef<HTMLUListElement>();
    render(<Rate defaultValue={1} ref={ref} />);

    act(() => {
      ReactTestUtils.Simulate.click(
        (ref.current as HTMLElement).querySelector('.rs-rate-character-full') as HTMLElement
      );
    });

    assert.equal(
      (ref.current as HTMLElement).querySelectorAll('.rs-rate-character-full').length,
      0
    );
  });

  it('Should allow clean half value', () => {
    const instance = getDOMNode(<Rate defaultValue={0.5} allowHalf />);
    ReactTestUtils.Simulate.mouseMove(
      instance.querySelector('.rs-rate-character-before') as HTMLElement
    );
    ReactTestUtils.Simulate.click(
      instance.querySelector('.rs-rate-character-before') as HTMLElement
    );
    assert.equal(instance.querySelectorAll('.rs-rate-character-full').length, 0);
  });

  it('Should cant clean value', () => {
    const instance = getDOMNode(<Rate defaultValue={0.5} allowHalf cleanable={false} />);
    ReactTestUtils.Simulate.click(
      instance.querySelector('.rs-rate-character-before') as HTMLElement
    );
    assert.equal(instance.querySelectorAll('.rs-rate-character-half').length, 1);
  });

  it('Should render same value when click again after clean', () => {
    // half
    const instance1 = getDOMNode(<Rate defaultValue={0.5} allowHalf />);
    ReactTestUtils.Simulate.click(
      instance1.querySelector('.rs-rate-character-before') as HTMLElement
    );
    ReactTestUtils.Simulate.click(
      instance1.querySelector('.rs-rate-character-before') as HTMLElement
    );
    assert.equal(instance1.querySelectorAll('.rs-rate-character-half').length, 1);

    // full
    const instance2 = getDOMNode(<Rate defaultValue={1} />);
    ReactTestUtils.Simulate.click(instance2.querySelector('.rs-rate-character') as HTMLElement);
    ReactTestUtils.Simulate.click(instance2.querySelector('.rs-rate-character') as HTMLElement);
    assert.equal(instance2.querySelectorAll('.rs-rate-character-full').length, 1);
  });

  it('Should render A character', () => {
    const instance = getDOMNode(<Rate defaultValue={1} character="A" />);
    assert.equal(
      (instance.querySelector('.rs-rate-character-before') as HTMLElement).textContent,
      'A'
    );
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

  it('Should call onChange callback with correct value', () => {
    const onChange = Sinon.spy();

    const ref = React.createRef<HTMLUListElement>();
    render(<Rate ref={ref} defaultValue={1} onChange={onChange} />);

    act(() => {
      ReactTestUtils.Simulate.mouseMove(
        (ref.current as HTMLElement).querySelectorAll('.rs-rate-character-before')[2]
      );
    });

    act(() => {
      ReactTestUtils.Simulate.click(
        (ref.current as HTMLElement).querySelectorAll('.rs-rate-character')[2]
      );
    });

    expect(onChange).to.have.been.calledWith(3);
  });

  it('Should call onChange callback by KeyDown event', () => {
    const onChange = Sinon.spy();

    const ref = React.createRef<HTMLUListElement>();

    render(<Rate ref={ref} defaultValue={1} onChange={onChange} />);

    act(() => {
      ReactTestUtils.Simulate.keyDown(
        (ref.current as HTMLElement).querySelectorAll('.rs-rate-character')[1],
        {
          key: 'ArrowRight'
        }
      );
    });

    act(() => {
      ReactTestUtils.Simulate.keyDown(
        (ref.current as HTMLElement).querySelectorAll('.rs-rate-character')[2],
        {
          key: 'ArrowRight'
        }
      );
    });

    act(() => {
      ReactTestUtils.Simulate.keyDown(
        (ref.current as HTMLElement).querySelectorAll('.rs-rate-character')[2],
        {
          key: 'Enter'
        }
      );
    });

    expect(onChange).to.have.been.calledWith(3);
  });

  it('Should be vertical', () => {
    const instance = getDOMNode(<Rate defaultValue={1.5} vertical allowHalf />);
    assert.ok(instance.querySelectorAll('.rs-rate-character-vertical').length);
  });

  it('Should update characterMap when value is updated', () => {
    type TestAppInstance = {
      root: HTMLElement;
      setValue: (newValue: number) => void;
    };
    const TestApp = React.forwardRef((props, ref) => {
      const [value, setValue] = React.useState(2);
      const rootRef = React.useRef<HTMLUListElement>(null);
      React.useImperativeHandle(ref, () => ({
        root: rootRef.current,
        setValue
      }));

      return <Rate {...props} ref={rootRef} value={value} />;
    });

    TestApp.displayName = 'TestApp';

    const ref = React.createRef<TestAppInstance>();
    render(<TestApp ref={ref} />);

    assert.equal(
      (
        (ref.current as TestAppInstance).root.querySelector('[aria-checked="true"]') as HTMLElement
      ).getAttribute('aria-posinset'),
      '2'
    );

    act(() => {
      (ref.current as TestAppInstance).setValue(0);
    });

    assert.equal(
      (ref.current as TestAppInstance).root.querySelectorAll('[aria-checked="false"]').length,
      5
    );
  });

  describe('Plain text', () => {
    it('Should render current value and max value', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <Rate value={1} max={5} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('1(5)');
    });

    it('Should render "Not selected" if value is empty', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          {/* FIXME `value` prop does not accept null as value */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Rate value={null} max={5} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Not selected');
    });
  });
});
