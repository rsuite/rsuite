import { promises as fs } from 'fs';
import { join } from 'path';

export async function readTypesFile(filename: string) {
  try {
    const filePath = join(process.cwd(), 'public', 'react', 'types', filename);
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
