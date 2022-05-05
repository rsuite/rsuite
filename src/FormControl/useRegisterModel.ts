import { useRef, useEffect } from 'react';
import type { RegisterFieldRuleType } from '../Form/useSchemaModel';
import type { CheckType } from 'schema-typed';

function useRegisterModel(
  register: (n: string, r: RegisterFieldRuleType) => () => void,
  name: string,
  rule?: CheckType<unknown, any>
) {
  const refRule = useRef(rule);
  refRule.current = rule;

  useEffect(() => {
    return register(name, refRule);
  }, [name, register]);
}

export default useRegisterModel;
