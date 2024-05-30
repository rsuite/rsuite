import React from 'react';
import PanelGroup, { type PanelGroupProps } from '../PanelGroup';
import AccordionPanel from './AccordionPanel';
import { RsRefForwardingComponent } from '@/internals/types';

export type AccordionProps = Omit<PanelGroupProps, 'accordion'>;

export interface AccordionComponent extends RsRefForwardingComponent<'div', AccordionProps> {
  Panel: typeof AccordionPanel;
}

/**
 * The `Accordion` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/accordion
 */
const Accordion = React.forwardRef((props, ref) => {
  return <PanelGroup accordion ref={ref} {...props} />;
}) as unknown as AccordionComponent;

Accordion.Panel = AccordionPanel;
Accordion.displayName = 'Accordion';

export default Accordion;
