import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PinInput from '../PinInput';
import CustomProvider from '../../CustomProvider';
import Form from '../../Form';
import deDE from '../../locales/de_DE';
import zhCN from '../../locales/zh_CN';
import zhTW from '../../locales/zh_TW';
import '../styles/index.scss';

const fields = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLInputElement>('input:not([type="hidden"])'));

describe('PinInput accessibility', () => {
  it('names the group and every character by default', () => {
    const { container } = render(<PinInput />);
    expect(screen.getByRole('group', { name: 'PIN input' })).toBeInTheDocument();
    expect(fields(container)).toHaveLength(4);
    fields(container).forEach((input, index) => {
      expect(input).toHaveAccessibleName(`Character ${index + 1} of 4`);
    });
  });

  it.each([1, 4, 6])('announces positions for length=%s', length => {
    const { container } = render(<PinInput length={length} />);
    expect(fields(container)).toHaveLength(length);
    fields(container).forEach((input, index) => {
      expect(input).toHaveAccessibleName(`Character ${index + 1} of ${length}`);
    });
  });

  it('names masked password inputs', () => {
    const { container } = render(<PinInput mask defaultValue="1234" />);
    fields(container).forEach((input, index) => {
      expect(input).toHaveAttribute('type', 'password');
      expect(input).toHaveAccessibleName(`Character ${index + 1} of 4`);
    });
  });

  it.each(['alphabetic', 'alphanumeric', /[A-F]/] as const)(
    'names nonnumeric characters with type=%s',
    type => {
      const { container } = render(<PinInput type={type} />);
      fields(container).forEach((input, index) => {
        expect(input).toHaveAccessibleName(`Character ${index + 1} of 4`);
      });
    }
  );

  it.each([{ disabled: true }, { readOnly: true }])('names locked segments (%j)', props => {
    const { container } = render(<PinInput {...props} />);
    fields(container).forEach((input, index) => {
      expect(input).toHaveAccessibleName(`Character ${index + 1} of 4`);
    });
  });

  it('uses an explicit group label without losing character positions', () => {
    const { container } = render(<PinInput aria-label="Verification code" />);
    expect(screen.getByRole('group', { name: 'Verification code' })).toBeInTheDocument();
    fields(container).forEach((input, index) => {
      expect(input).toHaveAccessibleName(`Character ${index + 1} of 4`);
    });
  });

  it('uses an external group label and respects aria-labelledby precedence', () => {
    render(
      <>
        <span id="code-label">Security code</span>
        <PinInput aria-labelledby="code-label" aria-label="Fallback code" />
      </>
    );
    expect(screen.getByRole('group', { name: 'Security code' })).toHaveAttribute(
      'aria-labelledby',
      'code-label'
    );
  });

  it('retains a custom root role and explicit name', () => {
    render(<PinInput role="region" aria-label="Activation" />);
    expect(screen.getByRole('region', { name: 'Activation' })).toBeInTheDocument();
  });

  it.each([undefined, false, true, 'grammar', 'spelling'] as const)(
    'exposes aria-invalid=%s on each focused input',
    invalid => {
      const { container } = render(<PinInput aria-invalid={invalid} />);
      fields(container).forEach(input => {
        if (invalid === undefined) expect(input).not.toHaveAttribute('aria-invalid');
        else expect(input).toHaveAttribute('aria-invalid', String(invalid));
      });
    }
  );

  it('associates instructions with every segment', () => {
    const { container } = render(
      <>
        <p id="code-instructions">Enter the code sent by email.</p>
        <PinInput aria-describedby="code-instructions" />
      </>
    );
    fields(container).forEach(input => {
      expect(input).toHaveAccessibleDescription('Enter the code sent by email.');
    });
  });

  it('associates an invalid code with its error message', () => {
    const { container } = render(
      <>
        <p id="code-error">The code has expired.</p>
        <PinInput aria-invalid aria-errormessage="code-error" />
      </>
    );
    fields(container).forEach(input => {
      expect(input).toHaveAccessibleErrorMessage('The code has expired.');
    });
  });

  it('retains description and validation attributes on the root', () => {
    const { container } = render(
      <PinInput aria-describedby="help" aria-invalid aria-errormessage="error" />
    );
    expect(container.firstElementChild).toHaveAttribute('aria-describedby', 'help');
    expect(container.firstElementChild).toHaveAttribute('aria-invalid', 'true');
    expect(container.firstElementChild).toHaveAttribute('aria-errormessage', 'error');
  });

  it('updates and clears validation attributes on existing inputs', () => {
    const { container, rerender } = render(
      <PinInput aria-describedby="help" aria-invalid aria-errormessage="error" />
    );
    const inputs = fields(container);
    inputs.forEach(input => expect(input).toHaveAttribute('aria-errormessage', 'error'));
    rerender(<PinInput />);
    fields(container).forEach((input, index) => {
      expect(input).toBe(inputs[index]);
      expect(input).not.toHaveAttribute('aria-describedby');
      expect(input).not.toHaveAttribute('aria-invalid');
      expect(input).not.toHaveAttribute('aria-errormessage');
    });
  });

  it('supports instance translations without forwarding locale to the DOM', () => {
    const { container } = render(
      <PinInput length={2} locale={{ groupLabel: 'Access code', characterLabel: 'Part {0}/{1}' }} />
    );
    const group = screen.getByRole('group', { name: 'Access code' });
    expect(group).not.toHaveAttribute('locale');
    fields(container).forEach((input, index) => {
      expect(input).toHaveAccessibleName(`Part ${index + 1}/2`);
    });
  });

  it('fills missing instance translations from defaults', () => {
    render(<PinInput locale={{ characterLabel: 'Position {0} of {1}' }} />);
    expect(screen.getByRole('group', { name: 'PIN input' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Position 1 of 4' })).toBeInTheDocument();
  });

  it('reads provider translations', () => {
    render(
      <CustomProvider
        locale={{ PinInput: { groupLabel: 'Provider code', characterLabel: 'Provider {0}/{1}' } }}
      >
        <PinInput />
      </CustomProvider>
    );
    expect(screen.getByRole('group', { name: 'Provider code' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Provider 1/4' })).toBeInTheDocument();
  });

  it('applies provider, component-default and instance translation precedence', () => {
    render(
      <CustomProvider
        locale={{ PinInput: { groupLabel: 'Provider code', characterLabel: 'Provider {0}/{1}' } }}
        components={{
          PinInput: {
            defaultProps: {
              locale: { groupLabel: 'Default code', characterLabel: 'Default {0}/{1}' }
            }
          }
        }}
      >
        <PinInput locale={{ characterLabel: 'Instance {0}/{1}' }} />
      </CustomProvider>
    );
    expect(screen.getByRole('group', { name: 'Default code' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Instance 1/4' })).toBeInTheDocument();
  });

  it('allows partial provider translations', () => {
    render(
      <CustomProvider locale={{ PinInput: { groupLabel: 'Partial code' } }}>
        <PinInput />
      </CustomProvider>
    );
    expect(screen.getByRole('group', { name: 'Partial code' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Character 1 of 4' })).toBeInTheDocument();
  });

  it('falls back when a locale pack predates PinInput labels', () => {
    render(
      <CustomProvider locale={deDE}>
        <PinInput />
      </CustomProvider>
    );
    expect(screen.getByRole('group', { name: 'PIN input' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Character 1 of 4' })).toBeInTheDocument();
  });

  it.each([
    { locale: zhCN, group: 'PIN 码输入', character: '第 1 个字符，共 2 个' },
    { locale: zhTW, group: 'PIN 碼輸入', character: '第 1 個字元，共 2 個' }
  ])('uses the $locale.code labels', ({ locale, group, character }) => {
    render(
      <CustomProvider locale={locale}>
        <PinInput length={2} />
      </CustomProvider>
    );
    expect(screen.getByRole('group', { name: group })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: character })).toBeInTheDocument();
  });

  it('formats repeated and reordered position placeholders', () => {
    const { container } = render(
      <PinInput length={2} locale={{ characterLabel: '{1} pieces; {0} / {0}' }} />
    );
    fields(container).forEach((input, index) => {
      expect(input).toHaveAccessibleName(`2 pieces; ${index + 1} / ${index + 1}`);
    });
  });

  it('updates character positions when length changes without value callbacks', () => {
    const onChange = vi.fn();
    const onComplete = vi.fn();
    const { container, rerender } = render(
      <PinInput length={2} defaultValue="12" onChange={onChange} onComplete={onComplete} />
    );
    expect(fields(container)[0]).toHaveAccessibleName('Character 1 of 2');
    rerender(<PinInput length={6} defaultValue="12" onChange={onChange} onComplete={onComplete} />);
    fields(container).forEach((input, index) => {
      expect(input).toHaveAccessibleName(`Character ${index + 1} of 6`);
    });
    expect(onChange).not.toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('connects Form.Control labels, help and validation to the focused segments', () => {
    const { container } = render(
      <Form formError={{ pin: 'The code has expired.' }}>
        <Form.Group controlId="verification">
          <Form.ControlLabel>Security code</Form.ControlLabel>
          <Form.Control name="pin" accepter={PinInput} />
          <Form.HelpText>Enter the code sent by email.</Form.HelpText>
        </Form.Group>
      </Form>
    );
    expect(screen.getByRole('group', { name: 'Security code' })).toBeInTheDocument();
    fields(container).forEach((input, index) => {
      expect(input).toHaveAccessibleName(`Character ${index + 1} of 4`);
      expect(input).toHaveAccessibleDescription('Enter the code sent by email.');
      expect(input).toHaveAccessibleErrorMessage('The code has expired.');
    });
  });
});

it('keeps ARIA labels off the hidden submission input', () => {
  const { container } = render(<PinInput name="pin" defaultValue="1234" />);
  const hidden = container.querySelector<HTMLInputElement>('input[type="hidden"]')!;
  expect(hidden).toHaveAttribute('name', 'pin');
  expect(hidden).toHaveValue('1234');
  expect(hidden).not.toHaveAttribute('aria-label');
  expect(hidden).not.toHaveAttribute('aria-labelledby');
  expect(screen.getAllByLabelText(/pin input/i)).toEqual([
    screen.getByRole('group', { name: 'PIN input' })
  ]);
});
