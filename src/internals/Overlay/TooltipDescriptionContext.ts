import React from 'react';

interface TooltipDescriptionObserver {
  id: string;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  onNodeChange: (node: HTMLElement | null) => void;
  refresh: () => void;
}

interface TooltipDescriptionState extends TooltipDescriptionObserver {
  descriptionId: string | undefined;
}

// Only the Whisper's own OverlayTrigger consumes this context.
export const TooltipDescriptionContext = React.createContext<TooltipDescriptionState | undefined>(
  undefined
);

// Reintroduced for that trigger's physical overlay, then masked inside its Tooltip.
export const TooltipDescriptionObserverContext = React.createContext<
  TooltipDescriptionObserver | undefined
>(undefined);
