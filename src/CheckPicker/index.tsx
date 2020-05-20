import CheckPicker, { CheckPickerProps } from './CheckPicker';
import withLocale from '../IntlProvider/withLocale';

export default withLocale(['Picker', 'CheckPicker'])(CheckPicker);
export { CheckPickerProps };
