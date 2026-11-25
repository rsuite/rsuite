const fs = require('fs');
const path = require('path');

// Theme files configuration
const themeFiles = [
  {
    name: 'light',
    inputPath: path.resolve(__dirname, '../../src/styles/color-modes/_light.scss'),
    outputPath: path.resolve(__dirname, '../../docs/pages/guide/css-variables/theme-light.json')
  },
  {
    name: 'dark',
    inputPath: path.resolve(__dirname, '../../src/styles/color-modes/_dark.scss'),
    outputPath: path.resolve(__dirname, '../../docs/pages/guide/css-variables/theme-dark.json')
  },
  {
    name: 'high-contrast',
    inputPath: path.resolve(__dirname, '../../src/styles/color-modes/_high-contrast.scss'),
    outputPath: path.resolve(__dirname, '../../docs/pages/guide/css-variables/theme-high-contrast.json')
  }
];

// Regular expression to match CSS variable definitions in SCSS
const variableRegex = /--rs-([a-zA-Z0-9-]+):\s*([^;]+);(?:\s*\/\/\s*(.+))?/g;

// Extract component name from variable name
function extractComponentName(variableName) {
  // Remove the '--rs-' prefix
  const name = variableName.substring(5);

  // Extract the component name (first segment before a hyphen)
  const firstSegment = name.split('-')[0];

  return firstSegment;
}

// Parse the SCSS content
function parseScssVariables(content, themeName) {
  const variables = [];

  // Split the content at the Button section
  const buttonMarker = '// Button';
  const buttonIndex = content.indexOf(buttonMarker);

  if (buttonIndex === -1) {
    console.warn(`Button marker not found in the ${themeName} SCSS file. Processing entire file as global variables.`);
    // If Button marker is not found, process the entire content as global variables
    processGlobalVariables(content, variables);
    return variables;
  }

  // Split content into global colors (before Button) and component variables (after Button)
  const globalContent = content.substring(0, buttonIndex);
  const componentContent = content.substring(buttonIndex);

  // Process global color variables
  processGlobalVariables(globalContent, variables);

  // Process component variables
  processComponentVariables(componentContent, variables);

  return variables;
}

// Process global variables section
function processGlobalVariables(content, variables) {
  let match;
  const globalRegex = new RegExp(variableRegex, 'g');
  while ((match = globalRegex.exec(content)) !== null) {
    // Skip variables in @supports not sections
    if (isInSupportsNotSection(content, match.index)) {
      continue;
    }
    
    const fullName = '--rs-' + match[1];
    const value = match[2].trim();
    const commentText = match[3] ? match[3].trim() : '';

    // Determine the type based on the variable name
    let type = 'misc';
    let category = 'colors';

    if (fullName.includes('gray-')) {
      type = 'gray';
    } else if (fullName.includes('primary-')) {
      type = 'primary';
    } else if (fullName.includes('color-')) {
      type = 'palette';
    } else if (fullName.includes('state-')) {
      type = 'state';
    } else if (fullName.includes('bg-') || fullName.includes('background')) {
      type = 'background';
    } else if (fullName.includes('text-')) {
      type = 'text';
    } else if (fullName.includes('border-')) {
      type = 'border';
    }

    variables.push({
      name: fullName,
      value: value,
      type: type,
      category: category,
      comment: commentText
    });
  }
}

// Process component variables section
function processComponentVariables(content, variables) {
  let match;
  const componentRegex = new RegExp(variableRegex, 'g');
  while ((match = componentRegex.exec(content)) !== null) {
    // Skip variables in @supports not sections
    if (isInSupportsNotSection(content, match.index)) {
      continue;
    }
    
    const fullName = '--rs-' + match[1];
    const value = match[2].trim();
    const commentText = match[3] ? match[3].trim() : '';

    // Extract the component name from the variable name
    const componentName = extractComponentName(fullName);

    variables.push({
      name: fullName,
      value: value,
      type: componentName,
      category: 'components',
      comment: commentText
    });
  }
}

// Extract additional metadata about CSS variables
function enhanceVariableData(variables, themeName) {
  // Add theme-specific metadata to each variable
  return variables.map(variable => {
    const enhancedVar = { ...variable };
    
    // Add theme identifier
    enhancedVar.theme = themeName;
    
    // Try to determine if it's a color value
    if (isColorValue(variable.value)) {
      enhancedVar.isColor = true;
    }
    
    // Add original SCSS syntax (useful for documentation)
    if (variable.value.includes('#{')) {
      enhancedVar.scssValue = variable.value;
      enhancedVar.needsCompilation = true;
    }
    
    return enhancedVar;
  });
}

// Check if a value is likely a color
function isColorValue(value) {
  // Check for hex colors
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value)) {
    return true;
  }
  
  // Check for rgb/rgba colors
  if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/i.test(value)) {
    return true;
  }
  
  // Check for hsl/hsla colors
  if (/^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%/i.test(value)) {
    return true;
  }
  
  // Check for named colors (simplified check)
  const namedColors = ['transparent', 'white', 'black', 'red', 'blue', 'green', 'yellow'];
  if (namedColors.includes(value.toLowerCase())) {
    return true;
  }
  
  return false;
}

// Check if a variable declaration is inside a @supports not section
function isInSupportsNotSection(content, position) {
  // Find the last @supports not before this position
  const lastSupportsNotIndex = content.lastIndexOf('@supports not', position);
  
  if (lastSupportsNotIndex === -1) {
    return false; // No @supports not found before this position
  }
  
  // Find the closing brace for this @supports block
  const blockStartIndex = content.indexOf('{', lastSupportsNotIndex);
  if (blockStartIndex === -1) {
    return false; // Invalid @supports block
  }
  
  // Count braces to find the matching closing brace
  let braceCount = 1;
  let index = blockStartIndex + 1;
  
  while (index < content.length && index < position) {
    if (content[index] === '{') {
      braceCount++;
    } else if (content[index] === '}') {
      braceCount--;
      if (braceCount === 0) {
        // We found the closing brace before our position, so we're not in the block
        return false;
      }
    }
    index++;
  }
  
  // If we get here and braceCount > 0, we're still inside the @supports block
  return braceCount > 0;
}

// Main function
function generateThemeJson() {
  themeFiles.forEach(theme => {
    try {
      // Read the SCSS file
      const scssContent = fs.readFileSync(theme.inputPath, 'utf8');
      
      // Generate the variables array from the original SCSS
      const variables = parseScssVariables(scssContent, theme.name);
      
      // Enhance the variables with additional metadata
      const enhancedVariables = enhanceVariableData(variables, theme.name);
      
      // Clean up the variables for output
      const cleanVariables = enhancedVariables.map(variable => {
        const { name, value, type, category, theme, isColor, scssValue, needsCompilation } = variable;
        return { 
          name, 
          value, 
          type, 
          category,
          theme,
          ...(isColor && { isColor }),
          ...(scssValue && { scssValue }),
          ...(needsCompilation && { needsCompilation })
        };
      });
      
      // Ensure the output directory exists
      const outputDir = path.dirname(theme.outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Write the JSON file
      fs.writeFileSync(theme.outputPath, JSON.stringify(cleanVariables, null, 2));
      
      console.log(`Parsing SCSS variables from: ${theme.inputPath}`);
      console.log(`Found ${variables.length} variables`);
      console.log(`Generated ${path.basename(theme.outputPath)} at: ${theme.outputPath}`);
      console.log('-----------------------------------');
    } catch (error) {
      console.error(`Error processing ${theme.name} theme:`, error);
    }
  });
}

// Execute the main function
generateThemeJson();
