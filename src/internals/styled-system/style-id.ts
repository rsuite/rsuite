/** Keep opaque React namespaces distinct and safe as one HTML class token. */
export function encodeStyleId(id: string): string {
  // Reserve '%' so literal escape sequences cannot collide with encoded characters.
  const encoded = id.replace(/[%\s\uD800-\uDFFF]/gu, char =>
    char === '%' ? '%%' : `%${char.charCodeAt(0).toString(16)}%`
  );

  // HTML and CSS replace null characters; encode them after reserving literal '%'.
  return encoded.includes('\0') ? encoded.split('\0').join('%0%') : encoded;
}
