/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testStandardProps } from '@test/utils';
import Heart from '@rsuite/icons/Heart';
import Star from '@rsuite/icons/Star';
import Rate from '../Rate';
import Sinon from 'sinon';

describe('Rate', () => {
  testStandardProps(<Rate />, {
    colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  });

  it('Should render a default Rate', () => {
    render(<Rate />);
    expect(screen.getByRole('radiogroup')).to.exist;
    expect(screen.getAllByRole('radio')).to.have.length(5);
  });

  it('Should allow half select, value is 0.5', () => {
    render(<Rate allowHalf defaultValue={0.5} />);
    expect(screen.getAllByRole('radio')[0]).to.have.class('rs-rate-character-half');
  });

  it('Should allow clean full value', () => {
    const ref = React.createRef<HTMLUListElement>();
    render(<Rate defaultValue={1} ref={ref} />);

    userEvent.click(ref.current?.querySelector('.rs-rate-character-full') as HTMLElement);

    expect(ref.current?.querySelectorAll('.rs-rate-character-full')).to.have.length(0);
  });

  it('Should allow clean half value', () => {
    const { container } = render(<Rate defaultValue={0.5} allowHalf />);

    userEvent.hover(container.querySelector('.rs-rate-character-before') as HTMLElement);
    userEvent.click(container.querySelector('.rs-rate-character-before') as HTMLElement);

    expect(container.querySelectorAll('.rs-rate-character-full')).to.have.length(0);
  });

  it('Should cant clean value', () => {
    const { container } = render(<Rate defaultValue={0.5} allowHalf cleanable={false} />);
    userEvent.click(container.querySelector('.rs-rate-character-before') as HTMLElement);
    expect(container.querySelectorAll('.rs-rate-character-half')).to.have.length(1);
  });

  it('Should render same value for a half-rate when click again after clean ', () => {
    const { container } = render(<Rate defaultValue={0.5} allowHalf />);
    userEvent.click(container.querySelector('.rs-rate-character-before') as HTMLElement);
    userEvent.click(container.querySelector('.rs-rate-character-before') as HTMLElement);
    expect(container.querySelectorAll('.rs-rate-character-half')).to.have.length(1);
  });

  it('Should render same value for a full-rate when click again after clean ', () => {
    const { container } = render(<Rate defaultValue={1} />);
    userEvent.click(container.querySelector('.rs-rate-character') as HTMLElement);
    userEvent.click(container.querySelector('.rs-rate-character') as HTMLElement);
    expect(container.querySelectorAll('.rs-rate-character-full')).to.have.length(1);
  });

  it('Should render A character', () => {
    const { container } = render(<Rate defaultValue={1} character="A" />);

    expect(container.querySelector('.rs-rate-character-before') as HTMLElement).to.have.text('A');
  });

  it('Should render a custom character', () => {
    const { container } = render(
      <Rate
        defaultValue={4}
        renderCharacter={value => {
          if (value > 2) {
            return <Heart />;
          }
          return <Star />;
        }}
      />
    );

    expect(container.querySelector('[aria-label="heart"]')).to.exist;
  });

  it('Should disabled,cant click', () => {
    const { container } = render(<Rate defaultValue={1} disabled />);
    userEvent.click(container.querySelectorAll('.rs-rate-character')[3]);
    expect(container.querySelectorAll('.rs-rate-character-full')).to.have.length(1);
  });

  it('Should disabled,cant hover', () => {
    const { container } = render(<Rate defaultValue={1} disabled />);
    userEvent.hover(container.querySelectorAll('.rs-rate-character')[3]);
    expect(container.querySelectorAll('.rs-rate-character-full')).to.have.length(1);
  });

  it('Should render 10 characters', () => {
    render(<Rate max={10} />);
    expect(screen.getAllByRole('radio')).to.have.length(10);
  });

  it('Should render lg size character', () => {
    render(<Rate size="lg" character="A" />);
    expect(screen.getByRole('radiogroup')).to.have.class('rs-rate-lg');
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = Sinon.spy();

    const ref = React.createRef<HTMLUListElement>();
    render(<Rate ref={ref} defaultValue={1} onChange={onChange} />);

    userEvent.hover((ref.current as HTMLElement).querySelectorAll('.rs-rate-character-before')[2]);

    userEvent.click((ref.current as HTMLElement).querySelectorAll('.rs-rate-character')[2]);

    expect(onChange).to.have.been.calledWith(3);
  });

  it('Should call onChange callback by KeyDown event', () => {
    const onChange = Sinon.spy();

    const ref = React.createRef<HTMLUListElement>();

    render(<Rate ref={ref} defaultValue={1} onChange={onChange} />);

    fireEvent.keyDown((ref.current as HTMLElement).querySelectorAll('.rs-rate-character')[1], {
      key: 'ArrowRight'
    });

    fireEvent.keyDown((ref.current as HTMLElement).querySelectorAll('.rs-rate-character')[2], {
      key: 'ArrowRight'
    });

    fireEvent.keyDown((ref.current as HTMLElement).querySelectorAll('.rs-rate-character')[2], {
      key: 'Enter'
    });

    expect(onChange).to.have.been.calledWith(3);
  });

  it('Should be vertical', () => {
    const { container } = render(<Rate defaultValue={1.5} vertical allowHalf />);
    expect(container.querySelectorAll('.rs-rate-character-vertical')).to.have.length(5);
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

    expect(
      (ref.current as TestAppInstance).root.querySelector('[aria-checked="true"]') as HTMLElement
    ).to.have.attr('aria-posinset', '2');

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
      render(
        <div data-testid="content">
          <Rate value={1} max={5} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('1(5)');
    });

    it('Should render "Not selected" if value is empty', () => {
      render(
        <div data-testid="content">
          {/* FIXME `value` prop does not accept null as value */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Rate value={null} max={5} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Not selected');
    });
  });
});
