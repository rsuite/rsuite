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
    const { container } = render(<Toggle disabled />);
    expect(screen.getByRole('switch')).to.have.attribute('disabled');
    expect(screen.getByRole('switch')).to.have.attr('aria-disabled', 'true');
    expect(container.firstChild).to.have.attr('data-disabled', 'true');
  });

  it('Should be checked', () => {
    const { container } = render(<Toggle checked />);
    expect(screen.getByRole('switch')).to.be.checked;
    expect(screen.getByRole('switch')).to.have.attr('aria-checked', 'true');
    expect(container.firstChild).to.have.attr('data-checked', 'true');
  });

  it('Should start unchecked when no checked state is provided', () => {
    render(<Toggle />);

    expect(screen.getByRole('switch')).not.to.be.checked;
    expect(screen.getByRole('switch')).to.have.attr('aria-checked', 'false');
  });

  it('Should keep controlled checked state until the prop changes', () => {
    const onChange = vi.fn();
    const { rerender } = render(<Toggle checked defaultChecked={false} onChange={onChange} />);

    userEvent.click(screen.getByRole('switch'));

    expect(onChange).toHaveBeenCalledWith(false, expect.any(Object));
    expect(screen.getByRole('switch')).to.be.checked;
    expect(screen.getByRole('switch')).to.have.attr('aria-checked', 'true');
    expect(console.error).not.toHaveBeenCalled();

    rerender(<Toggle checked={false} onChange={onChange} />);

    expect(screen.getByRole('switch')).not.to.be.checked;
    expect(screen.getByRole('switch')).to.have.attr('aria-checked', 'false');
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
    it('Should have "data-loading" attribute set to "true"', () => {
      render(<Toggle loading data-testid="toggle" />);
      expect(screen.getByTestId('toggle')).to.have.attr('data-loading', 'true');
    });

    it('Should have `aria-busy` attribute set to `true`', () => {
      render(<Toggle loading />);
      expect(screen.getByRole('switch')).to.have.attr('aria-busy', 'true');
    });
  });

  describe.each(['readOnly', 'loading'] as const)('%s state', lockedProp => {
    it.each([
      [false, 'input click'],
      [true, 'input click'],
      [false, 'label click'],
      [true, 'label click'],
      [false, 'Space'],
      [true, 'Space']
    ] as const)(
      'Should preserve checked=%s and form value after %s, then allow changes when unlocked',
      (initialChecked, action) => {
        const onChange = vi.fn();
        const { container, rerender } = render(
          <form>
            <Toggle
              name="notifications"
              label="Notifications"
              defaultChecked={initialChecked}
              onChange={onChange}
              {...{ [lockedProp]: true }}
            />
          </form>
        );
        const input = screen.getByRole('switch') as HTMLInputElement;
        const form = container.querySelector('form') as HTMLFormElement;

        if (action === 'Space') {
          input.focus();
          userEvent.keyboard(' ');
        } else {
          userEvent.click(action === 'label click' ? screen.getByText('Notifications') : input);
        }

        expect(onChange).not.toHaveBeenCalled();
        expect(input.checked).to.equal(initialChecked);
        expect(input).to.have.attr('aria-checked', String(initialChecked));
        expect(new FormData(form).has('notifications')).to.equal(initialChecked);

        rerender(
          <form>
            <Toggle
              name="notifications"
              label="Notifications"
              defaultChecked={initialChecked}
              onChange={onChange}
            />
          </form>
        );
        userEvent.click(input);

        expect(onChange).toHaveBeenCalledWith(!initialChecked, expect.any(Object));
        expect(input.checked).to.equal(!initialChecked);
        expect(input).to.have.attr('aria-checked', String(!initialChecked));
        expect(new FormData(form).has('notifications')).to.equal(!initialChecked);
      }
    );
  });

  describe('Label', () => {
    it('Should preserve an explicit aria-label', () => {
      render(<Toggle aria-label="Enable notifications" />);

      expect(screen.getByRole('switch', { name: 'Enable notifications' })).to.exist;
    });

    it.each(['visible label', 'inner label'])('Should let aria-label override the %s', label => {
      render(
        <Toggle
          aria-label="Enable notifications"
          label={label === 'visible label' ? 'Notifications' : undefined}
          unCheckedChildren={label === 'inner label' ? 'Off' : undefined}
        />
      );

      expect(screen.getByRole('switch', { name: 'Enable notifications' })).to.exist;
      expect(screen.getByRole('switch')).not.to.have.attr('aria-labelledby');
    });

    it('Should preserve an explicit aria-labelledby over generated labels', () => {
      render(
        <>
          <span id="notifications-label">Enable notifications</span>
          <Toggle label="Notifications" aria-labelledby="notifications-label" />
        </>
      );

      expect(screen.getByRole('switch', { name: 'Enable notifications' })).to.exist;
      expect(screen.getByRole('switch')).to.have.attr('aria-labelledby', 'notifications-label');
    });

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
