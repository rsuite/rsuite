export const shouldTime = (format: string) => /(H|h|m|s)/.test(format);

export const shouldMonth = (format: string) => /y/.test(format) && /M/.test(format);

export const shouldDate = (format: string): boolean =>
  /y/.test(format) && /M/.test(format) && /d/.test(format);

export const shouldOnlyTime = (format: string) =>
  /(H|h|m|s)/.test(format) && !/(y|M|d)/.test(format);

export const formatNewDate = (date: string) => date && date.replace(/D|Y/gi, x => x.toLowerCase());
