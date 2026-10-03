import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import ButtonGroup from '../ButtonGroup';
import Badge from '../../Badge';
import Button from '../../Button';

describe('ButtonGroup server rendering with Badge', () => {
  it('renders justified badge buttons with their initial layout attributes', () => {
    const html = renderToString(
      <ButtonGroup justified>
        <Badge content="7">
          <Button ripple={false}>Wrapped</Button>
        </Badge>
        <Button ripple={false}>Bare</Button>
      </ButtonGroup>
    );

    expect(html).toContain('data-badge-layout="true"');
    expect(html.match(/data-button-group-item="true"/g)).toHaveLength(1);
    expect(html.match(/<button\b/g)).toHaveLength(2);
    expect(html).toContain('>Wrapped</button>');
    expect(html).toContain('>Bare</button>');
    expect(html).toContain('class="rs-badge-content">7</div>');
  });

  it.each([
    { name: 'text', sibling: 'extra text', expected: '</button>extra text' },
    { name: 'zero', sibling: 0, expected: '</button>0' },
    { name: 'element', sibling: <span>Extra</span>, expected: '</button><span>Extra</span>' }
  ])(
    'preserves an additional $name sibling without enabling the badge layout',
    ({ sibling, expected }) => {
      const html = renderToString(
        <ButtonGroup justified>
          <Badge content="7">
            <Button ripple={false}>Wrapped</Button>
            {sibling}
          </Badge>
        </ButtonGroup>
      ).replace(/<!--[\s\S]*?-->/g, '');

      expect(html).not.toContain('data-button-group-item');
      expect(html).not.toContain('data-badge-layout');
      expect(html.match(/<button\b/g)).toHaveLength(1);
      expect(html).toContain(expected);
    }
  );

  it('renders a standalone Badge without button group attributes', () => {
    const html = renderToString(
      <Badge content="7">
        <Button ripple={false}>Standalone</Button>
      </Badge>
    );

    expect(html).not.toContain('data-button-group-item');
    expect(html).not.toContain('data-badge-layout');
    expect(html.match(/<button\b/g)).toHaveLength(1);
    expect(html).toContain('>Standalone</button>');
  });

  it('keeps a single button in nested fragments and arrays eligible for the initial layout', () => {
    const html = renderToString(
      <ButtonGroup justified>
        <>
          {null}
          {false}
          <Badge content="7">
            {[
              null,
              false,
              <React.Fragment key="button">
                <>
                  {null}
                  <Button ripple={false}>Wrapped</Button>
                </>
              </React.Fragment>
            ]}
          </Badge>
          <Button ripple={false}>Bare</Button>
        </>
      </ButtonGroup>
    );

    expect(html).toContain('data-badge-layout="true"');
    expect(html.match(/data-button-group-item="true"/g)).toHaveLength(1);
    expect(html.match(/<button\b/g)).toHaveLength(2);
    expect(html.match(/\brs-badge-wrapper\b/g)).toHaveLength(1);
    expect(html).toContain('>Wrapped</button>');
  });
});
