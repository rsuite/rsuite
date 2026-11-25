#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { readFileSync } = fs;

/**
 * Script to generate llms.txt file with basic introduction and all website links
 * This is a simplified version that only contains URLs to documentation pages
 */

class LLMSSimpleGenerator {
  constructor() {
    this.outputPath = path.join(__dirname, '../public/llms.txt');
    this.baseUrl = 'https://rsuitejs.com';
    this.rsuiteVersion = this.getRSuiteVersion();
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
   * Load components configuration
   */
  loadComponents() {
    try {
      const componentConfigPath = path.join(__dirname, '../component.config.json');
      return JSON.parse(readFileSync(componentConfigPath, 'utf-8'));
    } catch (error) {
      console.error('Error loading component.config.json:', error);
      return [];
    }
  }

  /**
   * Load locales for guide pages
   */
  loadLocales() {
    try {
      const localesPath = path.join(__dirname, '../locales/en-US/index.ts');
      const content = readFileSync(localesPath, 'utf-8');
      // Simple extraction of locale object (not a proper parser, but works for this case)
      return content;
    } catch (error) {
      console.error('Error loading locales:', error);
      return '';
    }
  }

  /**
   * Generate guide pages URLs from usePages structure
   */
  generateGuideUrls() {
    const urls = [];

    // Getting Started
    urls.push({ section: 'Getting Started', name: 'Introduction', url: `${this.baseUrl}/guide/introduction` });
    urls.push({ section: 'Getting Started', name: 'Quick Start', url: `${this.baseUrl}/guide/usage` });
    urls.push({ section: 'Getting Started', name: 'Composition', url: `${this.baseUrl}/guide/composition` });
    urls.push({ section: 'Getting Started', name: 'Accessibility', url: `${this.baseUrl}/guide/accessibility` });
    urls.push({ section: 'Getting Started', name: 'Migration to v6', url: `${this.baseUrl}/guide/migration-v6` });

    // AI for Agents
    urls.push({ section: 'AI for Agents', name: 'LLMs.txt', url: `${this.baseUrl}/guide/llms` });
    urls.push({ section: 'AI for Agents', name: 'MCP Server', url: `${this.baseUrl}/guide/mcp-server` });

    // Frameworks
    urls.push({ section: 'Frameworks', name: 'Vite', url: `${this.baseUrl}/guide/use-vite` });
    urls.push({ section: 'Frameworks', name: 'Next.js (App)', url: `${this.baseUrl}/guide/use-next-app` });
    urls.push({ section: 'Frameworks', name: 'Next.js (Pages)', url: `${this.baseUrl}/guide/use-next-pages` });
    urls.push({ section: 'Frameworks', name: 'Create React App', url: `${this.baseUrl}/guide/use-with-create-react-app` });

    // Customization
    urls.push({ section: 'Customization', name: 'Themes', url: `${this.baseUrl}/guide/official-themes` });
    urls.push({ section: 'Customization', name: 'Default Props', url: `${this.baseUrl}/guide/default-props` });
    urls.push({ section: 'Customization', name: 'Style Props', url: `${this.baseUrl}/guide/style-props` });
    urls.push({ section: 'Customization', name: 'CSS Variables', url: `${this.baseUrl}/guide/css-variables` });
    urls.push({ section: 'Customization', name: 'CSS Reset', url: `${this.baseUrl}/guide/css-reset` });
    urls.push({ section: 'Customization', name: 'Localization', url: `${this.baseUrl}/guide/i18n` });
    urls.push({ section: 'Customization', name: 'Right to left', url: `${this.baseUrl}/guide/rtl` });

    // Performance
    urls.push({ section: 'Performance', name: 'Optimizing Performance', url: `${this.baseUrl}/guide/optimizing-performance` });
    urls.push({ section: 'Performance', name: 'Minimizing bundle size', url: `${this.baseUrl}/guide/modularized` });

    return urls;
  }

  /**
   * Generate component URLs from component.config.json
   */
  generateComponentUrls() {
    const components = this.loadComponents();
    const urls = [];

    components.forEach(item => {
      if (item.group && item.children) {
        const groupName = item.name;
        item.children.forEach(child => {
          if (child.id) {
            urls.push({
              section: groupName,
              name: child.name,
              url: `${this.baseUrl}/components/${child.id}`
            });
          }
        });
      } else if (item.id && !item.group) {
        urls.push({
          section: 'Components',
          name: item.name,
          url: `${this.baseUrl}/components/${item.id}`
        });
      }
    });

    return urls;
  }

  /**
   * Generate resources URLs
   */
  generateResourceUrls() {
    return [
      { section: 'Resources', name: 'Templates', url: `${this.baseUrl}/resources/templates` },
      { section: 'Resources', name: 'Icons', url: `${this.baseUrl}/resources/icons` },
      { section: 'Resources', name: 'Design Resources', url: `${this.baseUrl}/resources/design` },
      { section: 'Resources', name: 'Colors', url: `${this.baseUrl}/resources/colors` },
      { section: 'Resources', name: 'Palette', url: `${this.baseUrl}/resources/palette` },
      { section: 'Resources', name: 'Extension Components', url: `${this.baseUrl}/resources/extensions` },
      { section: 'Resources', name: 'Example Projects', url: `${this.baseUrl}/resources/examples` }
    ];
  }

  /**
   * Generate the header for llms.txt
   */
  generateHeader() {
    const now = new Date().toISOString();
    return `# RSuite Documentation

> RSuite (React Suite)
> A suite of React components, designed for enterprise system products.

RSuite is a comprehensive React component library committed to providing high-quality and accessible components to help developers quickly build web applications.

- **Version**: ${this.rsuiteVersion}
- **Website**: ${this.baseUrl}
- **GitHub**: https://github.com/rsuite/rsuite
- **Generated**: ${now}

## Documentation Links

Below are all the documentation pages available on the RSuite website. Each link provides detailed information about guides, components, and resources.

`;
  }

  /**
   * Format URLs by section
   */
  formatUrlsBySection(urls) {
    const sections = {};

    urls.forEach(item => {
      if (!sections[item.section]) {
        sections[item.section] = [];
      }
      sections[item.section].push(item);
    });

    let output = '';
    Object.entries(sections).forEach(([section, items]) => {
      output += `### ${section}\n\n`;
      items.forEach(item => {
        if (item.name) {
          output += `- [${item.name}](${item.url})\n`;
        } else {
          output += `- ${item.url}\n`;
        }
      });
      output += '\n';
    });

    return output;
  }

  /**
   * Main generation function
   */
  async generate() {
    console.log('🚀 Starting llms.txt generation (simple version)...');

    // Generate all URLs
    const guideUrls = this.generateGuideUrls();
    const componentUrls = this.generateComponentUrls();
    const resourceUrls = this.generateResourceUrls();

    console.log(`📄 Found ${guideUrls.length} guide pages`);
    console.log(`📄 Found ${componentUrls.length} component pages`);
    console.log(`📄 Found ${resourceUrls.length} resource pages`);

    // Generate content
    let output = this.generateHeader();

    // Add guide URLs
    output += this.formatUrlsBySection(guideUrls);

    // Add component URLs
    output += this.formatUrlsBySection(componentUrls);

    // Add resource URLs
    output += this.formatUrlsBySection(resourceUrls);

    // Add footer
    output += `---\n\n`;
    output += `## Additional Information\n\n`;
    output += `For the full documentation content, visit ${this.baseUrl}\n\n`;
    output += `**Total pages**: ${guideUrls.length + componentUrls.length + resourceUrls.length}\n`;
    output += `**Last updated**: ${new Date().toISOString()}\n`;

    // Write to file
    fs.writeFileSync(this.outputPath, output, 'utf-8');

    const sizeKB = Math.round(output.length / 1024);
    console.log(`📝 Generated llms.txt (${sizeKB} KB) at: ${this.outputPath}`);

    // Print summary
    console.log('\n📊 Summary:');
    console.log(`   Guide pages: ${guideUrls.length}`);
    console.log(`   Component pages: ${componentUrls.length}`);
    console.log(`   Resource pages: ${resourceUrls.length}`);
    console.log(`   Total: ${guideUrls.length + componentUrls.length + resourceUrls.length} pages`);

    return this.outputPath;
  }
}

// Run the generator if this script is executed directly
if (require.main === module) {
  const generator = new LLMSSimpleGenerator();
  generator.generate()
    .then((outputPath) => {
      console.log(`\n🎉 Successfully generated llms.txt at: ${outputPath}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error generating llms.txt:', error);
      process.exit(1);
    });
}

module.exports = LLMSSimpleGenerator;
