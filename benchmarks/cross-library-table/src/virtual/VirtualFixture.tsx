import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Adapter from 'virtual-adapter';
import { createRows } from './domain';
import {
  defaultVirtualRowCount,
  parseVirtualRowCount,
  virtualJumpIndex,
  virtualRowId
} from './workload.mjs';
import type { VirtualActions } from './types';
import '../fixture.css';
import './virtual.css';
declare const __LIBRARY__: string;
const ownership = {
  rsuite: 'Native virtualization and scrolling API; application checkbox selection',
  antd: 'Native virtualization, scrolling and selection; application row IDs and roving checkbox focus',
  chakra:
    'Application virtualization and roving checkbox focus with TanStack Virtual and Chakra primitives',
  heroui:
    'React Aria virtualization, selection and public focus state through HeroUI; application jump controller'
};
const requestedRows = new URLSearchParams(window.location.search).get('rows');
const rows = createRows(
  requestedRows === null ? defaultVirtualRowCount : parseVirtualRowCount(requestedRows)
);
const jumpIndex = virtualJumpIndex(rows.length);

function VirtualFixture() {
  const [selected, onSelected] = useState<string[]>([]);
  const actionsRef = useRef<VirtualActions>(null);
  return (
    <main className="virtual-fixture" data-library={__LIBRARY__}>
      <h1>Virtual ledger — {__LIBRARY__}</h1>
      <p>{ownership[__LIBRARY__ as keyof typeof ownership]}</p>
      <button type="button" onClick={() => actionsRef.current?.jumpToIndex(0)}>
        Jump top
      </button>
      <button type="button" onClick={() => actionsRef.current?.jumpToIndex(jumpIndex)}>
        Jump row {jumpIndex}
      </button>
      <button type="button" onClick={() => actionsRef.current?.jumpToIndex(rows.length - 1)}>
        Jump end
      </button>
      <output aria-label="Selected row keys">{JSON.stringify([...selected].sort())}</output>
      <section
        aria-label="Virtual ledger"
        data-row-count={rows.length}
        data-selection-target={virtualRowId(jumpIndex)}
      >
        <Adapter rows={rows} selected={selected} onSelected={onSelected} actionsRef={actionsRef} />
      </section>
    </main>
  );
}
createRoot(document.getElementById('root')!).render(<VirtualFixture />);
