import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import CopyCodeButton from './CopyCodeButton';

export function HTMLRenderer({ children }: { children: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<HTMLElement[]>([]);

  useEffect(() => {
    setBlocks(Array.from(ref.current?.querySelectorAll<HTMLElement>('.rcv-code-renderer') ?? []));
  }, [children]);

  if (!children) {
    return null;
  }

  return (
    <>
      <div className="rcv-markdown" ref={ref} dangerouslySetInnerHTML={{ __html: children }} />
      {blocks.map((block, index) =>
        createPortal(
          <CopyCodeButton
            aria-label="Copy code"
            code={block.querySelector('code')?.textContent ?? ''}
          />,
          block,
          String(index)
        )
      )}
    </>
  );
}

export default HTMLRenderer;
