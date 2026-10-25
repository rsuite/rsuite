import { describe, expect, it } from 'vitest';
import getItemsByElements from '../getItemsByElements';
import getOptionKey from '../getOptionKey';

function row(value: unknown, typed = true) {
  const element = document.createElement('div');
  element.dataset.key = String(value);
  if (typed) element.dataset.pickerKey = getOptionKey(value);
  return element;
}

describe('getItemsByElements', () => {
  it('retains rendered order, original types and first-match duplicate semantics', () => {
    const number = { value: 0 };
    const string = { value: '0' };
    const token = { value: 'number:0' };
    const duplicate = { value: 0 };
    const data = [number, string, token, duplicate];
    const result = getItemsByElements(
      [row('number:0'), row('0'), row(0), row('0', false)],
      data,
      'value'
    );
    expect(result).toEqual([token, string, number, number]);
    expect(result[2]).toBe(number);
    expect(result[3]).toBe(number);
  });

  it('retains first-match string conversion for non-primitive and missing values', () => {
    const values = [null, undefined, NaN, false, {}, {}, '', '__proto__', Symbol('key')];
    const data = values.map(id => ({ id }));
    expect(
      getItemsByElements(
        values.map(value => row(value)),
        data,
        'id'
      )
    ).toEqual([data[0], data[1], data[2], data[3], data[4], data[4], data[6], data[7], data[8]]);
  });

  it('does not fall back from an unmatched typed key to a legacy key', () => {
    const typed = row('missing');
    typed.dataset.key = 'present';
    expect(
      getItemsByElements(
        [typed, row('present', false), document.createElement('div')],
        [{ value: 'present' }],
        'value'
      )
    ).toEqual([undefined, { value: 'present' }, undefined]);
  });

  it('handles an empty data set and an empty rendered list', () => {
    expect(getItemsByElements([row(1)], undefined, 'value')).toEqual([undefined]);
    expect(getItemsByElements([], [{ value: 1 }], 'value')).toEqual([]);
  });
});
