import { useEffect, useRef } from 'react';
import type { DependenciesRefType } from '../Form/hooks/useDependenciesArrange';

export function useRegisterDependencies(
  name: string,
  pushDependencies: (name: string, dependencies: DependenciesRefType) => void,
  removeDependencies: (name: string) => void,
  dependencies?: string[]
) {
  const dependenciesRef = useRef(dependencies);
  dependenciesRef.current = dependencies;

  useEffect(() => {
    /**
     * We don't check if the dependencies exists here since it might be dynamic and updated later.
     * Therefore, we push the dependenciesRef to the context to ensure it updates dynamically.
     * Later, when validating the form, we check if the dependencies exists in the context.
     */
    pushDependencies(name, dependenciesRef);
    return () => {
      removeDependencies(name);
    };
  }, [name, pushDependencies, removeDependencies]);
}
