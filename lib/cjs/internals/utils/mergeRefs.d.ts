import React from 'react';
type CallbackRef<T> = (ref: T | null) => void;
type Ref<T> = React.MutableRefObject<T> | CallbackRef<T>;
/**
 * Merges two React refs into a single ref callback.
 */
export declare function mergeRefs<T>(refA?: Ref<T | null> | null, refB?: Ref<T | null> | null): React.RefCallback<T>;
export default mergeRefs;
