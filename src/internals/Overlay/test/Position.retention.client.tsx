import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal, version as reactDOM } from 'react-dom';
import Whisper from '../../../Whisper';
import Tooltip from '../../../Tooltip';
import CustomProvider from '../../../CustomProvider';
import '../../../Tooltip/styles/index.scss';

const cached = new URLSearchParams(location.hash.slice(1)).has('cached');
const count = 16;
const containers: WeakRef<HTMLDivElement>[] = [];
let entered = 0;
let trustedMount = false;
let trustedRemove = false;

function Item({ index }: { index: number }) {
  const [container] = useState(() => {
    const container = document.createElement('div');
    container.dataset.retentionContainer = String(index);
    container.style.cssText = 'position:relative;width:300px;height:120px;margin:8px';
    return container;
  });
  useEffect(() => {
    document.body.appendChild(container);
    containers.push(new WeakRef(container));
    return () => container.remove();
  }, [container]);
  return createPortal(
    <CustomProvider reduceMotion>
      <Whisper
        trigger="none"
        defaultOpen
        placement={cached ? 'auto' : 'bottomStart'}
        preventOverflow={cached}
        container={() => container}
        onEntered={() => entered++}
        speaker={<Tooltip data-testid="retention-tooltip">Container {index}</Tooltip>}
      >
        <button style={{ margin: 20 }}>Trigger {index}</button>
      </Whisper>
    </CustomProvider>,
    container
  );
}

function Fixture() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button
        onClick={event => {
          trustedMount = event.nativeEvent.isTrusted;
          setVisible(true);
        }}
      >
        Mount overlays
      </button>
      <button
        onClick={event => {
          trustedRemove = event.nativeEvent.isTrusted;
          setVisible(false);
        }}
      >
        Remove overlays
      </button>
      {visible && Array.from({ length: count }, (_, index) => <Item key={index} index={index} />)}
    </>
  );
}

const snapshot = () => ({
  cached,
  count,
  entered,
  trustedMount,
  trustedRemove,
  connectedContainers: document.querySelectorAll('[data-retention-container]').length,
  tooltips: document.querySelectorAll('[data-testid="retention-tooltip"]').length,
  liveContainers: containers.filter(ref => ref.deref()).length
});

declare global {
  interface Window {
    __RSUITE_OVERLAY_RETENTION__: {
      runtime: { react: string; reactDOM: string };
      snapshot: typeof snapshot;
      settle: () => Promise<void>;
    };
  }
}

window.__RSUITE_OVERLAY_RETENTION__ = {
  runtime: { react: React.version, reactDOM },
  snapshot,
  settle: () =>
    new Promise<void>(resolve =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    )
};
createRoot(document.getElementById('root')!).render(<Fixture />);
