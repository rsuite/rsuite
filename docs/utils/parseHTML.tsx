const titleRegExp = /<span class="page-heading-text">(.*)<\/span>[\r\n]/;
const descriptionRegExp = /<p>(.*)<\/p>[\r\n]/;
const codeRegExp = /<!--start-code-->[\s\S]*<!--end-code-->/;

export function getTitle(markdown: string): string {
  const matches = markdown.match(titleRegExp);

  if (!matches || !matches[1]) {
    throw new Error('Missing title in the page');
  }

  return matches[1];
}

export function getDescription(markdown: string): string {
  const matches = markdown.match(descriptionRegExp);

  if (!matches || !matches[1]) {
    throw new Error('Missing description in the page');
  }

  return matches[1];
}

export function replaceWithPlaceholder(source: string, height = 80): string {
  return source.replace(
    codeRegExp,
    `<div class="code-view-wrapper" style="height:${height}px"><!-- Loading... --></div>`
  );
}
