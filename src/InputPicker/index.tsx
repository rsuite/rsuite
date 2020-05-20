import InputPicker, { InputPickerProps } from './InputPicker';
import withLocale from '../IntlProvider/withLocale';

export default withLocale(['Picker', 'InputPicker'])(InputPicker);
export { InputPickerProps };
