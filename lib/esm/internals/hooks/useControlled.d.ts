type InferDefined<T> = T extends infer U | undefined ? U : never;
/**
 * A hook for controlled value management.
 * In the case of passing the controlled value, the controlled value is returned, otherwise the value in state is returned.
 * Generally used for a component including controlled and uncontrolled modes.
 * @param controlledValue
 * @param defaultValue
 * @param formatValue
 */
export declare function useControlled<V = any, D = V>(controlledValue: V, defaultValue: D): [V extends undefined ? D : InferDefined<V>, (value: React.SetStateAction<V | null>) => void, boolean];
export default useControlled;
