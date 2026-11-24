import { getFieldErrorPath, getSchemaErrorPath } from './fieldError';

type Path = readonly string[];
type Primitive = undefined | null | boolean | number | string | symbol | bigint;
declare const retirementTokenBrand: unique symbol;
export type NativeValidationRetirementToken = { readonly [retirementTokenBrand]: true };
export interface NativeValidationRead {
  invalid: boolean | undefined;
  retirementToken?: NativeValidationRetirementToken;
}

type Snapshot =
  | { kind: 'primitive'; value: Primitive }
  | { kind: 'opaque'; stamp: symbol }
  | {
      kind: 'container';
      category: 'object' | 'null' | 'array';
      stamp?: symbol;
      keys?: string[];
      fields: FieldSnapshot[];
    };
interface FieldSnapshot {
  key: string;
  present: boolean;
  flags?: readonly boolean[];
  value?: Snapshot;
}
interface NativeScope {
  address: Path;
  invalid: boolean;
  resultStamp: symbol;
  projectionRoot?: Path;
  allowAbsentRoot?: boolean;
}
interface Scope {
  address: Path;
  readonly pathKey: string;
  dependencyPath: Path;
  invalid: boolean;
  projection: 'result' | 'atom' | 'absent';
  rootOnly: boolean;
  witness: Snapshot;
}
interface FrameRecord extends NativeValidationRetirementToken {
  owner: symbol;
  retired: boolean;
  scopes: Scope[];
  keys: string[];
  scopeIndex: ReadonlyMap<string, Scope>;
}
export type NativeValidationObservation = readonly NativeScope[];
export type NativeValidationCarry = readonly Scope[];
type ContainerCopies = ReadonlyMap<symbol, ReadonlySet<symbol>>;

const unsupported = () => {
  throw new Error('Unsupported native validation projection');
};
const isReference = (value: unknown): value is object =>
  (typeof value === 'object' && value !== null) || typeof value === 'function';
const pathKey = (path: Path) => JSON.stringify(path);
const blocked = (path: Path) =>
  path.some(key => key === '__proto__' || key === 'constructor' || key === 'prototype');

