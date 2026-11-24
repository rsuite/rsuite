import { getSchemaErrorPath } from './fieldError';

function getRequestPath(name: string) {
  const path = getSchemaErrorPath(name);
  return path?.length ? path : [name];
}

function pathsOverlap(path: string[], otherPath: string[]) {
  const length = Math.min(path.length, otherPath.length);
  for (let index = 0; index < length; index++) {
    if (path[index] !== otherPath[index]) return false;
  }
  return true;
}

export function createValidationRequests() {
  const fields = new Map<string, { request: number; path?: string[] }>();
  let form: number | null = null;
  let sequence = 0;
  let cleanup = 0;

  const acquire = (fieldName?: string, nestedField = false) => {
    const request = ++sequence;
    // Whole-form checks and resolvers replace the complete validation snapshot.
    if (fieldName === undefined) {
      fields.clear();
      form = request;
      return request;
    }

    const next = { request, path: fields.get(fieldName)?.path };
    if (nestedField) {
      // Match the paths used by error cleanup, including equivalent numeric aliases.
      next.path = next.path || getRequestPath(fieldName);
      for (const [name, owner] of fields) {
        // Paths live only with their request owner, so large forms do not reparse every name.
        owner.path = owner.path || getRequestPath(name);
        if (pathsOverlap(next.path, owner.path)) {
          fields.delete(name);
        }
      }
    }

    form = null;
    fields.set(fieldName, next);
    return request;
  };

  const start = (fieldName?: string, nestedField = false) => {
    const request = acquire(fieldName, nestedField);
    const beforeCleanup = cleanup;
    // Synchronous checks retain their callback sequence through nested validation calls.
    const isUncleared = () => cleanup === beforeCleanup;
    if (fieldName === undefined) {
      return {
        isCurrent: () => form === request,
        isUncleared,
        claimField: () => true
      };
    }
    return {
      isCurrent: () => fields.get(fieldName)?.request === request,
      isUncleared,
      claimField: (key: string) => {
        const owner = fields.get(key);
        if ((owner?.request ?? 0) > request) return false;
        // Proxy results supersede older checks without taking over newer requests.
        fields.set(key, { request, path: owner?.path });
        return true;
      }
    };
  };

  const invalidate = (fieldName?: string, nestedField = false) => {
    cleanup++;
    return acquire(fieldName, nestedField);
  };

  return { start, invalidate };
}
