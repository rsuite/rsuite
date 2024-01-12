import React from 'react';
import { Icon } from '@rsuite/icons';
import { useCustom, useClassNames } from '../utils';
import InputGroup from '../InputGroup';
import CloseButton from '../CloseButton';
import Loader from '../Loader';

interface PickerIndicatorProps {
  loading?: boolean;
  caretAs?: React.ElementType | null;
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
  showCleanButton?: boolean;
  as?: React.ElementType;
}

const PickerIndicator = ({
  loading,
  caretAs,
  onClose,
  showCleanButton,
  as: Component = InputGroup.Addon
}: PickerIndicatorProps) => {
  const { locale } = useCustom();
  const { prefix } = useClassNames('picker');

  const addon = () => {
    if (loading) {
      return <Loader className={prefix('loader')} data-testid="spinner" />;
    }
    if (showCleanButton) {
      return (
        <CloseButton
          className={prefix('clean')}
          tabIndex={-1}
          locale={{ closeLabel: locale?.clear }}
          onClick={onClose}
        />
      );
    }
    return caretAs && <Icon as={caretAs} className={prefix('caret-icon')} />;
  };

  return <Component>{addon()}</Component>;
};

export default PickerIndicator;
