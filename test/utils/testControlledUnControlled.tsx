import React from 'react';
import { render, screen } from '@testing-library/react';
import Sinon from 'sinon';

export function testControlledUnControlled(TestComponent: React.FC<any>, options: any) {
  const {
    value,
    defaultValue,
    expectedValue,
    expectedTextValue,
    changedValue,
    triggerChangeValue
  } = options;
  const displayName = TestComponent.displayName;

  describe(`${displayName} - Controlled and uncontrolled value`, () => {
    it('Should render `defaultValue` when no `value`', () => {
      render(<TestComponent defaultValue={defaultValue} />);

      expectedValue(defaultValue);
    });

    it('Should render `value` when both `value` and `defaultValue` are present', () => {
      render(<TestComponent defaultValue={defaultValue} value={value} />);

      expectedValue(value);
    });

    it('Should render `value`', () => {
      render(<TestComponent value={value} />);

      expectedValue(value);
    });

    it('Should render the updated value', () => {
      const { rerender } = render(<TestComponent value={value} />);

      expectedValue(value);

      rerender(<TestComponent value={changedValue} />);

      expectedValue(changedValue);
    });

    it('Should call `onChange` and render the updated value', () => {
      const onChange = Sinon.spy();
      const TestApp = () => {
        const [value, setValue] = React.useState(options.value);
        const handleChange = (value, event) => {
          setValue(value);
          onChange(value, event);
        };
        return <TestComponent value={value} onChange={handleChange} />;
      };

      render(<TestApp />);

      expectedValue(value);

      const [changedValue, callCount] = triggerChangeValue();

      expectedValue(changedValue);

      expect(onChange).to.have.been.calledWithMatch(changedValue);
      if (callCount === undefined) {
        expect(onChange).to.have.callCount(callCount);
      }
    });

    it('Should be disabled', () => {
      const onChange = Sinon.spy();
      render(<TestComponent disabled onChange={onChange} defaultValue={defaultValue} />);

      expect(screen.getByRole('textbox')).to.have.attribute('disabled');

      triggerChangeValue();

      expect(onChange).to.have.not.been.called;
      expectedValue(defaultValue);
    });

    it('Should be read only', () => {
      const onChange = Sinon.spy();
      render(<TestComponent readOnly onChange={onChange} defaultValue={defaultValue} />);

      expect(screen.getByRole('textbox')).to.have.attribute('readonly');

      triggerChangeValue();

      expect(onChange).to.have.not.been.called;
      expectedValue(defaultValue);
    });

    it('Should be plaintext', () => {
      render(<TestComponent plaintext value={value} defaultValue={defaultValue} />);

      expect(screen.queryByRole('textbox')).to.not.exist;
      expect(screen.queryByRole('text')).to.exist;

      if (typeof value === 'string') {
        expect(screen.getByRole('text')).to.have.text(value);
      }

      expectedTextValue?.(value);
    });
  });
}
