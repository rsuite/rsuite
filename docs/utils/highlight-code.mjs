import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import bash from 'shiki/langs/bash.mjs';
import css from 'shiki/langs/css.mjs';
import diff from 'shiki/langs/diff.mjs';
import html from 'shiki/langs/html.mjs';
import javascript from 'shiki/langs/javascript.mjs';
import json from 'shiki/langs/json.mjs';
import jsx from 'shiki/langs/jsx.mjs';
import tsx from 'shiki/langs/tsx.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import light from 'shiki/themes/github-light.mjs';
import dark from 'shiki/themes/github-dark.mjs';

const languages = [bash, css, diff, html, javascript, json, jsx, tsx, typescript];
let highlighter;

export function getCodeHighlighter() {
  highlighter ??= createHighlighterCore({
    langs: languages,
    themes: [light, dark],
    engine: createOnigurumaEngine(import('shiki/wasm'))
  });

  return highlighter;
}

export function renderHighlightedCode(highlighter, code, language) {
  const lang = highlighter.getLoadedLanguages().includes(language) ? language : 'text';

  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false
  });
}
