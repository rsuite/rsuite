import DateRangePicker from './DateRangePicker';
import withLocale from '../IntlProvider/withLocale';
import * as utils from './disabledDateUtils';

const EnhancedDateRangePicker = withLocale(['DateRangePicker'])(DateRangePicker);

Object.keys(utils).forEach(key => {
  EnhancedDateRangePicker[key] = utils[key];
});

export default EnhancedDateRangePicker;
