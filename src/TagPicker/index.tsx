import compose from 'recompose/compose';

import { defaultProps } from '../utils';
import InputPicker from '../InputPicker/InputPicker';
import withLocale from '../IntlProvider/withLocale';

export default compose(
  withLocale(['Picker', 'InputPicker']),
  defaultProps({ multi: true })
)(InputPicker);
