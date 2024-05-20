import { useState, useEffect, useMemo } from 'react';
import { shallowEqual } from '@/internals/utils';
import type { ItemDataType } from '@/internals/types';

export interface InputItemDataType<T = number | string> extends ItemDataType<T> {
  create?: boolean;
}

interface UseDataProps {
  controlledData?: InputItemDataType[];
  cacheData?: InputItemDataType[];
  onChange?: (data: ItemDataType[]) => void;
}

function useData(props: UseDataProps) {
  const { controlledData = [], cacheData = [], onChange } = props;
  const [uncontrolledData, setData] = useState(controlledData);
  const [newData, setNewData] = useState<InputItemDataType[]>([]);

  const data = useMemo(() => {
    return ([] as ItemDataType[]).concat(uncontrolledData, newData);
  }, [newData, uncontrolledData]);

  const dataWithCache = useMemo(() => {
    return ([] as ItemDataType[]).concat(data, cacheData);
  }, [data, cacheData]);

  // Update the state when the data in props changes
  useEffect(() => {
    if (controlledData && !shallowEqual(controlledData, uncontrolledData)) {
      setData(controlledData);
      setNewData([]);
      onChange?.(controlledData);
    }
  }, [controlledData, uncontrolledData, onChange]);

  return {
    data,
    dataWithCache,
    newData,
    setNewData
  };
}

export default useData;
