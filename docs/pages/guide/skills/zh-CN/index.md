# Agent Skills

通过 [Agent Skills](https://agentskills.io/home) 让 AI 助手使用 React Suite 构建界面。

## 什么是 Skills？

Agent Skills 是一种可移植的格式，为 AI 助手提供对某个库的深入、结构化认知 —— 包括组件、模式、主题与最佳实践。启用 Skill 后，AI 助手会自动遵循 React Suite 的规范，而不是凭空猜测。

## 安装

使用 `skills` CLI 安装 React Suite Skill：

```bash
npx skills add rsuite/rsuite
```

支持的客户端包括 Claude Code、Cursor、Windsurf、OpenCode 以及任何兼容 Agent Skills 格式的工具。

## 使用

安装后 AI 助手会自动发现 Skill，您也可以显式调用：

```
/rsuite
```

然后让 AI 助手：

- 使用 React Suite 构建页面和组件
- 使用 `Form`、`Form.Control` 和 `Schema` 组合表单
- 通过 CSS 变量（`--rs-*`）定制主题
- 在亮色、暗色、高对比度模式之间切换
- 通过 `CustomProvider` 配置国际化与 RTL

对于更丰富的实时组件数据，推荐同时使用 [MCP Server](/guide/mcp-server)。

## 包含内容

- **组件指南** —— 何时使用 `Button`、`Form`、`Table`、`DatePicker`、`Dropdown`、`Message` 等 80+ 组件
- **组合模式** —— `as` 属性、`render*` 子部件覆盖、`CustomProvider` 全局配置
- **主题** —— CSS 变量、暗色模式、自定义颜色、`classPrefix`
- **表单处理** —— `Schema` 校验、`Form.Group`、`Form.Control`
- **图标** —— 集成 `@rsuite/icons`
- **Do / Don't** 规则，避免常见陷阱

## 结构

```
skills/rsuite/
├── SKILL.md                        # 主 Skill 定义
├── README.md
└── scripts/                        # 工具脚本（Node 18+）
    ├── list_components.mjs
    ├── get_component_props.mjs
    ├── list_hooks.mjs
    └── search_components.mjs
```

## 相关文档

- [MCP Server](/guide/mcp-server) —— 为 AI 助手提供实时组件文档
- [LLMs.txt](/guide/llms) —— 面向 LLM 的完整文档
- [Agent Skills 规范](https://agentskills.io/home)
- [Claude Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Cursor Skills](https://cursor.com/docs/context/skills)
- [OpenCode Skills](https://opencode.ai/docs/skills)
