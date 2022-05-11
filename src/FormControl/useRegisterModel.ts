import { useRef, useEffect } from 'react';
import type { FieldRuleType } from '../Form/useSchemaModel';
import type { CheckType } from 'schema-typed';

function useRegisterModel(
  name: string,
  pushFieldRule: (n: string, r: FieldRuleType) => void,
  removeFieldRule: (n: string) => void,
  rule?: CheckType<unknown, any>
) {
  const refRule = useRef(rule);
  refRule.current = rule;

  useEffect(() => {
    pushFieldRule(name, refRule);
    return () => {
      removeFieldRule(name);
    };
  }, [name, pushFieldRule, removeFieldRule]);
}

export default useRegisterModel;
