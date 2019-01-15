export default function setTimingMargin(date, way = 'left') {
  if (way === 'right') {
    return date
      .set('hour', 23)
      .set('minute', 59)
      .set('second', 59);
  }
  return date
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0);
}
