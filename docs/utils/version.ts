import pkg from '../package.json';

export const isNewComponent = (minVersion?: string) => {
  if (!minVersion) return false;

  const [currentMajor, currentMinor] = pkg.version.split('.').map(Number);
  const [minMajor, minMinor] = minVersion.split('.').map(Number);

  if (currentMajor > minMajor) {
    return false;
  }

  const totalDiff = currentMinor - minMinor;

  // If the current version is less than 10 minor versions of the minimum version,
  // it is considered a new component.
  return totalDiff <= 10;
};

export const isUpdatedComponent = (updateVersion?: string) => {
  if (!updateVersion) return false;

  const [currentMajor, currentMinor] = pkg.version.split('.').map(Number);
  const [minMajor, minMinor] = updateVersion.split('.').map(Number);

  if (currentMajor > minMajor) {
    return false;
  }

  const totalDiff = currentMinor - minMinor;

  return totalDiff <= 1;
};
