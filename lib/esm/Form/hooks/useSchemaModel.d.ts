import type { MutableRefObject } from 'react';
import type { CheckType, Schema } from 'schema-typed';
export type FieldRuleType = MutableRefObject<CheckType<unknown, any> | undefined>;
declare function useSchemaModel(formModel: Schema, nestedField: boolean): {
    getCombinedModel: () => Schema<any, string>;
    pushFieldRule: (name: string, fieldRule: FieldRuleType) => void;
    removeFieldRule: (name: string) => void;
};
export default useSchemaModel;
