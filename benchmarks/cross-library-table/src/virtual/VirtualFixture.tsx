import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Adapter from 'virtual-adapter';
import { rows } from './domain';
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
      <button type="button" onClick={() => actionsRef.current?.jumpToIndex(9000)}>
        Jump row 9000
      </button>
      <button type="button" onClick={() => actionsRef.current?.jumpToIndex(9999)}>
        Jump end
      </button>
      <output aria-label="Selected row keys">{JSON.stringify([...selected].sort())}</output>
      <section aria-label="Virtual ledger">
        <Adapter rows={rows} selected={selected} onSelected={onSelected} actionsRef={actionsRef} />
      </section>
    </main>
  );
}
createRoot(document.getElementById('root')!).render(<VirtualFixture />);
