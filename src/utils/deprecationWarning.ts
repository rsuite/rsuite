/**
 * Forked from react-bootstrap/react-bootstrap:
 * https://github.com/react-bootstrap/react-bootstrap/blob/master/src/utils/deprecationWarning.js
 */

import lowPriorityWarning from './lowPriorityWarning';

let warned: any = {};

function deprecationWarning(
  oldname?: string | { message: string },
  newname?: string,
  link?: string
) {
  let message;

  if (typeof oldname === 'object') {
    message = oldname.message;
  } else {
    message = `${oldname} is deprecated. Use ${newname} instead.`;

    if (link) {
      message += `\nYou can read more about it at ${link}`;
    }
  }

  if (warned[message]) {
    return;
  }

  lowPriorityWarning(false, message);
  warned[message] = true;
}

deprecationWarning.wrapper = (Component: React.ComponentClass, ...args: any[]) =>
  class DeprecatedComponent extends Component {
    constructor(props: any) {
      super(props);
      deprecationWarning(...args);
    }
  };

export default deprecationWarning;

export function resetWarned() {
  warned = {};
}
