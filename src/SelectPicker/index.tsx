import SelectPicker from './SelectPicker';
import withLocale from '../IntlProvider/withLocale';
import { SelectPickerProps } from './SelectPicker.d';

export default withLocale<SelectPickerProps>(['Picker'])(SelectPicker);
