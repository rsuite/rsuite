'use client';
import { useEffect, useContext } from 'react';
import { PanelGroupContext } from "../../PanelGroup/index.js";
import { useControlled } from "../../internals/hooks/index.js";
function useExpanded(props) {
  var expandedProp = props.expanded,
    defaultExpanded = props.defaultExpanded,
    eventKey = props.eventKey,
    collapsibleProp = props.collapsible;
  var _ref = useContext(PanelGroupContext) || {},
    accordion = _ref.accordion,
    activeKey = _ref.activeKey;
  var _useControlled = useControlled(expandedProp, defaultExpanded || typeof activeKey !== 'undefined' && activeKey === eventKey),
    expandedState = _useControlled[0],
    setExpanded = _useControlled[1];
  var collapsible = collapsibleProp;
  var expanded = expandedState;
  if (accordion) {
    collapsible = true;
  }
  if (collapsible) {
    if (typeof activeKey !== 'undefined' && activeKey !== eventKey) {
      expanded = false;
    }
  }
  useEffect(function () {
    if (accordion && typeof activeKey !== 'undefined') {
      setExpanded(activeKey === eventKey);
    }
  }, [accordion, activeKey, eventKey, setExpanded]);
  return [expanded, setExpanded, collapsible];
}
export default useExpanded;