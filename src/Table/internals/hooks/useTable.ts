import { useContext } from 'react';
import { TableContext } from '../TableProvider';
import setCss from '../utils/setCssPosition';
import isRTL from '../utils/isRTL';

export const useTable = () => {
  const {
    setCssPosition = setCss,
    rtl = isRTL(),
    hasCustomTreeCol,
    isTree,
    classPrefix
  } = useContext(TableContext);

  return {
    setCssPosition,
    rtl,
    hasCustomTreeCol,
    isTree,
    classPrefix
  };
};

export default useTable;
