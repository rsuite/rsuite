import CalendarPanel, { CalendarPanelProps } from './CalendarPanel';
import withLocale from '../IntlProvider/withLocale';

export default withLocale(['Calendar'])(CalendarPanel);
export { CalendarPanelProps as CalendarProps };
