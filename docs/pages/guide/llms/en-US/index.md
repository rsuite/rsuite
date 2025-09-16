# LLMs.txt Documentation

React Suite provides comprehensive documentation in LLMs.txt format to help AI coding assistants understand and work with React Suite components effectively.

## What is LLMs.txt?

[LLMs.txt](https://llmstxt.org/) is a standardized format for making documentation available to Large Language Models (LLMs). It provides a structured way to present component libraries, APIs, and frameworks in a format that AI assistants can easily understand and reference.

## Available Documentation

React Suite provides a comprehensive LLMs.txt file that includes:

- **Component Documentation**: Complete API reference for all React Suite components
- **Usage Examples**: Practical examples showing how to use components
- **TypeScript Definitions**: Full type information for better code completion
- **Best Practices**: Recommended patterns and approaches
- **Styling Guide**: Information about theming and customization

### Access the Documentation

The LLMs.txt documentation is available at:

- **Main Documentation**: [/llms.txt](https://rsuitejs.com/llms.txt)

## Using with AI Coding Tools

### Cursor

Use the `@Docs` feature in Cursor to include React Suite documentation in your project context:

```
@Docs https://rsuitejs.com/llms.txt
```

This allows Cursor to understand React Suite components and provide accurate code suggestions and completions.

[Read more about Cursor @Docs](https://docs.cursor.com/context/@-symbols/@-docs)

### Windsurf

Reference the LLMs.txt file in your Windsurf project using the `@` symbol or in your `.windsurfrules` files:

```
@ https://rsuitejs.com/llms.txt
```

Or add it to your `.windsurfrules` file:

```
# .windsurfrules
docs: https://rsuitejs.com/llms.txt
```

[Read more about Windsurf memories](https://docs.codeium.com/windsurf/memories)

### ChatGPT and Claude

When working with ChatGPT or Claude, you can reference the documentation by providing the URL:

```
Please help me build a React component using React Suite.
Reference: https://rsuitejs.com/llms.txt
```

## Benefits for Developers

Using React Suite's LLMs.txt documentation with AI coding assistants provides:

- **Accurate Code Generation**: AI tools understand React Suite's API and generate correct component usage
- **Better IntelliSense**: Enhanced autocomplete and type checking
- **Consistent Patterns**: AI suggestions follow React Suite best practices
- **Faster Development**: Reduced need to manually look up documentation
- **Error Prevention**: AI tools can catch common mistakes and suggest fixes

## Keeping Documentation Updated

The LLMs.txt documentation is automatically generated and updated with each React Suite release, ensuring that AI assistants always have access to the latest component APIs and best practices.

## Feedback and Improvements

If you notice any issues with the AI-generated code suggestions or have ideas for improving the LLMs.txt documentation, please:

- [Open an issue](https://github.com/rsuite/rsuite/issues) on GitHub
- Join our [Discord community](https://discord.gg/R8mnjwh) for discussions
- Contribute to the documentation through pull requests

The LLMs.txt format helps bridge the gap between human-readable documentation and AI understanding, making React Suite more accessible and easier to work with in modern development workflows.
