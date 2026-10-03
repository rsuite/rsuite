import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from '@vitest/browser/context';
import SearchIcon from '@rsuite/icons/Search';
import ButtonGroup from '../ButtonGroup';
import Button from '../../Button';
import IconButton from '../../IconButton';
import Badge from '../../Badge';
import Avatar from '../../Avatar';

import '../../IconButton/styles/index.scss';
import '../../Badge/styles/index.scss';
import '../../Avatar/styles/index.scss';
import '../styles/index.scss';

const mounts: { root: Root; container: HTMLDivElement }[] = [];

// Keep style measurements synchronous with React 19's concurrent root.
function mount(element: React.ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  mounts.push({ root, container });
  flushSync(() => root.render(element));
  return container;
}

afterEach(() => {
  mounts.splice(0).forEach(({ root, container }) => {
    flushSync(() => root.unmount());
    container.remove();
  });
});

const buttonsIn = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLButtonElement>('.rs-btn'));
const rect = (element: HTMLElement) => element.getBoundingClientRect();
const css = (element: HTMLElement) => getComputedStyle(element);
const corners = (element: HTMLElement) => {
  const style = css(element);
  return [
    style.borderStartStartRadius,
    style.borderStartEndRadius,
    style.borderEndStartRadius,
    style.borderEndEndRadius
  ].map(parseFloat);
};

