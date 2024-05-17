import sinon from 'sinon';
import { highlightText } from '../utils/highlightText';

describe('highlightText', () => {
  it('Should highlight the matching text', () => {
    const text = 'Hello world, this is a sample text';
    const query = 'sample';
    const renderMark = sinon.stub().returns('MARKED');

    const result = highlightText(text, { query, renderMark });

    expect(result).to.deep.equal(['Hello world, this is a ', 'MARKED', ' text']);
    expect(renderMark.calledOnceWithExactly('sample', 0)).to.be.true;
  });

  it('Should handle multiple queries', () => {
    const text = 'Hello world, this is a sample text';
    const query = ['Hello', 'sample'];
    const renderMark = sinon.stub().returns('MARKED');

    const result = highlightText(text, { query, renderMark });

    expect(result).to.deep.equal(['MARKED', ' world, this is a ', 'MARKED', ' text']);
    expect(renderMark.calledTwice).to.be.true;
    expect(renderMark.firstCall.calledWithExactly('Hello', 0)).to.be.true;
    expect(renderMark.secondCall.calledWithExactly('sample', 1)).to.be.true;
  });

  it('Should handle no matches', () => {
    const text = 'Hello world, this is a sample text';
    const query = 'foo';
    const renderMark = sinon.stub().returns('MARKED');

    const result = highlightText(text, { query, renderMark });

    expect(result).to.deep.equal(['Hello world, this is a sample text']);
    expect(renderMark).to.not.have.been.called;
  });

  it('Should handle no text', () => {
    const text = '';
    const query = 'foo';
    const renderMark = sinon.stub().returns('MARKED');
    const result = highlightText(text, { query, renderMark });
    expect(result).to.deep.equal('');
    expect(renderMark).to.not.have.been.called;
  });

  it('Should handle no query', () => {
    const text = 'Hello world, this is a sample text';
    const renderMark = sinon.stub().returns('MARKED');
    const result = highlightText(text, { renderMark });
    expect(result).to.deep.equal('Hello world, this is a sample text');
    expect(renderMark).to.not.have.been.called;
  });

  it('Should handle empty query', () => {
    const text = 'Hello world, this is a sample text';
    const query = '';
    const renderMark = sinon.stub().returns('MARKED');
    const result = highlightText(text, { query, renderMark });
    expect(result).to.deep.equal('Hello world, this is a sample text');
    expect(renderMark).to.not.have.been.called;
  });
});
