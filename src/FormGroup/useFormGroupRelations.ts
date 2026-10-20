import { useCallback, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';
import type { FormGroupPart, FormGroupRelations } from './formGroupRelations';

export type FormGroupRegistration = (
  part: 'label' | 'helpText',
  token: object,
  element: HTMLElement | null
) => void;

export function useFormGroupRelations(staticRelations: FormGroupRelations) {
  const elements = useRef(new Map<object, { part: FormGroupPart; element: HTMLElement }>());
  const [relations, setRelations] = useState<FormGroupRelations | null>(null);
  const update = useCallback(() => {
    const ids = (part: FormGroupPart) =>
      [
        ...new Set(
          [...elements.current.values()]
            .filter(row => row.part === part)
            .map(row => row.element.id)
            .filter(Boolean)
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
    (part, token, element) => {
      if (element) elements.current.set(token, { part, element });
      else elements.current.delete(token);
      update();
    },
    [update]
  );

  useIsomorphicLayoutEffect(update, [update]);
  return { ...(relations ?? staticRelations), register };
}
