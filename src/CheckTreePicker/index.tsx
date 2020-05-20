import CheckTreePicker, { CheckTreePickerProps } from './CheckTreePicker';
import withLocale from '../IntlProvider/withLocale';

export default withLocale<CheckTreePickerProps>(['Picker', 'CheckTreePicker'])(CheckTreePicker);
export { CheckTreePickerProps };
