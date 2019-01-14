import dayjs from 'dayjs';

function equalMoment(a, b, unit = 'day') {
  if (dayjs.isDayjs(a) && dayjs.isDayjs(b)) {
    return a.isSame(b, unit);
  }

  return a === b;
}

export default equalMoment;
