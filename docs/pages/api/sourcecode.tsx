import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { componentName, example } = req.query;

  if (!componentName || !example || Array.isArray(componentName) || Array.isArray(example)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const examplesPath = path.join(process.cwd(), 'public', 'examples.json');

    if (!fs.existsSync(examplesPath)) {
      return res.status(500).json({ error: 'Examples file not found' });
    }

    const examples = JSON.parse(fs.readFileSync(examplesPath, 'utf-8'));

    if (!examples[componentName] || !examples[componentName][example]) {
      return res.status(404).json({ error: 'Example not found' });
    }

    const sourceCode = examples[componentName][example];
    res.status(200).json({ sourceCode });
  } catch (error) {
    console.error('Error reading source code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
