#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const { readFileSync } = fs;

/**
 * Script to generate individual markdown files for all documentation pages
 * These files can be copied and fed directly to AI tools
 */

class MarkdownGenerator {
  constructor() {
    this.pagesPath = path.join(__dirname, '../pages');
    this.outputDir = path.join(__dirname, '../public/page-md');
    this.rsuiteVersion = this.getRSuiteVersion();

    // Define which directories to process
    this.categories = [
      { name: 'components', path: 'components', urlPrefix: '/components' },
      { name: 'guide', path: 'guide', urlPrefix: '/guide' },
      { name: 'resources', path: 'resources', urlPrefix: '/resources' }
    ];
  }

  /**
   * Get RSuite version from package.json
   */
  getRSuiteVersion() {
    try {
      const packageJsonPath = path.join(__dirname, '../package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      const version = packageJson.dependencies?.rsuite || 'unknown';
      return version.replace(/^[\^~]/, '');
    } catch {
      console.warn('Warning: Could not read RSuite version from package.json');
      return 'unknown';
    }
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
   * Get all page directories for a specific category
   */
  async getPageDirectories(category) {
    const categoryPath = path.join(this.pagesPath, category.path);
    const entries = await readdir(categoryPath);
    const pages = [];

    for (const entry of entries) {
      const fullPath = path.join(categoryPath, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory() && !entry.startsWith('.')) {
        const enUsIndexPath = path.join(fullPath, 'en-US', 'index.md');
        if (await this.fileExists(enUsIndexPath)) {
          pages.push({
            name: entry,
            category: category.name,
            path: fullPath,
            indexPath: enUsIndexPath,
            urlPrefix: category.urlPrefix
          });
        }
      }
    }

    return pages;
  }

  /**
   * Get all pages from all categories
   */
  async getAllPages() {
    const allPages = [];

    for (const category of this.categories) {
      const pages = await this.getPageDirectories(category);
      allPages.push(...pages);
    }

    return allPages;
  }

  /**
   * Extract components from index.tsx inDocsComponents definition
   */
  extractImportGuideComponents(content) {
    // Match both single-line and multi-line formats
    const importGuideRegex = /'import-guide':\s*\(\)\s*=>\s*\(?\s*<ImportGuide\s+components=\{\[([^\]]+)\]\}/s;
    const match = content.match(importGuideRegex);

    if (!match) return null;

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
    const unstyledComponents = [
      'Schema', 'DOMHelper', 'Whisper', 'SafeAnchor', 'Affix',
      'internals', 'CustomProvider', 'locales', 'MaskedInput', 'Col', 'Row'
    ];

    const hasCssComponents = components.filter(component =>
      !unstyledComponents.includes(component)
    );

    const mainImport = `import { ${components.join(', ')} } from 'rsuite';`;

    let individualImports = components
      .map(component => `import ${component} from 'rsuite/${component}';`)
      .join('\n');

    if (hasCssComponents.length > 0) {
      individualImports += '\n\n// (Optional) Import component styles.\n' +
        hasCssComponents
          .map(component => `import 'rsuite/${component}/styles/index.css';`)
          .join('\n');
    }

    return `**Main import:**\n\n\`\`\`js\n${mainImport}\n\`\`\`\n\n**Individual import:**\n\n\`\`\`js\n${individualImports}\n\`\`\``;
  }

  /**
   * Process special directives like import-guide
   */
  async processSpecialDirective(directive, page) {
    if (directive === 'import-guide') {
      return await this.generateImportGuide(page.path);
    }

    if (directive.startsWith('example-')) {
      // Generate links to online example and source code
      const exampleName = directive.replace('example-', '');
      const exampleUrl = `https://rsuitejs.com${page.urlPrefix}/${page.name}/examples/?example=${exampleName}`;
      const sourceUrl = `https://raw.githubusercontent.com/rsuite/rsuite/refs/heads/main/docs/pages${page.urlPrefix}/${page.name}/examples/${exampleName}.tsx`;
      return `[View example online](${exampleUrl}) | [View source code](${sourceUrl})`;
    }

    return `<!-- Unknown directive: ${directive} -->`;
  }

  /**
   * Generate import guide content based on component configuration
   */
  async generateImportGuide(componentPath) {
    try {
      const indexTsxPath = path.join(componentPath, 'index.tsx');

      if (!(await this.fileExists(indexTsxPath))) {
        return '<!-- Import guide: index.tsx not found -->';
      }

      const indexContent = await readFile(indexTsxPath, 'utf-8');
      const components = this.extractImportGuideComponents(indexContent);

      if (!components || components.length === 0) {
        return '<!-- Import guide: no components found -->';
      }

      return this.generateImportCode(components);
    } catch (error) {
      console.warn(`Warning: Could not generate import guide for ${componentPath}: ${error.message}`);
      return '<!-- Error generating import guide -->';
    }
  }

  /**
   * Process _common directory includes
   */
  async processCommonInclude(commonPath) {
    try {
      const docsPath = path.join(__dirname, '../pages');
      const commonFilePath = path.join(docsPath, commonPath);

      if (!(await this.fileExists(commonFilePath))) {
        return `<!-- Common file ${commonPath} not found -->`;
      }

      const commonContent = await readFile(commonFilePath, 'utf-8');
      const cleanedContent = this.cleanMarkdownContent(commonContent);

      return cleanedContent;
    } catch (error) {
      console.warn(`Warning: Could not read common file ${commonPath}: ${error.message}`);
      return `<!-- Error loading common file ${commonPath} -->`;
    }
  }

  /**
   * Clean fragment content
   */
  cleanFragmentContent(content) {
    content = content.replace(/<!--start-code-->/g, '');
    content = content.replace(/<!--end-code-->/g, '');
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    return content.trim();
  }

  /**
   * Resolve include directives by replacing them with actual content
   */
  async resolveIncludes(content, page) {
    const includeRegex = /<!--\{include:([^}]+)\}-->/g;
    let resolvedContent = content;
    let match;

    const matches = [];
    while ((match = includeRegex.exec(content)) !== null) {
      matches.push(match);
    }

    for (const match of matches) {
      const includeDirective = match[1];
      const fullMatch = match[0];

      if (includeDirective.startsWith('`') && includeDirective.endsWith('`')) {
        // Handle fragment files like `basic.md`
        const includeFile = includeDirective.slice(1, -1);
        const fragmentsDir = path.join(page.path, 'fragments');
        const fragmentPath = path.join(fragmentsDir, includeFile);

        try {
          if (await this.fileExists(fragmentPath)) {
            const fragmentContent = await readFile(fragmentPath, 'utf-8');
            const cleanedFragment = this.cleanFragmentContent(fragmentContent);
            resolvedContent = resolvedContent.replace(fullMatch, cleanedFragment);
          } else {
            resolvedContent = resolvedContent.replace(fullMatch, `<!-- Fragment ${includeFile} not found -->`);
          }
        } catch (error) {
          console.warn(`Warning: Could not read fragment ${fragmentPath}: ${error.message}`);
          resolvedContent = resolvedContent.replace(fullMatch, `<!-- Error loading fragment ${includeFile} -->`);
        }
      } else if (includeDirective.startsWith('<') && includeDirective.endsWith('>')) {
        // Handle special directives like <import-guide> and <example-xxx>
        const directive = includeDirective.slice(1, -1);
        const replacement = await this.processSpecialDirective(directive, page);
        resolvedContent = resolvedContent.replace(fullMatch, replacement);
      } else if (includeDirective.startsWith('(') && includeDirective.endsWith(')')) {
        // Handle _common directory includes like (_common/types/color.md)
        const commonPath = includeDirective.slice(1, -1);
        const replacement = await this.processCommonInclude(commonPath);
        resolvedContent = resolvedContent.replace(fullMatch, replacement);
      }
    }

    return resolvedContent;
  }

  /**
   * Clean markdown content
   */
  cleanMarkdownContent(content) {
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    let prev;
    do {
      prev = content;
      content = content.replace(/<!--[\s\S]*?-->/gs, '');
    } while (content !== prev);

    content = content.replace(/!\[\][\d.]+]/g, '');

    return content.trim();
  }

