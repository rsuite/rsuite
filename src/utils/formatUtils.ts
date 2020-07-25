export const shouldTime = (format: string) => /(H|h|m|s)/.test(format);

export const shouldMonth = (format: string) => /Y/.test(format) && /M/.test(format);

export const shouldDate = (format: string): boolean =>
  /Y/.test(format) && /M/.test(format) && /D/.test(format);

export const shouldOnlyTime = (format: string) =>
  /(H|h|m|s)/.test(format) && !/(Y|M|D)/.test(format);
