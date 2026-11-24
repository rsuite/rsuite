export const virtualOwnership = {
  rsuite: 'Native virtualization and scrolling API; application checkbox selection',
  antd: 'Native virtualization, scrolling and selection; application row IDs and roving checkbox focus',
  chakra:
    'Application virtualization and roving checkbox focus with TanStack Virtual and Chakra primitives',
  heroui:
    'React Aria virtualization, selection and public focus state through HeroUI; application jump controller'
};
export const selectedVirtualKey = 'entry-09000';
export const virtualStates = {
  initial: { target: 'entry-00000', selected: [] },
  jump: { target: 'entry-09000', selected: [] },
  selected: { target: 'entry-09000', selected: ['entry-09000'] },
  top: { target: 'entry-00000', selected: ['entry-09000'] },
  end: { target: 'entry-09999', selected: ['entry-09000'] },
  restored: { target: 'entry-09000', selected: ['entry-09000'] }
};
