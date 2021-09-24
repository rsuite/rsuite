import { useMemo } from 'react';
import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';

import { TypeAttributes } from '../@types/common';
import useCustom from './useCustom';

function useToggleCaret(placement: TypeAttributes.Placement8 | TypeAttributes.Placement) {
  const { rtl } = useCustom('Dropdown');
  return useMemo(() => {
    switch (true) {
      case /^top/.test(placement):
        return AngleUpIcon;
      case /^right/.test(placement):
        return rtl ? AngleLeftIcon : AngleRightIcon;
      case /^left/.test(placement):
        return rtl ? AngleRightIcon : AngleLeftIcon;
      case /^bottom/.test(placement):
      default:
        return AngleDownIcon;
    }
  }, [placement, rtl]);
}

export default useToggleCaret;
