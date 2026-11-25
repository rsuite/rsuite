// Workload contract, independent of the application adapters and their state.
export const rows = Array.from({ length: 24 }, (_, index) => ({
  id: 'entry-' + String(index + 1).padStart(3, '0'),
  name: 'Entry ' + String(index + 1).padStart(4, '0'),
  amount: ((index + 1) * 7) % 11
}));
export const ascending = [...rows].sort((a, b) => a.amount - b.amount || a.id.localeCompare(b.id));
export const selectedRow = ascending[0];
const ascendingIds = ascending.map(row => row.id);
export const expectedStates = {
  initial: { ids: rows.map(row => row.id), selected: [] },
  disabled: { ids: rows.map(row => row.id), selected: [] },
  ascending: { ids: ascendingIds, selected: [] },
  selected: { ids: ascendingIds, selected: [selectedRow.id] },
  descending: { ids: [...ascendingIds].reverse(), selected: [selectedRow.id] },
  filtered: { ids: ['entry-001'], selected: [selectedRow.id] },
  restored: { ids: [...ascendingIds].reverse(), selected: [selectedRow.id] }
};
