import { useMemo } from 'react';
import { PlacementCorners, Placement } from '@/internals/types';
import { useCustom } from '../../CustomProvider';
import ArrowUpLineIcon from '@rsuite/icons/ArrowUpLine';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';

export function useToggleCaret(placement: PlacementCorners | Placement) {
  const { rtl } = useCustom();
  return useMemo(() => {
    switch (true) {
      case /^top/.test(placement):
        return ArrowUpLineIcon;
      case /^right/.test(placement):
        return rtl ? ArrowLeftLineIcon : ArrowRightLineIcon;
      case /^left/.test(placement):
        return rtl ? ArrowRightLineIcon : ArrowLeftLineIcon;
      case /^bottom/.test(placement):
      default:
        return ArrowDownLineIcon;
    }
  }, [placement, rtl]);
}

export default useToggleCaret;
