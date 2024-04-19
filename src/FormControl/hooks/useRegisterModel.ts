import { useRef, useEffect } from 'react';
import type { CheckType } from 'schema-typed';
import { useFormContext } from '../../Form/FormContext';

function useRegisterModel(
  name: string,

  rule?: CheckType<unknown, any>
) {
  const { pushFieldRule, removeFieldRule } = useFormContext() || {};

  const refRule = useRef(rule);
  refRule.current = rule;

  useEffect(() => {
    pushFieldRule?.(name, refRule);
    return () => {
      removeFieldRule?.(name);
    };
  }, [name, pushFieldRule, removeFieldRule]);
}

export default useRegisterModel;
