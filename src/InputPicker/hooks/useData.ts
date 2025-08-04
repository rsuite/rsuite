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

  const data = useMemo(() => {
    return ([] as Option[]).concat(uncontrolledData, newData);
  }, [newData, uncontrolledData]);

  const dataWithCache = useMemo(() => {
    return ([] as Option[]).concat(data, cacheData);
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
