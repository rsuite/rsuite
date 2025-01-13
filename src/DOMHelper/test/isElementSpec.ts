import isElement from '../isElement';

describe('DOMHelper - isElement', () => {
  it('Should be an element node', () => {
    expect(isElement(document.createElement('div'))).to.be.true;
    expect(isElement(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))).to.be.true;
  });

  it('Should not be an element node', () => {
    expect(isElement(undefined)).to.be.false;
    expect(isElement(null)).to.be.false;
    expect(isElement({})).to.be.false;
    expect(isElement(document.createAttribute('class'))).to.be.false;
    expect(isElement(document)).to.be.false;
    expect(isElement(document.createTextNode('text'))).to.be.false;
    expect(isElement(document.createDocumentFragment())).to.be.false;
  });
});