/** Private, weak, per-Form provenance. Records contain only primitive facts and stamps. */
export function createNativeValidationFrames() {
  const owner = Symbol('Form native validation');
  const frames = new WeakMap<object, FrameRecord>();
  const identities = new WeakMap<object, symbol>();
  const records = new WeakSet<FrameRecord>();

  const stamp = (value: object, produce: boolean): symbol => {
    const existing = identities.get(value);
    if (existing) return existing;
    if (!produce) return unsupported();
    const next = Symbol();
    identities.set(value, next);
    return next;
  };

  const category = (value: unknown): 'object' | 'null' | 'array' => {
    if (!isReference(value) || typeof value === 'function') return unsupported();
    const proto = Object.getPrototypeOf(value);
    if (Array.isArray(value) && proto === Array.prototype) return 'array';
    if (proto === Object.prototype) return 'object';
    if (proto === null) return 'null';
    return unsupported();
  };

  const own = (value: object, key: string): PropertyDescriptor | undefined => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && !('value' in descriptor)) return unsupported();
    return descriptor;
  };

  const atom = (value: unknown, produce: boolean): Snapshot =>
    isReference(value)
      ? { kind: 'opaque', stamp: stamp(value, produce) }
      : { kind: 'primitive', value: value as Primitive };

  const field = (
    value: object,
    key: string,
    capture: (value: unknown) => Snapshot
  ): FieldSnapshot => {
    const descriptor = own(value, key);
    if (!descriptor) return { key, present: false };
    return {
      key,
      present: true,
      flags: [!!descriptor.enumerable, !!descriptor.configurable, !!descriptor.writable],
      value: capture(descriptor.value)
    };
  };

  const container = (
    value: object,
    fields: FieldSnapshot[],
    produce: boolean,
    keys?: string[],
    root = false
  ): Snapshot => ({
    kind: 'container',
    category: category(value),
    stamp: root ? undefined : stamp(value, produce),
    keys,
    fields
  });

  const dataKeys = (value: object): string[] => {
    if (Object.getOwnPropertySymbols(value).length) return unsupported();
    return Object.getOwnPropertyNames(value).sort();
  };

  const result = (value: unknown, produce: boolean, seen: Set<object>): Snapshot => {
    if (!isReference(value)) return atom(value, produce);
    category(value);
    if (seen.has(value)) return unsupported();
    seen.add(value);
    try {
      return container(
        value,
        ['hasError', 'errorMessage', 'object', 'array'].map(key =>
          field(value, key, child => {
            if (key === 'object' && child != null) return children(child, false, produce, seen);
            if (key === 'array' && child != null) return children(child, true, produce, seen);
            return atom(child, produce);
          })
        ),
        produce
      );
    } finally {
      seen.delete(value);
    }
  };

  const children = (
    value: unknown,
    array: boolean,
    produce: boolean,
    seen: Set<object>
  ): Snapshot => {
    if (!isReference(value)) return unsupported();
    const kind = category(value);
    if ((kind === 'array') !== array || seen.has(value)) return unsupported();
    seen.add(value);
    try {
      const keys = dataKeys(value);
      if (array && keys.some(key => key !== 'length' && !/^(0|[1-9]\d*)$/.test(key))) {
        return unsupported();
      }
      return container(
        value,
        keys.map(key =>
          field(value, key, child =>
            key === 'length' && array ? atom(child, produce) : result(child, produce, seen)
          )
        ),
        produce,
        keys
      );
    } finally {
      seen.delete(value);
    }
  };

  const trackCopies = () => {
    const copies = new Map<symbol, Set<symbol>>();
    return {
      copies,
      record(source: object, copy: object) {
        const sourceStamp = identities.get(source);
        if (!sourceStamp) return;
        const destinations = copies.get(sourceStamp) || new Set<symbol>();
        destinations.add(stamp(copy, true));
        copies.set(sourceStamp, destinations);
      }
    };
  };

  const same = (before: Snapshot, after: Snapshot, copies?: ContainerCopies): boolean => {
    if (before.kind !== after.kind) return false;
    if (before.kind === 'primitive' && after.kind === 'primitive') {
      return Object.is(before.value, after.value);
    }
    if (before.kind === 'opaque' && after.kind === 'opaque') return before.stamp === after.stamp;
    if (before.kind !== 'container' || after.kind !== 'container') return false;
    if (before.category !== after.category) return false;
    // Only producer-recorded path copies may replace an ancestor's identity.
    if (
      before.stamp !== after.stamp &&
      !(before.stamp && after.stamp && copies?.get(before.stamp)?.has(after.stamp))
    )
      return false;
    if (JSON.stringify(before.keys) !== JSON.stringify(after.keys)) return false;
    return (
      before.fields.length === after.fields.length &&
      before.fields.every((a, index) => {
        const b = after.fields[index];
        return (
          a.key === b.key &&
          a.present === b.present &&
          JSON.stringify(a.flags) === JSON.stringify(b.flags) &&
          (a.value && b.value ? same(a.value, b.value, copies) : a.value === b.value)
        );
      })
    );
  };

  const witness = (map: object, scope: Omit<Scope, 'witness'>, produce: boolean): Snapshot => {
    const visit = (value: object, index: number): Snapshot => {
      category(value);
      const key = scope.dependencyPath[index];
      const descriptor = own(value, key);
      if (!descriptor && index !== scope.dependencyPath.length - 1) return unsupported();
      if (!descriptor && scope.projection !== 'absent') return unsupported();
      const edge = field(value, key, child => {
        if (index < scope.dependencyPath.length - 1) {
          if (!isReference(child)) return unsupported();
          return visit(child, index + 1);
        }
        if (scope.projection === 'absent') return unsupported();
        return scope.projection === 'result'
          ? result(child, produce, new Set())
          : atom(child, produce);
      });
      return container(value, [edge], produce, undefined, index === 0);
    };
    return visit(map, 0);
  };

  const matches = (value: unknown, stored: Snapshot): boolean => {
    if (stored.kind === 'primitive') return Object.is(stored.value, value);
    if (!isReference(value)) return false;
    if (stored.kind === 'opaque') return identities.get(value) === stored.stamp;
    if (category(value) !== stored.category) return false;
    if (stored.stamp && identities.get(value) !== stored.stamp) return false;
    if (stored.keys) {
      const keys = dataKeys(value);
      if (keys.length !== stored.keys.length) return false;
      for (let index = 0; index < keys.length; index++) {
        if (keys[index] !== stored.keys[index]) return false;
      }
    }
    for (const field of stored.fields) {
      const descriptor = own(value, field.key);
      if (!descriptor) {
        if (field.present) return false;
        continue;
      }
      if (
        !field.present ||
        !field.flags ||
        !!descriptor.enumerable !== field.flags[0] ||
        !!descriptor.configurable !== field.flags[1] ||
        !!descriptor.writable !== field.flags[2] ||
        !field.value ||
        !matches(descriptor.value, field.value)
      ) {
        return false;
      }
    }
    return true;
  };

  const intact = (map: object, frame: FrameRecord): boolean =>
    JSON.stringify(Object.getOwnPropertyNames(map).sort()) === JSON.stringify(frame.keys) &&
    frame.scopes.every(scope => matches(map, scope.witness));

  const captureCarry = (map: unknown): NativeValidationCarry => {
    try {
      if (!isReference(map)) return [];
      const frame = frames.get(map);
      return frame && !frame.retired && intact(map, frame) ? frame.scopes : [];
    } catch {
      return [];
    }
  };

  const destination = (map: object, path: Path): PropertyDescriptor | undefined => {
    let current: unknown = map;
    for (let index = 0; index < path.length; index++) {
      if (!isReference(current)) return unsupported();
      category(current);
      const descriptor = own(current, path[index]);
      if (index === path.length - 1) return descriptor;
      if (!descriptor) return unsupported();
      current = descriptor.value;
    }
    return unsupported();
  };

  const observe = (
    nativeResult: unknown,
    address: Path,
    projectionRoot?: Path
  ): NativeValidationObservation => {
    const scopes: NativeScope[] = [];
    const seen = new Set<object>();
    let allowAbsentRoot = false;
    try {
      allowAbsentRoot =
        !!projectionRoot &&
        isReference(nativeResult) &&
        own(nativeResult, 'hasError')?.value === false;
    } catch {
      return [];
    }
    const visit = (value: unknown, path: Path) => {
      if (!isReference(value) || seen.has(value)) return;
      category(value);
      seen.add(value);
      try {
        const status = own(value, 'hasError');
        if (status && typeof status.value === 'boolean') {
          scopes.push({
            address: path,
            invalid: status.value,
            resultStamp: stamp(value, true),
            projectionRoot,
            allowAbsentRoot
          });
        }
        for (const key of ['object', 'array']) {
          const descriptor = own(value, key);
          if (!descriptor || descriptor.value == null) continue;
          const child = descriptor.value;
          if (!isReference(child)) continue;
          const kind = category(child);
          if ((key === 'array') !== (kind === 'array')) continue;
          for (const childKey of dataKeys(child)) {
            if (key === 'array' && (childKey === 'length' || !/^(0|[1-9]\d*)$/.test(childKey)))
              continue;
            const item = own(child, childKey);
            if (item) {
              visit(item.value, [...path, key, childKey]);
            }
          }
        }
      } finally {
        seen.delete(value);
      }
    };
    try {
      visit(nativeResult, address);
    } catch {
      // Only new private metadata inspection is best effort.
    }
    return scopes;
  };

  const publish = (
    map: unknown,
    observations: NativeValidationObservation,
    carry: NativeValidationCarry = [],
    copies?: ContainerCopies
  ) => {
    try {
      if (!isReference(map) || frames.has(map)) return;
      category(map);
      const next = new Map<string, Scope>();
      for (const scope of carry) {
        try {
          const outputWitness = witness(map, scope, true);
          if (same(scope.witness, outputWitness, copies)) {
            next.set(scope.pathKey, { ...scope, witness: outputWitness });
          }
        } catch {
          // An affected/unsupported scope does not acquire carry provenance.
        }
      }
      for (const candidate of observations) {
        const candidateKey = pathKey(candidate.address);
        try {
          const dependencyPath = candidate.projectionRoot || candidate.address;
          const descriptor = destination(map, dependencyPath);
          if (
            !descriptor &&
            (candidate.projectionRoot ? !candidate.allowAbsentRoot : candidate.invalid)
          )
            continue;
          const projected = descriptor?.value;
          const structured =
            !candidate.projectionRoot &&
            isReference(projected) &&
            (identities.get(projected) === candidate.resultStamp ||
              (!candidate.invalid && !!own(projected, 'object')));
          const scope: Omit<Scope, 'witness'> = {
            address: candidate.address,
            pathKey: candidateKey,
            dependencyPath,
            invalid: candidate.invalid,
            projection: !descriptor ? 'absent' : structured ? 'result' : 'atom',
            rootOnly: !!candidate.projectionRoot
          };
          next.set(candidateKey, { ...scope, witness: witness(map, scope, true) });
        } catch {
          next.delete(candidateKey);
        }
      }
      if (!next.size) return;
      const scopeIndex: ReadonlyMap<string, Scope> = next;
      const record = {
        owner,
        retired: false,
        scopes: Array.from(next.values()),
        keys: Object.getOwnPropertyNames(map).sort(),
        scopeIndex
      } as FrameRecord;
      frames.set(map, record);
      records.add(record);
    } catch {
      // Never wrap original schema, projection or owner callback execution here.
    }
  };

  const nestedTarget = (map: unknown, name: string): Path | undefined => {
    try {
      if (!isReference(map)) return undefined;
      category(map);
      return getSchemaErrorPath(name) || [name];
    } catch {
      return undefined;
    }
  };

  const anchored = (map: unknown, path: Path | undefined, nativeResult: unknown): boolean => {
    try {
      if (!isReference(map) || !path?.length || blocked(path)) return false;
      const descriptor = destination(map, path);
      return !!descriptor && Object.is(descriptor.value, nativeResult);
    } catch {
      return false;
    }
  };

  const requestedRouteSupported = (map: object, path: Path, rootOnly: boolean): boolean => {
    let current: unknown = map;
    for (const key of path) {
      if (!isReference(current)) return rootOnly;
      category(current);
      const descriptor = own(current, key);
      if (!descriptor) return rootOnly;
      current = descriptor.value;
    }
    return true;
  };

  const read = (map: unknown, name: string, nested: boolean): NativeValidationRead => {
    if (!isReference(map)) return { invalid: undefined };
    const frame = frames.get(map);
    if (!frame || frame.retired) return { invalid: undefined };
    try {
      if (!intact(map, frame)) return { invalid: undefined, retirementToken: frame };
    } catch {
      return { invalid: undefined, retirementToken: frame };
    }
    try {
      category(map);
      const address = getFieldErrorPath(map, name, nested);
      if (!address) return { invalid: undefined };
      const scope = frame.scopeIndex.get(pathKey(address));
      if (
        !scope ||
        !requestedRouteSupported(map, address, scope.rootOnly || scope.projection === 'absent')
      ) {
        return { invalid: undefined };
      }
      return { invalid: scope.invalid };
    } catch {
      return { invalid: undefined };
    }
  };

  const commitRetirement = (token: NativeValidationRetirementToken) => {
    const frame = token as FrameRecord;
    if (records.has(frame) && frame.owner === owner) frame.retired = true;
  };

  return {
    observe,
    captureCarry,
    publish,
    nestedTarget,
    anchored,
    trackCopies,
    read,
    commitRetirement
  };
}
