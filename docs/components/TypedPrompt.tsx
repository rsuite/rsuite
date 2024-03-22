import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'rsuite';
import onEvent from 'dom-lib/on';
import canUseDOM from 'dom-lib/canUseDOM';

/**
 * Add a hint for type definitions in documentation
 */
export default function TypedPrompt(props) {
  const [open, setOpen] = useState(false);
  const [typedCode, setTypedCode] = useState('');

  useEffect(() => {
    if (!canUseDOM) {
      return;
    }

    const handleClick = e => {
      const href = e.target?.getAttribute('href');

      if (!href) {
        return;
      }

      if (href.match(/#code-ts[\s\S]*-code/)) {
        const codeElement = document.querySelector(href).nextElementSibling;

        e.preventDefault();

        setTypedCode(codeElement.innerHTML);
        setOpen(true);
      }
    };

    const clickListener = onEvent(document.body, 'click', handleClick, true);

    return () => {
      clickListener.off();
    };
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTypedCode('');
  }, []);

  return (
    <Modal {...props} open={open} animationTimeout={0} onClose={handleClose}>
      <Modal.Header>Type Declarations</Modal.Header>
      <Modal.Body className="markdown rcv-highlight rcv-code-renderer">
        <div className="doc-highlight" dangerouslySetInnerHTML={{ __html: typedCode }} />
      </Modal.Body>
    </Modal>
  );
}
