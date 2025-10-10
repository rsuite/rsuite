import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface DividerProps extends WithAsProps {
    /**
     * Vertical dividing line. Cannot be used with text.
     */
    vertical?: boolean;
}
/**
 * The Divider component is used to separate content.
 * @see https://rsuitejs.com/components/divider
 */
declare const Divider: RsRefForwardingComponent<'div', DividerProps>;
export default Divider;
