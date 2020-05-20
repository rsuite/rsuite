import SelectPicker, { SelectPickerProps } from './SelectPicker';
import withLocale from '../IntlProvider/withLocale';

export default withLocale<SelectPickerProps>(['Picker'])(SelectPicker);
export { SelectPickerProps };
