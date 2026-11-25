import { useState } from 'react';
import { useToaster, Notification } from 'rsuite';
import copy from 'copy-to-clipboard';

interface ClipboardHook {
  notification?: boolean;
}

function useClipboard(props?: ClipboardHook) {
  const { notification } = props || {};
  const toaster = useToaster();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    setCopied(true);

    copy(text);
    setTimeout(() => setCopied(false), 2000);

    if (notification) {
      toaster.push(<Notification>✅ Copied to clipboard</Notification>, {
        duration: 2000
      });
    }
  };

  return { copied, copyToClipboard };
}

export default useClipboard;
