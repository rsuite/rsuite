import PropTypes from 'prop-types';
import { PLACEMENT } from '../utils';
import { animationPropTypes } from '../Animation/utils';

export const pickerPropTypes = {
  ...animationPropTypes,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  locale: PropTypes.any,
  appearance: PropTypes.oneOf(['default', 'subtle']),
  block: PropTypes.bool,
  containerPadding: PropTypes.number,
  container: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
  disabled: PropTypes.bool,
  // PropTypes.elementType conflictin with React.ElementType
  // toggleAs: PropTypes.elementType,
  menuClassName: PropTypes.string,
  menuStyle: PropTypes.object,
  placeholder: PropTypes.node,
  placement: PropTypes.oneOf(PLACEMENT),
  /**
   * Prevent floating element overflow
   */
  preventOverflow: PropTypes.bool,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  cleanable: PropTypes.bool,
  renderExtraFooter: PropTypes.func,
  renderValue: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onClean: PropTypes.func,
  listProps: PropTypes.any
};

export const listPickerPropTypes = {
  ...pickerPropTypes,
  data: PropTypes.array.isRequired,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  childrenKey: PropTypes.string,
  disabledItemValues: PropTypes.array,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func
};
