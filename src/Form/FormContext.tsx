import createContext from '../utils/createContext';

export const FormContext = createContext({});
export const FormValueContext = createContext({});
export const FormErrorContext = createContext({});
export const FormPlaintextContext = createContext(false);

export default FormContext;
