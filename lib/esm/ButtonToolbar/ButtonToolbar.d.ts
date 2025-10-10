import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
import Stack from '../Stack';
export interface ButtonToolbarProps extends WithAsProps {
    /**
     * The ARIA role describing the button toolbar. Generally the default
     * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
     * prop is also recommended.
     */
    role?: string;
}
/**
 * The ButtonToolbar component is used to group a series of buttons together in a single line.
 * @see https://rsuitejs.com/components/button/#button-toolbar
 */
declare const ButtonToolbar: RsRefForwardingComponent<typeof Stack, ButtonToolbarProps>;
export default ButtonToolbar;
