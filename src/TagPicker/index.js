import defaultProps from 'recompose/defaultProps';
import compose from 'recompose/compose';

import Dropdown from '../InputPicker/Dropdown';
import withLocale from '../IntlProvider/withLocale';

const enhance = compose(withLocale(['Picker', 'InputPicker']), defaultProps({ multi: true }));

export default enhance(Dropdown);
