import { promises as fs } from 'fs';
import { basename, join } from 'path';

export async function readTypesFile(filename: string) {
  try {
    // Keep the file boundary safe for callers beyond the validated API route.
    if (typeof filename !== 'string' || !/^[a-zA-Z0-9-]+\.json$/.test(filename)) {
      return null;
    }

    const filePath = join(process.cwd(), 'public', 'react', 'types', basename(filename));
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading types file ${filename}:`, error);
    return null;
  }
}

export async function readComponentTypesFile(componentId: string) {
  try {
    const filename = `${componentId}.json`;
    return await readTypesFile(filename);
  } catch (error) {
    console.error(`Error reading component types file for ${componentId}:`, error);
    return null;
  }
}
