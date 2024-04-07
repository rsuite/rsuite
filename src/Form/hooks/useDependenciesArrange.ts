import { useRef, useCallback, MutableRefObject } from 'react';

export type DependenciesRefType = MutableRefObject<string[] | undefined>;

interface DependencyItemType {
  name: string;
  dependencies: DependenciesRefType;
}

export function useDependenciesArrange() {
  const dependenciesRef = useRef<DependencyItemType[]>([]);

  const pushDependencies = useCallback((name: string, dependencies: DependenciesRefType) => {
    dependenciesRef.current.push({ name, dependencies });
  }, []);

  const removeDependencies = useCallback((name: string) => {
    const index = dependenciesRef.current.findIndex(v => v.name === name);
    index !== -1 && dependenciesRef.current.splice(index, 1);
  }, []);

  const getShouldValidateFieldNames = useCallback((dependentName: string) => {
    const shouldUpdateFields: string[] = [];
    dependenciesRef.current.forEach(({ name, dependencies }) => {
      if (dependencies.current && dependencies.current.includes(dependentName)) {
        shouldUpdateFields.push(name);
      }
    });
    return shouldUpdateFields;
  }, []);

  return { pushDependencies, removeDependencies, getShouldValidateFieldNames };
}
