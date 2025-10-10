import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
interface ProgressBarProps extends WithAsProps {
    vertical?: boolean;
    rtl?: boolean;
    start?: number;
    end?: number;
}
declare const ProgressBar: RsRefForwardingComponent<'div', ProgressBarProps>;
export default ProgressBar;
