import TreePicker from './TreePicker';
import withLocale from '../IntlProvider/withLocale';
import { TreePickerProps } from './TreePicker.d';

export default withLocale<TreePickerProps>(['Picker'])(TreePicker);
