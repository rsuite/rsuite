# React Suite Skill

An [Agent Skill](https://agentskills.io/home) that teaches AI assistants how to build UIs with [React Suite](https://rsuitejs.com).

## Install

Using the `skills` CLI:

```bash
npx skills add rsuite/rsuite
```

Supported clients: Claude Code, Cursor, Windsurf, OpenCode, and more.

## What's included

- `SKILL.md` — the skill definition with components, patterns, theming, and best practices
- `scripts/` — Node 18+ scripts to query the public React Suite docs API

## Structure

```
skills/rsuite/
├── SKILL.md
├── README.md
└── scripts/
    ├── list_components.mjs
    ├── get_component_props.mjs
    ├── list_hooks.mjs
    └── search_components.mjs
```

## Related

- [MCP Server](https://rsuitejs.com/guide/mcp-server)
- [LLMs.txt](https://rsuitejs.com/guide/llms)
- [Agent Skills Specification](https://agentskills.io/home)

## License

MIT
