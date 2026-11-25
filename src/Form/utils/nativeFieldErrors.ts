import type { CheckResult } from 'schema-typed';
import type { createNativeValidationFrames } from './nativeValidationFrames';
import { setFieldError } from './fieldError';

interface NativeFieldUpdateOptions {
  frames: ReturnType<typeof createNativeValidationFrames>;
  fieldName: string;
  nestedField: boolean;
  result: CheckResult;
  results: [string, CheckResult][];
  claimField: (name: string) => boolean;
}

/** Observe a native result once, before callbacks can edit the delivered payload. */
export function createNativeFieldUpdate(options: NativeFieldUpdateOptions) {
  const { frames, fieldName, nestedField, result, results, claimField } = options;
  const entries = nestedField
    ? [[fieldName, result] as const]
    : results.filter(([name]) => claimField(name));
  const invalidFields = entries.filter(([, value]) => value.hasError).map(([name]) => name);
  const target = nestedField ? frames.nestedTarget({}, fieldName) : undefined;
  const observations = nestedField
    ? target
      ? frames.observe(result, target)
      : []
    : entries.flatMap(([name, value]) => frames.observe(value, [name]));

  return {
    hasError: invalidFields.length > 0,
    invalidFields,
    apply(source: any) {
      const carry = frames.captureCarry(source);
      let next = { ...source };
      if (nestedField) {
        const { copies, record } = frames.trackCopies();
        next = setFieldError(next, fieldName, result, record);
        frames.publish(
          next,
          frames.anchored(next, target, result) ? observations : [],
          carry,
          copies
        );
      } else {
        for (const [name, value] of entries) {
          if (value.hasError) next[name] = value.errorMessage || value;
          else delete next[name];
        }
        frames.publish(next, observations, carry);
      }
      return next;
    }
  };
}
