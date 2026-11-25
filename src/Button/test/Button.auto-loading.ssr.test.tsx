import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import Button from '..';

describe('Button automatic loading SSR', () => {
  it.each([false, true])(
    'preserves the controlled loading markup without running actions: %s',
    loading => {
      const action = vi.fn();
      const onError = vi.fn();
      const expected = renderToString(<Button loading={loading}>Save</Button>);
      expect(
        renderToString(
          <Button autoLoading loading={loading} onClick={action} onClickError={onError}>
            Save
          </Button>
        )
      ).toBe(expected);
      expect(action).not.toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    }
  );
});
