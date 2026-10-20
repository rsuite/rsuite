import React from 'react';

export type FormGroupPart = 'label' | 'helpText' | 'group' | 'control';
export interface FormGroupRelations {
  labelledBy?: string;
  describedBy?: string;
}

const parts = new WeakMap<object, FormGroupPart>();

export function registerFormGroupPart(component: object, part: FormGroupPart) {
  parts.set(component, part);
}

/** Only inspect elements whose children are rendered without an opaque component boundary. */
export function getStaticRelations(
  children: React.ReactNode,
  controlId: string,
  defaults: { label?: object; helpText?: object }
): FormGroupRelations {
  const labels: string[] = [];
  const descriptions: string[] = [];
  let opaque = false;
  const visit = (nodes: React.ReactNode) =>
    React.Children.forEach(nodes, child => {
      if (!React.isValidElement(child)) return;
      const node = child as React.ReactElement<{
        id?: string;
        tooltip?: boolean;
        children?: React.ReactNode;
      }>;
      const part = typeof node.type === 'string' ? undefined : parts.get(node.type);
      if (part === 'group' || part === 'control') return;
      if (part === 'label' || part === 'helpText') {
        const props = { ...defaults[part], ...node.props };
        if (part === 'helpText' && props.tooltip) return;
        const id =
          props.id === undefined
            ? `${controlId}-${part === 'label' ? 'label' : 'help-text'}`
            : props.id;
        if (id) (part === 'label' ? labels : descriptions).push(id);
      } else if (typeof node.type === 'string' || node.type === React.Fragment) {
        visit(node.props.children);
      } else {
        opaque = true;
      }
    });
  visit(children);
  return {
    // Preserve legacy SSR links across components whose rendered output is unknown.
    // The mounted registry replaces these guesses with actual targets after hydration.
    labelledBy: [...new Set(labels)].join(' ') || (opaque ? `${controlId}-label` : undefined),
    describedBy:
      [...new Set(descriptions)].join(' ') || (opaque ? `${controlId}-help-text` : undefined)
  };
}
