import { createContext } from '../utils';
import { ModalContextProps } from './ModalContext.d';

const ModalContext = createContext<ModalContextProps>(null);

export default ModalContext;
