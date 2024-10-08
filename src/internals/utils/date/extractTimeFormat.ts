/**
 * Extracts the time format from a given date format.
 */
export function extractTimeFormat(format: string) {
  const match = format.match(
    /([hH]{1,2}[:.]mm(?:[:.]ss)?(?: ?aa)?|(?:aa )?[hH]{1,2}[:.]mm(?:[:.]ss)?)/
  );
  return match ? match[0] : null;
}
