# MCP 服务器

在您的 AI 编程助手中直接访问 React Suite 组件信息。

## 什么是 MCP？

[模型上下文协议（MCP）](https://modelcontextprotocol.io/) 是一个开放标准，用于将 AI 助手连接到可信的文档和代码源。对于 React Suite 用户，这意味着您可以获得准确、最新且直接引用官方组件 API 的答案。

## 为什么使用 MCP？

AI 编程助手经常会虚构组件属性、提供过时示例或引用不存在的文档。React Suite MCP 服务器通过以下方式解决这些问题：

- 提供对组件属性和类型的真实、直接访问
- 使用官方 React Suite 组件定义
- 提供准确的 TypeScript 信息以获得更好的代码补全
- 启用智能组件搜索和发现

## 安装和设置

以下部分详细介绍了如何在流行的智能编程环境中设置 React Suite MCP。

### Windsurf

1. 导航到"设置" > "Windsurf 设置" > "Cascade"
2. 点击"管理 MCP"按钮，然后点击"查看原始配置"按钮
3. 将以下内容添加到 MCP 配置文件中：

```json
{
  "mcpServers": {
    "rsuite": {
      "command": "npx",
      "args": ["-y", "@rsuite/mcp@latest"]
    }
  }
}
```

### Cursor

1. 导航到"设置" > "MCP"
2. 点击"添加新的全局 MCP 服务器"
3. 将以下内容添加到 MCP 配置文件中：

```json
{
  "mcpServers": {
    "rsuite": {
      "command": "npx",
      "args": ["-y", "@rsuite/mcp@latest"]
    }
  }
}
```

### VS Code

1. 在您的工作区中创建 `.vscode/mcp.json` 文件
2. 将以下内容添加到 MCP 配置文件中：

```json
{
  "servers": {
    "rsuite": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@rsuite/mcp@latest"]
    }
  }
}
```

### JetBrains IDEs

打开 MCP 配置（设置 -> 工具 -> AI 助手 -> 模型上下文协议 (MCP)）并添加以下内容：

- **名称**: React Suite MCP
- **命令**: `npx`
- **参数**: `-y @rsuite/mcp@latest`

点击确定并应用。

### Zed

您可以将 React Suite MCP 服务器作为自定义服务器添加到 Zed：

在命令面板中搜索 `agent: add context server` 并添加以下内容：

```json
{
  "rsuite-mcp-server": {
    "command": {
      "path": "npx",
      "args": ["-y", "@rsuite/mcp@latest"]
    },
    "env": {}
  }
}
```

### Claude Code

Claude Code 是 Anthropic 在终端中运行的智能编程工具。

您可以通过命令行将 React Suite MCP 服务器添加到 Claude Code：

```bash
claude mcp add rsuite-mcp -- npx -y @rsuite/mcp@latest
```

默认情况下，这会将 MCP 服务器安装到您正在工作的项目的本地范围。

如果您希望 MCP 服务器始终可用于机器上的所有项目，您可以将其安装到用户范围：

```bash
claude mcp add rsuite-mcp -s user -- npx -y @rsuite/mcp@latest
```

### Trae

1. 导航到"AI 功能管理" > "MCP"
2. 点击"手动添加"
3. 将以下内容添加到 MCP 配置文件中：

```json
{
  "mcpServers": {
    "rsuite": {
      "command": "npx",
      "args": ["-y", "@rsuite/mcp@latest"]
    }
  }
}
```

## 使用方法

配置完成后，您可以向 AI 助手询问关于 React Suite 组件的问题：

```
Button 组件接受哪些属性？
显示所有与输入相关的组件
Button 的 appearance 类型是什么？
查找名称中包含 "picker" 的组件
```

## 可用工具

| 工具名称                | 描述                             |
| ----------------------- | -------------------------------- |
| **get_component_props** | 获取特定组件的详细属性           |
| **list_components**     | 列出所有可用组件，支持可选搜索   |
| **list_hooks**          | 列出所有 React Suite 自定义 Hook |
| **search_components**   | 按名称或功能搜索组件             |

## 常见问题

### 我已经安装了 MCP，但连接时出现错误

1. 确保安装了 Node.js 18+
2. 验证配置文件中的 JSON 语法
3. 检查 `@rsuite/mcp` 是否可通过 npx 访问

### 我已经安装了 MCP，但在提问时没有被使用

1. 配置后重启您的 AI 客户端
2. 尝试询问关于 React Suite 组件的具体问题
3. 检查 MCP 客户端日志以了解连接状态
