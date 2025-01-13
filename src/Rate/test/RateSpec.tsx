import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testStandardProps } from '@test/utils';
import Heart from '@rsuite/icons/Heart';
import Star from '@rsuite/icons/Star';
import Rate from '../Rate';
import sinon from 'sinon';

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
    const onChange = sinon.spy();

    const ref = React.createRef<HTMLUListElement>();
    render(<Rate ref={ref} defaultValue={1} onChange={onChange} />);

    userEvent.hover((ref.current as HTMLElement).querySelectorAll('.rs-rate-character-before')[2]);

    userEvent.click((ref.current as HTMLElement).querySelectorAll('.rs-rate-character')[2]);

    expect(onChange).to.have.been.calledWith(3);
  });

  it('Should call onChange callback by KeyDown event', () => {
    const onChange = sinon.spy();

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

    const current = ref.current as TestAppInstance;

    expect(current.root.querySelector('[aria-checked="true"]') as HTMLElement).to.have.attr(
      'aria-posinset',
      '2'
    );

    act(() => {
      current.setValue(0);
    });

    expect(current.root.querySelectorAll('[aria-checked="false"]')).to.have.length(5);
  });

  it('Should handle mouse leave correctly', () => {
    const onChangeActive = sinon.spy();
    const ref = React.createRef<HTMLUListElement>();

    render(<Rate ref={ref} defaultValue={3} onChangeActive={onChangeActive} />);

    // Simulate hovering over a different rating
    userEvent.hover(ref.current?.querySelectorAll('.rs-rate-character')[3] as HTMLElement);

    // Simulate mouse leave
    fireEvent.mouseLeave(ref.current as HTMLElement);

    // Should call onChangeActive with the original value
    expect(onChangeActive).to.have.been.calledWith(3);

    // Should reset the visual state
    expect(ref.current?.querySelectorAll('.rs-rate-character-full')).to.have.length(3);
  });

  describe('Custom colors', () => {
    it('Should render with preset color', () => {
      render(<Rate defaultValue={3} color="red" />);
      expect(screen.getByRole('radiogroup')).to.have.class('rs-rate-red');
    });

    it('Should render with custom hex color', () => {
      const { container } = render(<Rate defaultValue={3} color="#FF5733" />);
      const rateElement = container.querySelector('.rs-rate');
      const style = getComputedStyle(rateElement as HTMLElement);
      expect(style.getPropertyValue('--rs-rate-symbol-checked').toLowerCase()).to.equal('#ff5733');
    });

    it('Should render with custom rgb color', () => {
      const { container } = render(<Rate defaultValue={3} color="rgb(255, 87, 51)" />);
      const rateElement = container.querySelector('.rs-rate');
      const style = getComputedStyle(rateElement as HTMLElement);
      expect(style.getPropertyValue('--rs-rate-symbol-checked')).to.equal('rgb(255, 87, 51)');
    });

    it('Should update color when prop changes', () => {
      const { container, rerender } = render(<Rate defaultValue={3} color="#FF5733" />);
      const rateElement = container.querySelector('.rs-rate');
      const style = getComputedStyle(rateElement as HTMLElement);
      expect(style.getPropertyValue('--rs-rate-symbol-checked').toLowerCase()).to.equal('#ff5733');

      rerender(<Rate defaultValue={3} color="#33FF57" />);
      expect(style.getPropertyValue('--rs-rate-symbol-checked').toLowerCase()).to.equal('#33ff57');
    });

    it('Should render correctly when switching between preset and custom colors', () => {
      const { container, rerender } = render(<Rate defaultValue={3} color="red" />);
      let rateElement = screen.getByRole('radiogroup');
      expect(rateElement).to.have.class('rs-rate-red');

      rerender(<Rate defaultValue={3} color="#FF5733" />);
      rateElement = container.querySelector('.rs-rate') as HTMLElement;
      const style = getComputedStyle(rateElement);
      expect(style.getPropertyValue('--rs-rate-symbol-checked').toLowerCase()).to.equal('#ff5733');
      expect(rateElement).to.not.have.class('rs-rate-red');
    });
  });

  describe('Keyboard navigation', () => {
    it('Should handle right arrow key with allowHalf=false', () => {
      const onChange = sinon.spy();
      const ref = React.createRef<HTMLUListElement>();

      render(<Rate ref={ref} defaultValue={2} onChange={onChange} />);

      fireEvent.keyDown(ref.current?.querySelectorAll('.rs-rate-character')[2] as HTMLElement, {
        key: 'ArrowRight'
      });

      fireEvent.keyDown(ref.current?.querySelectorAll('.rs-rate-character')[2] as HTMLElement, {
        key: 'Enter'
      });

      expect(onChange).to.have.been.calledWith(3);
    });

    it('Should handle right arrow key with allowHalf=true', () => {
      const onChange = sinon.spy();
      const ref = React.createRef<HTMLUListElement>();

      render(<Rate ref={ref} defaultValue={2} allowHalf onChange={onChange} />);

      fireEvent.keyDown(ref.current?.querySelectorAll('.rs-rate-character')[2] as HTMLElement, {
        key: 'ArrowRight'
      });

      fireEvent.keyDown(ref.current?.querySelectorAll('.rs-rate-character')[2] as HTMLElement, {
        key: 'Enter'
      });

      expect(onChange).to.have.been.calledWith(2.5);
    });

    it('Should handle left arrow key with allowHalf=false', () => {
      const onChange = sinon.spy();
      const ref = React.createRef<HTMLUListElement>();

      render(<Rate ref={ref} defaultValue={3} onChange={onChange} />);

      fireEvent.keyDown(ref.current?.querySelectorAll('.rs-rate-character')[2] as HTMLElement, {
        key: 'ArrowLeft'
      });

      fireEvent.keyDown(ref.current?.querySelectorAll('.rs-rate-character')[2] as HTMLElement, {
        key: 'Enter'
      });

      expect(onChange).to.have.been.calledWith(2);
    });

    it('Should handle left arrow key with allowHalf=true', () => {
      const onChange = sinon.spy();
      const ref = React.createRef<HTMLUListElement>();

      render(<Rate ref={ref} defaultValue={3} allowHalf onChange={onChange} />);

      fireEvent.keyDown(ref.current?.querySelectorAll('.rs-rate-character')[2] as HTMLElement, {
        key: 'ArrowLeft'
      });

      fireEvent.keyDown(ref.current?.querySelectorAll('.rs-rate-character')[2] as HTMLElement, {
        key: 'Enter'
      });

      expect(onChange).to.have.been.calledWith(2.5);
    });

    it('Should not exceed max value when using right arrow key', () => {
      const onChange = sinon.spy();
      const ref = React.createRef<HTMLUListElement>();
      const max = 5;

      render(<Rate ref={ref} defaultValue={max - 1} onChange={onChange} />);

      // First press right arrow to reach max
      fireEvent.keyDown(
        ref.current?.querySelectorAll('.rs-rate-character')[max - 1] as HTMLElement,
        {
          key: 'ArrowRight'
        }
      );
      fireEvent.keyDown(
        ref.current?.querySelectorAll('.rs-rate-character')[max - 1] as HTMLElement,
        {
          key: 'Enter'
        }
      );

      expect(onChange).to.have.been.calledWith(max);
      onChange.resetHistory();

      // Try to exceed max
      fireEvent.keyDown(
        ref.current?.querySelectorAll('.rs-rate-character')[max - 1] as HTMLElement,
        {
          key: 'ArrowRight'
        }
      );

      // Verify visual state still shows max stars
      expect(ref.current?.querySelectorAll('.rs-rate-character-full')).to.have.length(max);
    });

    it('Should not go below 0 when using left arrow key', () => {
      const onChange = sinon.spy();
      const ref = React.createRef<HTMLUListElement>();

      render(<Rate ref={ref} defaultValue={1} onChange={onChange} />);

      // First press left arrow to reach 0
      fireEvent.keyDown(ref.current?.querySelectorAll('.rs-rate-character')[0] as HTMLElement, {
        key: 'ArrowLeft'
      });
      fireEvent.keyDown(ref.current?.querySelectorAll('.rs-rate-character')[0] as HTMLElement, {
        key: 'Enter'
      });

      expect(onChange).to.have.been.calledWith(0);
      onChange.resetHistory();

      // Try to go below 0
      fireEvent.keyDown(ref.current?.querySelectorAll('.rs-rate-character')[0] as HTMLElement, {
        key: 'ArrowLeft'
      });

      // Verify visual state shows no filled stars
      expect(ref.current?.querySelectorAll('.rs-rate-character-full')).to.have.length(0);
    });
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
