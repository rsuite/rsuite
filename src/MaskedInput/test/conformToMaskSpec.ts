import _ from 'lodash';
import sinon from 'sinon';
import conformToMask from '../conformToMask';
import dynamicTests from './dynamicTests';
import testParameters, { noGuideMode, acceptedCharInMask, escapedMaskChar } from './testParameters';
import { convertMaskToPlaceholder } from '../utilities';
import keepCharPositionsTests from './keepCharPositionsTests';
import maskFunctionTests from './maskFunctionTests';

const testInputs = ['rawValue', 'mask', 'previousConformedValue', 'currentCaretPosition'];
const placeholderChar = '_';

describe('conformToMask', () => {
  it('throws if mask is not an array or function', () => {
    const err = 'Text-mask:conformToMask; The mask property must be an array.';
    expect(() => conformToMask('', false)).to.throw(err);
    expect(() => conformToMask('', true)).to.throw(err);
    expect(() => conformToMask('', 'abc')).to.throw(err);
    expect(() => conformToMask('', 123)).to.throw(err);
    expect(() => conformToMask('', null)).to.throw(err);
    expect(() => conformToMask('', {})).to.throw(err);
  });

  it('works with mask functions', () => {
    const mask = () => [/\d/, /\d/, /\d/, /\d/];

    expect(() => conformToMask('', mask)).to.not.throw();
  });

  it('calls the mask function', () => {
    const maskSpy = sinon.spy(() => [/\d/, /\d/, /\d/, /\d/]);
    const result = conformToMask('2', maskSpy);

    expect(result.conformedValue).to.equal('2___');
    expect(maskSpy.callCount).to.equal(1);
  });

  it('passes the rawValue to the mask function', () => {
    const mask = value => {
      expect(typeof value).to.equal('string');
      expect(value).to.equal('2');
      return [/\d/, /\d/, /\d/, /\d/];
    };
    const result = conformToMask('2', mask);

    expect(result.conformedValue).to.equal('2___');
  });

  it('passes the config to the mask function', () => {
    const mask = (_value, config) => {
      expect(typeof config).to.equal('object');
      expect(config).to.deep.equal({
        currentCaretPosition: 2,
        previousConformedValue: '1',
        placeholderChar: '_'
      });
      return [/\d/, /\d/, /\d/, /\d/];
    };
    const result = conformToMask('12', mask, {
      currentCaretPosition: 2,
      previousConformedValue: '1',
      placeholderChar: '_'
    });

    expect(result.conformedValue).to.equal('12__');
  });

  it('processes the result of the mask function and removes caretTraps', () => {
    const mask = () => [/\d/, /\d/, '[]', '.', '[]', /\d/, /\d/];
    const result = conformToMask('2', mask);

    expect(result.conformedValue).to.equal('2_.__');
  });

  describe('Accepted character in mask', () => {
    dynamicTests(
      _.filter(acceptedCharInMask, test => !(test as any).skip),

      test => ({
        description:
          `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
          `it outputs '${test.conformedValue}' Line: ${test.line}`,

        body: () => {
          expect(
            conformToMask(test.rawValue, test.mask, {
              guide: true,
              previousConformedValue: test.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
              currentCaretPosition: test.currentCaretPosition
            }).conformedValue
          ).to.equal(test.conformedValue);
        }
      })
    );
  });

  describe('Guide mode tests', () => {
    dynamicTests(
      testParameters,

      test => ({
        description:
          `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
          `it outputs '${test.conformedValue}' Line: ${test.line}`,

        body: () => {
          expect(
            conformToMask(test.rawValue, test.mask, {
              previousConformedValue: test.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
              currentCaretPosition: test.currentCaretPosition
            }).conformedValue
          ).to.equal(test.conformedValue);
        }
      })
    );
  });

  describe('No guide mode', () => {
    dynamicTests(
      noGuideMode,

      test => ({
        description:
          `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
          `it outputs '${test.conformedValue}'`,

        body: () => {
          expect(
            conformToMask(test.rawValue, test.mask, {
              guide: false,
              previousConformedValue: test.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
              currentCaretPosition: test.currentCaretPosition
            }).conformedValue
          ).to.equal(test.conformedValue);
        }
      })
    );
  });

  describe('Allow escaped masking character in mask', () => {
    dynamicTests(
      escapedMaskChar,

      test => ({
        description:
          `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
          `it outputs '${test.conformedValue}'`,

        body: () => {
          expect(
            conformToMask(test.rawValue, test.mask, {
              guide: true,
              previousConformedValue: test.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
              currentCaretPosition: test.currentCaretPosition
            }).conformedValue
          ).to.equal(test.conformedValue);
        }
      })
    );
  });

  describe('keepCharPositionsTests', () => {
    dynamicTests(
      keepCharPositionsTests,

      test => ({
        description:
          `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
          `it outputs '${test.conformedValue}' Line: ${test.line}`,

        body: () => {
          expect(
            conformToMask(test.rawValue, test.mask, {
              guide: true,
              previousConformedValue: test.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
              keepCharPositions: true,
              currentCaretPosition: test.currentCaretPosition
            }).conformedValue
          ).to.equal(test.conformedValue);
        }
      })
    );
  });

  describe('Mask function', () => {
    it('works with mask functions', () => {
      const mask = () => [/\d/, /\d/, /\d/, /\d/];

      expect(() => conformToMask('', mask)).to.not.throw();
    });

    it('calls the mask function', () => {
      const maskSpy = sinon.spy(() => [/\d/, /\d/, /\d/, /\d/]);
      const result = conformToMask('2', maskSpy);

      expect(result.conformedValue).to.equal('2___');
      expect(maskSpy.callCount).to.equal(1);
    });

    it('passes the rawValue to the mask function', () => {
      const mask = value => {
        expect(typeof value).to.equal('string');
        expect(value).to.equal('2');
        return [/\d/, /\d/, /\d/, /\d/];
      };
      const result = conformToMask('2', mask);

      expect(result.conformedValue).to.equal('2___');
    });

    it('passes the config to the mask function', () => {
      const mask = (_value, config) => {
        expect(typeof config).to.equal('object');
        expect(config).to.deep.equal({
          currentCaretPosition: 2,
          previousConformedValue: '1',
          placeholderChar: '_'
        });
        return [/\d/, /\d/, /\d/, /\d/];
      };
      const result = conformToMask('12', mask, {
        currentCaretPosition: 2,
        previousConformedValue: '1',
        placeholderChar: '_'
      });

      expect(result.conformedValue).to.equal('12__');
    });

    it('processes the result of the mask function and removes caretTraps', () => {
      const mask = () => [/\d/, /\d/, '[]', '.', '[]', /\d/, /\d/];
      const result = conformToMask('2', mask);

      expect(result.conformedValue).to.equal('2_.__');
    });

    dynamicTests(
      maskFunctionTests,

      test => ({
        description:
          `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
          `it outputs '${test.conformedValue}' Line: ${test.line}`,

        body: () => {
          expect(
            conformToMask(test.rawValue, test.mask, {
              guide: true,
              previousConformedValue: test.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
              currentCaretPosition: test.currentCaretPosition
            }).conformedValue
          ).to.equal(test.conformedValue);
        }
      })
    );
  });
});
