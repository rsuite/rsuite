import { FaCheck, FaCopy } from 'react-icons/fa';
import { IconButton, IconButtonProps } from 'rsuite';
import useClipboard from '@/utils/useClipboard';

interface CopyCodeButtonProps extends IconButtonProps {
  code: string;
}

function CopyCodeButton(props: CopyCodeButtonProps) {
  const { copyToClipboard, copied } = useClipboard();
  const { code, ...rest } = props;

  const handleClick = () => {
    copyToClipboard(code);
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
