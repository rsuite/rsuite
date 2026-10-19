import get from 'lodash/get';
import has from 'lodash/has';
import toPath from 'lodash/toPath';
import { nameToPath } from '../../useFormControl/utils/nameToPath';
import { removeFieldValue, setFieldValue } from './fieldValue';

const hasOwn = (errors: any, name: string) =>
  errors != null && Object.prototype.hasOwnProperty.call(errors, name);

function getFlatErrorKeys(errors: any, name: string, includeAllAliases = false) {
  // Quoted or escaped literal segments are not numeric path aliases.
  const simplePath = /^(?:[^.[\]\\]+|\[\d+\])(?:\.[^.[\]\\]+|\[\d+\])*$/;
  if (!simplePath.test(name)) return [];

  const path = toPath(name);
  if (!path.some(part => /^\d+$/.test(part))) return [];

  const bracket = path.reduce(
    (result, part, index) =>
      /^\d+$/.test(part) ? `${result}[${part}]` : `${result}${index ? '.' : ''}${part}`,
    ''
  );
  const dotted = path.join('.');
  const canonicalKeys = [bracket, dotted].filter(key => hasOwn(errors, key));
  if (canonicalKeys.length && !includeAllAliases) return canonicalKeys;

  const matches = Object.keys(errors || {}).filter(key => {
    if (!simplePath.test(key)) return false;
    const otherPath = toPath(key);
    return (
      path.length === otherPath.length && path.every((part, index) => part === otherPath[index])
    );
  });
  return [...new Set([bracket, dotted, ...matches.sort()])].filter(key => hasOwn(errors, key));
}

export function getSchemaErrorPath(name: string) {
  // nameToPath does not parse quoted bracket literals; keep those names exact.
  if (/\[\s*['"]/.test(name)) return undefined;
  // Force tokens so a root literal such as "profile.object.name" cannot steal the path.
  return toPath(nameToPath(name));
}

export function getFieldErrorPath(errors: any, name: string, nestedField: boolean) {
  if (hasOwn(errors, name) || !nestedField) return [name];
  const keys = getFlatErrorKeys(errors, name);
  return keys.length ? [keys[0]] : getSchemaErrorPath(name);
}

export function getFieldError(errors: any, name: string, nestedField: boolean) {
  const path = getFieldErrorPath(errors, name, nestedField);
  return path && has(errors, path) ? get(errors, path) : undefined;
}

export function setFieldError(
  errors: any,
  name: string,
  value: any,
  onCopy?: Parameters<typeof removeFieldValue>[2]
) {
  const nextErrors = { ...errors };
  // A new native result replaces earlier resolver aliases for this field.
  for (const key of [name, ...getFlatErrorKeys(errors, name, true)]) delete nextErrors[key];
  return setFieldValue(nextErrors, getSchemaErrorPath(name) || [name], value, true, onCopy);
}

export function removeFieldError(
  errors: any,
  name: string,
  nestedField: boolean,
  onCopy?: Parameters<typeof removeFieldValue>[2]
) {
  // Explicit tokens also preserve nonnested literal names and native array containers.
  let nextErrors = removeFieldValue(errors, [name], onCopy);
  if (!nestedField) return nextErrors;

  for (const key of getFlatErrorKeys(errors, name, true)) {
    if (key !== name) nextErrors = removeFieldValue(nextErrors, [key], onCopy);
  }
  const path = getSchemaErrorPath(name);
  if (path && has(errors, path)) nextErrors = removeFieldValue(nextErrors, path, onCopy);
  return nextErrors;
}
