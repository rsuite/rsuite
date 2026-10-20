export const requests: Array<{
  id: number;
  value: string;
  state: 'pending' | 'received' | 'error';
  available?: boolean;
  error?: string;
}> = [];
/** No cancellation, sequence filtering or result suppression is supplied by this transport. */
export async function usernameAvailable(value: string) {
  const record = {
    id: requests.length + 1,
    value,
    state: 'pending' as const
  } as (typeof requests)[number];
  requests.push(record);
  if (requests.length > 100) throw new Error('Unexpected validation request loop');
  try {
    const response = await fetch('/availability?username=' + encodeURIComponent(value));
    if (!response.ok) throw new Error('Availability HTTP ' + response.status);
    const data: unknown = await response.json();
    if (
      !data ||
      typeof data !== 'object' ||
      !('available' in data) ||
      typeof data.available !== 'boolean'
    )
      throw new Error('Invalid availability response');
    record.state = 'received';
    record.available = data.available;
    return data.available;
  } catch (error) {
    record.state = 'error';
    record.error = String(error);
    throw error;
  }
}
