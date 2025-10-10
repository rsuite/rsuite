import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
interface StatValueProps extends WithAsProps {
    value?: number;
    formatOptions?: Intl.NumberFormatOptions;
}
declare const StatValue: RsRefForwardingComponent<'dd', StatValueProps>;
export default StatValue;