describe('ButtonGroup with Badge styles', () => {
  it.each(
    (['default', 'ghost'] as const).flatMap(appearance =>
      [120, 270, 360].map(width => ({ appearance, width }))
    )
  )(
    'justifies $appearance buttons at $width px without clipping badge or long label',
    ({ appearance, width }) => {
      const container = mount(
        <ButtonGroup justified style={{ width, marginTop: 40 }}>
          <Button appearance={appearance}>Short</Button>
          <Badge content="12">
            <Button appearance={appearance}>
              A very long button label that needs to be truncated
            </Button>
          </Badge>
          <Badge content="3">
            <IconButton appearance={appearance} aria-label="Search" icon={<SearchIcon />} />
          </Badge>
        </ButtonGroup>
      );
      const buttons = buttonsIn(container);
      const wrappers = Array.from(container.querySelectorAll<HTMLElement>('.rs-badge-wrapper'));
      const expectedWidth = width / 3;
      buttons.forEach(button => expect(rect(button).width).toBeCloseTo(expectedWidth, 1));
      wrappers.forEach(wrapper => {
        expect(rect(wrapper).width).toBeCloseTo(expectedWidth, 1);
        expect(css(wrapper).overflow).toBe('visible');
        const content = wrapper.querySelector<HTMLElement>('.rs-badge-content')!;
        expect(rect(content).right).toBeGreaterThan(rect(wrapper).right);
        expect(
          content.contains(
            document.elementFromPoint(rect(content).right - 3, rect(content).top + 5)
          )
        ).toBe(true);
      });
      expect(css(buttons[1]).textOverflow).toBe('ellipsis');
      expect(css(buttons[1]).overflow).toBe('hidden');
      expect(buttons[1].scrollWidth).toBeGreaterThan(buttons[1].clientWidth);
      if (appearance === 'ghost') {
        expect(buttons.map(button => css(button).borderInlineStartWidth)).toEqual([
          '1px',
          '0px',
          '0px'
        ]);
        buttons.slice(1).forEach((button, index) => {
          expect(rect(button).left).toBeCloseTo(rect(buttons[index]).right, 1);
        });
      }
    }
  );

  [false, true].forEach(vertical => {
    const direction = vertical ? 'vertical' : 'horizontal';

    [false, true].forEach(allBadged => {
      it(`preserves first, middle and last corners for ${direction} ${allBadged ? 'badged' : 'mixed'} buttons`, () => {
        const container = mount(
          <ButtonGroup vertical={vertical} style={{ width: 300 }}>
            {[0, 1, 2].map(index => {
              const button = <Button key={index}>Button {index}</Button>;
              return allBadged || index === 1 ? (
                <Badge key={index} content="1">
                  {button}
                </Badge>
              ) : (
                button
              );
            })}
          </ButtonGroup>
        );
        const buttons = buttonsIn(container);
        const rounded = corners(buttons[0])[0];
        expect(rounded).toBeGreaterThan(0);
        expect(corners(buttons[0])).toEqual(
          vertical ? [rounded, rounded, 0, 0] : [rounded, 0, rounded, 0]
        );
        expect(corners(buttons[1])).toEqual([0, 0, 0, 0]);
        expect(corners(buttons[2])).toEqual(
          vertical ? [0, 0, rounded, rounded] : [0, rounded, 0, rounded]
        );
        if (vertical) {
          buttons.forEach(button => expect(rect(button).width).toBeCloseTo(300, 1));
          expect(rect(buttons[1]).top).toBeCloseTo(rect(buttons[0]).bottom, 1);
          expect(rect(buttons[2]).top).toBeCloseTo(rect(buttons[1]).bottom, 1);
        }
      });
    });

    it(`collapses ghost borders across bare-to-badge, badge-to-badge and badge-to-bare ${direction} neighbors`, () => {
      const container = mount(
        <ButtonGroup vertical={vertical}>
          <Button appearance="ghost">One</Button>
          <Badge content="1">
            <Button appearance="ghost">Two</Button>
          </Badge>
          <Badge content="2">
            <Button appearance="ghost">Three</Button>
          </Badge>
          <Button appearance="ghost">Four</Button>
        </ButtonGroup>
      );
      const buttons = buttonsIn(container);
      buttons.slice(1).forEach((button, index) => {
        const previous = rect(buttons[index]);
        const current = rect(button);
        expect(
          vertical ? current.top - previous.bottom : current.left - previous.right
        ).toBeCloseTo(-1, 1);
      });
    });

    (['default', 'primary'] as const).forEach(appearance => {
      it(`applies divided ${appearance} borders to wrapped ${direction} buttons`, () => {
        const container = mount(
          <ButtonGroup vertical={vertical} divided>
            <Badge content="1">
              <Button appearance={appearance}>One</Button>
            </Badge>
            <Button appearance={appearance}>Two</Button>
            <Badge content="2">
              <Button appearance={appearance}>Three</Button>
            </Badge>
          </ButtonGroup>
        );
        const border = vertical ? 'borderBottomWidth' : 'borderRightWidth';
        expect(buttonsIn(container).map(button => css(button)[border])).toEqual([
          '1px',
          '1px',
          '0px'
        ]);
      });
    });

    it(`does not collapse ${direction} borders when neighboring appearances differ`, () => {
      const container = mount(
        <ButtonGroup vertical={vertical}>
          <Button appearance="ghost">Bare ghost</Button>
          <Badge content="0">
            <Button>Bare ghost neighbor</Button>
          </Badge>
          <Badge content="1">
            <Button appearance="ghost">One</Button>
          </Badge>
          <Badge content="2">
            <Button>Two</Button>
          </Badge>
          <Badge content="3">
            <Button appearance="ghost">Three</Button>
          </Badge>
          <Button>Four</Button>
          <Badge content="4">
            <Button appearance="ghost">Bare default neighbor</Button>
          </Badge>
        </ButtonGroup>
      );
      const group = container.querySelector<HTMLElement>('.rs-btn-group')!;
      Array.from(group.children).forEach(item => {
        expect(
          vertical ? css(item as HTMLElement).marginTop : css(item as HTMLElement).marginInlineStart
        ).toBe('0px');
      });
    });
  });

  (['ltr', 'rtl'] as const).forEach(dir => {
    it(`keeps mixed ordinary buttons in DOM order with ${dir} direction`, () => {
      const container = mount(
        <ButtonGroup dir={dir}>
          <Button>One</Button>
          <Badge content="1">
            <Button>Two</Button>
          </Badge>
          <Button>Three</Button>
          <Badge content="2">
            <Button>Four</Button>
          </Badge>
        </ButtonGroup>
      );
      const buttons = buttonsIn(container);
      buttons.slice(1).forEach((button, index) => {
        expect(rect(button).top).toBe(rect(buttons[0]).top);
        expect(
          dir === 'ltr'
            ? rect(button).left > rect(buttons[index]).left
            : rect(button).left < rect(buttons[index]).left
        ).toBe(true);
      });
      const rounded = corners(buttons[0])[0];
      expect(rounded).toBeGreaterThan(0);
      expect(corners(buttons[1])).toEqual([0, 0, 0, 0]);
    });
  });

  it('raises a focused or pressed wrapper while keeping its badge above the button', async () => {
    let active = false;
    let activeLayer = '';
    const container = mount(
      <ButtonGroup>
        <Button>One</Button>
        <Badge content="1">
          <Button
            onMouseDown={event => {
              event.preventDefault();
              active = event.currentTarget.matches(':active');
              activeLayer = css(event.currentTarget.parentElement!).zIndex;
            }}
          >
            Two
          </Button>
        </Badge>
        <Badge content="2">
          <Button>Three</Button>
        </Badge>
      </ButtonGroup>
    );
    const buttons = buttonsIn(container);
    const wrapper = buttons[1].parentElement!;
    expect(css(wrapper).zIndex).toBe('auto');
    buttons[1].focus();
    expect(document.activeElement).toBe(buttons[1]);
    expect(css(wrapper).zIndex).toBe('2');
    const content = wrapper.querySelector<HTMLElement>('.rs-badge-content')!;
    expect(
      content.contains(document.elementFromPoint(rect(wrapper).right - 3, rect(buttons[1]).top + 4))
    ).toBe(true);
    expect(css(buttons[2].parentElement!).zIndex).toBe('auto');
    buttons[0].focus();
    expect(css(buttons[0]).zIndex).toBe('2');
    expect(css(wrapper).zIndex).toBe('auto');
    await userEvent.click(buttons[1]);
    expect(active).toBe(true);
    expect(activeLayer).toBe('2');
    expect(document.activeElement).toBe(buttons[0]);
    expect(css(wrapper).zIndex).toBe('auto');
  });

  it('preserves inherited size, disabled state and button callbacks through Badge', () => {
    const onClick = vi.fn();
    const container = mount(
      <>
        <ButtonGroup size="lg">
          <Badge content="1">
            <Button onClick={onClick}>Enabled</Button>
          </Badge>
        </ButtonGroup>
        <ButtonGroup size="lg" disabled>
          <Badge content="2">
            <IconButton aria-label="Disabled" icon={<SearchIcon />} onClick={onClick} />
          </Badge>
        </ButtonGroup>
      </>
    );
    const [enabled, disabled] = buttonsIn(container);
    [enabled, disabled].forEach(button => expect(button.dataset.size).toBe('lg'));
    expect(rect(enabled).height).toBe(42);
    expect(disabled.disabled).toBe(true);
    flushSync(() => enabled.click());
    flushSync(() => disabled.click());
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each([{}, { justified: true }, { vertical: true }])(
    'keeps unrelated badges unchanged with group props %j',
    groupProps => {
      const unrelated = (suffix: string) => (
        <>
          <Badge data-testid={`independent-${suffix}`} content="1" />
          <Badge data-testid={`avatar-${suffix}`} content="2">
            <Avatar circle>A</Avatar>
          </Badge>
          <Badge data-testid={`text-${suffix}`} content="3">
            <span>Text</span>
          </Badge>
          <Badge data-testid={`deep-${suffix}`} content="4">
            <span>
              <Button>Deep</Button>
            </span>
          </Badge>
          <Badge data-testid={`multiple-${suffix}`} content="5">
            <Button>First</Button>
            <Button>Second</Button>
          </Badge>
        </>
      );
      const container = mount(
        <>
          <div style={{ display: 'justified' in groupProps ? 'flex' : undefined }}>
            {unrelated('outside')}
          </div>
          <ButtonGroup {...groupProps}>
            {unrelated('inside')}
            <Button data-testid="bare-inside">Bare</Button>
          </ButtonGroup>
          <Badge content="5" data-testid="outside-button">
            <Button>Outside</Button>
          </Badge>
        </>
      );
      ['independent', 'avatar', 'text', 'deep', 'multiple'].forEach(kind => {
        const outside = container.querySelector<HTMLElement>(`[data-testid="${kind}-outside"]`)!;
        const inside = container.querySelector<HTMLElement>(`[data-testid="${kind}-inside"]`)!;
        [
          'display',
          'float',
          'flex',
          'overflow',
          'marginTop',
          'marginInlineStart',
          'zIndex'
        ].forEach(property => {
          expect(css(inside)[property]).toBe(css(outside)[property]);
        });
      });
      const deep = container.querySelector<HTMLButtonElement>(
        '[data-testid="deep-inside"] .rs-btn'
      )!;
      const outside = container.querySelector<HTMLButtonElement>(
        '[data-testid="outside-button"] .rs-btn'
      )!;
      expect(corners(deep)).toEqual(corners(outside));
      if ('justified' in groupProps) {
        const bare = container.querySelector<HTMLElement>('[data-testid="bare-inside"]')!;
        expect(css(bare).flexBasis).toBe('1%');
      }
      container
        .querySelectorAll<HTMLButtonElement>('[data-testid="multiple-inside"] .rs-btn')
        .forEach(button => expect(corners(button)).toEqual(corners(outside)));
      expect(css(outside).float).toBe('none');
      expect(corners(outside).every(radius => radius > 0)).toBe(true);
    }
  );

  it.each(['independent', 'avatar', 'text', 'deep', 'multiple'] as const)(
    'preserves %s Badge alongside an eligible wrapped button in a justified group',
    kind => {
      const children = {
        independent: undefined,
        avatar: <Avatar circle>A</Avatar>,
        text: <span>Text</span>,
        deep: (
          <span>
            <Button>Deep</Button>
          </span>
        ),
        multiple: (
          <>
            <Button>One</Button>
            <Button>Two</Button>
          </>
        )
      }[kind];
      const items = (
        <>
          <Badge content="1">{children}</Badge>
          <Badge content="2">
            <Button>Eligible</Button>
          </Badge>
          <Button>Bare</Button>
        </>
      );
      const container = mount(
        <>
          <div data-testid="control" style={{ display: 'flex', width: 320 }}>
            {items}
          </div>
          <ButtonGroup justified style={{ width: 320 }}>
            {items}
          </ButtonGroup>
        </>
      );
      const group = container.querySelector<HTMLElement>('.rs-btn-group')!;
      const control = container.querySelector<HTMLElement>('[data-testid="control"]')!;
      const unrelated = group.firstElementChild as HTMLElement;
      const original = control.firstElementChild as HTMLElement;
      expect(css(group).display).toBe('flex');
      ['display', 'float', 'flex', 'overflow', 'marginTop', 'marginInlineStart', 'zIndex'].forEach(
        property => {
          expect(css(unrelated)[property]).toBe(css(original)[property]);
        }
      );
      expect(rect(unrelated).width).toBeCloseTo(rect(original).width, 1);
    }
  );
});
