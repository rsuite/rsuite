# useAsyncSearch

Search with a controlled query, cancellation, loading feedback and recoverable errors. The hook supports remote requests and asynchronous local filtering.

This API is unreleased. The production documentation site continues to use the published RSuite package; add its documentation route when a release includes this API.

## Usage

```tsx
import { useAsyncSearch } from 'rsuite';

interface Product {
  id: string;
  label: string;
}

function useProductSearch(query: string, endpoint: string) {
  return useAsyncSearch<Product>({
    query,
    enabled: query.trim().length > 0,
    dependencies: [endpoint],
    async search({ query, signal }) {
      const url = new URL(endpoint, window.location.href);
      url.searchParams.set('q', query);
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error('Unable to load products.');
      return response.json();
    }
  });
}
```

Render `items`, use `loading` for a loading indicator, and show `error.message` with a button that calls `reload` when a request fails. Results are empty while loading, disabled or failed, so an earlier query's options cannot be selected as current results.

The hook is also available as the default or named export of `rsuite/useAsyncSearch`.

## Request dependencies

A change to `query`, `enabled`, or a value in `dependencies` updates the request. Dependencies are compared with `Object.is`; pass new object or array references when their contents change.

Inline `search` functions are supported. Changing only the function reference does not run it again. Include captured values that affect results in `dependencies`, such as the endpoint, input data, locale or filters. `query` and `enabled` are already tracked. `reload()` starts the current query again using the latest committed search function; it does nothing while disabled.

```tsx
const result = useAsyncSearch({
  query,
  dependencies: [records, locale],
  search: ({ query, signal }) => filterRecords(records, query, { locale, signal })
});
```

`search` may return an array or a promise of an array. Pass its `signal` to `fetch` or check it in a local filtering task. A replaced or disconnected request is aborted, and a late result or rejection is ignored even if the search function does not honor the signal. The hook copies the returned array; item objects retain their identity. Treat `items` as immutable.

Returning a promise does not move synchronous work off the main thread. Large local searches should yield cooperatively or use a worker inside the search function.

## State and lifecycle

| Status    | `loading` | `items`         | `error` |
| --------- | --------- | --------------- | ------- |
| `idle`    | `false`   | Empty           | `null`  |
| `pending` | `true`    | Empty           | `null`  |
| `success` | `false`   | Current results | `null`  |
| `error`   | `false`   | Empty           | `Error` |

`enabled` defaults to `true`. Disabling or unmounting aborts the current request. React Activity also aborts work when it disconnects effects and runs the current query again when effects reconnect.

Searches start after a client commit. Server rendering starts no requests and returns `pending`, or `idle` when disabled, matching the first client render. Synchronous exceptions, rejected promises and invalid result shapes become the `error` state. Call `reload` to retry after the cause has been addressed.
