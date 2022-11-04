import _ from 'lodash';
import testParameters, { noGuideMode, caretTrapTests, acceptedCharInMask } from './testParameters';
import maskFunctionTests from './maskFunctionTests';
import { convertMaskToPlaceholder } from '../utilities';
import adjustCaretPosition from '../adjustCaretPosition';
import dynamicTests from './dynamicTests';

const placeholderChar = '_';

describe('adjustCaretPosition', () => {
  it('places the caret at the beginning when the value has been reset programmatically', () => {
    expect(
      adjustCaretPosition({
        previousConformedValue: '',
        placeholderChar,
        conformedValue: '________-___',
        placeholder: convertMaskToPlaceholder([
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/
        ]),
        rawValue: '',
        currentCaretPosition: 3
      })
    ).to.equal(0);
  });

  it('places the caret after the last change when operation is addition', () => {
    expect(
      adjustCaretPosition({
        previousConformedValue: '3333',
        placeholderChar,
        conformedValue: '2938',
        placeholder: convertMaskToPlaceholder([/\d/, /\d/, /\d/, /\d/]),
        rawValue: '2938',
        currentCaretPosition: 4
      })
    ).to.equal(4);
  });

  it(
    'sets the caret back in order to prevent it from moving when the change ' +
      'has not actually modified the output and the operation is not deletion',
    () => {
      expect(
        adjustCaretPosition({
          previousConformedValue: '(123) ___-____',
          conformedValue: '(123) ___-____',
          rawValue: '(123) ___-f____',
          placeholder: convertMaskToPlaceholder([
            '(',
            /\d/,
            /\d/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/
          ]),
          placeholderChar,
          currentCaretPosition: 11
        })
      ).to.equal(10);
    }
  );

  it(
    'moves the caret to the nearest placeholder character if the previous input and new ' +
      'conformed output are the same but the reverted position is not a ' +
      'placeholder character',
    () => {
      expect(
        adjustCaretPosition({
          previousConformedValue: '(___)      ___-____',
          conformedValue: '(___)      ___-____',
          rawValue: '(___))      ___-____',
          placeholder: convertMaskToPlaceholder([
            '(',
            /\d/,
            /\d/,
            /\d/,
            ')',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/
          ]),
          placeholderChar,
          currentCaretPosition: 5
        })
      ).to.equal(11);
    }
  );

  it(
    'knows to move the caret back when the previousInput and conformToMaskResults output ' +
      'are identical but the operation is deletion',
    () => {
      expect(
        adjustCaretPosition({
          previousConformedValue: '(123) ___-____',
          conformedValue: '(123) ___-____',
          rawValue: '(123 ___-____',
          placeholder: convertMaskToPlaceholder([
            '(',
            /\d/,
            /\d/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/
          ]),
          placeholderChar,
          currentCaretPosition: 4
        })
      ).to.equal(4);
    }
  );

  it(
    'knows to move caret to the next mask area when the last character of the current part ' +
      'has just been filled and the caret is at the end of the mask part',
    () => {
      expect(
        adjustCaretPosition({
          previousConformedValue: '(12_) _',
          conformedValue: '(123) _',
          rawValue: '(123_) _',
          placeholder: convertMaskToPlaceholder(['(', /\d/, /\d/, /\d/, ')', ' ', /\d/]),
          placeholderChar,
          currentCaretPosition: 4
        })
      ).to.equal(6);

      expect(
        adjustCaretPosition({
          previousConformedValue: '(12_) 7',
          conformedValue: '(132) _',
          rawValue: '(132_) 7',
          placeholder: convertMaskToPlaceholder(['(', /\d/, /\d/, /\d/, ')', ' ', /\d/]),
          placeholderChar,
          currentCaretPosition: 3
        })
      ).to.equal(3);
    }
  );

  it(
    'knows to move caret to previous mask part when the first character of current part ' +
      'has just been deleted and the caret is at the beginning of the mask part',
    () => {
      expect(
        adjustCaretPosition({
          previousConformedValue: '(124) 3',
          conformedValue: '(124) _',
          rawValue: '(124) ',
          placeholder: convertMaskToPlaceholder(['(', /\d/, /\d/, /\d/, ')', ' ', /\d/]),
          placeholderChar,
          currentCaretPosition: 6
        })
      ).to.equal(4);

      expect(
        adjustCaretPosition({
          previousConformedValue: '(12_) 3',
          conformedValue: '(12_) _',
          rawValue: '(12_) ',
          placeholder: convertMaskToPlaceholder(['(', /\d/, /\d/, /\d/, ')', ' ', /\d/]),
          placeholderChar,
          currentCaretPosition: 6
        })
      ).to.equal(4);
    }
  );

  const testInputs = [
    'rawValue',
    'conformedValue',
    'mask',
    'previousConformedValue',
    'currentCaretPosition'
  ];

  describe('Guide mode', () => {
    dynamicTests(
      _.filter(testParameters, (testParameter: any) => {
        return !(
          _.isArray(testParameter.skips) && _.includes(testParameter.skips, 'adjustCaretPosition')
        );
      }),

      test => ({
        description: `for input: ${JSON.stringify(
          _.pick(test, testInputs)
        )}, it knows to adjust the caret to '${test.adjustedCaretPosition}'. Line: ${test.line}`,

        body: () => {
          expect(
            adjustCaretPosition({
              previousConformedValue: test.previousConformedValue,
              previousPlaceholder: test.previousPlaceholder,
              conformedValue: test.conformedValue,
              rawValue: test.rawValue,
              placeholder: convertMaskToPlaceholder(test.mask),
              guide: true,
              placeholderChar,
              currentCaretPosition: test.currentCaretPosition
            } as any)
          ).to.equal(test.adjustedCaretPosition);
        }
      })
    );
  });

  describe('No-guide mode', () => {
    dynamicTests(
      _.filter(noGuideMode, (testParameter: any) => {
        return !(
          _.isArray(testParameter.skips) && _.includes(testParameter.skips, 'adjustCaretPosition')
        );
      }),

      test => ({
        description: `for input: ${JSON.stringify(
          _.pick(test, testInputs)
        )}, it knows to adjust the caret to '${test.adjustedCaretPosition}' Line: ${test.line}`,

        body: () => {
          expect(
            adjustCaretPosition({
              previousConformedValue: test.previousConformedValue,
              conformedValue: test.conformedValue,
              rawValue: test.rawValue,
              placeholder: convertMaskToPlaceholder(test.mask),
              guide: false,
              placeholderChar,
              currentCaretPosition: test.currentCaretPosition
            } as any)
          ).to.equal(test.adjustedCaretPosition);
        }
      })
    );
  });

  describe('Mask function tests', () => {
    dynamicTests(
      _.filter(
        maskFunctionTests,
        (testParameter: any) => !_.includes(testParameter.skips, 'adjustCaretPosition')
      ),

      test => ({
        description:
          `for input: ${JSON.stringify(
            _.pick(test, testInputs)
          )}, it knows to adjust the caret to ` + `'${test.adjustedCaretPosition}'`,

        body: () => {
          expect(
            adjustCaretPosition({
              previousConformedValue: test.previousConformedValue,
              conformedValue: test.conformedValue,
              rawValue: test.rawValue,
              placeholder: convertMaskToPlaceholder(test.mask),
              guide: false,
              placeholderChar,
              currentCaretPosition: test.currentCaretPosition
            } as any)
          ).to.equal(test.adjustedCaretPosition);
        }
      })
    );
  });

  describe('Caret trap tests', () => {
    dynamicTests(
      _.filter(
        caretTrapTests,
        (testParameter: any) => !_.includes(testParameter.skips, 'adjustCaretPosition')
      ),

      test => ({
        description:
          `for input: ${JSON.stringify(
            _.pick(test, testInputs)
          )}, it knows to adjust the caret to ` + `'${test.adjustedCaretPosition}'`,

        body: () => {
          expect(
            adjustCaretPosition({
              previousConformedValue: test.previousConformedValue,
              conformedValue: test.conformedValue,
              rawValue: test.rawValue,
              placeholder: convertMaskToPlaceholder(test.mask),
              guide: false,
              placeholderChar,
              currentCaretPosition: test.currentCaretPosition,
              caretTrapIndexes: test.caretTrapIndexes
            } as any)
          ).to.equal(test.adjustedCaretPosition);
        }
      })
    );
  });

  describe('Accepted char in mask', () => {
    dynamicTests(
      _.filter(
        acceptedCharInMask,
        (testParameter: any) => !_.includes(testParameter.skips, 'adjustCaretPosition')
      ),

      test => ({
        description:
          `for input: ${JSON.stringify(
            _.pick(test, testInputs)
          )}, it knows to adjust the caret to ` +
          `'${test.adjustedCaretPosition}'. Line: '${test.line}'`,

        body: () => {
          expect(
            adjustCaretPosition({
              previousConformedValue: test.previousConformedValue,
              conformedValue: test.conformedValue,
              rawValue: test.rawValue,
              placeholder: convertMaskToPlaceholder(test.mask),
              guide: false,
              placeholderChar,
              currentCaretPosition: test.currentCaretPosition,
              caretTrapIndexes: test.caretTrapIndexes
            } as any)
          ).to.equal(test.adjustedCaretPosition);
        }
      })
    );
  });
});
