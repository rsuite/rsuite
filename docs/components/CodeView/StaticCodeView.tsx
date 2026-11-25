import CopyCodeButton from './CopyCodeButton';
import HighlightedCode from './HighlightedCode';

interface StaticCodeViewProps {
  code: string;
  language?: 'javascript' | 'bash';
}

function StaticCodeView({ code, language = 'javascript' }: StaticCodeViewProps) {
  return (
    <div className="static-code-view">
      <div className="rcv-highlight">
        <HighlightedCode code={code} language={language} />
        <CopyCodeButton aria-label="Copy code" code={code} />
      </div>
    </div>
  );
}

export default StaticCodeView;
