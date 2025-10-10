'use client';
/**
 * Generates a Globally Unique Identifier (GUID).
 */
export function guid() {
  return '_' + Math.random().toString(36).substring(2, 12);
}
export default guid;