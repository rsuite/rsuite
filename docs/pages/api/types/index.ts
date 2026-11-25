import { NextApiRequest, NextApiResponse } from 'next';
import { readTypesFile } from '@/utils/read-types-file';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const typesIndex = await readTypesFile('index.json');

    if (!typesIndex) {
      return res.status(404).json({ error: 'Types index not found' });
    }

    res.status(200).json(typesIndex);
  } catch (error) {
    console.error('Error getting components index:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
