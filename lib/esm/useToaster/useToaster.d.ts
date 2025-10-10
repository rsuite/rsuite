import React from 'react';
import { ToastContainerProps } from '../toaster/ToastContainer';
/**
 * Toaster display brief, temporary notifications of actions, errors, or other events in an application.
 * It is often used with the Message and Notification components.
 * @returns toaster { push, remove, clear }
 *
 * @see https://rsuitejs.com/components/toaster/
 */
declare const useToaster: () => {
    /**
     * Push a toast message.
     * @param message The message to be displayed.
     *                eg: `<Message type="success" description="Success" />` or `<Notification type="success" closable>Success</Notification>`
     * @param options The options of the toast message. (optional)
     *                eg: `{ placement: 'topCenter', duration: 5000 }`
     * @returns The key of the toast message.
     */
    push: (message: React.ReactNode, options?: ToastContainerProps) => string | Promise<string | undefined> | undefined;
    /**
     * Remove a toast message.
     * @param key  The key of the toast message.
     */
    remove: (key: string) => void;
    /**
     * Clear all toast messages.
     */
    clear: () => void;
};
export default useToaster;
