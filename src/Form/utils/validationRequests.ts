export function createValidationRequests() {
  const fields = new Map<string, number>();
  let form: number | null = null;
  let sequence = 0;

  const start = (fieldName?: string, nestedField = false) => {
    const request = ++sequence;
    // Whole-form checks and resolvers replace the complete validation snapshot.
    if (fieldName === undefined) {
      fields.clear();
      form = request;
      return {
        isCurrent: () => form === request,
        claimField: () => true
      };
    }

    if (nestedField) {
      // Parent and child paths share results; unrelated fields remain independent.
      for (const name of fields.keys()) {
        if (
          name.startsWith(fieldName + '.') ||
          name.startsWith(fieldName + '[') ||
          fieldName.startsWith(name + '.') ||
          fieldName.startsWith(name + '[')
        ) {
          fields.delete(name);
        }
      }
    }

    form = null;
    fields.set(fieldName, request);
    return {
      isCurrent: () => fields.get(fieldName) === request,
      claimField: (key: string) => {
        if ((fields.get(key) ?? 0) > request) return false;
        // Proxy results supersede older checks without taking over newer requests.
        fields.set(key, request);
        return true;
      }
    };
  };

  return { start };
}
