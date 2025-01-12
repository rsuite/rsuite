import React from 'react';
import PanelGroup, { type PanelGroupProps } from '../PanelGroup';
import AccordionPanel from './AccordionPanel';
import { forwardRef } from '@/internals/utils';
import { useCustom } from '../CustomProvider';

export type AccordionProps = Omit<PanelGroupProps, 'accordion'>;

const Subcomponents = {
  Panel: AccordionPanel
};

/**
 * The `Accordion` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/accordion
 */
const Accordion = forwardRef<'div', AccordionProps, typeof Subcomponents>((props, ref) => {
  const { propsWithDefaults } = useCustom('Accordion', props);

  return <PanelGroup accordion ref={ref} {...propsWithDefaults} />;
}, Subcomponents);

Accordion.displayName = 'Accordion';

export default Accordion;
