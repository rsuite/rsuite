import { describe, expect, it } from 'vitest';
import getOptionKey from '../getOptionKey';
import findItemByKey from '../findItemByKey';

describe('picker option identity', () => {
  it('distinguishes raw primitive values from strings resembling their tokens', () => {
    const values = [0, '0', '', 'number:0', 'string:0', '%', 'a b', '\ud800'];
    expect(new Set(values.map(getOptionKey)).size).toBe(values.length);
  });

  it('does not consume a string focus request with a mounted numeric row', () => {
    const container = document.createElement('div');
    const number = document.createElement('div');
    number.dataset.key = '0';
    number.dataset.pickerKey = getOptionKey(0);
    container.append(number);
    expect(findItemByKey(container, '0')).toBeUndefined();
    expect(findItemByKey(container, 0)).toBe(number);

    const string = document.createElement('div');
    string.dataset.key = '0';
    string.dataset.pickerKey = getOptionKey('0');
    container.append(string);
    expect(findItemByKey(container, '0')).toBe(string);
  });

  it('prefers typed rows and retains lookup for legacy custom rows', () => {
    const container = document.createElement('div');
    const legacy = document.createElement('div');
    legacy.dataset.key = '0';
    const typed = document.createElement('div');
    typed.dataset.key = '0';
    typed.dataset.pickerKey = getOptionKey('0');
    container.append(legacy, typed);
    expect(findItemByKey(container, '0')).toBe(typed);
    expect(findItemByKey(container, 0)).toBe(legacy);
    expect(findItemByKey(null, 0)).toBeUndefined();
  });
});
