import { contains } from 'dom-lib';
import _ from 'lodash';

export default function handleMouseOverOut(handler: Function, event: SyntheticEvent<*>) {
  let target = event.currentTarget;
  let related = event.relatedTarget || _.get(event, ['nativeEvent', 'toElement']);

  if ((!related || (related !== target)) && !contains(target, related)) {
    handler(event);
  }
}
