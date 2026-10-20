import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Adapter from 'tree-adapter';
import { treeRows } from './domain';
import '../fixture.css';
declare const __LIBRARY__: string;
const ownership = {
  rsuite: 'Native tree engine; application checkbox selection',
  antd: 'Native tree engine and row selection',
  chakra: 'Application tree flattening, disclosure and checkbox composition',
  heroui: 'React Aria tree engine and selection through HeroUI components'
};
function TreeFixture() {
  const [reversed, setReversed] = useState(false);
  const [selected, onSelected] = useState<string[]>([]);
  return (
    <main>
      <h1>Tree ledger — {__LIBRARY__}</h1>
      <p>{ownership[__LIBRARY__ as keyof typeof ownership]}</p>
      <button type="button" onClick={() => setReversed(value => !value)}>
        Reverse root order
      </button>
      <output aria-label="Selected row keys">{JSON.stringify([...selected].sort())}</output>
      <section aria-label="Tree ledger">
        <Adapter
          rows={reversed ? [...treeRows].reverse() : treeRows}
          selected={selected}
          onSelected={onSelected}
        />
      </section>
    </main>
  );
}
createRoot(document.getElementById('root')!).render(<TreeFixture />);
