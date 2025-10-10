/// <reference types="react" />
interface FieldProps {
    name: string;
    formValue?: Record<string, any>;
    formError?: Record<string, any>;
    value: any;
    nestedField: boolean;
    errorMessage: React.ReactNode;
    errorFromContext?: boolean;
}
declare function useField(props: FieldProps): {
    fieldValue: any;
    fieldError: import("react").ReactNode;
    setFieldValue: (fieldName: string, fieldValue: any) => {
        [x: string]: any;
    };
};
export default useField;
