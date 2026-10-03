import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { afterEach, describe, expect, it } from 'vitest';
import SearchIcon from '@rsuite/icons/Search';
import ButtonGroup from '../ButtonGroup';
import Button from '../../Button';
import IconButton from '../../IconButton';
import Badge from '../../Badge';
import CustomProvider from '../../CustomProvider';

import '../../IconButton/styles/index.scss';
import '../../Badge/styles/index.scss';
import '../styles/index.scss';

const mounts: { root: Root; container: HTMLDivElement }[] = [];

function mount(element: React.ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  mounts.push({ root, container });
  const render = (node: React.ReactNode) => flushSync(() => root.render(node));
  render(element);
  return { container, render };
}

afterEach(() => {
  mounts.splice(0).forEach(({ root, container }) => {
    flushSync(() => root.unmount());
    container.remove();
  });
});

const css = (element: HTMLElement) => getComputedStyle(element);
const width = (element: HTMLElement) => element.getBoundingClientRect().width;
const properties = [
  'display',
  'float',
  'flex',
  'min-width',
  'max-width',
  'overflow',
  'margin-top',
  'margin-inline-start',
  'z-index',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'border-start-start-radius',
  'border-start-end-radius',
  'border-end-start-radius',
  'border-end-end-radius'
];
const styles = (element: HTMLElement) =>
  properties.map(property => css(element).getPropertyValue(property));
const modes = [
  { name: 'horizontal', props: {} },
  { name: 'justified', props: { justified: true } },
  { name: 'vertical', props: { vertical: true } },
  { name: 'divided', props: { divided: true } }
];
const formats = [
  { name: 'direct', wrap: (nodes: React.ReactNode[]) => nodes },
  { name: 'Fragment', wrap: (nodes: React.ReactNode[]) => <>{nodes}</> },
  { name: 'array', wrap: (nodes: React.ReactNode[]) => [nodes] },
  { name: 'nested Fragments', wrap: (nodes: React.ReactNode[]) => <>{<>{nodes}</>}</> }
];
type Appearance = 'default' | 'ghost';
const CustomMultiple = ({ appearance }: { appearance: Appearance }) => (
  <>
    <Button appearance={appearance}>Candidate</Button>
    text
  </>
);
const MemoMultiple = React.memo(CustomMultiple);
const MemoButton = React.memo(Button);
const MemoIconButton = React.memo(IconButton);
const RetainedButton = React.memo(Button, () => true);
const CustomButton = () => <Button>Short</Button>;
const MultipleRoots = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <>
    <span {...props}>{children}</span>text
  </>
);
const DroppedAttributes = () => (
  <>
    <Button>Short</Button>text
  </>
);
const AppendedTextRoot = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}text</div>
);
const unsupported = (['element', 'text', 'zero'] as const).flatMap(kind =>
  [false, true].flatMap(before =>
    formats.map(({ name, wrap }) => ({
      name: `${kind} ${before ? 'before' : 'after'} in ${name}`,
      children: (appearance: Appearance) => {
        const button = (
          <Button key="button" appearance={appearance}>
            Candidate
          </Button>
        );
        const sibling =
          kind === 'element' ? <span key="sibling">text</span> : kind === 'text' ? 'text' : 0;
        return wrap(before ? [sibling, button] : [button, sibling]);
      }
    }))
  )
);
unsupported.push(
  {
    name: 'custom component',
    children: appearance => <CustomMultiple appearance={appearance} />
  },
  { name: 'memo component', children: appearance => <MemoMultiple appearance={appearance} /> }
);

