const fs = require('fs');
const path = require('path');

// Path to the SCSS theme file
const themesScssPath = path.resolve(__dirname, '../../src/styles/_themes.scss');
// Path to the output JSON file
const outputJsonPath = path.resolve(__dirname, '../../docs/pages/guide/css-variables/themes.json');

// Read the SCSS file
const scssContent = fs.readFileSync(themesScssPath, 'utf8');

// Regular expression to match CSS variables
const variableRegex = /--rs-([a-zA-Z0-9-]+):\s*([^;]+);(?:\s*\/\/\s*(.+))?/g;

// Define category and type mapping based on variable name patterns
function categorizeVariable(name) {
  // Typography variables
  if (name.includes('font-family')) {
    return { category: 'typography', type: 'font-family' };
  }
  if (name.includes('font-size')) {
    return { category: 'typography', type: 'font-size' };
  }
  if (name.includes('line-height')) {
    return { category: 'typography', type: 'line-height' };
  }
  if (name.includes('text-line-height')) {
    return { category: 'typography', type: 'line-height' };
  }
  if (name.includes('link')) {
    return { category: 'typography', type: 'link' };
  }

  // Spacing variables
  if (name.includes('spacing') || name.includes('padding')) {
    return { category: 'spacing', type: 'spacing' };
  }

  // Border variables
  if (name.includes('radius')) {
    return { category: 'radius', type: 'radius' };
  }

  // Shadow variables
  if (name.includes('shadow-color')) {
    return { category: 'shadow', type: 'shadow-color' };
  }
  if (name.includes('shadow-')) {
    return { category: 'shadow', type: 'shadow' };
  }

  // Z-index variables
  if (name.includes('zindex')) {
    return { category: 'z-index', type: 'z-index' };
  }

  // Interaction variables
  if (name.includes('cursor')) {
    return { category: 'misc', type: 'misc' };
  }
  if (name.includes('ripple')) {
    return { category: 'misc', type: 'misc' };
  }

  // Component specific
  if (name.includes('loader')) {
    return { category: 'misc', type: 'misc' };
  }

  // Other variables
  if (name.includes('scale')) {
    return { category: 'misc', type: 'misc' };
  }

  return { category: 'misc', type: 'misc' };
}

// This function is no longer needed as categorizeVariable handles both category and type

// Parse the SCSS content
function parseScssVariables(content) {
  const variables = [];
  let match;

  while ((match = variableRegex.exec(content)) !== null) {
    const fullName = '--rs-' + match[1];
    const value = match[2].trim();
    // Store comment if needed for documentation purposes
    const commentText = match[3] ? match[3].trim() : '';

    const { category, type } = categorizeVariable(fullName);

    variables.push({
      name: fullName,
      value: value,
      type: type,
      category: category,
      comment: commentText
    });
  }

  return variables;
}

// Main function
function generateThemesJson() {
  try {
    console.log('Parsing SCSS variables from:', themesScssPath);

    const variables = parseScssVariables(scssContent);

    // Remove comment property from the final output
    const cleanVariables = variables.map(variable => {
      // Create a new object without the comment property
      const { name, value, type, category } = variable;
      return { name, value, type, category };
    });

    console.log(`Found ${variables.length} variables`);

    // Ensure the output directory exists
    const outputDir = path.dirname(outputJsonPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the JSON file
    fs.writeFileSync(outputJsonPath, JSON.stringify(cleanVariables, null, 2));

    console.log('Generated themes.json at:', outputJsonPath);
  } catch (error) {
    console.error('Error generating themes.json:', error);
  }
}

// Run the script
generateThemesJson();
