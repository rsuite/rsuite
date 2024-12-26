import React from 'react';
import PanelGroup, { type PanelGroupProps } from '../PanelGroup';
import AccordionPanel from './AccordionPanel';
import { RsRefForwardingComponent } from '@/internals/types';
import { useCustom } from '../CustomProvider';

export type AccordionProps = Omit<PanelGroupProps, 'accordion'>;

export interface AccordionComponent extends RsRefForwardingComponent<'div', AccordionProps> {
  Panel: typeof AccordionPanel;
}

/**
 * The `Accordion` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/accordion
 */
const Accordion = React.forwardRef(function Accordion(props, ref) {
  const { propsWithDefaults } = useCustom('Accordion', props);

  return <PanelGroup accordion ref={ref} {...propsWithDefaults} />;
}) as unknown as AccordionComponent;

Accordion.Panel = AccordionPanel;
Accordion.displayName = 'Accordion';

export default Accordion;
