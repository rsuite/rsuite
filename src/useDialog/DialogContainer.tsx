import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { guid } from '@/internals/utils';

export interface DialogContainerProps {
  children?: React.ReactNode;
}

export interface DialogContainerInstance {
  renderDialog: (dialog: React.ReactElement) => string | number;
  removeDialog: (key: string | number) => void;
  clearDialogs: () => void;
}

interface DialogItemProps {
  key: string | number;
  dialog: React.ReactElement;
}

const DialogContainer = forwardRef<DialogContainerInstance, DialogContainerProps>((_, ref) => {
  const [dialogs, setDialogs] = useState<DialogItemProps[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const dialogsRef = useRef<DialogItemProps[]>([]);

  // Only render on the client side to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useImperativeHandle(ref, () => ({
    renderDialog: (dialog: React.ReactElement) => {
      // Always generate a unique key using guid
      const dialogKey = guid();
      const nextDialogs = [...dialogsRef.current, { key: dialogKey, dialog }];
      dialogsRef.current = nextDialogs;
      setDialogs(nextDialogs);
      return dialogKey;
    },
    removeDialog: (key: string | number) => {
      // Find if the dialog exists
      const dialogExists = dialogsRef.current.some(item => item.key === key);

      if (dialogExists) {
        // Filter out the dialog with the matching key
        const nextDialogs = dialogsRef.current.filter(item => item.key !== key);

        // Update both the ref and state
        dialogsRef.current = nextDialogs;
        setDialogs(nextDialogs);
      }
    },
    clearDialogs: () => {
      dialogsRef.current = [];
      setDialogs([]);
    }
  }));

  // Only render Portal on the client side to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {dialogs.map(item => (
        <React.Fragment key={item.key}>{item.dialog}</React.Fragment>
      ))}
    </>
  );
});

DialogContainer.displayName = 'DialogContainer';

export default DialogContainer;
