import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';

const majorVersion = parseInt(React.version);

interface ChangeEvent {
  change: () => void;
  value: any;
  callCount?: number;
  expectedValue?: (value: any) => void;
}

interface TestControlledUnControlledOptions {
  /**
   * The component props.
   */
  componentProps?: Record<string, any>;
  /**
   * The default value when the component is uncontrolled.
   */
  defaultValue?: any;

  /**
   * The value when the component is controlled.
   * Should be set to a different value than defaultValue.
   */
  value?: any;

  /**
   * The changed value after user interaction.
   */
  changedValue?: any;

  /**
   * Simulate event and return the changed value.
   */
  simulateEvent?: {
    changeValue: (prevValue: any) => { changedValue: any; callCount?: number };
  } | null;

  /**
   * Simulate change events.
   */
  simulateChangeEvents?: ChangeEvent[];

  /**
   * The expected value when the component is not plaintext.
   */
  expectedValue: (value: any) => void;
}

const defaultSimulateChangeEvent = () => {
  const input = screen.getByRole('textbox') as HTMLInputElement;

  userEvent.clear(input);
  userEvent.type(input, 'input');
  return { changedValue: 'input', callCount: undefined };
};

export function testControlledUnControlled(
  TestComponent: React.ComponentType<any>,
  options?: TestControlledUnControlledOptions
) {
  const {
    value = 'value',
    defaultValue = 'default value',
    changedValue = 'changed value',
    simulateEvent = {
      changeValue: defaultSimulateChangeEvent
    },
    simulateChangeEvents = [],
    expectedValue = (value: string) => {
      expect(screen.getByRole('textbox')).to.value(value);
    },
    componentProps
  } = options || {};
  const displayName = TestComponent.displayName;

  describe(`${displayName} - Controlled and uncontrolled value`, () => {
    it('Should render `defaultValue` when no `value`', () => {
      render(<TestComponent defaultValue={defaultValue} {...componentProps} />);

      expectedValue(defaultValue);
    });

    it('Should render `value` when both `value` and `defaultValue` are present', () => {
      if (majorVersion >= 19) {
        render(<TestComponent defaultValue={defaultValue} value={value} {...componentProps} />);

        expectedValue(value);
      }
    });

    it('Should render `value`', () => {
      render(<TestComponent value={value} {...componentProps} />);
      expectedValue(value);
    });

    it('Should render the updated value', () => {
      const { rerender } = render(<TestComponent value={value} {...componentProps} />);

      expectedValue(value);

      rerender(<TestComponent value={changedValue} {...componentProps} />);

      expectedValue(changedValue);
    });

    it('Should be uncontrolled and render default value', () => {
      const { rerender } = render(
        <TestComponent defaultValue={defaultValue} {...componentProps} />
      );

      expectedValue(defaultValue);

      rerender(<TestComponent defaultValue={changedValue} {...componentProps} />);

      expectedValue(defaultValue);
    });

    if (simulateEvent) {
      it('Should be uncontrolled and render user-changed value', () => {
        const onChange = sinon.spy();
        render(
          <TestComponent defaultValue={defaultValue} onChange={onChange} {...componentProps} />
        );

        expectedValue(defaultValue);

        const { changedValue, callCount } = simulateEvent.changeValue(defaultValue);

        expectedValue(changedValue);

        if (typeof callCount === 'number') {
          expect(onChange).to.have.callCount(callCount);
        }
      });
    }

    simulateChangeEvents.forEach(event => {
      it('Should be uncontrolled and render user-changed value', () => {
        const onChange = sinon.spy();
        render(
          <TestComponent defaultValue={defaultValue} onChange={onChange} {...componentProps} />
        );

        expectedValue(defaultValue);

        event.change();

        if (event.expectedValue) {
          event.expectedValue(event.value);
        } else {
          expectedValue(event.value);
        }

        if (event.callCount) {
          expect(onChange).to.have.callCount(event.callCount);
        }
      });
    });

    if (simulateEvent) {
      it('Should call `onChange` and render the updated value', () => {
        const onChange = sinon.spy();
        const TestApp = () => {
          const [controlledValue, setControlledValue] = React.useState(value);
          const handleChange = (nextValue, event) => {
            setControlledValue(nextValue);
            onChange(nextValue, event);
          };
          return (
            <TestComponent value={controlledValue} onChange={handleChange} {...componentProps} />
          );
        };

        render(<TestApp />);

        expectedValue(value);

        const { changedValue, callCount } = simulateEvent.changeValue(value);

        expectedValue(changedValue);
        expect(onChange).to.have.been.calledWithMatch(changedValue);
        if (typeof callCount === 'number') {
          expect(onChange).to.have.callCount(callCount);
        }
      });
    }

    simulateChangeEvents.forEach(event => {
      it('Should call `onChange` and render the updated value', () => {
        const onChange = sinon.spy();
        const TestApp = () => {
          const [controlledValue, setControlledValue] = React.useState(value);
          const handleChange = (nextValue, event) => {
            setControlledValue(nextValue);
            onChange(nextValue, event);
          };
          return (
            <TestComponent value={controlledValue} onChange={handleChange} {...componentProps} />
          );
        };

        render(<TestApp />);

        expectedValue(value);

        event.change();

        if (event.expectedValue) {
          event.expectedValue(event.value);
        } else {
          expectedValue(event.value);
        }

        if (event.callCount) {
          expect(onChange).to.have.callCount(event.callCount);
        }
      });
    });
  });
}
