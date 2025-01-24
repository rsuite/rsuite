import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { componentName, example } = req.query;

  if (!componentName || !example || Array.isArray(componentName) || Array.isArray(example)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  // Validate input format
  const namePattern = /^[a-zA-Z0-9-]+$/;
  if (!namePattern.test(componentName) || !namePattern.test(example)) {
    return res.status(400).json({ error: 'Invalid parameter format' });
  }

  try {
    // Define the root directory for examples
    const rootDir = path.resolve(process.cwd(), 'public', 'examples');

    // Construct and normalize the file path
    const fileName = `${componentName}-${example}.json`;
    const examplePath = path.resolve(rootDir, fileName);

    // Verify the path is within the root directory
    if (!examplePath.startsWith(rootDir)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check if file exists
    if (!fs.existsSync(examplePath)) {
      return res.status(404).json({ error: 'Example not found' });
    }

    const exampleData = JSON.parse(fs.readFileSync(examplePath, 'utf-8'));
    res.status(200).json({ sourceCode: exampleData.content });
  } catch (error) {
    console.error('Error reading source code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
