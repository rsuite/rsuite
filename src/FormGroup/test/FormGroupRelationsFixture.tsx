import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Form from '../../Form';

export type RelationsMode = 'direct' | 'opaque' | 'custom-roots';

const PlainLabel = ({ id, htmlFor, children }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label id={id} htmlFor={htmlFor}>
    {children}
  </label>
);
const HandleHelp = forwardRef<{ kind: string }, React.HTMLAttributes<HTMLSpanElement>>(
  ({ id, children }, ref) => {
    useImperativeHandle(ref, () => ({ kind: 'help' }), []);
    return <span id={id}>{children}</span>;
  }
);
HandleHelp.displayName = 'HandleHelp';

function Parts({ step }: { step: number }) {
  return (
    <>
      {step < 3 && <Form.Label id={`label-${step}`}>Name</Form.Label>}
      {step < 3 && (
        <Form.Text id={`help-${step}`} tooltip={step === 2}>
          Helpful description
        </Form.Text>
      )}
    </>
  );
}

export default function FormGroupRelationsFixture({
  mode,
  onHydrated
}: {
  mode: RelationsMode;
  onHydrated?: () => void;
}) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    onHydrated?.();
  }, [onHydrated]);
  return (
    <Form formDefaultValue={{ name: 'Ada' }}>
      <Form.Group controlId="name">
        {mode === 'opaque' ? (
          <Parts step={step} />
        ) : (
          <>
            {step < 3 && (
              <Form.Label
                as={mode === 'custom-roots' ? PlainLabel : undefined}
                id={`label-${step}`}
              >
                Name
              </Form.Label>
            )}
            {step < 3 && (
              <Form.Text
                as={mode === 'custom-roots' && step < 2 ? HandleHelp : undefined}
                id={`help-${step}`}
                tooltip={step === 2}
              >
                Helpful description
              </Form.Text>
            )}
          </>
        )}
        <Form.Control
          name="name"
          aria-label="Name"
          {...(mode === 'opaque'
            ? {
                'aria-labelledby': step < 3 ? `label-${step}` : undefined,
                'aria-describedby': step < 2 ? `help-${step}` : undefined
              }
            : {})}
        />
        <button type="button" onClick={() => setStep(value => value + 1)}>
          Next state
        </button>
      </Form.Group>
    </Form>
  );
}
