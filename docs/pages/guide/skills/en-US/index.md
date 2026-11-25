# Agent Skills

Enable AI assistants to build UIs with React Suite using [Agent Skills](https://agentskills.io/home).

## What are Skills?

Agent Skills are a portable format that gives AI assistants deep, structured knowledge of a library — components, patterns, theming, and best practices. When the skill is active, the assistant automatically follows React Suite conventions instead of guessing.

## Installation

Install the React Suite skill with the `skills` CLI:

```bash
npx skills add rsuite/rsuite
```

Supported clients include Claude Code, Cursor, Windsurf, OpenCode, and any tool that understands the Agent Skills format.

## Usage

Skills are discovered automatically by your AI assistant once installed. You can also invoke the skill explicitly:

```
/rsuite
```

Then ask your assistant to:

- Build pages and components with React Suite
- Compose forms with `Form`, `Form.Control`, and `Schema`
- Customize themes via CSS variables (`--rs-*`)
- Switch between light, dark, and high-contrast modes
- Wire `CustomProvider` for i18n and RTL

For richer, real-time component data use the [MCP Server](/guide/mcp-server) alongside the skill.

## What's Included

- **Component guidance** — when to use `Button`, `Form`, `Table`, `DatePicker`, `Dropdown`, `Message`, and the rest of the 80+ components
- **Composition patterns** — `as` prop, `render*` subpart overrides, `CustomProvider` for global config
- **Theming** — CSS variables, dark mode, custom colors, `classPrefix`
- **Form handling** — `Schema` validation, `Form.Group`, `Form.Control`
- **Icons** — integrating `@rsuite/icons`
- **Do / Don't rules** to avoid common pitfalls

## Structure

```
skills/rsuite/
├── SKILL.md                        # Main skill definition
├── README.md
└── scripts/                        # Utility scripts (Node 18+)
    ├── list_components.mjs
    ├── get_component_props.mjs
    ├── list_hooks.mjs
    └── search_components.mjs
```

## Related Documentation

- [MCP Server](/guide/mcp-server) — Real-time component docs for AI assistants
- [LLMs.txt](/guide/llms) — Full documentation in LLM-ready format
- [Agent Skills Specification](https://agentskills.io/home)
- [Claude Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Cursor Skills](https://cursor.com/docs/context/skills)
- [OpenCode Skills](https://opencode.ai/docs/skills)
