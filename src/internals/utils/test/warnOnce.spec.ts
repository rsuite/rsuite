import warnOnce from '../warnOnce';
import { describe, expect, it, afterEach, vi } from 'vitest';

describe('internals/utils/warnOnce', () => {
  // Ensure that uncaught exceptions between tests result in the tests failing.
  afterEach(() => {
    vi.restoreAllMocks();
    warnOnce._resetWarned();
  });

  it('Should log a warning message', () => {
    const message = 'Useful message';
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    warnOnce(message);

    expect(consoleWarnSpy).toHaveBeenCalledWith(message);
  });

  it('Should log the same message only once', () => {
    const message = 'Repeated message';
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    warnOnce(message);
    warnOnce(message);

    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  });

  it('Should be able to log a same message after resetting', () => {
    const message = 'Repeated message';
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    warnOnce(message);
    warnOnce._resetWarned();
    warnOnce(message);

    expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
  });
});
