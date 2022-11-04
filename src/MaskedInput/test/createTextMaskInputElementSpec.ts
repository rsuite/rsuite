import sinon from 'sinon';
import createTextMaskInputElement from '../createTextMaskInputElement';

const placeholderChar = '_';
let inputElement;

describe('createTextMaskInputElement', () => {
  beforeEach(() => {
    inputElement = document.createElement('input');
    document.body.appendChild(inputElement);
  });

  afterEach(() => {
    document.body.removeChild(inputElement);
    inputElement = null;
  });

  it(
    'takes an inputElement and other Text Mask parameters and returns an object which ' +
      'allows updating and controlling the masking of the input element',
    () => {
      const maskedInputElementControl = createTextMaskInputElement({
        inputElement,
        mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      });

      expect(maskedInputElementControl.update).to.be.a('function');
    }
  );

  it('works with mask functions', () => {
    const mask = () => [/\d/, /\d/, /\d/, /\d/];

    expect(() => createTextMaskInputElement({ inputElement, mask })).to.not.throw();
  });

  it('displays mask when showMask is true', () => {
    const textMaskControl = createTextMaskInputElement({
      showMask: true,
      inputElement,
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    });
    textMaskControl.update();
    expect(inputElement.value).to.equal('(___) ___-____');
  });

  it('does not display mask when showMask is false', () => {
    const textMaskControl = createTextMaskInputElement({
      showMask: false,
      inputElement,
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    });
    textMaskControl.update();
    expect(inputElement.value).to.equal('');
  });

  describe('`update` method', () => {
    it('conforms whatever value is in the input element to a mask', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement({ inputElement, mask });

      inputElement.value = '2';
      textMaskControl.update();
      expect(inputElement.value).to.equal('(2__) ___-____');
    });

    it('works after multiple calls', () => {
      const mask = [
        '+',
        '1',
        ' ',
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
      ];

      const textMaskControl = createTextMaskInputElement({ inputElement, mask });

      inputElement.value = '2';
      textMaskControl.update();
      expect(inputElement.value).to.equal('+1 (2__) ___-____');

      inputElement.value = '+1 (23__) ___-____';
      inputElement.selectionStart = 6;
      textMaskControl.update();
      expect(inputElement.value).to.equal('+1 (23_) ___-____');

      inputElement.value = '+1 (2_) ___-____';
      inputElement.selectionStart = 5;
      textMaskControl.update();
      expect(inputElement.value).to.equal('+1 (2__) ___-____');

      inputElement.value = '+1 (__) ___-____';
      inputElement.setSelectionRange(4, 4);
      textMaskControl.update();
      expect(inputElement.value).to.equal('');
    });

    it('accepts a string to conform and overrides whatever value is in the input element', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement({ inputElement, mask });

      inputElement.value = '2';
      textMaskControl.update('123');
      expect(inputElement.value).to.equal('(123) ___-____');
    });

    it('accepts an empty string and overrides whatever value is in the input element', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement({ inputElement, mask });

      textMaskControl.update(123);
      expect(inputElement.value).to.equal('(123) ___-____');

      textMaskControl.update('');
      expect(inputElement.value).to.equal('');
    });

    it('accepts an empty string after reinitializing text mask', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      let textMaskControl = createTextMaskInputElement({ inputElement, mask });

      textMaskControl.update(123);
      expect(inputElement.value).to.equal('(123) ___-____');

      //reset text mask
      textMaskControl = createTextMaskInputElement({ inputElement, mask });

      // now clear the value
      textMaskControl.update('');
      expect(inputElement.value).to.equal('');
    });

    it('works with a string', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement({ inputElement, mask });

      textMaskControl.update('2');

      expect(inputElement.value).to.equal('(2__) ___-____');
    });

    it('works with a number by coercing it into a string', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement({ inputElement, mask });

      textMaskControl.update(2);

      expect(inputElement.value).to.equal('(2__) ___-____');
    });

    it('works with `undefined` and `null` by treating them as empty strings', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement({ inputElement, mask });

      textMaskControl.update(undefined);
      expect(inputElement.value).to.equal('');

      textMaskControl.update(null);
      expect(inputElement.value).to.equal('');
    });

    it('throws if given a value that it cannot work with', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement({ inputElement, mask });

      expect(() => textMaskControl.update({})).to.throw();
      expect(() => textMaskControl.update(() => 'howdy')).to.throw();
      expect(() => textMaskControl.update([])).to.throw();
    });

    it('adjusts the caret position', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement({ inputElement, mask, placeholderChar });

      inputElement.focus();
      inputElement.value = '2';
      inputElement.selectionStart = 1;

      textMaskControl.update();
      expect(inputElement.selectionStart).to.equal(2);
    });

    it('does not adjust the caret position if the input element is not focused', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement({ inputElement, mask });

      inputElement.value = '2';
      inputElement.focus();
      inputElement.setSelectionRange(0, 0);

      textMaskControl.update();
      expect(inputElement.selectionStart).to.equal(0);
    });

    it('calls the mask function before every update', () => {
      const maskSpy = sinon.spy(() => [/\d/, /\d/, /\d/, /\d/]);
      const textMaskControl = createTextMaskInputElement({ inputElement, mask: maskSpy });

      inputElement.value = '2';
      textMaskControl.update();
      expect(inputElement.value).to.equal('2___');

      inputElement.value = '24';
      textMaskControl.update();
      expect(inputElement.value).to.equal('24__');

      expect(maskSpy.callCount).to.equal(2);
    });

    it('can be disabled with `false` mask', () => {
      const mask = false;
      const textMaskControl = createTextMaskInputElement({ inputElement, mask });

      inputElement.value = 'a';
      textMaskControl.update();
      expect(inputElement.value).to.equal('a');
    });

    it('can be disabled by returning `false` from mask function', () => {
      const mask = () => false;
      const textMaskControl = createTextMaskInputElement({ inputElement, mask });

      inputElement.value = 'a';
      textMaskControl.update();
      expect(inputElement.value).to.equal('a');
    });

    it('can pass in a config object to the update method', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement();

      const inputElement = { value: '2' };

      textMaskControl.update(inputElement.value, { inputElement, mask });
      expect(inputElement.value).to.equal('(2__) ___-____');
    });

    it('can change the mask passed to the update method', () => {
      const textMaskControl = createTextMaskInputElement();

      const inputElement = { value: '2' };

      textMaskControl.update(inputElement.value, {
        inputElement,
        mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      });
      expect(inputElement.value).to.equal('(2__) ___-____');

      textMaskControl.update('2', {
        inputElement,
        mask: [
          '+',
          '1',
          ' ',
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
        ]
      });
      expect(inputElement.value).to.equal('+1 (2__) ___-____');
    });

    it('can change the guide passed to the update method', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement();

      const inputElement = { value: '2' };

      textMaskControl.update(inputElement.value, { inputElement, mask, guide: true });
      expect(inputElement.value).to.equal('(2__) ___-____');

      textMaskControl.update('2', { inputElement, mask, guide: false });
      expect(inputElement.value).to.equal('(2');
    });

    it('can change the placeholderChar passed to the update method', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement();

      const inputElement = { value: '2' };

      textMaskControl.update(inputElement.value, { inputElement, mask, placeholderChar: '_' });
      expect(inputElement.value).to.equal('(2__) ___-____');

      textMaskControl.update('2', { inputElement, mask, placeholderChar: '*' });
      expect(inputElement.value).to.equal('(2**) ***-****');
    });

    it('can change the inputElement passed to the update method', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const textMaskControl = createTextMaskInputElement();

      const firstInputElement = { value: '1' };
      const secondInputElement = { value: '2' };

      textMaskControl.update('1', { inputElement: firstInputElement, mask });
      expect(firstInputElement.value).to.equal('(1__) ___-____');

      textMaskControl.update('2', { inputElement: secondInputElement, mask });
      expect(secondInputElement.value).to.equal('(2__) ___-____');
    });

    it('can change the config passed to createTextMaskInputElement', () => {
      const config = {
        inputElement,
        mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        guide: true,
        placeholderChar: '_'
      };
      const textMaskControl = createTextMaskInputElement(config);

      inputElement.value = '2';
      textMaskControl.update();
      expect(inputElement.value).to.equal('(2__) ___-____');

      // change the mask
      config.mask = [
        '+',
        '1',
        ' ',
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
      ];
      inputElement.value = '23'; // <- you have to change the value
      textMaskControl.update();
      expect(inputElement.value).to.equal('+1 (23_) ___-____');

      // change the placeholderChar
      config.placeholderChar = '*';
      inputElement.value = '4'; // <- you have to change the value
      textMaskControl.update();
      expect(inputElement.value).to.equal('+1 (4**) ***-****');

      // change the guide
      config.guide = false;
      inputElement.value = '45'; // <- you have to change the value
      textMaskControl.update();
      expect(inputElement.value).to.equal('+1 (45');
    });

    it('can override the config passed to createTextMaskInputElement', () => {
      const textMaskControl = createTextMaskInputElement({
        inputElement,
        mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        guide: true
      });

      inputElement.value = '2';
      textMaskControl.update();
      expect(inputElement.value).to.equal('(2__) ___-____');

      // pass in a config to the update method
      textMaskControl.update('23', {
        inputElement,
        mask: [
          '+',
          '1',
          ' ',
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
        ],
        guide: false
      });
      expect(inputElement.value).to.equal('+1 (23');

      // use original config again
      inputElement.value = '234'; // <- you have to change the value
      textMaskControl.update();
      expect(inputElement.value).to.equal('(234) ___-____');
    });
  });
});
