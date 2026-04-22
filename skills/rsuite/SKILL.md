---
name: rsuite
description: Build web interfaces with React Suite — a suite of React components, sensible UI design, and a friendly development experience.
version: 1.0.0
license: MIT
---

# React Suite Skill

This skill helps AI assistants build user interfaces with [React Suite](https://rsuitejs.com) v6+. When active, the assistant follows React Suite conventions for components, styling, theming, accessibility, and internationalization.

## When to use this skill

Activate this skill whenever the project depends on `rsuite` (check `package.json`) or the user asks to build UI with React Suite.

## Installation

Install React Suite in the target project:

```bash
npm install rsuite
```

Import the stylesheet once at the application entry:

```tsx
import 'rsuite/dist/rsuite.min.css';
```

For component-level imports (recommended for bundle size):

```tsx
import Button from 'rsuite/Button';
import 'rsuite/Button/styles/index.css';
```

## Core principles

1. **Prefer built-in components over custom ones.** React Suite ships 80+ components. Check availability before building from scratch.
2. **Compose via `as` and `render*` props.** Most components accept `as` to change the rendered element and `renderX` props to override subparts.
3. **Use the `CustomProvider` for global configuration** (locale, theme, RTL, `classPrefix`).
4. **Apply theming through CSS variables (`--rs-*`)**, not by overriding class names.
5. **Use `@rsuite/icons`** for iconography rather than ad-hoc SVGs.
6. **Handle forms with `Form`, `Form.Group`, `Form.Control`, and `Schema`** from `rsuite`.
7. **Respect accessibility:** always provide labels for inputs, `aria-*` for custom triggers, and keyboard handlers for interactive elements.

## Common patterns

### Global provider

```tsx
import { CustomProvider } from 'rsuite';
import zhCN from 'rsuite/locales/zh_CN';

<CustomProvider theme="dark" locale={zhCN}>
  <App />
</CustomProvider>;
```

### Button

```tsx
import { Button } from 'rsuite';

<Button appearance="primary" size="md" onClick={handleClick}>
  Submit
</Button>;
```

Valid `appearance` values: `default | primary | link | subtle | ghost`.
Valid `size` values: `xs | sm | md | lg`.
Valid `color` values: `red | orange | yellow | green | cyan | blue | violet`.

### Form with validation

```tsx
import { Form, Schema, Button } from 'rsuite';

const model = Schema.Model({
  name: Schema.Types.StringType().isRequired('Name is required.'),
  email: Schema.Types.StringType().isEmail('Invalid email.')
});

<Form model={model} onSubmit={handleSubmit}>
  <Form.Group controlId="name">
    <Form.ControlLabel>Name</Form.ControlLabel>
    <Form.Control name="name" />
  </Form.Group>
  <Form.Group controlId="email">
    <Form.ControlLabel>Email</Form.ControlLabel>
    <Form.Control name="email" type="email" />
  </Form.Group>
  <Button type="submit" appearance="primary">Save</Button>
</Form>;
```

### Table

```tsx
import { Table } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

<Table data={data} autoHeight>
  <Column flexGrow={1}>
    <HeaderCell>Name</HeaderCell>
    <Cell dataKey="name" />
  </Column>
  <Column width={120}>
    <HeaderCell>Age</HeaderCell>
    <Cell dataKey="age" />
  </Column>
</Table>;
```

### Message & toaster

```tsx
import { useToaster, Message } from 'rsuite';

const toaster = useToaster();
toaster.push(<Message type="success">Saved.</Message>, { placement: 'topCenter' });
```

## Theming

React Suite exposes CSS variables prefixed with `--rs-`. Override them in your root selector:

```css
:root {
  --rs-primary-500: #3498ff;
  --rs-text-primary: #1f2d3d;
}
```

Switch themes at runtime through `CustomProvider`; the `theme` prop accepts `"light"`, `"dark"`, or `"high-contrast"`.

See the full variable list at <https://rsuitejs.com/guide/css-variables>.

## Icons

```bash
npm install @rsuite/icons
```

```tsx
import SearchIcon from '@rsuite/icons/Search';

<Button startIcon={<SearchIcon />}>Search</Button>;
```

## Fetching up-to-date documentation

For live data on components, props, and hooks, prefer the official sources in this order:

1. **MCP Server** — `@rsuite/mcp` exposes `get_component_props`, `list_components`, `list_hooks`, `search_components`. See <https://rsuitejs.com/guide/mcp-server>.
2. **LLMs.txt** — <https://rsuitejs.com/llms.txt> and <https://rsuitejs.com/llms-full.txt>.
3. **Helper scripts** bundled with this skill (see below) that hit the public React Suite docs API.

## Scripts

Utility scripts are included to fetch component data programmatically:

- `scripts/list_components.mjs` — list all React Suite components
- `scripts/get_component_props.mjs <ComponentName>` — get props for a specific component
- `scripts/list_hooks.mjs` — list all custom hooks
- `scripts/search_components.mjs <query>` — search components by name

Run with Node 18+:

```bash
node scripts/list_components.mjs
node scripts/get_component_props.mjs Button
```

## Do / Don't

- **Do** import `rsuite/dist/rsuite.min.css` once, globally.
- **Do** use `Form.Control` (not raw `Input`) inside `Form` so validation is wired automatically.
- **Do** pick semantic `appearance`/`color` values instead of inline styles for state.
- **Don't** mutate component class names directly; override CSS variables instead.
- **Don't** mix MUI/AntD components with React Suite — choose one system per app.
- **Don't** hand-roll dropdowns, date pickers, or tree pickers — use `Dropdown`, `DatePicker`, `TreePicker`.

## References

- Documentation: <https://rsuitejs.com>
- Components: <https://rsuitejs.com/components/overview>
- GitHub: <https://github.com/rsuite/rsuite>
- MCP server: <https://rsuitejs.com/guide/mcp-server>
- LLMs.txt: <https://rsuitejs.com/guide/llms>