describe('ButtonGroup Badge eligibility styles', () => {
  it.each(
    modes.flatMap(mode =>
      unsupported.map(candidate => ({ ...mode, ...candidate, mode: mode.name }))
    )
  )('preserves an unsupported $name in a $mode group', ({ props, children }) => {
    (['default', 'ghost'] as const).forEach(appearance => {
      const items = (
        <>
          <Badge content="1">
            <Button appearance={appearance}>Eligible</Button>
          </Badge>
          <Badge content="2" data-testid="candidate">
            {children(appearance)}
          </Badge>
          <Button appearance={appearance}>Bare</Button>
        </>
      );
      const { container } = mount(
        <>
          <div
            data-testid="control"
            style={{ display: 'justified' in props ? 'flex' : 'inline-block', width: 420 }}
          >
            {items}
          </div>
          <ButtonGroup {...props} style={{ width: 420 }}>
            {items}
          </ButtonGroup>
        </>
      );
      const group = container.querySelector<HTMLElement>('.rs-btn-group')!;
      const control = container.querySelector<HTMLElement>('[data-testid="control"]')!;
      const inside = group.querySelector<HTMLElement>('[data-testid="candidate"]')!;
      const outside = control.querySelector<HTMLElement>('[data-testid="candidate"]')!;
      const insideButton = inside.querySelector<HTMLButtonElement>('.rs-btn')!;
      const outsideButton = outside.querySelector<HTMLButtonElement>('.rs-btn')!;
      expect(styles(inside)).toEqual(styles(outside));
      expect(styles(insideButton)).toEqual(styles(outsideButton));
      expect(width(inside)).toBeCloseTo(width(outside), 1);
      expect(width(insideButton)).toBeCloseTo(width(outsideButton), 1);
      if ('justified' in props) {
        expect(css(group).display).toBe('flex');
      }
      outsideButton.focus();
      const outsideLayer = css(outside).zIndex;
      insideButton.focus();
      expect(css(inside).zIndex).toBe(outsideLayer);
    });
  });

  const soleButtons = [
    { name: 'Button', children: <Button>Short</Button> },
    { name: 'IconButton', children: <IconButton aria-label="Search" icon={<SearchIcon />} /> },
    { name: 'memo(Button)', children: <MemoButton>Short</MemoButton> },
    { name: 'memo(IconButton)', children: <MemoIconButton icon={<SearchIcon />} /> },
    ...formats.map(({ name, wrap }) => ({
      name: `${name} with empty nodes`,
      children: wrap([null, false, <Button key="button">Short</Button>, undefined])
    }))
  ];

  it.each(soleButtons)('still justifies a sole $name', ({ children }) => {
    const { container } = mount(
      <ButtonGroup justified style={{ width: 420 }}>
        <Badge content="1">{children}</Badge>
        <Button>A longer bare button</Button>
      </ButtonGroup>
    );
    const group = container.querySelector<HTMLElement>('.rs-btn-group')!;
    expect(css(group).display).toBe('grid');
    group.querySelectorAll<HTMLElement>('.rs-btn').forEach(button => {
      expect(width(button)).toBeCloseTo(210, 1);
    });
  });

  it('updates eligibility when children change from one button to multiple children and back', () => {
    const view = (multiple: boolean) => (
      <ButtonGroup justified style={{ width: 420 }}>
        <Badge content="1" data-testid="changing">
          <Button>Short</Button>
          {multiple ? 'text' : null}
        </Badge>
        <Button>A longer bare button</Button>
      </ButtonGroup>
    );
    const { container, render } = mount(view(false));
    const group = container.querySelector<HTMLElement>('.rs-btn-group')!;
    const wrapper = container.querySelector<HTMLElement>('[data-testid="changing"]')!;
    const button = wrapper.querySelector<HTMLButtonElement>('.rs-btn')!;
    const intrinsic = mount(
      <div style={{ display: 'flex', width: 420 }}>
        <Badge content="1">
          <Button>Short</Button>text
        </Badge>
      </div>
    ).container.querySelector<HTMLElement>('.rs-badge-wrapper')!;
    expect(css(group).display).toBe('grid');
    expect(width(button)).toBeCloseTo(210, 1);
    render(view(true));
    expect(css(group).display).toBe('flex');
    expect(styles(wrapper)).toEqual(styles(intrinsic));
    expect(width(wrapper)).toBeCloseTo(width(intrinsic), 1);
    render(view(false));
    expect(css(group).display).toBe('grid');
    expect(width(button)).toBeCloseTo(210, 1);
  });

  it.each([
    {
      name: 'unknown sole-button component',
      item: (
        <Badge>
          <CustomButton />
        </Badge>
      )
    },
    {
      name: 'custom Badge root',
      item: (
        <Badge as={MultipleRoots}>
          <Button>Short</Button>
        </Badge>
      )
    },
    {
      name: 'custom Button root',
      item: (
        <Badge>
          <Button as={MultipleRoots}>Short</Button>
        </Badge>
      )
    },
    {
      name: 'custom IconButton root',
      item: (
        <Badge>
          <IconButton as={MultipleRoots} icon={<SearchIcon />} />
        </Badge>
      )
    }
  ])('preserves $name in a justified group', ({ item }) => {
    const { container } = mount(
      <>
        <div data-testid="control" style={{ display: 'flex', width: 420 }}>
          {item}
        </div>
        <ButtonGroup justified style={{ width: 420 }}>
          <Badge>
            <Button>Eligible</Button>
          </Badge>
          {item}
          <Button>Bare</Button>
        </ButtonGroup>
      </>
    );
    const group = container.querySelector<HTMLElement>('.rs-btn-group')!;
    const inside = group.querySelectorAll<HTMLElement>('.rs-badge-wrapper')[1];
    const outside = container.querySelector<HTMLElement>(
      '[data-testid="control"] .rs-badge-wrapper'
    )!;
    expect(css(group).display).toBe('flex');
    expect(styles(inside)).toEqual(styles(outside));
    expect(width(inside)).toBeCloseTo(width(outside), 1);
  });

  it('uses changing Badge default children when deciding eligibility', () => {
    const view = (multiple: boolean) => (
      <CustomProvider
        components={{
          Badge: {
            defaultProps: {
              children: [<Button key="button">Short</Button>, multiple ? 'text' : null]
            }
          }
        }}
      >
        <ButtonGroup justified style={{ width: 420 }}>
          <Badge />
          <Button>Bare</Button>
        </ButtonGroup>
      </CustomProvider>
    );
    const { container, render } = mount(view(false));
    const group = container.querySelector<HTMLElement>('.rs-btn-group')!;
    [false, true, false].forEach(multiple => {
      render(view(multiple));
      expect(css(group).display).toBe(multiple ? 'flex' : 'grid');
    });
  });

  it.each(['Badge', 'Button', 'IconButton'] as const)(
    'updates eligibility for %s default as and its explicit undefined override',
    component => {
      const view = (override: boolean) => {
        const localProps = override ? { as: undefined } : {};
        const button =
          component === 'IconButton' ? (
            <IconButton {...localProps} icon={<SearchIcon />} />
          ) : (
            <Button {...(component === 'Button' ? localProps : {})}>Short</Button>
          );
        return (
          <CustomProvider components={{ [component]: { defaultProps: { as: MultipleRoots } } }}>
            <ButtonGroup justified style={{ width: 420 }}>
              <Badge {...(component === 'Badge' ? localProps : {})}>{button}</Badge>
              <Button as="button">Bare</Button>
            </ButtonGroup>
          </CustomProvider>
        );
      };
      const { container, render } = mount(view(false));
      const group = container.querySelector<HTMLElement>('.rs-btn-group')!;
      [false, true, false].forEach(override => {
        render(view(override));
        expect(css(group).display).toBe(override ? 'grid' : 'flex');
      });
    }
  );

  it('checks the SafeAnchor default root for href buttons', () => {
    const { container } = mount(
      <CustomProvider components={{ SafeAnchor: { defaultProps: { as: MultipleRoots } } }}>
        <ButtonGroup justified style={{ width: 420 }}>
          <Badge>
            <Button href="#">Short</Button>
          </Badge>
          <Button>Bare</Button>
        </ButtonGroup>
      </CustomProvider>
    );
    expect(css(container.querySelector<HTMLElement>('.rs-btn-group')!).display).toBe('flex');
  });

  it('keeps a sole-button Badge outside ButtonGroup at its intrinsic size and focus layer', () => {
    const { container } = mount(
      <Badge>
        <Button>Short</Button>
      </Badge>
    );
    const wrapper = container.querySelector<HTMLElement>('.rs-badge-wrapper')!;
    const button = wrapper.querySelector<HTMLButtonElement>('.rs-btn')!;
    expect(css(wrapper).display).toBe('inline-flex');
    expect(css(wrapper).float).toBe('none');
    expect(css(wrapper).flexGrow).toBe('0');
    expect(width(wrapper)).toBeCloseTo(width(button), 1);
    button.focus();
    expect(css(wrapper).zIndex).toBe('auto');
  });

  it.each([
    { name: 'text', extra: 'text', display: 'flex' },
    { name: 'zero', extra: 0, display: 'flex' },
    { name: 'unknown component', extra: <CustomMultiple appearance="default" />, display: 'flex' },
    { name: 'empty nodes', extra: [null, false, undefined], display: 'grid' }
  ])('checks direct group $name before activating Grid', ({ extra, display }) => {
    const { container } = mount(
      <ButtonGroup justified style={{ width: 420 }}>
        <Badge>
          <Button>Short</Button>
        </Badge>
        {extra}
        <Button>Bare</Button>
      </ButtonGroup>
    );
    expect(css(container.querySelector<HTMLElement>('.rs-btn-group')!).display).toBe(display);
  });

  it.each([
    { name: 'Badge', extra: <Badge as={DroppedAttributes} />, as: undefined },
    { name: 'Button', extra: <Button as={DroppedAttributes} />, as: undefined },
    { name: 'ButtonGroup', extra: null, as: AppendedTextRoot }
  ])('preserves Flex when a custom $name root adds text or drops attributes', ({ extra, as }) => {
    const { container } = mount(
      <ButtonGroup as={as} justified style={{ width: 420 }}>
        <Badge>
          <Button>Eligible</Button>
        </Badge>
        {extra}
        <Button>Bare</Button>
      </ButtonGroup>
    );
    expect(css(container.querySelector<HTMLElement>('.rs-btn-group')!).display).toBe('flex');
  });

  it('excludes memo buttons whose comparator can retain a previous custom root', () => {
    const view = (singleRoot: boolean) => (
      <ButtonGroup justified style={{ width: 420 }}>
        <Badge>
          <Button>Eligible</Button>
        </Badge>
        <Badge data-testid="retained">
          <RetainedButton as={singleRoot ? 'button' : MultipleRoots}>Short</RetainedButton>
        </Badge>
        <Button>Bare</Button>
      </ButtonGroup>
    );
    const { container, render } = mount(view(false));
    const group = container.querySelector<HTMLElement>('.rs-btn-group')!;
    const wrapper = container.querySelector<HTMLElement>('[data-testid="retained"]')!;
    expect(wrapper.textContent).toContain('Shorttext');
    expect(css(group).display).toBe('flex');
    render(view(true));
    expect(wrapper.textContent).toContain('Shorttext');
    expect(css(group).display).toBe('flex');
  });
});
