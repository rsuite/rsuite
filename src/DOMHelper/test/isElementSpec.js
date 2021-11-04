import isElement from '../isElement';

describe('DOMHelper - isElement', () => {
  it('Should be an element node', () => {
    assert.isTrue(isElement(document.createElement('div')));
    assert.isTrue(isElement(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
  });

  it('Should not be an element node', () => {
    assert.isFalse(isElement(undefined));
    assert.isFalse(isElement(null));
    assert.isFalse(isElement({}));
    assert.isFalse(isElement(document.createAttribute('class')));
    assert.isFalse(isElement(document));
    assert.isFalse(isElement(document.createTextNode('text')));
    assert.isFalse(isElement(document.createDocumentFragment()));
  });
});
