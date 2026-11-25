# useLocaleSearch

Search local records using the current language, with cancellation, loading feedback and recoverable errors. Matching respects complete grapheme boundaries and locale collation, including accents, Turkish dotted and dotless letters, and expansions such as German `ß` and `ss`.

This API is unreleased. The production documentation site continues to use the published RSuite package; enable its page when a release includes this API.

## Usage

```tsx
import { useState } from 'react';
import { useLocaleSearch } from 'rsuite';

const products = [
  { id: 'coffee', name: 'Café' },
  { id: 'street', name: 'Straße' }
];

function ProductSearch() {
  const [query, setQuery] = useState('');
  const { items, loading, error, reload } = useLocaleSearch({
    items: products,
    query,
    getText: product => product.name
  });

  return (
    <>
      <input aria-label="Search products" value={query} onChange={e => setQuery(e.target.value)} />
      {loading && <p role="status">Searching…</p>}
      {error && (
        <p role="alert">
          {error.message} <button onClick={reload}>Retry</button>
        </p>
      )}
      <ul>
        {items.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
}
```

The hook is available from the root package and as the default or named export of `rsuite/useLocaleSearch`. Item types are inferred from `items`. `getText` is required so object records are never implicitly converted to strings.

## Matching

`match` accepts `contains` (the default), `startsWith` or `endsWith`. For example, `Straße` matches the suffix `sse` with German base-sensitivity collation. Matching compares complete grapheme windows, so a query cannot match just one part of a joined emoji.

The locale comes from `CustomProvider`, with `en-GB` as the fallback. Pass `locale` as a string or list of locale preferences to override the provider. Changing the provider locale updates a search unless an explicit override is present.

`collatorOptions` accepts `Intl.CollatorOptions`. Defaults are `usage: 'search'`, `sensitivity: 'base'` and `ignorePunctuation: false`; other options use the platform defaults. Text is normalized to NFC. An empty query, or a query that the collator treats as equivalent to empty text, returns every item without calling `getText`.

## Updating results

Keep the `items` array reference stable between changes, for example with module data, state or `useMemo`. Treat the array and its records as immutable. A new array starts a search; results preserve the original records, their order and duplicate occurrences.

Changes to `query`, `items`, `enabled`, `match`, locale values or collation option values update the search. Inline locale arrays and collation option objects with the same values do not restart it.

Inline `getText` functions are supported. Changing only the function reference does not restart a search. Add other captured values that affect text to `dependencies`:

```tsx
const result = useLocaleSearch({
  items: records,
  query,
  getText: record => record[field],
  dependencies: [field]
});
```

Dependencies use `Object.is` comparisons. `reload()` searches current inputs with the latest committed callback. Mutating an existing input array or record does not trigger a search automatically.

## State and platform support

The return value has the same `items`, `status`, `loading`, `error` and `reload` fields as `useAsyncSearch`. Results are empty while pending, disabled or failed. `enabled` defaults to `true`; when false, status is `idle` and reloading starts no work. Replaced, unmounted and disconnected Activity requests are aborted, and their late results are ignored.

Search starts after a client commit. Server rendering calls neither `getText` nor the Intl constructors and returns `pending`, or `idle` when disabled. Missing `Intl.Collator` or `Intl.Segmenter`, invalid locales, and text extraction failures become the `error` state. Load any required polyfill before searching, then call `reload()` to recover from an initialization failure.

Local work yields cooperatively so a new query can cancel an earlier one. This runs on the main thread and does not guarantee a maximum task duration; normalization and individual Intl calls cannot be interrupted. Use `useAsyncSearch` when lookup should run in a worker or on a server.
