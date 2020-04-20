type CallbackRef<T> = (ref: T | null) => void;
type Ref<T> = React.MutableRefObject<T> | CallbackRef<T>;

const toFnRef = <T>(ref?: Ref<T> | null) =>
  !ref || typeof ref === 'function'
    ? ref
    : (value: T) => {
        ref.current = value;
      };

export default function mergeRefs<T>(refA?: Ref<T> | null, refB?: Ref<T> | null) {
  const a = toFnRef(refA);
  const b = toFnRef(refB);
  return (value: T | null) => {
    if (typeof a === 'function') a(value);
    if (typeof b === 'function') b(value);
  };
}
