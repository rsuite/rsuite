import { useRef, useEffect } from 'react';
import type { FieldRuleType } from '../Form/hooks/useSchemaModel';
import type { CheckType } from 'schema-typed';

export function useRegisterModel(
  name: string,
  pushFieldRule: (n: string, r: FieldRuleType) => void,
  removeFieldRule: (n: string) => void,
  rule?: CheckType<unknown, any>
) {
  const refRule = useRef(rule);
  refRule.current = rule;

  useEffect(() => {
    /**
     * We don't check if the rule exists here since it might be dynamic and updated later.
     * Therefore, we push the refRule to the context to ensure it updates dynamically.
     * Later, when validating the form, we check if the rule exists in the context.
     */
    pushFieldRule(name, refRule);
    return () => {
      removeFieldRule(name);
    };
  }, [name, pushFieldRule, removeFieldRule]);
}
