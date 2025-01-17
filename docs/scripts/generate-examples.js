const fs = require('fs');
const path = require('path');

function getAllExamples(componentsDir) {
  const examples = {};
  
  // Read all component directories
  const components = fs.readdirSync(componentsDir);
  
  components.forEach(component => {
    const examplesDir = path.join(componentsDir, component, 'examples');
    if (fs.existsSync(examplesDir)) {
      examples[component] = {};
      
      // Read all example files
      const files = fs.readdirSync(examplesDir);
      files.forEach(file => {
        if (file.endsWith('.tsx')) {
          const exampleName = path.basename(file, '.tsx');
          const content = fs.readFileSync(path.join(examplesDir, file), 'utf-8');
          examples[component][exampleName] = content;
        }
      });
    }
  });
  
  return examples;
}

// Generate examples JSON file
const componentsDir = path.join(process.cwd(), 'pages', 'components');
const examples = getAllExamples(componentsDir);

// Create public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Write examples to JSON file
fs.writeFileSync(
  path.join(publicDir, 'examples.json'),
  JSON.stringify(examples, null, 2)
);
