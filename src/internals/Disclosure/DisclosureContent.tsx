import React, { useRef } from 'react';
import useDisclosureContext from './useDisclosureContext';

export interface DisclosureContentRenderProps {
  open: boolean;
}

export interface DisclosureContentProps {
  children: (
    props: React.HTMLAttributes<HTMLElement> & DisclosureContentRenderProps,
    ref: React.Ref<HTMLElement>
  ) => React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

function DisclosureContent(props: DisclosureContentProps) {
  const { children } = props;

  const elementRef = useRef<HTMLElement>(null);

  const disclosure = useDisclosureContext(DisclosureContent.displayName);

  const [{ open }] = disclosure;

  return children({ open }, elementRef);
}

DisclosureContent.displayName = 'Disclosure.Content';

export default DisclosureContent;
