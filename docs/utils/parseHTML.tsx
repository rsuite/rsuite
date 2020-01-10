const titleRegExp = /<h1>(.*)<\/h1>[\r\n]/;
const descriptionRegExp = /<p>(.*)<\/p>[\r\n]/;

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
