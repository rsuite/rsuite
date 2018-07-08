import moment from 'moment';

function equalMoment(a, b, unit = 'day') {
  if (moment.isMoment(a) && moment.isMoment(b)) {
    return a.isSame(b, unit);
  }

  return a === b;
}

export default equalMoment;
