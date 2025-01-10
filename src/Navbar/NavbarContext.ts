import React from 'react';

interface NavbarContextValue {
  appearance: 'default' | 'inverse' | 'subtle';
  open: boolean;
  navbarId: string;
  onToggle?: (open: boolean) => void;
}

export const NavbarContext = React.createContext<NavbarContextValue | null>(null);