  /**
   * Generate header for page markdown
   */
  generateHeader(page) {
    const now = new Date().toISOString();
    const pageTitle = page.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return `---
Page: ${pageTitle}
Category: ${page.category}
RSuite Version: ${this.rsuiteVersion}
Generated: ${now}
Source: https://rsuitejs.com${page.urlPrefix}/${page.name}
---

`;
  }

  /**
   * Process a single page
   */
  async processPage(page) {
    try {
      console.log(`Processing [${page.category}]: ${page.name}`);

      let content = await readFile(page.indexPath, 'utf-8');

      // Resolve all include directives
      content = await this.resolveIncludes(content, page);

      // Clean the content
      content = this.cleanMarkdownContent(content);

      // Add header
      const header = this.generateHeader(page);
      const finalContent = header + content;

      // Create category subdirectory
      const categoryDir = path.join(this.outputDir, page.category);
      await mkdir(categoryDir, { recursive: true });

      // Write to output file
      const outputPath = path.join(categoryDir, `${page.name}.md`);
      await writeFile(outputPath, finalContent, 'utf-8');

      const sizeKB = Math.round(finalContent.length / 1024);
      console.log(`  ✓ Generated ${page.category}/${page.name}.md (${sizeKB} KB)`);

      return {
        name: page.name,
        category: page.category,
        size: finalContent.length,
        path: outputPath
      };
    } catch (error) {
      console.error(`  ✗ Error processing [${page.category}] ${page.name}:`, error.message);
      return null;
    }
  }

