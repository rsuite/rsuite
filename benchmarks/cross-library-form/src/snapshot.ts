import { errors } from './domain';
import type { FormSnapshot } from './types';
const visible = (node: Element) => {
  const style = getComputedStyle(node);
  const box = node.getBoundingClientRect();
  return (
    style.visibility !== 'hidden' && style.display !== 'none' && box.width > 0 && box.height > 0
  );
};
export function readSnapshot(values: unknown): FormSnapshot {
  const fields: FormSnapshot['fields'] = {};
  for (const group of document.querySelectorAll<HTMLElement>('[data-form-field]')) {
    const input = group.querySelector<HTMLInputElement>('input');
    if (!input) continue;
    const messages = Object.values(errors).filter(message =>
      [...group.querySelectorAll('*')].some(
        node => visible(node) && node.textContent?.trim() === message
      )
    );
    fields[group.dataset.formField!] = {
      value: input.value,
      errors: [...new Set(messages)],
      invalid: input.getAttribute('aria-invalid')
    };
  }
  const invalidReferences: string[] = [];
  for (const input of document.querySelectorAll<HTMLInputElement>('#root input'))
    for (const attribute of ['aria-describedby', 'aria-labelledby'])
      for (const id of (input.getAttribute(attribute) ?? '').split(/\s+/).filter(Boolean))
        if (!document.getElementById(id)) invalidReferences.push(attribute + ':' + id);
  return {
    values,
    fields,
    errors: Object.values(fields).flatMap(field => field.errors),
    invalidReferences
  };
}
