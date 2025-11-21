import { NextApiRequest, NextApiResponse } from 'next';
import { readComponentTypesFile } from '@/utils/read-types-file';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { component } = req.query;

  if (!component || Array.isArray(component)) {
    return res.status(400).json({ error: 'Invalid component ID' });
  }

  // Validate component ID format
  const namePattern = /^[a-zA-Z0-9-]+$/;
  if (!namePattern.test(component)) {
    return res.status(400).json({ error: 'Invalid component ID format' });
  }

  try {
    const componentTypes = await readComponentTypesFile(component);

    if (!componentTypes) {
      return res.status(404).json({ error: `Component types for '${component}' not found` });
    }

    res.status(200).json(componentTypes);
  } catch (error) {
    console.error(`Error getting component types for ${component}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
