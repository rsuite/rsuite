import { useState, useEffect, useMemo } from 'react';
import { shallowEqual } from '@/internals/utils';
import type { Option } from '@/internals/types';

export interface InputOption<T = number | string> extends Option<T> {
  create?: boolean;
}

interface UseDataProps {
  controlledData?: InputOption[];
  cacheData?: InputOption[];
  onChange?: (data: Option[]) => void;
}

function useData(props: UseDataProps) {
  const { controlledData = [], cacheData = [], onChange } = props;
  const [uncontrolledData, setData] = useState(controlledData);
  const [newData, setNewData] = useState<InputOption[]>([]);
  const dataChanged = !shallowEqual(controlledData, uncontrolledData);

  const data = useMemo(() => {
    // Child layout effects must navigate the latest options before the reset effect runs.
    if (dataChanged) return controlledData;
    return ([] as Option[]).concat(uncontrolledData, newData);
  }, [controlledData, dataChanged, newData, uncontrolledData]);

  const dataWithCache = useMemo(() => {
    return ([] as Option[]).concat(data, cacheData);
  }, [data, cacheData]);

  // Update the state when the data in props changes
  useEffect(() => {
    if (dataChanged) {
      setData(controlledData);
      setNewData([]);
      onChange?.(controlledData);
    }
  }, [controlledData, dataChanged, onChange]);

  return {
    data,
    dataWithCache,
    newData,
    setNewData
  };
}

export default useData;
