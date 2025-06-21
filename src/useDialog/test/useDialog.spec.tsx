import React from 'react';
import useDialog from '../useDialog';
import CustomProvider from '../../CustomProvider';
import DialogContainer from '../DialogContainer';
import { describe, expect, it, vi } from 'vitest';
import { screen, act, fireEvent, waitFor, renderHook } from '@testing-library/react';

describe('useDialog', () => {
  // Create a wrapper component that includes both CustomProvider and DialogContainer
  const TestWrapper = ({ children }) => {
    const dialogContainerRef = React.useRef(null);

    return (
      <CustomProvider dialogContainer={dialogContainerRef}>
        <DialogContainer ref={dialogContainerRef} />
        {children}
      </CustomProvider>
    );
  };

  it('Should render an alert dialog', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    act(() => {
      result.current.alert('This is an alert message');
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('This is an alert message')).to.exist;
    });

    expect(screen.getByRole('button', { name: 'OK' })).to.exist;
    expect(screen.queryByRole('button', { name: 'Cancel' })).to.not.exist;
  });

  it('Should render a confirm dialog with cancel button', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    act(() => {
      result.current.confirm('Are you sure?');
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Are you sure?')).to.exist;
    });

    expect(screen.getByRole('button', { name: 'OK' })).to.exist;
    expect(screen.getByRole('button', { name: 'Cancel' })).to.exist;
  });

  it('Should render a prompt dialog with input field', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    act(() => {
      result.current.prompt('Enter your name:', { defaultValue: 'John' });
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Enter your name:')).to.exist;
    });

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).to.exist;
    expect(input.value).to.equal('John');
  });

  it('Should resolve alert promise when OK button is clicked', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    let alertPromise: Promise<void>;
    let alertResolved = false;

    act(() => {
      alertPromise = result.current.alert('Alert message');
      alertPromise.then(() => {
        alertResolved = true;
      });
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Alert message')).to.exist;
    });

    // Click OK button
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Wait for promise to resolve
    await waitFor(() => {
      expect(alertResolved).to.be.true;
    });
  });

  it('Should resolve confirm promise with true when OK button is clicked', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    let confirmResult: boolean | undefined;

    act(() => {
      result.current.confirm('Confirm message').then(value => {
        confirmResult = value;
      });
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Confirm message')).to.exist;
    });

    // Click OK button
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Wait for promise to resolve
    await waitFor(() => {
      expect(confirmResult).to.be.true;
    });
  });

  it('Should resolve confirm promise when Cancel button is clicked', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    let promiseResolved = false;

    act(() => {
      result.current.confirm('Confirm message').then(() => {
        promiseResolved = true;
      });
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Confirm message')).to.exist;
    });

    // Click Cancel button
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    });

    // Wait for promise to resolve
    await waitFor(
      () => {
        expect(promiseResolved).to.be.true;
      },
      { timeout: 3000 }
    );
  });

  it('Should resolve prompt promise with input value when OK button is clicked', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    let promptResult: string | undefined;

    act(() => {
      result.current.prompt('Enter text:').then(value => {
        promptResult = value;
      });
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Enter text:')).to.exist;
    });

    // Enter text in input
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test input' } });

    // Click OK button
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Wait for promise to resolve
    await waitFor(() => {
      expect(promptResult).to.equal('test input');
    });
  });

  it('Should resolve prompt promise when Cancel button is clicked', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    let promiseResolved = false;

    act(() => {
      result.current.prompt('Enter text:').then(() => {
        promiseResolved = true;
      });
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Enter text:')).to.exist;
    });

    // Click Cancel button
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    });

    // Wait for promise to resolve
    await waitFor(
      () => {
        expect(promiseResolved).to.be.true;
      },
      { timeout: 3000 }
    );
  });

  it('Should render a custom dialog component with open method', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    // Create a custom dialog component
    const CustomDialogComponent = ({ onClose, payload }: CustomDialogProps) => (
      <div data-testid="custom-dialog">
        <div>Custom Dialog</div>
        <div data-testid="payload-content">{payload?.content}</div>
        <button onClick={() => onClose('custom result')}>Close</button>
      </div>
    );

    // Type for the custom component
    type CustomDialogProps = {
      onClose: (result?: any) => void;
      payload?: any;
    };

    let openResult: any;

    act(() => {
      result.current
        .open<CustomDialogProps>(
          CustomDialogComponent as React.ComponentType<CustomDialogProps>,
          { content: 'Custom Content' } as any
        )
        .then(value => {
          openResult = value;
        });
    });

    await waitFor(() => {
      expect(screen.getByTestId('custom-dialog')).to.exist;
    });

    expect(screen.getByText('Custom Dialog')).to.exist;
    expect(screen.getByTestId('payload-content')).to.have.text('Custom Content');

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(openResult).to.equal('custom result');
    });
  });

  it('Should apply severity to dialog', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    act(() => {
      result.current.confirm('Warning message', { severity: 'warning' });
    });

    await waitFor(() => {
      expect(screen.getByText('Warning message')).to.exist;
    });

    const okButton = screen.getByRole('button', { name: 'OK' });
    expect(okButton).to.have.class('rs-btn-orange');
  });

  it('Should use custom okText and cancelText', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    act(() => {
      result.current.confirm('Confirm message', {
        okText: 'Yes',
        cancelText: 'No'
      });
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Confirm message')).to.exist;
    });

    expect(screen.getByRole('button', { name: 'Yes' })).to.exist;
    expect(screen.getByRole('button', { name: 'No' })).to.exist;
  });

  it('Should not show warning when used with CustomProvider', () => {
    const originalWarn = console.warn;
    const mockWarn = vi.fn();
    console.warn = mockWarn;

    renderHook(() => useDialog(), { wrapper: TestWrapper });

    expect(mockWarn).not.toHaveBeenCalled();

    console.warn = originalWarn;
  });

  it('Should show warning when used without CustomProvider', () => {
    const originalWarn = console.warn;
    const mockWarn = vi.fn();
    console.warn = mockWarn;

    renderHook(() => useDialog());

    expect(mockWarn).toHaveBeenCalledWith(
      'Warning: useDialog is being used outside of a CustomProvider. ' +
        'Please wrap your application with <CustomProvider> to ensure proper functionality.'
    );

    console.warn = originalWarn;
  });

  it('Should return a stable object with the same methods', async () => {
    const { result, rerender } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    const dialog1 = result.current;

    rerender();

    const dialog2 = result.current;

    // Check that the methods exist on both objects
    expect(dialog1).to.have.property('alert').that.is.a('function');
    expect(dialog1).to.have.property('confirm').that.is.a('function');
    expect(dialog1).to.have.property('prompt').that.is.a('function');
    expect(dialog1).to.have.property('open').that.is.a('function');

    expect(dialog2).to.have.property('alert').that.is.a('function');
    expect(dialog2).to.have.property('confirm').that.is.a('function');
    expect(dialog2).to.have.property('prompt').that.is.a('function');
    expect(dialog2).to.have.property('open').that.is.a('function');
  });

  it('Should accept valid input when validate function returns true', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    let promptResult: string | undefined;
    const validateFn = (value: string): [boolean, string?] => {
      return [value.length >= 3, 'Input must be at least 3 characters'];
    };

    act(() => {
      result.current.prompt('Enter your name:', { validate: validateFn }).then(value => {
        promptResult = value;
      });
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Enter your name:')).to.exist;
    });

    // Type valid input
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John Doe' } });

    // Click OK button
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Wait for promise to resolve
    await waitFor(() => {
      expect(promptResult).to.equal('John Doe');
    });
  });

  it('Should show validation error when input is invalid', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    let promptResult: string | undefined;
    let promiseResolved = false;
    const validateFn = (value: string): [boolean, string?] => {
      return [value.length >= 3, 'Input must be at least 3 characters'];
    };

    act(() => {
      result.current.prompt('Enter your name:', { validate: validateFn }).then(value => {
        promptResult = value;
        promiseResolved = true;
      });
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Enter your name:')).to.exist;
    });

    // Type invalid input
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Jo' } });

    // Click OK button
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Wait for validation error to appear
    await waitFor(() => {
      expect(screen.getByText('Input must be at least 3 characters')).to.exist;
    });

    // Verify promise has not resolved
    expect(promiseResolved).to.be.false;

    // Type valid input
    fireEvent.change(input, { target: { value: 'John' } });

    // Click OK button again
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Wait for promise to resolve
    await waitFor(() => {
      expect(promiseResolved).to.be.true;
      expect(promptResult).to.equal('John');
    });
  });

  it('Should clear validation error when input changes', async () => {
    const { result } = renderHook(() => useDialog(), { wrapper: TestWrapper });

    const validateFn = (value: string): [boolean, string?] => {
      return [value.length >= 3, 'Input must be at least 3 characters'];
    };

    act(() => {
      result.current.prompt('Enter your name:', { validate: validateFn });
    });

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Enter your name:')).to.exist;
    });

    // Type invalid input
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Jo' } });

    // Click OK button
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Wait for validation error to appear
    await waitFor(() => {
      expect(screen.getByText('Input must be at least 3 characters')).to.exist;
    });

    // Type new input
    fireEvent.change(input, { target: { value: 'Joe' } });

    // Validation error should be cleared
    expect(screen.queryByText('Input must be at least 3 characters')).to.not.exist;
  });
});
