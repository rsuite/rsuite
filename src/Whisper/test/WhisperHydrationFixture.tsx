import React, { useEffect, useId, useRef, useState } from 'react';
import Whisper, { type WhisperInstance } from '../Whisper';
import Tooltip from '../../Tooltip';

export type HydrationMode = 'closed' | 'defaultOpen' | 'controlledOpen';

interface WhisperHydrationFixtureProps {
  mode: HydrationMode;
  onHydrated?: () => void;
}

function HydrationTrigger({
  mode,
  index,
  open
}: {
  mode: HydrationMode;
  index: number;
  open: boolean;
}) {
  const helpId = useId();
  const whisper = useRef<WhisperInstance>(null);
  const container =
    typeof document === 'undefined'
      ? undefined
      : () => document.getElementById('portal-container') || document.body;

  return (
    <>
      <span id={helpId} hidden>
        Author help {index}
      </span>
      <Whisper
        ref={whisper}
        trigger="focus"
        defaultOpen={mode === 'defaultOpen'}
        open={mode === 'controlledOpen' ? open : undefined}
        container={mode === 'controlledOpen' ? container : undefined}
        speaker={<Tooltip>Tooltip {index}</Tooltip>}
      >
        <button
          type="button"
          data-trigger={index}
          aria-describedby={helpId}
          onKeyUp={event => {
            if (event.key === 'Escape') whisper.current?.close();
          }}
        >
          Trigger {index}
        </button>
      </Whisper>
      <button type="button" data-after={index}>
        After {index}
      </button>
    </>
  );
}

export default function WhisperHydrationFixture({
  mode,
  onHydrated
}: WhisperHydrationFixtureProps) {
  const [open, setOpen] = useState(true);
  useEffect(() => onHydrated?.(), [onHydrated]);

  return (
    <>
      <HydrationTrigger mode={mode} index={1} open={open} />
      <HydrationTrigger mode={mode} index={2} open={open} />
      {mode === 'controlledOpen' && (
        <>
          <button type="button" onClick={() => setOpen(false)}>
            Close both
          </button>
          <button type="button" onClick={() => setOpen(true)}>
            Open both
          </button>
        </>
      )}
    </>
  );
}
