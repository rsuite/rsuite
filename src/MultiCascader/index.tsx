import MultiCascader, { MultiCascaderProps } from './MultiCascader';
import withLocale from '../IntlProvider/withLocale';

export default withLocale(['Picker', 'MultiCascader'])(MultiCascader);
export { MultiCascaderProps };
