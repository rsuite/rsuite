import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, act } from '@testing-library/react';
import sinon from 'sinon';
import TextMask, { TextMaskProps } from '../TextMask';
import mergeRefs from '../../utils/mergeRefs';

type TextMastTestInstance = {
  input: HTMLInputElement;
  updateValue: (newValue?: string | number) => void;
  updateProps: (props: TextMaskProps) => void;
};

const TextMaskTest = React.forwardRef((props: TextMaskProps, ref) => {
  // eslint-disable-next-line react/prop-types
  const { value: valueProp, ...rest } = props;
  const [value, setValue] = React.useState(valueProp || '');
  const [restProps, setRestProps] = React.useState(rest);
  React.useImperativeHandle(ref, () => ({
    input: inputRef.current,
    updateValue: value => {
      setValue(typeof value !== 'undefined' ? value : 'abc');
    },
    updateProps: props => {
      setRestProps(Object.assign({}, rest, props));
    }
  }));

  const inputRef = React.useRef();
  return <TextMask value={value} {...restProps} ref={mergeRefs(ref, inputRef)} />;
});

describe('TextMask', () => {
  it('does not throw when instantiated', () => {
    expect(() =>
      render(
        <TextMask
          mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          guide={true}
        />
      )
    ).not.to.throw();
  });

  it('renders a single input element', () => {
    const { getByTestId } = render(
      <TextMask
        data-testid="test"
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}
      />
    );

    expect(getByTestId('test').tagName).to.be.equal('INPUT');
  });

  it('renders correctly with an undefined value', () => {
    const { getByTestId } = render(
      <TextMask
        data-testid="test"
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}
      />
    );
    expect((getByTestId('test') as HTMLInputElement).value).to.equal('');
  });

  it('renders correctly with an initial value', () => {
    const { getByTestId } = render(
      <TextMask
        data-testid="test"
        value="123"
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}
      />
    );

    expect((getByTestId('test') as HTMLInputElement).value).to.equal('(123) ___-____');
  });

  it('renders mask instead of empty string when showMask is true', () => {
    const { getByTestId } = render(
      <TextMask
        data-testid="test"
        showMask={true}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}
      />
    );
    expect((getByTestId('test') as HTMLInputElement).value).to.equal('(___) ___-____');
  });

  it('does not render mask instead of empty string when showMask is false', () => {
    const { getByTestId } = render(
      <TextMask
        data-testid="test"
        showMask={false}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}
      />
    );
    expect((getByTestId('test') as HTMLInputElement).value).to.equal('');
  });

  it('does not render masked characters', () => {
    const { getByTestId } = render(
      <TextMask
        data-testid="test"
        value="abc"
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}
      />
    );

    expect((getByTestId('test') as HTMLInputElement).value).to.equal('(___) ___-____');
  });

  it('does not allow masked characters', () => {
    const inputRef = React.createRef<TextMastTestInstance>();

    render(
      <TextMaskTest
        ref={inputRef}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}
      />
    );

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('');

    act(() => {
      (inputRef.current as TextMastTestInstance).updateValue();
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('');
  });

  it('can be disabled by setting the mask to false', () => {
    const { getByTestId } = render(<TextMask data-testid="test" value="123abc" mask={false} />);
    expect((getByTestId('test') as HTMLInputElement).value).to.equal('123abc');
  });

  it('can call textMaskInputElement.update to update the inputElement.value', () => {
    const inputRef = React.createRef();

    render(
      <TextMaskTest
        ref={inputRef}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('');

    act(() => {
      (inputRef.current as TextMastTestInstance).input.value = '12345';
      ReactTestUtils.Simulate.change((inputRef.current as TextMastTestInstance).input);
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) 45_-____');
  });

  it('can pass value to updateValue method', () => {
    const inputRef = React.createRef();

    render(
      <TextMaskTest
        ref={inputRef}
        value="123"
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) ___-____');

    act(() => {
      (inputRef.current as TextMastTestInstance).updateValue('1234');
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) 4__-____');
  });

  it('can pass textMaskConfig to updateValue method', () => {
    const inputRef = React.createRef();

    render(<TextMaskTest ref={inputRef} value="123" mask={false} />);

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('123');

    act(() => {
      (inputRef.current as TextMastTestInstance).updateProps({
        value: '1234',
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      });
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) 4__-____');
  });

  it('accepts function as mask property', () => {
    const { getByTestId } = render(
      <TextMask
        data-testid="test"
        value="1234"
        mask={value => {
          expect(value).to.equal('1234');
          return [
            '(',
            /[1-9]/,
            /\d/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/
          ];
        }}
      />
    );
    expect((getByTestId('test') as HTMLInputElement).value).to.equal('(123) 4__-____');
  });

  it('accepts pipe function', () => {
    const { getByTestId } = render(
      <TextMask
        data-testid="test"
        value="1234"
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        pipe={value => {
          expect(value).to.equal('(123) 4__-____');
          return 'abc';
        }}
      />
    );
    expect((getByTestId('test') as HTMLInputElement).value).to.equal('abc');
  });

  it('calls `onChange` when a change event is received', () => {
    const onChangeSpy = sinon.spy(event => {
      expect(event.target.value).to.equal('123');
    });
    const { getByTestId } = render(
      <TextMask
        data-testid="test"
        value="123"
        onChange={onChangeSpy}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}
      />
    );
    ReactTestUtils.Simulate.change(getByTestId('test'), {
      target: { value: '123' } as any
    });
    expect(onChangeSpy.callCount).to.equal(1);
  });

  it('calls props.onBlur when a change event is received', () => {
    const onBlurSpy = sinon.spy(event => {
      expect(event.target.value).to.equal('(123) ___-____');
    });
    const { getByTestId } = render(
      <TextMask
        data-testid="test"
        value="123"
        onBlur={onBlurSpy}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}
      />
    );
    ReactTestUtils.Simulate.blur(getByTestId('test'));
    expect(onBlurSpy.callCount).to.equal(1);
  });

  // test fix for issues #230, #483, #778 etc.
  it('works correct in stateful Component', () => {
    const inputRef = React.createRef<TextMastTestInstance>();

    render(
      <TextMaskTest
        ref={inputRef}
        value="1234"
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={false}
      />
    );

    // Initial value "1234" from StatefulComponent is masked correct
    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) 4');

    // Simulate deleting last char "4" from input
    (inputRef.current as TextMastTestInstance).input.value = '(123';

    // Simulate onChange event with current value "(123"
    ReactTestUtils.Simulate.change((inputRef.current as TextMastTestInstance).input, {
      target: { value: '(123' } as any
    });

    // Now we expect to see value "(123" instead of "(123) "
    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123');
  });
});

