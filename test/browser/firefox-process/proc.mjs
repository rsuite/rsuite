const integer = value => {
  const number = Number(value);
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(number)) {
    throw new Error('Invalid process counter');
  }
  return number;
};

export function parseStat(text) {
  const open = text.indexOf('(');
  const close = text.lastIndexOf(')');
  if (open < 1 || close <= open) throw new Error('Invalid process stat');
  const fields = text
    .slice(close + 1)
    .trim()
    .split(/\s+/);
  if (fields.length < 22 || !/^[A-Za-z]$/.test(fields[0])) {
    throw new Error('Incomplete process stat');
  }
  return {
    pid: integer(text.slice(0, open).trim()),
    name: text.slice(open + 1, close),
    state: fields[0],
    parentPID: integer(fields[1]),
    userTicks: integer(fields[11]),
    systemTicks: integer(fields[12]),
    startTicks: integer(fields[19])
  };
}

export function parseSchedule(text) {
  const values = text.trim().split(/\s+/);
  if (values.length !== 3 || values.some(value => !/^\d+$/.test(value))) {
    throw new Error('Invalid scheduler counters');
  }
  return { runtimeNS: values[0], runqueueWaitNS: values[1], timeslices: values[2] };
}
