import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import CopyCodeButton from './CopyCodeButton';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('bash', bash);

function highlightCode(code: string, language = 'javascript') {
  return hljs.highlight(code, { language, ignoreIllegals: true }).value;
}

interface StaticCodeViewProps {
  code: string;
  language?: 'javascript' | 'bash';
}

function StaticCodeView(props: StaticCodeViewProps) {
  const { code, language = 'javascript' } = props;
  return (
    <div className="static-code-view">
      <div className="rcv-highlight">
        <pre
          dangerouslySetInnerHTML={{
            __html: `<code class="${language}">` + highlightCode(code, language) + '</code>'
          }}
        />
        <CopyCodeButton code={code} />
      </div>
    </div>
  );
}

export default StaticCodeView;
