import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchItems } from './api';
import type { AsyncItem, RequestRecord } from './types';

const initialItems: AsyncItem[] = Array.from({ length: 1000 }, (_, index) => ({
  value: 'initial-' + (index + 1),
  label: 'Initial ' + (index + 1)
}));

/** Transport ordering is shared application behavior, not a library capability. */
export function useAsyncItems() {
  const [state, setState] = useState({
    items: initialItems,
    query: '',
    loading: false,
    error: null as string | null
  });
  const current = useRef(0);
  const requests = useRef<RequestRecord[]>([]);
  const controllers = useRef(new Set<AbortController>());
  const mounted = useRef(true);
  useEffect(
    () => () => {
      mounted.current = false;
      controllers.current.forEach(controller => controller.abort());
    },
    []
  );
  const onQuery = useCallback((query: string) => {
    if (!mounted.current) return;
    const id = ++current.current;
    const controller = new AbortController();
    controllers.current.add(controller);
    const record: RequestRecord = { id, query, outcome: 'pending' };
    requests.current.push(record);
    if (requests.current.length > 50) throw new Error('Unexpected search request loop');
    setState({ items: [], query, loading: true, error: null });
    fetchItems(query, controller.signal)
      .then(items => {
        record.count = items.length;
        if (!mounted.current || id !== current.current) {
          record.outcome = 'ignored';
          return;
        }
        record.outcome = 'applied';
        setState({ items, query, loading: false, error: null });
      })
      .catch(error => {
        record.error = String(error);
        if (!mounted.current || id !== current.current) {
          record.outcome = 'ignored';
          return;
        }
        record.outcome = 'error';
        setState({ items: [], query, loading: false, error: String(error) });
      })
      .finally(() => controllers.current.delete(controller));
  }, []);
  return { state, onQuery, requests };
}
