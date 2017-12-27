// @flow
import Icon from './Icon';
import deprecationWarning from './utils/deprecationWarning';

export default deprecationWarning.wrapper(Icon,
  '`<IconFont>`',
  '`<Icon>`',
  'https://rsuitejs.com/components/icon'
);
