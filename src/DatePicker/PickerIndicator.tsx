import React from 'react';
import { Icon } from '@rsuite/icons';
import { useCustom, useClassNames } from '../utils';
import InputGroup from '../InputGroup';
import CloseButton from '../CloseButton';
import Loader from '../Loader';

interface PickerIndicatorProps {
  loading?: boolean;
  caretAs?: React.ElementType | null;
  onClose?: () => void;
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
      return <Loader style={{ display: 'block', padding: '1px 0' }} data-testid="spinner" />;
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
    return caretAs && <Icon as={caretAs} />;
  };

  return <Component>{addon()}</Component>;
};

export default PickerIndicator;
