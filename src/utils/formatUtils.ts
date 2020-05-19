export const shouldTime = (format: string) => /([Hhms])/.test(format);

export const shouldMonth = (format: string) => /[Yy]/.test(format) && /M/.test(format);

export const shouldDate = (format: string): boolean =>
  /[Yy]/.test(format) && /M/.test(format) && /[Dd]/.test(format); // for date-fns v1 and v2

export const shouldOnlyTime = (format: string) =>
  /([Hhms])/.test(format) && !/([YyMDd])/.test(format); // for date-fns v1 and v2
