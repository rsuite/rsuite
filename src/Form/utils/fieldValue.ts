import get from 'lodash/get';
import cloneWith from 'lodash/cloneWith';
import hasIn from 'lodash/hasIn';
import isObject from 'lodash/isObject';
import isBuffer from 'lodash/isBuffer';
import setWith from 'lodash/setWith';
import toPath from 'lodash/toPath';
import unset from 'lodash/unset';

const typedArrayPrototype = Object.getPrototypeOf(Uint8Array.prototype);
const typedArrayBuffer = Object.getOwnPropertyDescriptor(typedArrayPrototype, 'buffer')!.get!;
const typedArrayByteOffset = Object.getOwnPropertyDescriptor(
  typedArrayPrototype,
  'byteOffset'
)!.get!;
const typedArrayLength = Object.getOwnPropertyDescriptor(typedArrayPrototype, 'length')!.get!;
const dataViewBuffer = Object.getOwnPropertyDescriptor(DataView.prototype, 'buffer')!.get!;
const dataViewByteOffset = Object.getOwnPropertyDescriptor(DataView.prototype, 'byteOffset')!.get!;
const dataViewByteLength = Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength')!.get!;

function copyContainerProperties(source: any, target: any, includeArrayItems = false) {
  for (const key of Reflect.ownKeys(source)) {
    const isIndex = typeof key === 'string' && /^(0|[1-9]\d*)$/.test(key);
    const isArrayItem = includeArrayItems && isIndex && Number(key) < source.length;
    if (!isArrayItem && !Object.prototype.propertyIsEnumerable.call(source, key)) continue;
    if (isIndex && Object.prototype.hasOwnProperty.call(target, key)) {
      continue;
    }
    Object.defineProperty(target, key, {
      value: source[key],
      enumerable: true,
      writable: true,
      configurable: true
    });
  }
  return target;
}

function cloneContainer(value: any) {
  if (Array.isArray(value)) return copyContainerProperties(value, new Array(value.length), true);
  if (ArrayBuffer.isView(value)) {
    let buffer: ArrayBufferLike;
    let byteOffset: number;
    let length: number;
    try {
      // Native getters ignore own metadata and recognize cross-realm DataViews.
      length = dataViewByteLength.call(value);
      buffer = dataViewBuffer.call(value);
      byteOffset = dataViewByteOffset.call(value);
    } catch {
      length = typedArrayLength.call(value);
      buffer = typedArrayBuffer.call(value);
      byteOffset = typedArrayByteOffset.call(value);
    }
    const constructor = Object.getPrototypeOf(value).constructor;
    const container = isBuffer(value)
      ? constructor.from(new Uint8Array(buffer, byteOffset, length))
      : new constructor(buffer.slice(0), byteOffset, length);
    return copyContainerProperties(value, container);
  }
  if (!isObject(value)) return {};
  return cloneWith(value, (nestedValue, _key, parent) => (parent ? nestedValue : undefined));
}

function cloneFieldContainer(value: any) {
  return isObject(value) ? cloneContainer(value) : undefined;
}

export function setFieldValue(formValue: any, name: string, value: any, nestedField: boolean) {
  if (!nestedField) {
    return { ...formValue, [name]: value };
  }

  // Keep Lodash's path parsing and container creation, copying only the edited branch.
  return setWith(cloneContainer(formValue), name, value, cloneFieldContainer);
}

export function removeFieldValue(formValue: any, name: string | string[]) {
  const nextValue = cloneContainer(formValue);
  if (!hasIn(formValue, name)) return nextValue;

  const path = typeof name === 'string' && name in Object(formValue) ? [name] : toPath(name);
  if (
    path.length > 1 &&
    path.some(key => ['__proto__', 'constructor', 'prototype'].includes(key))
  ) {
    return nextValue;
  }

  // Copy the same branch before deleting; arrays must not share their original rows.
  setWith(nextValue, name, get(formValue, name), cloneFieldContainer);
  unset(nextValue, name);
  return nextValue;
}
