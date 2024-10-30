import { useMemo } from 'react';
import ArrowUpLineIcon from '@rsuite/icons/ArrowUpLine';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';

import { TypeAttributes } from '@/internals/types';
import useCustom from './useCustom';

export function useToggleCaret(placement: TypeAttributes.Placement8 | TypeAttributes.Placement) {
  const { rtl } = useCustom('Dropdown');
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
