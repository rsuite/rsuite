'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import PropTypes from 'prop-types';
import { PLACEMENT } from "../constants/index.js";
import { animationPropTypes } from "../../Animation/utils.js";
import { oneOf } from "../propTypes/index.js";
export var pickerPropTypes = _extends({}, animationPropTypes, {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  locale: PropTypes.any,
  appearance: oneOf(['default', 'subtle']),
  block: PropTypes.bool,
  containerPadding: PropTypes.number,
  container: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
  disabled: PropTypes.bool,
  menuClassName: PropTypes.string,
  menuStyle: PropTypes.object,
  placeholder: PropTypes.node,
  placement: oneOf(PLACEMENT),
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
});
export var listPickerPropTypes = _extends({}, pickerPropTypes, {
  data: PropTypes.array.isRequired,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  childrenKey: PropTypes.string,
  disabledItemValues: PropTypes.array,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func
});