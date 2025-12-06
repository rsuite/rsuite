#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const { readFileSync } = fs;

/**
 * Script to generate llms-full.txt file from RSuite documentation
 * This file contains all documentation content in a format suitable for LLMs
 */

class LLMSGenerator {
  constructor() {
    this.docsPath = path.join(__dirname, '../pages');
    this.outputPath = path.join(__dirname, '../public/llms-full.txt');
    this.content = [];
    this.processedFiles = new Set();
    this.rsuiteVersion = this.getRSuiteVersion();
  }

  /**
   * Check if a file should be processed
   */
  shouldProcessFile(filePath, relativePath) {
    const ext = path.extname(filePath);
    const basename = path.basename(filePath);

    // Only process markdown files
    if (ext !== '.md') return false;

    // Skip certain files
    const skipFiles = ['.DS_Store', 'README.md'];
    if (skipFiles.includes(basename)) return false;

    // Only process English documentation and fragments
    // Skip Chinese (zh-CN) documentation
    if (relativePath.includes('zh-CN')) return false;

    // Skip _common/types directory since types are already included in components
    if (relativePath.includes('_common/types')) return false;

    return true;
  }

  /**
   * Recursively walk through directory and collect all markdown files
   */
  async walkDirectory(dirPath, relativePath = '') {
    const files = [];

    try {
      const entries = await readdir(dirPath);

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry);
        const relativeFilePath = path.join(relativePath, entry);

        try {
          const stats = await stat(fullPath);

          if (stats.isDirectory()) {
            // Skip certain directories
            const skipDirs = ['node_modules', '.git', '.next', 'dist', 'build', 'resources', 'api'];
            if (!skipDirs.includes(entry)) {
              const subFiles = await this.walkDirectory(fullPath, relativeFilePath);
              files.push(...subFiles);
            }
          } else if (stats.isFile() && this.shouldProcessFile(fullPath, relativeFilePath)) {
            files.push({
              fullPath,
              relativePath: relativeFilePath,
              name: entry
            });
          }
        } catch (error) {
          console.warn(`Warning: Could not process ${fullPath}: ${error.message}`);
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not read directory ${dirPath}: ${error.message}`);
    }

    return files;
  }

  /**
   * Resolve include directives by replacing them with actual fragment content
   */
  async resolveIncludes(content, filePath) {
    const includeRegex = /<!--\{include:([^}]+)\}-->/g;
    let resolvedContent = content;
    let match;

    while ((match = includeRegex.exec(content)) !== null) {
      const includeDirective = match[1];
      const fullMatch = match[0];

      if (includeDirective.startsWith('`') && includeDirective.endsWith('`')) {
        // Handle fragment files like `basic.md`
        const includeFile = includeDirective.slice(1, -1);
        const fileDir = path.dirname(filePath);
        const fragmentsDir = path.join(fileDir, '../fragments');
        const fragmentPath = path.join(fragmentsDir, includeFile);

        try {
          if (await this.fileExists(fragmentPath)) {
            const fragmentContent = await readFile(fragmentPath, 'utf-8');
            const cleanedFragment = this.cleanFragmentContent(fragmentContent);
            resolvedContent = resolvedContent.replace(fullMatch, cleanedFragment);
          } else {
            resolvedContent = resolvedContent.replace(fullMatch, `\n<!-- Fragment ${includeFile} not found -->\n`);
          }
        } catch (error) {
          console.warn(`Warning: Could not read fragment ${fragmentPath}: ${error.message}`);
          resolvedContent = resolvedContent.replace(fullMatch, `\n<!-- Error loading fragment ${includeFile} -->\n`);
        }
      } else if (includeDirective.startsWith('<') && includeDirective.endsWith('>')) {
        // Handle special directives like <import-guide>
        const directive = includeDirective.slice(1, -1);
        const replacement = await this.processSpecialDirective(directive, filePath);
        resolvedContent = resolvedContent.replace(fullMatch, replacement);
      } else if (includeDirective.startsWith('(') && includeDirective.endsWith(')')) {
        // Handle _common directory includes like (_common/types/color.md)
        const commonPath = includeDirective.slice(1, -1);
        const replacement = await this.processCommonInclude(commonPath, filePath);
        resolvedContent = resolvedContent.replace(fullMatch, replacement);
      }
    }

    return resolvedContent;
  }

  /**
   * Check if file exists
   */
  async fileExists(filePath) {
    try {
      await stat(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Process special directives like import-guide
   */
  async processSpecialDirective(directive, filePath) {
    if (directive === 'import-guide') {
      return await this.generateImportGuide(filePath);
    }

    return `\n<!-- Unknown directive: ${directive} -->\n`;
  }

  /**
   * Process _common directory includes
   */
  async processCommonInclude(commonPath) {
    try {
      // Resolve the _common file path relative to the docs/pages directory
      const docsPath = path.join(__dirname, '../pages');
      const commonFilePath = path.join(docsPath, commonPath);

      if (!(await this.fileExists(commonFilePath))) {
        return `\n<!-- Common file ${commonPath} not found -->\n`;
      }

      const commonContent = await readFile(commonFilePath, 'utf-8');
      const cleanedContent = this.cleanMarkdownContent(commonContent, commonFilePath);

      return `\n${cleanedContent}\n`;
    } catch (error) {
      console.warn(`Warning: Could not read common file ${commonPath}: ${error.message}`);
      return `\n<!-- Error loading common file ${commonPath} -->\n`;
    }
  }

  /**
   * Generate import guide content based on component configuration
   */
  async generateImportGuide(filePath) {
    try {
      // Find the corresponding index.tsx file
      const fileDir = path.dirname(filePath);
      const indexTsxPath = path.join(fileDir, '../index.tsx');

      if (!(await this.fileExists(indexTsxPath))) {
        return '\n<!-- Import guide: index.tsx not found -->\n';
      }

      const indexContent = await readFile(indexTsxPath, 'utf-8');
      const components = this.extractImportGuideComponents(indexContent);

      if (!components || components.length === 0) {
        return '\n<!-- Import guide: no components found -->\n';
      }

      return this.generateImportCode(components);
    } catch (error) {
      console.warn(`Warning: Could not generate import guide for ${filePath}: ${error.message}`);
      return '\n<!-- Error generating import guide -->\n';
    }
  }

  /**
   * Extract components from index.tsx inDocsComponents definition
   */
  extractImportGuideComponents(content) {
    // Look for import-guide definition in inDocsComponents
    const importGuideRegex = /'import-guide':\s*\(\)\s*=>\s*<ImportGuide\s+components=\{\[([^\]]+)\]\}/;
    const match = content.match(importGuideRegex);

    if (!match) return null;

    // Extract component names from the array
    const componentsStr = match[1];
    const components = componentsStr
      .split(',')
      .map(comp => comp.trim().replace(/['"`]/g, ''))
      .filter(comp => comp.length > 0);

    return components;
  }

  /**
   * Generate import code based on ImportGuide logic
   */
  generateImportCode(components) {
    // Unstyled components that don't need CSS imports
    const unstyledComponents = [
      'Schema', 'DOMHelper', 'Whisper', 'SafeAnchor', 'Affix',
      'internals', 'CustomProvider', 'locales', 'MaskedInput', 'Col', 'Row'
    ];

    const hasCssComponents = components.filter(component =>
      !unstyledComponents.includes(component)
    );

    // Generate main import
    const mainImport = `import { ${components.join(', ')} } from 'rsuite';`;

    // Generate individual imports
    let individualImports = components
      .map(component => `import ${component} from 'rsuite/${component}';`)
      .join('\n');

    if (hasCssComponents.length > 0) {
      individualImports += '\n\n// (Optional) Import component styles.\n' +
        hasCssComponents
          .map(component => `import 'rsuite/${component}/styles/index.css';`)
          .join('\n');
    }

    return `\n**Main import:**\n\n\`\`\`js\n${mainImport}\n\`\`\`\n\n**Individual import:**\n\n\`\`\`js\n${individualImports}\n\`\`\`\n`;
  }

  /**
   * Clean fragment content (remove code block markers)
   */
  cleanFragmentContent(content) {
    // Remove start-code and end-code comments
    content = content.replace(/<!--start-code-->/g, '');
    content = content.replace(/<!--end-code-->/g, '');

    // Clean up excessive whitespace
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    return content.trim();
  }

  /**
   * Clean markdown content for better LLM consumption
   * Note: This is called AFTER resolveIncludes, so all include directives are already processed
   */
  cleanMarkdownContent(content) {
    // Clean up excessive whitespace
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    // Remove all HTML comments
    // Since this function is called after resolveIncludes (line 357), all <!--{include:...}-->
    // directives have already been processed and replaced with actual content.
    // Therefore, we can safely remove ALL remaining HTML comments without exceptions.
    // Using a loop to ensure complete removal and address security scanning concerns.
    let prev;
    do {
      prev = content;
      content = content.replace(/<!--[\s\S]*?-->/gs, '');
    } while (content !== prev);

    // Clean up version badges
    content = content.replace(/!\[\][\d.]+]/g, '');

    return content.trim();
  }

  /**
   * Extract section information from file path
   */
  extractSectionInfo(relativePath) {
    const parts = relativePath.split(path.sep);

    if (parts.includes('guide')) {
      const guideIndex = parts.indexOf('guide');
      const topic = parts[guideIndex + 1];
      return {
        section: 'Guide',
        topic: topic ? topic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown',
        language: 'en-US',
        category: 'guide',
        isMainDoc: parts.includes('en-US')
      };
    } else if (parts.includes('components')) {
      const componentIndex = parts.indexOf('components');
      const component = parts[componentIndex + 1];
      const isFragment = parts.includes('fragments');
      const isMainDoc = parts.includes('en-US') && parts[parts.length - 1] === 'index.md';

      return {
        section: 'Components',
        topic: component ? component.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown',
        language: 'en-US',
        category: 'component',
        isMainDoc,
        isFragment,
        fragmentName: isFragment ? path.basename(relativePath, '.md') : null
      };
    } else if (parts.includes('api')) {
      return {
        section: 'API',
        topic: 'API Documentation',
        language: 'en-US',
        category: 'api',
        isMainDoc: true
      };
    }

    return {
      section: 'Other',
      topic: 'Documentation',
      language: 'en-US',
      category: 'other',
      isMainDoc: false
    };
  }

  /**
   * Process a single markdown file
   */
  async processFile(file) {
    try {
      let content = await readFile(file.fullPath, 'utf-8');
      const sectionInfo = this.extractSectionInfo(file.relativePath);

      // For main documentation files, resolve include directives
      if (sectionInfo.isMainDoc) {
        content = await this.resolveIncludes(content, file.fullPath);
      }

      const cleaned = this.cleanMarkdownContent(content, file.fullPath);

      if (cleaned.length === 0) return null;

      return {
        ...sectionInfo,
        filePath: file.relativePath,
        content: cleaned,
        size: cleaned.length
      };
    } catch (error) {
      console.warn(`Warning: Could not read file ${file.fullPath}: ${error.message}`);
      return null;
    }
  }

  /**
   * Get RSuite version from package.json
   */
  getRSuiteVersion() {
    try {
      const packageJsonPath = path.join(__dirname, '../package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      const version = packageJson.dependencies?.rsuite || 'unknown';
      // Remove ^ and ~ symbols from version string
      return version.replace(/^[\^~]/, '');
    } catch {
      console.warn('Warning: Could not read RSuite version from package.json');
      return 'unknown';
    }
  }

  /**
   * Generate the header for llms.txt
   */
  generateHeader() {
    const now = new Date().toISOString();
    return `# RSuite Documentation for LLMs

This file contains the complete documentation for RSuite (React Suite), a comprehensive React component library.

Generated on: ${now}
RSuite Version: ${this.rsuiteVersion}
Source: https://github.com/rsuite/rsuite
Documentation: https://rsuitejs.com/

## About RSuite

RSuite is a set of React components committed to providing high-quality and comprehensive React components to help developers quickly build web applications.

## Documentation Structure

This file contains:
- **Guide Documentation**: Getting started guides, usage instructions, and best practices
- **Component Documentation**: For each component, includes:
  - Main documentation with component introduction and Props reference
  - Usage examples and code fragments demonstrating different features

For each component, you'll find the main documentation with all examples, code fragments, and type definitions included inline, providing a complete reference in a single section.

---

`;
  }


  /**
   * Format file content for output
   */
  formatFileContent(file) {
    const separator = '='.repeat(80);
    let title = `${file.section}: ${file.topic}`;

    if (file.isFragment && file.fragmentName) {
      title += ` - ${file.fragmentName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Example`;
    } else if (file.isMainDoc) {
      title += ' - Main Documentation';
    }

    return `${separator}
# ${title}
File: https://github.com/rsuite/rsuite/blob/main/docs/pages/${file.filePath}
${separator}

${file.content}

`;
  }

  /**
   * Main generation function
   */
  async generate() {
    console.log('🚀 Starting llms-full.txt generation...');
    console.log(`📁 Scanning documentation in: ${this.docsPath}`);

    // Walk through all files
    const files = await this.walkDirectory(this.docsPath);
    console.log(`📄 Found ${files.length} markdown files`);

    // Process all files
    const processedFiles = [];
    let skipped = 0;

    for (const file of files) {
      const processed = await this.processFile(file);
      if (processed) {
        processedFiles.push(processed);
      } else {
        skipped++;
      }
    }

    console.log(`✅ Processed ${processedFiles.length} files, skipped ${skipped}`);

    // Sort files by section, then by topic, then main docs first
    // Since fragments are now included in main docs, we only show main docs
    const mainDocsOnly = processedFiles.filter(file =>
      file.category !== 'component' || file.isMainDoc
    );

    mainDocsOnly.sort((a, b) => {
      if (a.section !== b.section) return a.section.localeCompare(b.section);
      if (a.topic !== b.topic) return a.topic.localeCompare(b.topic);
      return a.filePath.localeCompare(b.filePath);
    });

    // Generate content
    let output = this.generateHeader();

    // Add all file contents (main docs only, fragments are now included)
    mainDocsOnly.forEach(file => {
      output += this.formatFileContent(file);
    });

    // Add footer
    output += `\n${'='.repeat(80)}\n`;
    output += `# End of RSuite Documentation\n`;
    output += `Total files processed: ${processedFiles.length}\n`;
    output += `Main documentation files: ${mainDocsOnly.length}\n`;
    output += `Generated on: ${new Date().toISOString()}\n`;
    output += `${'='.repeat(80)}\n`;

    // Write to file
    await writeFile(this.outputPath, output, 'utf-8');

    const sizeKB = Math.round(output.length / 1024);
    console.log(`📝 Generated llms-full.txt (${sizeKB} KB) at: ${this.outputPath}`);

    // Print summary
    const summary = {};
    processedFiles.forEach(file => {
      if (!summary[file.section]) summary[file.section] = 0;
      summary[file.section]++;
    });

    console.log('\n📊 Summary:');
    Object.entries(summary).forEach(([section, count]) => {
      console.log(`   ${section}: ${count} files`);
    });
    console.log(`\n📝 Output contains ${mainDocsOnly.length} main documentation files with resolved includes`);

    return this.outputPath;
  }
}

// Run the generator if this script is executed directly
if (require.main === module) {
  const generator = new LLMSGenerator();
  generator.generate()
    .then((outputPath) => {
      console.log(`\n🎉 Successfully generated llms-full.txt at: ${outputPath}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error generating llms-full.txt:', error);
      process.exit(1);
    });
}

module.exports = LLMSGenerator;
