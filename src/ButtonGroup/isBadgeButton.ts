import React from 'react';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import Badge from '../Badge/Badge';
import type { BadgeProps } from '../Badge/Badge';
import SafeAnchor from '@/internals/SafeAnchor';
import type { ButtonProps } from '../Button/Button';
import type { ReactSuiteComponents } from '@/internals/Provider/types';

function getChildren(children: React.ReactNode) {
  const nodes: React.ReactNode[] = [];
  const collect = (child: React.ReactNode) => {
    if (child === null || child === undefined || typeof child === 'boolean') {
      return;
    }
    if (Array.isArray(child)) {
      child.forEach(collect);
    } else if (
      React.isValidElement<{ children?: React.ReactNode }>(child) &&
      child.type === React.Fragment
    ) {
      collect(child.props.children);
    } else {
      // Leave unknown nodes intact, including iterables that inspection could consume.
      nodes.push(child);
    }
  };
  collect(children);
  return nodes;
}

function getComponentType(child: React.ReactElement) {
  let type: unknown = child.type;
  // A custom comparator may retain output that no longer matches the current props.
  while (
    typeof type === 'object' &&
    type !== null &&
    '$$typeof' in type &&
    type.$$typeof === Symbol.for('react.memo') &&
    (!('compare' in type) || type.compare === null || type.compare === undefined) &&
    'type' in type
  ) {
    type = type.type;
  }
  return type;
}

function isButton(child: React.ReactNode, components: Partial<ReactSuiteComponents>) {
  if (!React.isValidElement<ButtonProps>(child)) {
    return false;
  }
  const type = getComponentType(child);
  if (type !== Button && type !== IconButton) {
    return false;
  }

  const props = {
    ...components.Button?.defaultProps,
    ...(type === IconButton ? components.IconButton?.defaultProps : undefined),
    ...child.props
  };
  const as = props.as || (props.href ? SafeAnchor : 'button');
  if (as === SafeAnchor) {
    const anchorAs = components.SafeAnchor?.defaultProps?.as;
    return anchorAs === undefined || typeof anchorAs === 'string';
  }
  return typeof as === 'string';
}

/** Only known buttons with a single DOM root can participate in Badge group layouts. */
function isBadgeButton(children: React.ReactNode, components: Partial<ReactSuiteComponents> = {}) {
  const nodes = getChildren(children);
  return nodes.length === 1 && isButton(nodes[0], components);
}

/** Text and unknown component output can create anonymous grid items. */
export function canJustifyBadgeButtons(
  children: React.ReactNode,
  components: Partial<ReactSuiteComponents> = {}
) {
  return getChildren(children).every(child => {
    if (isButton(child, components)) {
      return true;
    }
    if (!React.isValidElement<BadgeProps>(child) || getComponentType(child) !== Badge) {
      return false;
    }
    const props = { ...components.Badge?.defaultProps, ...child.props };
    return (
      (props.as === undefined || typeof props.as === 'string') &&
      isBadgeButton(props.children, components)
    );
  });
}

export default isBadgeButton;
