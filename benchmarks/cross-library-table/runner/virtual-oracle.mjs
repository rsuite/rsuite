import { virtualJumpIndex, virtualRowId } from '../src/virtual/workload.mjs';

export const virtualOwnership = {
  rsuite: 'Native virtualization and scrolling API; application checkbox selection',
  antd: 'Native virtualization, scrolling and selection; application row IDs and roving checkbox focus',
  chakra:
    'Application virtualization and roving checkbox focus with TanStack Virtual and Chakra primitives',
  heroui:
    'React Aria virtualization, selection and public focus state through HeroUI; application jump controller'
};
export function virtualOracle(rowCount) {
  const jumpIndex = virtualJumpIndex(rowCount);
  const selectedVirtualKey = virtualRowId(jumpIndex);
  const selected = [selectedVirtualKey];
  return {
    jumpIndex,
    selectedVirtualKey,
    virtualStates: {
      initial: { target: virtualRowId(0), selected: [] },
      jump: { target: selectedVirtualKey, selected: [] },
      selected: { target: selectedVirtualKey, selected },
      top: { target: virtualRowId(0), selected },
      end: { target: virtualRowId(rowCount - 1), selected },
      restored: { target: selectedVirtualKey, selected }
    }
  };
}
