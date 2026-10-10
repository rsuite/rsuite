import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../Modal';
import Drawer from '../../../Drawer';
import CustomProvider from '../../../CustomProvider';
import Whisper from '../../../Whisper';
import Tooltip from '../../../Tooltip';
import useToaster from '../../../useToaster';

export type PortalKind = 'modal' | 'drawer' | 'whisper' | 'provider';
export interface PortalContainerFixtureProps {
  kind: PortalKind;
  initiallyOpen?: boolean;
  onReady?: (api: { setContainer: (id: string) => void; resolutions: () => number }) => void;
}

function ToastActions() {
  const toaster = useToaster();
  return (
    <>
      <button
        type="button"
        onClick={() =>
          toaster.push(<div data-testid="portal-content">Toast content</div>, { duration: 0 })
        }
      >
        Push toast
      </button>
      <button type="button" onClick={() => toaster.clear()}>
        Clear toasts
      </button>
    </>
  );
}

export default function PortalContainerFixture({
  kind,
  initiallyOpen = false,
  onReady
}: PortalContainerFixtureProps) {
  const [open, setOpen] = useState(initiallyOpen);
  const [containerId, setContainer] = useState('portal-a');
  const resolutions = useRef(0);
  const container = () => {
    resolutions.current++;
    return containerId === 'body' ? document.body : document.getElementById(containerId)!;
  };
  useEffect(() => {
    onReady?.({ setContainer, resolutions: () => resolutions.current });
  }, [onReady]);
  if (kind === 'provider')
    return (
      <CustomProvider toastContainer={container}>
        <ToastActions />
      </CustomProvider>
    );
  if (kind === 'whisper')
    return (
      <>
        <Whisper
          container={container}
          trigger="none"
          open={open}
          speaker={<Tooltip data-testid="portal-content">Tooltip content</Tooltip>}
        >
          <button type="button" onClick={() => setOpen(true)}>
            Open overlay
          </button>
        </Whisper>
        <div style={{ marginTop: 64 }}>
          <button type="button" onClick={() => setOpen(false)}>
            Close overlay
          </button>
        </div>
      </>
    );
  const Component = kind === 'modal' ? Modal : Drawer;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open overlay
      </button>
      <Component open={open} reduceMotion container={container} onClose={() => setOpen(false)}>
        <Modal.Body>
          <div data-testid="portal-content">Dialog content</div>
          <button type="button" onClick={() => setOpen(false)}>
            Close overlay
          </button>
        </Modal.Body>
      </Component>
    </>
  );
}
