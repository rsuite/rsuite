import { useRef, useEffect } from 'react';
import type { FieldRuleType } from '../Form/useSchemaModel';
import type { CheckType } from 'schema-typed';

function useRegisterModel(
  name: string,
  register: (n: string, r: FieldRuleType) => () => void,
  rule?: CheckType<unknown, any>
) {
  const refRule = useRef(rule);
  refRule.current = rule;

  useEffect(() => {
    return register(name, refRule);
  }, [name, register]);
}

export default useRegisterModel;
