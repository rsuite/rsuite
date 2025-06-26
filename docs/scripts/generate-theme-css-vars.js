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

// Regular expression to match CSS variables
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
  
  // Split content to exclude @supports not section
  const mainContent = content.split('@supports not')[0];
  
  // Split the content at the Button section
  const buttonMarker = '// Button';
  const buttonIndex = mainContent.indexOf(buttonMarker);
  
  if (buttonIndex === -1) {
    console.warn(`Button marker not found in the ${themeName} SCSS file. Processing entire file as global variables.`);
    // If Button marker is not found, process the entire content as global variables
    processGlobalVariables(mainContent, variables);
    return variables;
  }
  
  // Split content into global colors (before Button) and component variables (after Button)
  const globalContent = mainContent.substring(0, buttonIndex);
  const componentContent = mainContent.substring(buttonIndex);
  
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

// Main function
function generateThemeJson() {
  themeFiles.forEach(theme => {
    try {
      // Read the SCSS file
      const scssContent = fs.readFileSync(theme.inputPath, 'utf8');
      
      // Generate the variables array
      const variables = parseScssVariables(scssContent, theme.name);
      
      // Clean up the variables for output
      const cleanVariables = variables.map(variable => {
        const { name, value, type, category } = variable;
        return { name, value, type, category };
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

// Run the script
generateThemeJson();
