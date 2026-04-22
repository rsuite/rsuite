/**
 * The result returned by a validation resolver.
 *
 * @template E - The type of the form error map. Defaults to a record of string keys to any.
 */
export interface ResolverResult<E = Record<string, any>> {
  errors: E;
}

/**
 * A resolver is a function that integrates third-party validation libraries
 * (e.g. Yup, Zod, AJV, Joi, Valibot…) with the rsuite `Form` component.
 *
 * The resolver receives the current form values and an optional context object,
 * and must return (or resolve to) a `ResolverResult` whose `errors` property is
 * a plain object that maps field names to error messages / error objects.
 *
 * An **empty** `errors` object means the form is valid.
 *
 * @template V - The shape of the form values. Defaults to `Record<string, any>`.
 * @template E - The shape of the error map. Defaults to `Record<string, any>`.
 *
 * @example
 * ```tsx
 * // Yup example
 * import * as yup from 'yup';
 * import type { Resolver } from 'rsuite';
 *
 * const schema = yup.object({ name: yup.string().email('Invalid email').required() });
 *
 * const resolver: Resolver = async (formValue) => {
 *   try {
 *     await schema.validate(formValue, { abortEarly: false });
 *     return { errors: {} };
 *   } catch (e: any) {
 *     const errors: Record<string, string> = {};
 *     e.inner.forEach((err: yup.ValidationError) => {
 *       if (err.path) errors[err.path] = err.message;
 *     });
 *     return { errors };
 *   }
 * };
 *
 * // Zod example
 * import { z } from 'zod';
 *
 * const schema = z.object({ name: z.string().email('Invalid email') });
 *
 * const resolver: Resolver = (formValue) => {
 *   const result = schema.safeParse(formValue);
 *   if (result.success) return { errors: {} };
 *   const errors: Record<string, string> = {};
 *   result.error.errors.forEach(err => {
 *     if (err.path.length) errors[err.path[0]] = err.message;
 *   });
 *   return { errors };
 * };
 * ```
 */
export type Resolver<V = Record<string, any>, E = Record<string, any>> = (
  formValue: V,
  context?: any
) => ResolverResult<E> | Promise<ResolverResult<E>>;
