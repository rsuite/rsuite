import { type PanelGroupProps } from '../PanelGroup';
import AccordionPanel from './AccordionPanel';
import { RsRefForwardingComponent } from '../internals/types';
export type AccordionProps = Omit<PanelGroupProps, 'accordion'>;
export interface AccordionComponent extends RsRefForwardingComponent<'div', AccordionProps> {
    Panel: typeof AccordionPanel;
}
/**
 * The `Accordion` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/accordion
 */
declare const Accordion: AccordionComponent;
export default Accordion;
