const titleRegExp = /<h1 id=".*">(.*)<\/h1>[\r\n]/;
const descriptionRegExp = /<p>(.*)<\/p>[\r\n]/;
const codeRegExp = /<!--start-code-->[\s\S]*<!--end-code-->/;

export function getTitle(markdown) {
  const matches = markdown.match(titleRegExp);

  if (!matches || !matches[1]) {
    throw new Error('Missing title in the page');
  }

  return matches[1];
}

export function getDescription(markdown) {
  const matches = markdown.match(descriptionRegExp);

  if (!matches || !matches[1]) {
    throw new Error('Missing description in the page');
  }

  return matches[1];
}

export function replaceWithPlaceholder(source) {
  return source.replace(
    codeRegExp,
    '<div class="code-view-wrapper" style="height:80px"><!-- Loading... --></div>'
  );
}
