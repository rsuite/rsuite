export default function setTimingMargin(date, way = 'left') {
  if (way === 'right') {
    return date
      .clone()
      .set('hour', 23)
      .set('minute', 59)
      .set('second', 59);
  }
  return date
    .clone()
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0);
}
