import { useState } from 'react';
import { useToaster, Notification } from 'rsuite';
import copy from 'copy-to-clipboard';

function useClipboard() {
  const toaster = useToaster();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    setCopied(true);

    copy(text);
    setTimeout(() => setCopied(false), 2000);

    toaster.push(<Notification>✅ Copied to clipboard</Notification>, {
      duration: 2000
    });
  };

  return { copied, copyToClipboard };
}

export default useClipboard;
