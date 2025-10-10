/// <reference types="lodash" />
export interface FormErrorProps {
    formValue: any;
    getCombinedModel: () => any;
    onCheck?: (formError: any) => void;
    onError?: (formError: any) => void;
    nestedField?: boolean;
}
export default function useFormValidate(_formError: any, props: FormErrorProps): {
    formError: any;
    check: (...args: any[]) => any;
    checkForField: (...args: any[]) => any;
    checkFieldForNextValue: (...args: any[]) => any;
    checkAsync: (...args: any[]) => any;
    checkForFieldAsync: (...args: any[]) => any;
    checkFieldAsyncForNextValue: (...args: any[]) => any;
    cleanErrors: (...args: any[]) => any;
    resetErrors: (...args: any[]) => any;
    cleanErrorForField: (...args: any[]) => any;
    onRemoveError: (name: string) => import("lodash").Omit<any, string>;
};
