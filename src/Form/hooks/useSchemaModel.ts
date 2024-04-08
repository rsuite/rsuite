import { SchemaModel } from 'schema-typed';
import { useRef, useCallback } from 'react';
import type { MutableRefObject } from 'react';
import type { CheckType, Schema } from 'schema-typed';

export type FieldRuleType = MutableRefObject<CheckType<unknown, any> | undefined>;
type RealFieldRuleType = MutableRefObject<CheckType<unknown, any>>;

interface RuleInfoType {
  name: string;
  fieldRule: FieldRuleType;
}
interface RealRuleInfoType extends RuleInfoType {
  fieldRule: RealFieldRuleType;
}

function useSchemaModel(formModel: Schema) {
  const subRulesRef = useRef<RuleInfoType[]>([]);

  const pushFieldRule = useCallback((name: string, fieldRule: FieldRuleType) => {
    subRulesRef.current.push({ name, fieldRule });
  }, []);

  const removeFieldRule = useCallback((name: string) => {
    const index = subRulesRef.current.findIndex(v => v.name === name);
    subRulesRef.current.splice(index, 1);
  }, []);

  const getCombinedModel = useCallback(() => {
    const realSubRules = subRulesRef.current.filter<RealRuleInfoType>((v): v is RealRuleInfoType =>
      Boolean(v.fieldRule.current)
    );
    return SchemaModel.combine(
      formModel,
      SchemaModel(
        realSubRules
          .map(({ name, fieldRule }) => ({ [name]: fieldRule.current }))
          .reduce((a, b) => Object.assign(a, b), {})
      )
    );
  }, [formModel]);

  return { getCombinedModel, pushFieldRule, removeFieldRule };
}

export default useSchemaModel;
