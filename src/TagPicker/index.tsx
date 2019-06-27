import defaultProps from 'recompose/defaultProps';
import compose from 'recompose/compose';

import InputPicker from '../InputPicker/InputPicker';
import withLocale from '../IntlProvider/withLocale';

const enhance = compose(withLocale(['Picker', 'InputPicker']), defaultProps({ multi: true }));

export default enhance(InputPicker);
