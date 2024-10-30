import React from 'react';
import Icon from '@rsuite/icons/Icon';
import InputGroup from '../../InputGroup';
import CloseButton from '../CloseButton';
import Loader from '../../Loader';
import { useClassNames } from '../hooks';
import { useCustom } from '../../CustomProvider';

interface PickerIndicatorProps {
  loading?: boolean;
  caretAs?: React.ElementType | null;
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
  showCleanButton?: boolean;
  disabled?: boolean;
  as?: React.ElementType;
}

const PickerIndicator = ({
  loading,
  caretAs,
  onClose,
  showCleanButton,
  as: Component = InputGroup.Addon,
  disabled
}: PickerIndicatorProps) => {
  const { getLocale } = useCustom();
  const { clear } = getLocale('common');
  const { prefix } = useClassNames('picker');

  const addon = () => {
    if (loading) {
      return <Loader className={prefix('loader')} data-testid="spinner" />;
    }
    if (showCleanButton && !disabled) {
      return (
        <CloseButton
          className={prefix('clean')}
          tabIndex={-1}
          locale={{ closeLabel: clear }}
          onClick={onClose}
        />
      );
    }
    return caretAs && <Icon as={caretAs} className={prefix('caret-icon')} data-testid="caret" />;
  };

  const props = Component === InputGroup.Addon ? { disabled } : undefined;

  return <Component {...props}>{addon()}</Component>;
};

export default PickerIndicator;
