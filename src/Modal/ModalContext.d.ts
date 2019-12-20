export interface ModalContextProps {
  onModalHide: (event: React.MouseEvent<Element, MouseEvent>) => void;
  getBodyStyles?: () => React.CSSProperties;
}

declare const ModalContext: React.Context<ModalContextProps>;

export default ModalContext;
