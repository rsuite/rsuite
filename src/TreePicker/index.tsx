import TreePicker, { TreePickerProps } from './TreePicker';
import withLocale from '../IntlProvider/withLocale';

export default withLocale<TreePickerProps>(['Picker'])(TreePicker);
export { TreePickerProps };
