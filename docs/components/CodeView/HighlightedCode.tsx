import { useEffect, useState } from 'react';

interface HighlightedCodeProps {
  code: string;
  language: string;
}

export default function HighlightedCode({ code, language }: HighlightedCodeProps) {
  const [highlight, setHighlight] = useState<{ code: string; language: string; html: string }>();

  useEffect(() => {
    let current = true;

    async function load() {
      const { getCodeHighlighter, renderHighlightedCode } = await import(
        '@/utils/highlight-code.mjs'
      );
      const highlighter = await getCodeHighlighter();

      if (current) {
        setHighlight({ code, language, html: renderHighlightedCode(highlighter, code, language) });
      }
    }

    load().catch(error => console.error('Unable to highlight example source', error));

    return () => {
      current = false;
    };
  }, [code, language]);

  if (highlight?.code === code && highlight.language === language) {
    return <div dangerouslySetInnerHTML={{ __html: highlight.html }} />;
  }

  return (
    <pre>
      <code>{code}</code>
    </pre>
  );
}
