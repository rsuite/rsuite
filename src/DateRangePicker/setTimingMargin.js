export default function setTimingMargin(date, way = 'left') {
  if (way === 'right') {
    return date
      .clone()
      .hours(23)
      .minutes(59)
      .seconds(59);
  }
  return date
    .clone()
    .hours(0)
    .minutes(0)
    .seconds(0);
}
