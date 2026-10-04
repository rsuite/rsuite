import get from 'lodash/get';
import has from 'lodash/has';
import toPath from 'lodash/toPath';
import { nameToPath } from '../../useFormControl/utils/nameToPath';
import { removeFieldValue } from './fieldValue';

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

function getSchemaErrorPath(name: string) {
  // nameToPath does not parse quoted bracket literals; keep those names exact.
  if (/\[\s*['"]/.test(name)) return undefined;
  // Force tokens so a root literal such as "profile.object.name" cannot steal the path.
  return toPath(nameToPath(name));
}

export function getFieldError(errors: any, name: string, nestedField: boolean) {
  if (hasOwn(errors, name)) return errors[name];
  if (!nestedField) return undefined;

  const keys = getFlatErrorKeys(errors, name);
  if (keys.length) return errors[keys[0]];

  const path = getSchemaErrorPath(name);
  return path && has(errors, path) ? get(errors, path) : undefined;
}

export function removeFieldError(errors: any, name: string, nestedField: boolean) {
  // Explicit tokens also preserve nonnested literal names and native array containers.
  let nextErrors = removeFieldValue(errors, [name]);
  if (!nestedField) return nextErrors;

  for (const key of getFlatErrorKeys(errors, name, true)) {
    if (key !== name) nextErrors = removeFieldValue(nextErrors, [key]);
  }
  const path = getSchemaErrorPath(name);
  if (path && has(errors, path)) nextErrors = removeFieldValue(nextErrors, path);
  return nextErrors;
}
