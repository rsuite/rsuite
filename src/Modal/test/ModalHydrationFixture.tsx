import React, { useEffect, useRef, useState } from 'react';
import Modal from '../Modal';
import Drawer from '../../Drawer';

export interface ModalHydrationFixtureProps {
  kind: 'modal' | 'drawer';
  customContainer: boolean;
  reduceMotion: boolean;
  onReady?: (events: () => string[]) => void;
}

export default function ModalHydrationFixture({
  kind,
  customContainer,
  reduceMotion,
  onReady
}: ModalHydrationFixtureProps) {
  const [open, setOpen] = useState(true);
  const events = useRef<string[]>([]);
  const Component = kind === 'modal' ? Modal : Drawer;

  useEffect(() => {
    onReady?.(() => [...events.current]);
  }, [onReady]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>
      <input aria-label="Draft" defaultValue="Server draft" />
      <Component
        open={open}
        reduceMotion={reduceMotion}
        container={customContainer ? () => document.getElementById('portal-target')! : undefined}
        onOpen={() => events.current.push('open')}
        onEntered={() => events.current.push('entered')}
        onExited={() => events.current.push('exited')}
        onClose={() => setOpen(false)}
      >
        <Modal.Header>
          <Modal.Title>Initial dialog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button type="button">First action</button>
          <button type="button" onClick={() => setOpen(false)}>
            Close dialog
          </button>
        </Modal.Body>
      </Component>
    </>
  );
}
