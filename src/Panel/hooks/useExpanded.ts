import { useEffect, useContext } from 'react';
import { PanelGroupContext } from '../../PanelGroup';
import { useControlled } from '@/internals/hooks';

interface UseExpandedProps {
  expanded?: boolean;
  defaultExpanded?: boolean;
  eventKey?: string | number;
  collapsible?: boolean;
}

function useExpanded(props: UseExpandedProps) {
  const { expanded: expandedProp, defaultExpanded, eventKey, collapsible: collapsibleProp } = props;
  const { accordion, activeKey } = useContext(PanelGroupContext) || {};

  const [expandedState, setExpanded] = useControlled<any>(
    expandedProp,
    defaultExpanded || (typeof activeKey !== 'undefined' && activeKey === eventKey)
  );

  let collapsible = collapsibleProp;
  let expanded = expandedState;

  if (accordion) {
    collapsible = true;
  }

  if (collapsible) {
    if (typeof activeKey !== 'undefined' && activeKey !== eventKey) {
      expanded = false;
    }
  }

  useEffect(() => {
    if (accordion && typeof activeKey !== 'undefined') {
      setExpanded(activeKey === eventKey);
    }
  }, [accordion, activeKey, eventKey, setExpanded]);

  return [expanded, setExpanded, collapsible];
}

export default useExpanded;
