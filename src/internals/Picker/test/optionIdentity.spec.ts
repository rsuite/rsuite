import { describe, expect, it } from 'vitest';
import getOptionKey from '../getOptionKey';
import findItemByValue from '../findItemByValue';

describe('picker option identity', () => {
  it('distinguishes raw primitive values from strings that resemble their tokens', () => {
    const values = [0, '0', '', 'number:0', 'string:0', '%', 'a b', '\ud800'];
    expect(new Set(values.map(getOptionKey)).size).to.equal(values.length);
  });

  it('does not consume a string request with the mounted numeric row', () => {
    const container = document.createElement('div');
    const number = document.createElement('div');
    number.dataset.key = '0';
    number.dataset.pickerKey = getOptionKey(0);
    container.append(number);
    expect(findItemByValue(container, '0')).to.be.undefined;
    expect(findItemByValue(container, 0)).to.equal(number);

    const string = document.createElement('div');
    string.dataset.key = '0';
    string.dataset.pickerKey = getOptionKey('0');
    container.append(string);
    expect(findItemByValue(container, '0')).to.equal(string);
  });

  it('retains legacy custom row lookup without treating typed rows as legacy', () => {
    const container = document.createElement('div');
    const legacy = document.createElement('div');
    legacy.dataset.key = '0';
    const typed = document.createElement('div');
    typed.dataset.key = '0';
    typed.dataset.pickerKey = getOptionKey('0');
    container.append(legacy, typed);
    expect(findItemByValue(container, '0')).to.equal(typed);
    expect(findItemByValue(container, 0)).to.equal(legacy);
    expect(findItemByValue(null, 0)).to.be.undefined;
  });
});
