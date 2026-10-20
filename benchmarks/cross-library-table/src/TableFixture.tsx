import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Adapter from 'table-adapter';
import { ledger } from './domain';
import type { SortState } from './types';
import './fixture.css';
declare const __LIBRARY__: string;
function TableFixture() {
  const [query, setQuery] = useState('');
  const [sort, onSort] = useState<SortState>(null);
  const [selected, onSelected] = useState<string[]>([]);
  const rows = ledger.filter(row => row.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <main>
      <h1>Ledger workflow — {__LIBRARY__}</h1>
      <label>
        Filter entries <input value={query} onChange={event => setQuery(event.target.value)} />
      </label>
      <button type="button" onClick={() => setQuery('')}>
        Clear filter
      </button>
      <output aria-label="Selected row keys">{JSON.stringify([...selected].sort())}</output>
      <section aria-label="Ledger">
        <Adapter
          rows={rows}
          sort={sort}
          onSort={onSort}
          selected={selected}
          onSelected={onSelected}
        />
      </section>
    </main>
  );
}
createRoot(document.getElementById('root')!).render(<TableFixture />);
