import { SchemaModel, ObjectType } from 'schema-typed';
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

/**
 * Convert a flat schema object to a nested schema object
 *
 * @example
 *
 * ```js
 * const schema = {
 *  'address.city': StringType().isRequired('City is required'),
 *  'address.street': StringType().isRequired('Street is required')
 * };
 *
 * const result = unflattenSchemaObject(schema);
 *
 * // result
 * {
 *    address: ObjectType().shape({
 *      city: StringType().isRequired('City is required'),
 *      street: StringType().isRequired('Street is required')
 *    })
 * }
 * ```
 */
function unflattenSchemaObject(schema) {
  const result = {};
  const $type = Symbol('schema-type');

  Object.keys(schema).forEach(key => {
    if (key.includes('.')) {
      const keys = key.split('.');
      const lastKey = keys.pop() || '';

      let current = result;
      keys.forEach(subKey => {
        current[subKey] = current[subKey] || { [$type]: 'object-type' };
        current = current[subKey];
      });

      current[lastKey] = schema[key];
    } else {
      result[key] = schema[key];
    }
  });

  function convertToShape(obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key]?.[$type] === 'object-type') {
        delete obj[key][$type];
        obj[key] = ObjectType().shape(convertToShape(obj[key]));
      }
    });
    return obj;
  }

  return convertToShape(result);
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
      SchemaModel(nestedField ? unflattenSchemaObject(subRuleObject) : subRuleObject)
    );
  }, [formModel, nestedField]);

  return { getCombinedModel, pushFieldRule, removeFieldRule };
}

export default useSchemaModel;
