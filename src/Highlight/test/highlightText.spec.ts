import { describe, expect, it, vi } from 'vitest';
import { highlightText } from '../utils/highlightText';

describe('highlightText', () => {
  it('Should highlight the matching text', () => {
    const text = 'Hello world, this is a sample text';
    const query = 'sample';
    const renderMark = vi.fn().mockReturnValue('MARKED');

    const result = highlightText(text, { query, renderMark });

    expect(result).to.deep.equal(['Hello world, this is a ', 'MARKED', ' text']);
    expect(renderMark).toHaveBeenCalledWith('sample', 0);
    expect(renderMark).toHaveBeenCalledTimes(1);
  });

  it('Should handle multiple queries', () => {
    const text = 'Hello world, this is a sample text';
    const query = ['Hello', 'sample'];
    const renderMark = vi.fn().mockReturnValue('MARKED');

    const result = highlightText(text, { query, renderMark });

    expect(result).to.deep.equal(['MARKED', ' world, this is a ', 'MARKED', ' text']);
    expect(renderMark).toHaveBeenCalledTimes(2);
    expect(renderMark).toHaveBeenNthCalledWith(1, 'Hello', 0);
    expect(renderMark).toHaveBeenNthCalledWith(2, 'sample', 1);
  });

  it('Should handle no matches', () => {
    const text = 'Hello world, this is a sample text';
    const query = 'foo';
    const renderMark = vi.fn().mockReturnValue('MARKED');

    const result = highlightText(text, { query, renderMark });

    expect(result).to.deep.equal(['Hello world, this is a sample text']);
    expect(renderMark).not.toHaveBeenCalled();
  });

  it('Should handle no text', () => {
    const text = '';
    const query = 'foo';
    const renderMark = vi.fn().mockReturnValue('MARKED');
    const result = highlightText(text, { query, renderMark });
    expect(result).to.deep.equal('');
    expect(renderMark).not.toHaveBeenCalled();
  });

  it('Should handle no query', () => {
    const text = 'Hello world, this is a sample text';
    const renderMark = vi.fn().mockReturnValue('MARKED');
    const result = highlightText(text, { renderMark });
    expect(result).to.deep.equal('Hello world, this is a sample text');
    expect(renderMark).not.toHaveBeenCalled();
  });

  it('Should handle empty query', () => {
    const text = 'Hello world, this is a sample text';
    const query = '';
    const renderMark = vi.fn().mockReturnValue('MARKED');
    const result = highlightText(text, { query, renderMark });
    expect(result).to.deep.equal('Hello world, this is a sample text');
    expect(renderMark).not.toHaveBeenCalled();
  });
});
