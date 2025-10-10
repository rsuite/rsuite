'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import PanelGroup from "../PanelGroup/index.js";
import AccordionPanel from "./AccordionPanel.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Accordion` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/accordion
 */
var Accordion = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Accordion', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  return /*#__PURE__*/React.createElement(PanelGroup, _extends({
    accordion: true,
    ref: ref
  }, propsWithDefaults));
});
Accordion.Panel = AccordionPanel;
Accordion.displayName = 'Accordion';
export default Accordion;