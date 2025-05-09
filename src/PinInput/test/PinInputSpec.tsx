import React from 'react';
import sinon from 'sinon';
import PinInput from '../PinInput';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('PinInput', () => {
  testStandardProps(<PinInput />);

  it('Should render correct number of inputs', () => {
    render(<PinInput length={6} />);
    expect(screen.getAllByRole('textbox')).to.have.length(6);
  });

  it('Should render with default length of 4', () => {
    render(<PinInput />);
    expect(screen.getAllByRole('textbox')).to.have.length(4);
  });

  it('Should render a hidden input for form submission', () => {
    render(<PinInput name="pin-test" />);
    const hiddenInput = document.querySelector('input[type="hidden"]');
    expect(hiddenInput).to.exist;
    expect(hiddenInput).to.have.property('name', 'pin-test');
  });

  // State tests
  it('Should be disabled', () => {
    render(<PinInput disabled placeholder="-" />);
    screen.getAllByRole('textbox').forEach(input => {
      expect(input).to.have.property('disabled', true);
    });
  });

  it('Should not trigger events when disabled', () => {
    const onChange = sinon.spy();
    const { container } = render(<PinInput disabled onChange={onChange} />);
    const inputs = container.querySelectorAll('input');
    const firstInput = Array.from(inputs).find(input => input.type !== 'hidden');

    expect(firstInput).to.exist;
    if (!firstInput) return;

    // Try keyboard input
    fireEvent.keyDown(firstInput, { key: '5' });
    expect(onChange).not.to.have.been.called;

    // Try change event
    fireEvent.change(firstInput, { target: { value: '5' } });
    expect(onChange).not.to.have.been.called;

    // Try paste
    const pasteEvent = new Event('paste', { bubbles: true });
    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: { getData: () => '1234' }
    });
    firstInput.dispatchEvent(pasteEvent);
    expect(onChange).not.to.have.been.called;
  });

  it('Should be read only', () => {
    render(<PinInput readOnly placeholder="-" />);
    screen.getAllByRole('textbox').forEach(input => {
      expect(input).to.have.property('readOnly', true);
    });
  });

  it('Should not trigger events when readOnly', () => {
    const onChange = sinon.spy();
    const { container } = render(<PinInput readOnly onChange={onChange} />);
    const inputs = container.querySelectorAll('input');
    const firstInput = Array.from(inputs).find(input => input.type !== 'hidden');

    expect(firstInput).to.exist;
    if (!firstInput) return;

    // Try keyboard input
    fireEvent.keyDown(firstInput, { key: '5' });
    expect(onChange).not.to.have.been.called;

    // Try change event
    fireEvent.change(firstInput, { target: { value: '5' } });
    expect(onChange).not.to.have.been.called;

    // Try paste
    const pasteEvent = new Event('paste', { bubbles: true });
    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: { getData: () => '1234' }
    });
    firstInput.dispatchEvent(pasteEvent);
    expect(onChange).not.to.have.been.called;
  });

  it('Should apply mask when specified', () => {
    const { container } = render(<PinInput mask value="1234" />);
    const inputs = container.querySelectorAll('input[type="password"]');

    expect(inputs.length).to.be.greaterThan(0);
    expect(inputs.length).to.equal(4);
  });

  it('Should render with placeholder', () => {
    const placeholder = '*';
    render(<PinInput placeholder={placeholder} />);
    screen.getAllByRole('textbox').forEach(input => {
      expect(input).to.have.property('placeholder', placeholder);
    });
  });

  it('Should set otp autoComplete attribute when specified', () => {
    render(<PinInput otp />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      // In Firefox, to.have.property('autocomplete') cannot get the 'one-time-code' value,
      // so we use getAttribute
      expect(input.getAttribute('autocomplete')).to.equal('one-time-code');
    });
  });

  it('Should use default autoComplete attribute when otp not specified', () => {
    render(<PinInput />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      expect(input).to.have.property('autocomplete', 'off');
    });
  });

  // Value handling tests
  it('Should accept value and update', () => {
    render(<PinInput value="1234" onChange={() => {}} length={4} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).to.have.value('1');
    expect(inputs[1]).to.have.value('2');
    expect(inputs[2]).to.have.value('3');
    expect(inputs[3]).to.have.value('4');
  });

  it('Should handle partial values', () => {
    render(<PinInput value="12" onChange={() => {}} length={4} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).to.have.value('1');
    expect(inputs[1]).to.have.value('2');
    expect(inputs[2]).to.have.value('');
    expect(inputs[3]).to.have.value('');
  });

  it('Should truncate values longer than length', () => {
    render(<PinInput value="123456" onChange={() => {}} length={4} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).to.have.value('1');
    expect(inputs[1]).to.have.value('2');
    expect(inputs[2]).to.have.value('3');
    expect(inputs[3]).to.have.value('4');
    // Should not render extra inputs
    expect(screen.getAllByRole('textbox')).to.have.length(4);
  });

  it('Should update hidden input value when pin changes', () => {
    render(<PinInput name="pin-test" value="1234" onChange={() => {}} />);
    const hiddenInput = document.querySelector('input[type="hidden"]');
    expect(hiddenInput).to.have.property('value', '1234');
  });

  // Event handling tests
  it('Should call onChange when input changes', () => {
    const handleChange = sinon.spy(() => {});
    render(<PinInput length={4} onChange={handleChange} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '9' } });
    expect(handleChange).to.have.been.calledWith('9');
  });

  it('Should call onComplete when all inputs are filled', () => {
    const handleComplete = sinon.spy(() => {});
    const handleChange = sinon.spy(() => {});
    render(<PinInput length={4} onChange={handleChange} onComplete={handleComplete} value="123" />);
    const inputs = screen.getAllByRole('textbox');

    // Fill the last input to complete the PIN
    fireEvent.change(inputs[3], { target: { value: '4' } });

    expect(handleChange).to.have.been.calledWith('1234');
    expect(handleComplete).to.have.been.calledWith('1234');
  });

  // Focus management tests
  it('Should move focus to next input on input', () => {
    render(<PinInput length={4} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });

    // Use setTimeout to let the focus change happen
    return waitFor(() => {
      expect(document.activeElement).to.equal(inputs[1]);
    });
  });

  it('Should keep focus on last input when filled', () => {
    render(<PinInput length={4} />);
    const inputs = screen.getAllByRole('textbox');

    // Fill the last input
    fireEvent.change(inputs[3], { target: { value: '4' } });

    expect(document.activeElement).to.equal(inputs[3]);
  });

  it('Should move focus to previous input on backspace when current is empty', () => {
    render(<PinInput length={4} value="123" />);
    const inputs = screen.getAllByRole('textbox');

    // Focus the last input and press backspace with empty value
    inputs[3].focus();
    fireEvent.keyDown(inputs[3], { key: 'Backspace' });

    expect(document.activeElement).to.equal(inputs[2]);
  });

  it('Should clear current input on backspace when it has value', () => {
    const handleChange = sinon.spy(() => {});
    render(<PinInput length={4} value="123" onChange={handleChange} />);
    const inputs = screen.getAllByRole('textbox');

    // Focus an input with value and press backspace
    inputs[2].focus();
    fireEvent.keyDown(inputs[2], { key: 'Backspace' });

    expect(handleChange).to.have.been.calledWith('12');
    expect(document.activeElement).to.equal(inputs[2]);
  });

  it('Should move focus with arrow keys', () => {
    render(<PinInput length={4} />);
    const inputs = screen.getAllByRole('textbox');

    // Focus the second input
    inputs[1].focus();

    // Press left arrow
    fireEvent.keyDown(inputs[1], { key: 'ArrowLeft' });
    expect(document.activeElement).to.equal(inputs[0]);

    // Press right arrow
    fireEvent.keyDown(inputs[0], { key: 'ArrowRight' });
    expect(document.activeElement).to.equal(inputs[1]);
  });

  // Direct keyboard input tests
  it('Should handle direct key input', () => {
    const handleChange = sinon.spy(() => {});
    render(<PinInput length={4} onChange={handleChange} />);
    const inputs = screen.getAllByRole('textbox');

    // Simulate typing a key directly
    inputs[0].focus();
    fireEvent.keyDown(inputs[0], { key: '5' });

    expect(document.activeElement).to.equal(inputs[0]);
  });

  it('Should auto-focus first input when autoFocus is true', () => {
    render(<PinInput autoFocus />);
    const inputs = screen.getAllByRole('textbox');

    expect(document.activeElement).to.equal(inputs[0]);
  });

  it('Should apply correct styles when attached is true', () => {
    const { container } = render(<PinInput attached />);
    const pinInputElement = container.querySelector('.rs-pin-input');
    expect(pinInputElement).to.have.class('rs-pin-input-attached');
  });

  describe('Type validation', () => {
    it('Should use default allowedKeys to restrict non-digit input', () => {
      const onChange = sinon.spy(() => {});
      render(<PinInput length={4} onChange={onChange} />);
      const inputs = screen.getAllByRole('textbox');
      fireEvent.keyDown(inputs[0], { key: 'A' });
      expect(onChange).not.to.have.been.called;

      fireEvent.keyDown(inputs[0], { key: '2' });
      expect(onChange).to.have.been.calledWith('2');
    });

    it('Should filter pasted content using default allowedKeys pattern', async () => {
      const onChange = sinon.spy(() => {});
      render(<PinInput length={4} onChange={onChange} />);
      const inputs = screen.getAllByRole('textbox');
      const pasteEvent = new Event('paste', { bubbles: true });

      Object.defineProperty(pasteEvent, 'clipboardData', {
        value: { getData: () => 'A1B2' }
      });

      inputs[0].dispatchEvent(pasteEvent);
      expect(onChange).to.have.been.calledWith('12');
    });

    it('Should restrict input based on type prop', () => {
      const onChange = sinon.spy();
      render(<PinInput length={4} onChange={onChange} type={/^[0-9]$/} />);
      const inputs = screen.getAllByRole('textbox');

      fireEvent.keyDown(inputs[0], { key: 'A' });
      expect(onChange).not.to.have.been.called;

      fireEvent.keyDown(inputs[0], { key: '1' });
      expect(onChange).to.have.been.calledWith('1');
    });

    it('Should filter paste content based on type prop', async () => {
      const onChange = sinon.spy(() => {});
      render(<PinInput length={4} onChange={onChange} type={/^[A-Fa-f0-9]$/} />);
      const inputs = screen.getAllByRole('textbox');
      const pasteEvent = new Event('paste', { bubbles: true });

      Object.defineProperty(pasteEvent, 'clipboardData', {
        value: {
          getData: () => 'A!B@C#1'
        }
      });

      inputs[0].dispatchEvent(pasteEvent);

      expect(onChange).to.have.been.calledWith('ABC1');
    });

    // Alphabetic type validation
    it('Should restrict input to letters when type="alphabetic"', () => {
      const onChange = sinon.spy();
      render(<PinInput length={4} onChange={onChange} type="alphabetic" />);
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      fireEvent.keyDown(inputs[0], { key: '1' });
      expect(onChange).not.to.have.been.called;
      fireEvent.keyDown(inputs[0], { key: 'A' });
      expect(onChange).to.have.been.calledWith('A');
    });

    it('Should filter pasted content with only letters when type="alphabetic"', async () => {
      const onChange = sinon.spy(() => {});
      render(<PinInput length={4} onChange={onChange} type="alphabetic" />);
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      const pasteEvent = new Event('paste', { bubbles: true });

      Object.defineProperty(pasteEvent, 'clipboardData', { value: { getData: () => 'A1B2c3' } });

      inputs[0].dispatchEvent(pasteEvent);

      expect(onChange).to.have.been.calledWith('ABc');
    });

    // Alphanumeric type validation
    it('Should allow letters and digits when type="alphanumeric"', () => {
      const onChange = sinon.spy();
      render(<PinInput length={4} onChange={onChange} type="alphanumeric" />);
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      fireEvent.keyDown(inputs[0], { key: '!' });
      expect(onChange).not.to.have.been.called;
      fireEvent.keyDown(inputs[0], { key: '5' });
      expect(onChange).to.have.been.calledWith('5');
      fireEvent.keyDown(inputs[0], { key: 'B' });
      expect(onChange).to.have.been.calledWith('B');
    });

    it('Should filter pasted content for alphanumeric type', async () => {
      const onChange = sinon.spy(() => {});
      render(<PinInput length={4} onChange={onChange} type="alphanumeric" />);
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      const pasteEvent = new Event('paste', { bubbles: true });

      Object.defineProperty(pasteEvent, 'clipboardData', { value: { getData: () => 'A!2@b#3' } });

      inputs[0].dispatchEvent(pasteEvent);

      expect(onChange).to.have.been.calledWith('A2b3');
    });

    it('Should handle custom RegExp type properly', () => {
      const onChange = sinon.spy();
      const { container } = render(
        <PinInput length={4} onChange={onChange} type={/^[A-Fa-f0-9]$/} />
      );
      const inputs = container.querySelectorAll('input');
      const firstInput = Array.from(inputs).find(input => input.type !== 'hidden');

      // 确保找到了输入元素
      expect(firstInput).to.exist;
      if (!firstInput) return;

      fireEvent.keyDown(firstInput, { key: 'G' });
      expect(onChange).not.to.have.been.called;

      fireEvent.keyDown(firstInput, { key: 'F' });
      expect(onChange).to.have.been.calledWith('F');
      fireEvent.keyDown(firstInput, { key: 'a' });
      expect(onChange).to.have.been.calledWith('a');
      fireEvent.keyDown(firstInput, { key: '9' });
      expect(onChange).to.have.been.calledWith('9');
    });

    it('Should set correct inputMode based on type prop', () => {
      const { container, rerender } = render(<PinInput type="number" />);
      let inputs = container.querySelectorAll('input');
      inputs.forEach(input => {
        if (input.type !== 'hidden') {
          expect(input).to.have.property('inputMode', 'numeric');
        }
      });

      rerender(<PinInput type="alphabetic" />);
      inputs = container.querySelectorAll('input');
      inputs.forEach(input => {
        if (input.type !== 'hidden') {
          expect(input).to.have.property('inputMode', 'text');
        }
      });

      rerender(<PinInput type="alphanumeric" />);
      inputs = container.querySelectorAll('input');
      inputs.forEach(input => {
        if (input.type !== 'hidden') {
          expect(input).to.have.property('inputMode', 'text');
        }
      });
    });

    it('Should set correct input type based on type and mask props', () => {
      const { container, rerender } = render(<PinInput type="number" />);
      let inputs = container.querySelectorAll('input[type="tel"]');
      expect(inputs.length).to.be.greaterThan(0);

      rerender(<PinInput type="number" mask />);
      inputs = container.querySelectorAll('input[type="password"]');
      expect(inputs.length).to.be.greaterThan(0);

      rerender(<PinInput type="alphabetic" />);
      inputs = container.querySelectorAll('input[type="text"]');
      expect(inputs.length).to.be.greaterThan(0);
    });
  });

  describe('Navigation and deletion', () => {
    it('Should navigate between inputs with arrow keys', () => {
      render(<PinInput length={3} />);
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      inputs[0].focus();
      expect(document.activeElement).to.equal(inputs[0]);
      fireEvent.keyDown(inputs[0], { key: 'ArrowRight' });
      expect(document.activeElement).to.equal(inputs[1]);
      fireEvent.keyDown(inputs[1], { key: 'ArrowRight' });
      expect(document.activeElement).to.equal(inputs[2]);
      fireEvent.keyDown(inputs[2], { key: 'ArrowLeft' });
      expect(document.activeElement).to.equal(inputs[1]);
    });

    it('Should clear current and previous digits on Backspace', () => {
      render(<PinInput defaultValue="12" length={3} />);
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      expect(inputs[0]).to.have.value('1');
      expect(inputs[1]).to.have.value('2');
      inputs[1].focus();
      // clear current
      fireEvent.keyDown(inputs[1], { key: 'Backspace' });
      expect(inputs[1]).to.have.value('');
      expect(document.activeElement).to.equal(inputs[1]);
      // clear previous and move focus
      fireEvent.keyDown(inputs[1], { key: 'Backspace' });
      expect(inputs[0]).to.have.value('');
      expect(document.activeElement).to.equal(inputs[0]);
    });
  });

  describe('Completion callback', () => {
    it('Should call onComplete when all digits are entered', () => {
      const onComplete = sinon.spy();
      render(<PinInput length={3} onComplete={onComplete} />);
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      fireEvent.change(inputs[0], { target: { value: '1' } });
      fireEvent.change(inputs[1], { target: { value: '2' } });
      fireEvent.change(inputs[2], { target: { value: '3' } });
      expect(onComplete).to.have.been.calledWith('123');
    });
  });

  describe('PinInput size', () => {
    const sizes = ['lg', 'md', 'sm', 'xs'] as const;

    sizes.forEach(size => {
      it(`Should render with size="${size}"`, () => {
        const { container } = render(<PinInput size={size} />);
        const inputs = container.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
          expect(input).to.have.class(`rs-input-${size}`);
        });
      });
    });
  });

  describe('Paste handling', () => {
    it('Should handle paste event', async () => {
      const onComplete = sinon.spy(() => {});

      render(<PinInput length={4} onComplete={onComplete} />);

      const inputs = screen.getAllByRole('textbox');
      const pasteEvent = new Event('paste', { bubbles: true });

      Object.defineProperty(pasteEvent, 'clipboardData', {
        value: {
          getData: () => '1234'
        }
      });

      inputs[0].dispatchEvent(pasteEvent);

      expect(onComplete).to.have.been.calledWith('1234');
    });

    it('Should handle paste with non-alphanumeric characters', async () => {
      const handleChange = sinon.spy(() => {});
      render(<PinInput length={4} onChange={handleChange} />);

      const inputs = screen.getAllByRole('textbox');
      const pasteEvent = new Event('paste', { bubbles: true });

      Object.defineProperty(pasteEvent, 'clipboardData', {
        value: {
          getData: () => '1-2.3?4'
        }
      });

      inputs[0].dispatchEvent(pasteEvent);
      expect(handleChange).to.have.been.calledWith('1234');
    });

    it('Should handle paste with more characters than length', async () => {
      const handleChange = sinon.spy(() => {});
      render(<PinInput length={4} onChange={handleChange} />);

      const inputs = screen.getAllByRole('textbox');
      const pasteEvent = new Event('paste', { bubbles: true });

      Object.defineProperty(pasteEvent, 'clipboardData', {
        value: {
          getData: () => '123456'
        }
      });

      inputs[0].dispatchEvent(pasteEvent);

      expect(handleChange).to.have.been.calledWith('1234');
    });
  });
});
