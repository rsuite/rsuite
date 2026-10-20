export const lifecycleOwnership = {
  rsuite: 'Native loading/renderLoading/renderEmpty; application request and selection policy',
  antd: 'Native Table loading/Spin and locale.emptyText; application request and selection policy',
  chakra: 'Application loading/empty table-row composition and selection with Chakra primitives',
  heroui:
    'Native React Aria empty rendering through HeroUI; application initial-loading content and request policy'
};
export const lifecycleStates = {
  initial: {
    phase: 'loaded',
    ids: ['entry-000', 'entry-001', 'entry-002'],
    selected: [],
    text: 'Loaded 3 entries'
  },
  selected: {
    phase: 'loaded',
    ids: ['entry-000', 'entry-001', 'entry-002'],
    selected: ['entry-001'],
    text: 'Loaded 3 entries'
  },
  loading: { phase: 'loading', ids: [], selected: [], text: 'Loading entries' },
  empty: { phase: 'empty', ids: [], selected: [], text: 'No entries' },
  recovered: {
    phase: 'recovered',
    ids: ['entry-100', 'entry-101', 'entry-102'],
    selected: [],
    text: 'Recovered 3 entries'
  },
  reselected: {
    phase: 'recovered',
    ids: ['entry-100', 'entry-101', 'entry-102'],
    selected: ['entry-101'],
    text: 'Recovered 3 entries'
  }
};
