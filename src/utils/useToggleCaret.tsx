import { useMemo } from 'react';
import ArrowDownLineIcon from '@rsuite/icons/legacy/ArrowDownLine';
import ArrowUpLineIcon from '@rsuite/icons/legacy/ArrowUpLine';
import ArrowLeftLineIcon from '@rsuite/icons/legacy/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/legacy/ArrowRightLine';

import { TypeAttributes } from '../@types/common';
import useCustom from './useCustom';

function useToggleCaret(placement: TypeAttributes.Placement8 | TypeAttributes.Placement) {
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
