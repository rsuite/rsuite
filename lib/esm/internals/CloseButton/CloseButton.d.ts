import { WithAsProps, RsRefForwardingComponent } from '../types';
import { CloseButtonLocale } from '../../locales';
export interface CloseButtonProps extends WithAsProps {
    /** Custom locale */
    locale?: CloseButtonLocale;
}
/**
 * Close button for components such as Message and Notification.
 */
declare const CloseButton: RsRefForwardingComponent<'button', CloseButtonProps>;
export default CloseButton;
