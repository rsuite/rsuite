import { useState } from 'react';
import { FaCheck, FaCopy } from 'react-icons/fa';

import { IconButton, IconButtonProps } from 'rsuite';
import copy from 'copy-to-clipboard';

interface CopyCodeButtonProps extends IconButtonProps {
  code: string;
}

function CopyCodeButton(props: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);
  const { code, ...rest } = props;

  const handleClick = () => {
    setCopied(true);

    copy(code);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <IconButton
      {...rest}
      appearance="subtle"
      circle
      size="xs"
      className="copy-code-button"
      onClick={handleClick}
      icon={copied ? <FaCheck /> : <FaCopy />}
    />
  );
}

export default CopyCodeButton;
