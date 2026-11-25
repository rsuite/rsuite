# LLMs.txt

React Suite 提供了 LLMs.txt 格式的综合文档，帮助 AI 编程助手有效地理解和使用 React Suite 组件。

## 什么是 LLMs.txt？

[LLMs.txt](https://llmstxt.org/) 是一种标准化格式，用于向大型语言模型（LLM）提供文档。它提供了一种结构化的方式来呈现组件库、API 和框架，使 AI 助手能够轻松理解和引用。

## 可用文档

以下文件可供使用：

- [/llms.txt](/llms.txt): 主要的 LLMs.txt 文件，包含所有文档页面的链接（约 9KB）
- [/llms-full.txt](/llms-full.txt): React Suite 的完整文档（约 1.4MB）

## 与 AI 编程工具配合使用

### Cursor

在 Cursor 中使用 `@Docs` 功能将 React Suite 文档包含到项目上下文中：

```bash
@Docs https://rsuitejs.com/llms.txt
```

这使 Cursor 能够理解 React Suite 组件并提供准确的代码建议和补全。

[了解更多关于 Cursor @Docs](https://docs.cursor.com/context/@-symbols/@-docs)

### Windsurf

在 Windsurf 项目中使用 `@` 符号引用 LLMs.txt 文件，或在 `.windsurfrules` 文件中配置：

```bash
@ https://rsuitejs.com/llms.txt
```

或将其添加到 `.windsurfrules` 文件中：

```bash
# .windsurfrules
docs: https://rsuitejs.com/llms.txt
```

[了解更多关于 Windsurf 记忆功能](https://docs.codeium.com/windsurf/memories)

### ChatGPT 和 Claude

在使用 ChatGPT 或 Claude 时，可以通过提供 URL 来引用文档：

```bash
请帮我使用 React Suite 构建一个 React 组件。
参考文档：https://rsuitejs.com/llms.txt
```

## 开发者收益

将 React Suite 的 LLMs.txt 文档与 AI 编程助手配合使用可提供：

- **准确的代码生成**：AI 工具理解 React Suite 的 API 并生成正确的组件用法
- **更好的智能感知**：增强的自动补全和类型检查
- **一致的模式**：AI 建议遵循 React Suite 最佳实践
- **更快的开发**：减少手动查找文档的需要
- **错误预防**：AI 工具可以捕获常见错误并建议修复

## 保持文档更新

LLMs.txt 文档会在每个 React Suite 版本发布时自动生成和更新，确保 AI 助手始终能够访问最新的组件 API 和最佳实践。

## 反馈和改进

如果您发现 AI 生成的代码建议有任何问题，或对改进 LLMs.txt 文档有想法，请：

- 在 GitHub 上[提交问题](https://github.com/rsuite/rsuite/issues)
- 加入我们的 [Discord 社区](https://discord.gg/R8mnjwh) 进行讨论
- 通过拉取请求为文档做出贡献

LLMs.txt 格式有助于弥合人类可读文档和 AI 理解之间的差距，使 React Suite 在现代开发工作流程中更易于访问和使用。
