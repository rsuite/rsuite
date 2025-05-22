import React from 'react';
import userEvent from '@testing-library/user-event';
import Toggle from '../Toggle';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Toggle', () => {
  testStandardProps(<Toggle />, {
    sizes: ['xl', 'lg', 'md', 'sm', 'xs'],
    colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  });

  it('Should output a toggle', () => {
    const { container } = render(<Toggle />);

    expect(container.firstChild).to.have.class('rs-toggle');
    expect(screen.getByRole('switch')).to.exist;
  });

  it('Should be disabled', () => {
    render(<Toggle disabled />);
    expect(screen.getByRole('switch')).to.have.attribute('disabled');
    expect(screen.getByRole('switch')).to.have.attr('aria-disabled', 'true');
  });

  it('Should be checked', () => {
    render(<Toggle checked />);
    expect(screen.getByRole('switch')).to.be.checked;
    expect(screen.getByRole('switch')).to.have.attr('aria-checked', 'true');
  });

  it('Should render checkedChildren', () => {
    render(<Toggle unCheckedChildren="off" />);
    expect(screen.getByText('off')).to.have.class('rs-toggle-inner');
    expect(screen.getByRole('switch')).to.have.attr('aria-labelledby', screen.getByText('off').id);
  });

  it('Should render unCheckedChildren', () => {
    render(<Toggle checkedChildren="on" checked />);
    expect(screen.getByText('on')).to.have.class('rs-toggle-inner');
    expect(screen.getByRole('switch')).to.have.attr('aria-labelledby', screen.getByText('on').id);
  });

  it('Should have a label', () => {
    render(<Toggle>Developer mode</Toggle>);

    expect(screen.getByText('Developer mode')).to.have.class('rs-toggle-label');
    expect(screen.getByRole('switch')).to.have.attr(
      'aria-labelledby',
      screen.getByText('Developer mode').id
    );
  });

  it('Should have an aria-labelledby attribute set to the correct id', () => {
    render(
      <Toggle checkedChildren="on" unCheckedChildren="off">
        Developer mode
      </Toggle>
    );

    expect(screen.getByRole('switch')).to.have.attr(
      'aria-labelledby',
      screen.getByText('Developer mode').id
    );
  });

  describe('onChange', () => {
    it('Should call onChange callback with checked state', () => {
      const onChange = vi.fn();

      const { rerender } = render(<Toggle onChange={onChange} data-testid="toggle" />);
      fireEvent.click(screen.getByTestId('toggle'));
      expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));

      rerender(<Toggle defaultChecked onChange={onChange} data-testid="toggle" />);
      fireEvent.click(screen.getByTestId('toggle'));
      expect(onChange).toHaveBeenCalledWith(false, expect.any(Object));
    });

    it('Should emit ChangeEvent with correct target name, type and checked state', () => {
      const onChange = vi.fn();

      const { rerender } = render(
        <Toggle name="toggle" onChange={onChange} data-testid="toggle" />
      );
      fireEvent.click(screen.getByTestId('toggle'));

      let event = onChange.mock.calls[0][1];
      expect(event.target).to.have.property('name', 'toggle');
      expect(event.target).to.have.property('type', 'checkbox');
      expect(event.target).to.have.property('checked', true);

      rerender(<Toggle name="toggle" defaultChecked onChange={onChange} data-testid="toggle" />);
      fireEvent.click(screen.getByTestId('toggle'));

      event = onChange.mock.calls[1][1];
      expect(event.target).to.have.property('name', 'toggle');
      expect(event.target).to.have.property('type', 'checkbox');
      expect(event.target).to.have.property('checked', false);
    });

    it('Should toggle with the Space key', async () => {
      const onChange = vi.fn();

      const { rerender } = render(<Toggle onChange={onChange} data-testid="toggle" />);
      screen.getByRole('switch').focus();
      userEvent.keyboard(' ');

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
      });

      rerender(<Toggle defaultChecked onChange={onChange} data-testid="toggle" />);

      screen.getByRole('switch').focus();
      userEvent.keyboard(' ');

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(false, expect.any(Object));
      });
    });

    it('Should not call `onChange` callback when disabled', () => {
      const onChange = vi.fn();

      render(<Toggle disabled onChange={onChange} data-testid="toggle" />);
      userEvent.click(screen.getByTestId('toggle'));

      expect(onChange).not.toHaveBeenCalled();
    });

    it('Should not call `onChange` callback when readOnly', () => {
      const onChange = vi.fn();

      render(<Toggle readOnly onChange={onChange} data-testid="toggle" />);
      userEvent.click(screen.getByTestId('toggle'));

      expect(onChange).not.toHaveBeenCalled();
    });

    it('Should not call `onChange` callback when loading', () => {
      const onChange = vi.fn();

      render(<Toggle loading onChange={onChange} data-testid="toggle" />);
      userEvent.click(screen.getByTestId('toggle'));

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Loading', () => {
    it('Should have "rs-toggle-loading" className', () => {
      render(<Toggle loading data-testid="toggle" />);
      expect(screen.getByTestId('toggle')).to.have.class('rs-toggle-loading');
    });
    it('Should have `aria-busy` attribute set to `true`', () => {
      render(<Toggle loading />);
      expect(screen.getByRole('switch')).to.have.attr('aria-busy', 'true');
    });
  });

  describe('Label', () => {
    it('Should render label when provided as a prop', () => {
      render(<Toggle label="Custom Label" />);

      expect(screen.getByText('Custom Label')).to.have.class('rs-toggle-label');
      expect(screen.getByRole('switch')).to.have.attr(
        'aria-labelledby',
        screen.getByText('Custom Label').id
      );
    });

    it('Should prioritize label prop over children', () => {
      render(<Toggle label="Label Prop">Children Text</Toggle>);

      expect(screen.getByText('Label Prop')).to.exist;
      expect(screen.queryByText('Children Text')).to.not.exist;
    });
  });

  describe('LabelPlacement', () => {
    it('Should have data-placement attribute set to "end" by default', () => {
      render(<Toggle label="Default Placement" data-testid="toggle" />);

      expect(screen.getByTestId('toggle')).to.have.attr('data-placement', 'end');
    });

    it('Should have data-placement attribute set to "start" when specified', () => {
      render(<Toggle label="Start Placement" labelPlacement="start" data-testid="toggle" />);

      expect(screen.getByTestId('toggle')).to.have.attr('data-placement', 'start');
    });

    it('Should have data-placement attribute set to "end" when specified', () => {
      render(<Toggle label="End Placement" labelPlacement="end" data-testid="toggle" />);

      expect(screen.getByTestId('toggle')).to.have.attr('data-placement', 'end');
    });
  });
});
