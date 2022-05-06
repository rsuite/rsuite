import { SchemaModel } from 'schema-typed';
import { useRef, useCallback } from 'react';
import type { MutableRefObject } from 'react';
import type { CheckType, Schema } from 'schema-typed';

export type RegisterFieldRuleType = MutableRefObject<CheckType<unknown, any> | undefined>;

function useSchemaModel(parentModel: Schema) {
  const subModelRef = useRef<{ name: string; fieldRule: RegisterFieldRuleType }[]>([]);

  const registerModel = useCallback((name: string, fieldRule: RegisterFieldRuleType) => {
    subModelRef.current.push({ name, fieldRule });
    let isRegister = true;
    return () => {
      if (!isRegister) {
        return;
      }
      isRegister = false;
      const index = subModelRef.current.findIndex(v => v.name === name);
      subModelRef.current.splice(index, 1);
    };
  }, []);

  const generatorModel = useCallback(() => {
    return SchemaModel.combine(
      parentModel,
      SchemaModel(
        subModelRef.current
          .filter(({ fieldRule }) => Boolean(fieldRule.current))
          .map(({ name, fieldRule }) => ({ [name]: fieldRule.current! }))
          .reduce((a, b) => Object.assign(a, b), {})
      )
    );
  }, [parentModel]);

  return [generatorModel, registerModel] as const;
}

export default useSchemaModel;
