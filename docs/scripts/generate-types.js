#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Generate component type files
 * Read component.config.json and generate index.json and props JSON files for each component
 */

function readTypeDefinition(typeName) {
  const typeFilePath = path.join(__dirname, `../pages/_common/types/${typeName.toLowerCase()}.md`);
  
  try {
    if (!fs.existsSync(typeFilePath)) {
      return null;
    }
    
    const content = fs.readFileSync(typeFilePath, 'utf8');
    const typeMatch = content.match(/type\s+\w+\s*=\s*([^;]+);/);
    if (typeMatch) {
      return typeMatch[1].trim();
    }
    
    return null;
  } catch {
    return null;
  }
}

function processTypeString(typeString) {
  let processedType = typeString;
  
  processedType = processedType.replace(/\\\|/g, '|');
  
  const linkTypeRegex = /\[([^\]]+)\]\(#code-ts-([^-]+)-code\)/g;
  processedType = processedType.replace(linkTypeRegex, (match, displayName, typeName) => {
    const realType = readTypeDefinition(typeName);
    if (realType) {
      return realType;
    }
    return displayName;
  });
  
  const otherLinkRegex = /\[([^\]]+)\]\([^)]+\)/g;
  processedType = processedType.replace(otherLinkRegex, '$1');
  
  processedType = processedType.replace(/\s*\|\s*/g, ' | ');
  
  return processedType;
}

function parseTypeAndDefault(typeCell) {
  const match = typeCell.match(/^(.+?)\s*`\((.+?)\)`$/);
  
  if (match) {
    let type = match[1].trim();
    let defaultValue = match[2].trim();
    
    type = processTypeString(type);
    
    if (defaultValue.startsWith("'") && defaultValue.endsWith("'")) {
      defaultValue = defaultValue.slice(1, -1);
    }
    
    return {
      type,
      isRequired: false,
      defaultValue
    };
  } else {
    let type = typeCell.trim();
    type = processTypeString(type);
    
    return {
      type,
      isRequired: false,
      hasDefaultValue: false
    };
  }
}

function parsePropsTable(content, componentName) {
  const lines = content.split('\n');
  const props = {};
  
  const componentHeader = `### \`<${componentName}>\``;
  let startIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === componentHeader) {
      startIndex = i;
      break;
    }
  }
  
  if (startIndex === -1) {
    return null;
  }
  
  let tableStartIndex = -1;
  for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].includes('| Property') || lines[i].includes('|Property')) {
      tableStartIndex = i;
      break;
    }
  }
  
  if (tableStartIndex === -1) {
    return null;
  }
  
  let dataStartIndex = tableStartIndex + 2;
  
  for (let i = dataStartIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line || line.startsWith('###') || line.startsWith('##')) {
      break;
    }
    
    if (line.startsWith('|') && line.endsWith('|')) {
      const content = line.slice(1, -1);
      
      const firstPipeIndex = content.indexOf('|');
      if (firstPipeIndex === -1) continue;
      
      const propName = content.slice(0, firstPipeIndex).trim();
      let remaining = content.slice(firstPipeIndex + 1);
      
      const parts = remaining.split('|').map(part => part.trim());
      
      if (parts.length >= 2) {
        const lastPart = parts[parts.length - 1];
        const isVersionColumn = lastPart === '' || lastPart.includes('![]') || lastPart.includes('version');
        
        let typeAndDefault, description;
        if (isVersionColumn && parts.length >= 3) {
          description = parts[parts.length - 2];
          typeAndDefault = parts.slice(0, -2).join('|').trim();
        } else {
          description = parts[parts.length - 1];
          typeAndDefault = parts.slice(0, -1).join('|').trim();
        }
        
        if (propName && typeAndDefault && description) {
          const cleanPropName = propName.replace(/\s*\\\*?\s*$/, '').replace(/\s*\*\s*$/, '').trim();
          const typeInfo = parseTypeAndDefault(typeAndDefault);
          const isRequiredByName = propName.includes('*');
          
          const propDef = {
            type: typeInfo.type,
            isRequired: isRequiredByName || typeInfo.isRequired,
            description: description
          };
          
          if (typeInfo.hasDefaultValue !== false) {
            propDef.defaultValue = typeInfo.defaultValue;
          }
          
          props[cleanPropName] = propDef;
        }
      }
    }
  }
  
  return Object.keys(props).length > 0 ? props : null;
}

function generateComponentProps(componentId, outputDir) {
  const docPath = path.join(__dirname, `../pages/components/${componentId}/en-US/index.md`);
  const propsPath = path.join(__dirname, `../pages/components/${componentId}/en-US/props.md`);
  const outputPath = path.join(outputDir, `${componentId}.json`);
  
  try {
    if (!fs.existsSync(docPath)) {
      console.log(`⚠️  Documentation file not found: ${componentId}`);
      return false;
    }
    
    let content = fs.readFileSync(docPath, 'utf8');
    
    if (fs.existsSync(propsPath)) {
      const propsContent = fs.readFileSync(propsPath, 'utf8');
      content += '\n\n' + propsContent;
    }
    
    const componentMatches = content.match(/### `<([^>]+)>`/g);
    
    if (!componentMatches) {
      console.log(`⚠️  Component definition not found: ${componentId}`);
      return false;
    }
    
    const result = {};
    
    for (const match of componentMatches) {
      const componentName = match.match(/### `<([^>]+)>`/)[1];
      const props = parsePropsTable(content, componentName);
      
      if (props) {
        result[componentName] = { props };
      }
    }
    
    if (Object.keys(result).length === 0) {
      console.log(`⚠️  No valid props definition found: ${componentId}`);
      return false;
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
    
    console.log(`✅ Generated: ${componentId}.json (${Object.keys(result).length} components)`);
    
    return true;
    
  } catch (error) {
    console.error(`❌ Failed to generate ${componentId}:`, error.message);
    return false;
  }
}

const configPath = path.join(__dirname, '../component.config.json');
const outputDir = path.join(__dirname, '../public/react/types');
const outputPath = path.join(outputDir, 'index.json');

try {
  console.log('Reading configuration file:', configPath);
  const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  const components = [];
  const hooks = [];
  
  function extractItems(items) {
    items.forEach(item => {
      if (item.group && item.children) {
        extractItems(item.children);
      } else if (item.id && !item.group && item.id !== 'form-validation') {
        if (item.components && Array.isArray(item.components)) {
          components.push(item.id);
        }
        if (item.hooks && Array.isArray(item.hooks)) {
          hooks.push(item.id);
        }
      }
    });
  }
  
  extractItems(configData);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('Created directory:', outputDir);
  }
  
  const outputData = {
    components: components.sort(),
    hooks: hooks.sort()
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf8');
  
  console.log('✅ Generated component index file:', outputPath);
  console.log(`📊 Found ${components.length} components:`);
  console.log(components.join(', '));
  console.log(`🪝 Found ${hooks.length} hooks:`);
  console.log(hooks.join(', '));
  
  console.log('\n🔄 Generating component props files...');
  let successCount = 0;
  let failCount = 0;
  
  for (const componentId of components) {
    const success = generateComponentProps(componentId, outputDir);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log(`\n📈 Props file generation completed:`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  
  if (failCount > 0) {
    console.log(`⚠️  ${failCount} component props files failed to generate. Please check the corresponding documentation files.`);
  }
  
} catch (error) {
  console.error('❌ Generation failed:', error.message);
  process.exit(1);
}
