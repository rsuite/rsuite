import CheckTreePicker from './CheckTreePicker';
import withLocale from '../IntlProvider/withLocale';
import { CheckTreePickerProps } from './CheckTreePicker.d';

export default withLocale<CheckTreePickerProps>(['Picker', 'CheckTreePicker'])(CheckTreePicker);
