import React from 'react';
export interface ModalInstance {
    dialog: HTMLElement | null;
    backdrop: HTMLElement | null;
}
export interface ContainerState {
    classes: string[];
    modals: ModalInstance[];
    style: React.CSSProperties;
    overflowing: boolean;
}
declare class ModalManager {
    modals: ModalInstance[];
    containers: HTMLElement[];
    data: ContainerState[];
    add(modal: ModalInstance, container: HTMLElement, className?: string): number;
    remove(modal: ModalInstance): void;
    isTopModal(modal: ModalInstance): boolean;
}
export default ModalManager;
