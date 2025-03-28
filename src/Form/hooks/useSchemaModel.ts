import { SchemaModel } from 'schema-typed';
import { useRef, useCallback } from 'react';
import type { MutableRefObject } from 'react';
import type { CheckType, Schema } from 'schema-typed';
import { constructFlatSchema } from '../utils/constructFlatSchema';

export type FieldRuleType = MutableRefObject<CheckType<unknown, any> | undefined>;
type RealFieldRuleType = MutableRefObject<CheckType<unknown, any>>;

interface RuleInfoType {
  name: string;
  fieldRule: FieldRuleType;
}
interface RealRuleInfoType extends RuleInfoType {
  fieldRule: RealFieldRuleType;
}

function useSchemaModel(formModel: Schema, nestedField: boolean) {
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

    // If there is no sub rule, return the original form model
    if (realSubRules.length === 0) {
      return formModel;
    }

    const subRuleObject = realSubRules
      .map(({ name, fieldRule }) => ({ [name]: fieldRule.current }))
      .reduce((a, b) => Object.assign(a, b), {});

    return SchemaModel.combine(
      formModel,
      SchemaModel(nestedField ? constructFlatSchema(subRuleObject) : subRuleObject)
    );
  }, [formModel, nestedField]);

  return { getCombinedModel, pushFieldRule, removeFieldRule };
}

export default useSchemaModel;