  /**
   * Main generation function
   */
  async generate() {
    console.log('🚀 Starting documentation markdown generation...');
    console.log(`📁 Pages directory: ${this.pagesPath}`);
    console.log(`📁 Output directory: ${this.outputDir}`);
    console.log(`📂 Categories: ${this.categories.map(c => c.name).join(', ')}\n`);

    // Create output directory if it doesn't exist
    try {
      await mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }

    // Get all pages
    const pages = await this.getAllPages();
    console.log(`📄 Found ${pages.length} pages total\n`);

    // Show breakdown by category
    for (const category of this.categories) {
      const categoryPages = pages.filter(p => p.category === category.name);
      console.log(`  ${category.name}: ${categoryPages.length} pages`);
    }
    console.log('');

    // Process all pages
    const results = [];
    for (const page of pages) {
      const result = await this.processPage(page);
      if (result) {
        results.push(result);
      }
    }

    console.log(`\n✅ Successfully generated ${results.length} markdown files`);
    console.log(`📁 Output directory: ${this.outputDir}`);

    const totalSize = results.reduce((sum, r) => sum + r.size, 0);
    const totalSizeKB = Math.round(totalSize / 1024);
    console.log(`📊 Total size: ${totalSizeKB} KB`);

    // Generate index file
    await this.generateIndexFile(results);

    return this.outputDir;
  }

  /**
   * Generate an index file listing all pages
   */
  async generateIndexFile(results) {
    const now = new Date().toISOString();
    let indexContent = `# RSuite Documentation (Markdown)

Generated: ${now}
RSuite Version: ${this.rsuiteVersion}
Total Pages: ${results.length}

`;

    // Group by category
    for (const category of this.categories) {
      const categoryResults = results.filter(r => r.category === category.name);
      if (categoryResults.length === 0) continue;

      const categoryTitle = category.name.charAt(0).toUpperCase() + category.name.slice(1);
      indexContent += `## ${categoryTitle} (${categoryResults.length})\n\n`;

      categoryResults.sort((a, b) => a.name.localeCompare(b.name));

      for (const result of categoryResults) {
        const pageTitle = result.name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        const sizeKB = Math.round(result.size / 1024);
        indexContent += `- **${pageTitle}** - \`${category.name}/${result.name}.md\` (${sizeKB} KB)\n`;
      }

      indexContent += '\n';
    }

    indexContent += `## Usage

These markdown files are designed to be copied and fed directly to AI coding assistants. Each file contains:

- Page overview and description
- Complete documentation content
- Code examples (where applicable)
- API references (for components)

Simply copy the content of any markdown file and paste it into your AI assistant for context-aware help.

## Files Location

All markdown files are located in: \`docs/public/page-md/\`

You can access them via:
- Local: \`/page-md/{category}/{page-name}.md\`
- Web: \`https://rsuitejs.com/page-md/{category}/{page-name}.md\`

## Categories

- **components**: React Suite component documentation
- **guide**: Usage guides and tutorials
- **resources**: Design resources, icons, and templates
`;

    const indexPath = path.join(this.outputDir, 'index.md');
    await writeFile(indexPath, indexContent, 'utf-8');
    console.log(`📝 Generated index.md`);
  }
}

// Run the generator if this script is executed directly
if (require.main === module) {
  const generator = new MarkdownGenerator();
  generator.generate()
    .then((outputDir) => {
      console.log(`\n🎉 Successfully generated documentation markdown files in: ${outputDir}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error generating documentation markdown files:', error);
      process.exit(1);
    });
}

module.exports = MarkdownGenerator;