// Test for issue #806
describe('TextMask as controlled component', () => {
  it('works if value prop was changed', () => {
    const inputRef = React.createRef<TextMastTestInstance>();

    render(
      <TextMaskTest
        ref={inputRef}
        value=""
        guide={false}
        placeholderChar="_"
        showMask={false}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );

    act(() => {
      (inputRef.current as TextMastTestInstance).updateValue('123');
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) ');

    act(() => {
      (inputRef.current as TextMastTestInstance).updateValue('12345678901234567890');
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) 456-7890');

    act(() => {
      (inputRef.current as TextMastTestInstance).updateValue('');
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('');
  });

  it('works if showMask prop was changed', () => {
    const inputRef = React.createRef();

    render(
      <TextMaskTest
        ref={inputRef}
        value=""
        guide
        placeholderChar="_"
        showMask={false}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );

    act(() => {
      (inputRef.current as TextMastTestInstance).updateProps({ showMask: true });
    });
    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(___) ___-____');
  });

  it('works if guide prop was changed', () => {
    const inputRef = React.createRef();

    render(
      <TextMaskTest
        ref={inputRef}
        value=""
        guide={false}
        placeholderChar="_"
        showMask={false}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );

    act(() => {
      (inputRef.current as TextMastTestInstance).updateValue(123);
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) ');

    act(() => {
      (inputRef.current as TextMastTestInstance).updateProps({
        guide: true
      });
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) ___-____');
  });

  it('works if placeholderChar prop was changed', () => {
    const inputRef = React.createRef();

    render(
      <TextMaskTest
        ref={inputRef}
        value=""
        guide={false}
        placeholderChar="_"
        showMask
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );

    act(() => {
      (inputRef.current as TextMastTestInstance).updateProps({ guide: true });
      (inputRef.current as TextMastTestInstance).updateValue('123');
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) ___-____');

    act(() => {
      (inputRef.current as TextMastTestInstance).updateProps({ guide: true, placeholderChar: '*' });
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) ***-****');
  });

  it('works if mask as array prop was changed', () => {
    const inputRef = React.createRef();

    render(
      <TextMaskTest
        ref={inputRef}
        value=""
        guide
        placeholderChar="_"
        showMask
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );

    act(() => {
      (inputRef.current as TextMastTestInstance).updateValue('1234567890');
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) 456-7890');

    act(() => {
      (inputRef.current as TextMastTestInstance).updateProps({
        mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
      });
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) 456-78-90');
  });

  it('works if mask as function prop was changed', () => {
    const inputRef = React.createRef();

    render(
      <TextMaskTest
        ref={inputRef}
        value=""
        guide
        placeholderChar="_"
        showMask
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );

    act(() => {
      (inputRef.current as TextMastTestInstance).updateValue('1234567890');
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) 456-7890');

    act(() => {
      (inputRef.current as TextMastTestInstance).updateProps({
        mask: () => [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      });
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('123 456-7890');
  });

  it('works if pipe prop was changed', () => {
    const inputRef = React.createRef();

    render(
      <TextMaskTest
        ref={inputRef}
        value=""
        guide
        placeholderChar="_"
        showMask
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );

    act(() => {
      (inputRef.current as TextMastTestInstance).updateValue('1234567890');
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) 456-7890');

    act(() => {
      (inputRef.current as TextMastTestInstance).updateProps({
        pipe: conformedValue =>
          ({
            value: `Tel. ${conformedValue}`,
            indexesOfPipedChars: [0, 1, 2, 3, 4]
          } as any)
      });
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('Tel. (123) 456-7890');

    act(() => {
      (inputRef.current as TextMastTestInstance).updateProps({
        pipe: undefined
      });
    });

    expect((inputRef.current as TextMastTestInstance).input.value).to.equal('(123) 456-7890');
  });
});
