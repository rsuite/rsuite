import React from 'react';
export function FieldFrame({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="bench-field" data-form-field={name}>
      {children}
    </div>
  );
}
export function BillingToggle({
  checked,
  onChange
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="bench-toggle">
      <input
        type="checkbox"
        aria-label="Billing details"
        checked={checked}
        onChange={event => onChange(event.currentTarget.checked)}
      />{' '}
      Billing details
    </label>
  );
}
export function Actions({ reset }: { reset: () => void }) {
  return (
    <div className="bench-actions">
      <button type="submit">Submit</button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
