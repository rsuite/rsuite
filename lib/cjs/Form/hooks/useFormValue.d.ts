/// <reference types="lodash" />
type RecordAny = Record<string, any>;
interface UseFormValueProps<V = RecordAny> {
    formDefaultValue: V;
    nestedField: boolean;
}
export default function useFormValue<V>(controlledValue: any, props: UseFormValueProps<V>): {
    formValue: any;
    setFormValue: (value: any) => void;
    setFieldValue: (fieldName: string, fieldValue: any) => any;
    onRemoveValue: (name: string) => import("lodash").Omit<any, string>;
    resetFormValue: (nextValue?: V) => V;
};
export {};
