const fs = require('fs');
const path = require('path');

const docsRoot = path.resolve(__dirname, '..');
console.log('Generating examples in:', docsRoot);

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

function generateExampleFiles(componentsDir) {
  if (!fs.existsSync(componentsDir)) {
    console.error(`Components directory not found: ${componentsDir}`);
    process.exitCode = 1;
    return;
  }

  // Create docs/public/examples directory
  const publicDir = path.join(docsRoot, 'public');
  const examplesDir = path.join(publicDir, 'examples');
  ensureDirectoryExists(examplesDir);

  // Read all component directories
  const components = fs.readdirSync(componentsDir);

  components.forEach(component => {
    // Skip .DS_Store and other hidden files
    if (component.startsWith('.')) {
      return;
    }

    const componentDir = path.join(componentsDir, component);

    // Skip if not a directory
    if (!fs.statSync(componentDir).isDirectory()) {
      return;
    }

    const componentExamplesDir = path.join(componentDir, 'examples');

    // Skip if examples directory doesn't exist
    if (!fs.existsSync(componentExamplesDir)) {
      return;
    }

    try {
      // Read all example files
      const files = fs.readdirSync(componentExamplesDir);
      console.log(`Found ${files.length} files in ${component}/examples`);

      files.forEach(file => {
        // Skip index.tsx and hidden files
        if (file === 'index.tsx' || file.startsWith('.')) {
          return;
        }

        if (file.endsWith('.tsx')) {
          try {
            const exampleName = path.basename(file, '.tsx');
            const filePath = path.join(componentExamplesDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            // Write example file
            const exampleData = {
              component,
              name: exampleName,
              content
            };

            const outputPath = path.join(examplesDir, `${component}-${exampleName}.json`);
            fs.writeFileSync(outputPath, JSON.stringify(exampleData, null, 2));
          } catch (err) {
            console.error(`Error processing example file ${file}:`, err.message);
            process.exitCode = 1;
          }
        }
      });
    } catch (err) {
      console.error(`Error processing component ${component}:`, err.message);
      process.exitCode = 1;
    }
  });
}

// Generate example files
const componentsDir = path.join(docsRoot, 'pages', 'components');
generateExampleFiles(componentsDir);
