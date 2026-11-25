import { useCallback, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';
import type { FormGroupRelations } from './formGroupRelations';

type RegisteredPart = 'label' | 'helpText';

export type FormGroupRegistration = (
  part: RegisteredPart,
  token: object,
  id: string | undefined
) => void;

export function useFormGroupRelations(staticRelations: FormGroupRelations) {
  const registered = useRef(new Map<object, { part: RegisteredPart; id: string }>());
  const [relations, setRelations] = useState<FormGroupRelations | null>(null);
  const update = useCallback(() => {
    const ids = (part: RegisteredPart) =>
      [
        ...new Set(
          [...registered.current.values()].filter(row => row.part === part).map(row => row.id)
        )
      ].join(' ') || undefined;
    const next = { labelledBy: ids('label'), describedBy: ids('helpText') };
    setRelations(previous =>
      previous?.labelledBy === next.labelledBy &&
      previous?.describedBy === next.describedBy &&
      previous !== null
        ? previous
        : next
    );
  }, []);
  const register: FormGroupRegistration = useCallback(
    (part, token, id) => {
      if (id) registered.current.set(token, { part, id });
      else registered.current.delete(token);
      update();
    },
    [update]
  );

  useIsomorphicLayoutEffect(update, [update]);
  return { ...(relations ?? staticRelations), register };
}
