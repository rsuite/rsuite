import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { componentName, example } = req.query;

  if (!componentName || !example || Array.isArray(componentName) || Array.isArray(example)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const filePath = path.join(
      process.cwd(),
      'pages',
      'components',
      componentName,
      'examples',
      `${example}.tsx`
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Example not found' });
    }

    const sourceCode = fs.readFileSync(filePath, 'utf-8');
    res.status(200).json({ sourceCode });
  } catch (error) {
    console.error('Error reading source code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
