import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { componentName, example } = req.query;

  if (!componentName || !example || Array.isArray(componentName) || Array.isArray(example)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const examplePath = path.join(
      process.cwd(),
      'public',
      'examples',
      `${componentName}-${example}.json`
    );

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
