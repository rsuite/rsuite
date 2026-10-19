import React, { useRef } from 'react';
import PauseIcon from '@rsuite/icons/PauseOutline';
import PlayIcon from '@rsuite/icons/PlayOutline';

interface CarouselRotationControlProps {
  playing: boolean;
  label: string;
  className: string;
  onChange: (playing: boolean) => void;
}

export default function CarouselRotationControl({
  playing,
  label,
  className,
  onChange
}: CarouselRotationControlProps) {
  const pointerPlaying = useRef<boolean | undefined>(undefined);

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      title={label}
      onPointerDown={() => {
        // Focus pauses rotation before a pointer click reaches this button.
        pointerPlaying.current = playing;
      }}
      onPointerCancel={() => {
        pointerPlaying.current = undefined;
      }}
      onClick={event => {
        const wasPlaying = event.detail > 0 ? (pointerPlaying.current ?? playing) : playing;
        pointerPlaying.current = undefined;
        onChange(!wasPlaying);
      }}
    >
      {playing ? (
        <PauseIcon aria-hidden pointerEvents="none" />
      ) : (
        <PlayIcon aria-hidden pointerEvents="none" />
      )}
    </button>
  );
}
