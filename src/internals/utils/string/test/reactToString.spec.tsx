import React from 'react';
import { describe, expect, it } from 'vitest';
import { reactToString } from '../stringifyReactNode';

describe('internals/utils/reactToString', () => {
  it('reactToString', () => {
    const str = reactToString(
      <div>
        <a>123</a>
        <span>456</span>
      </div>
    );
    expect(str.join('')).to.equal('123456');
  });
});
