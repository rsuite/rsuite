import React from 'react';
import type { FormGroupRelations } from './formGroupRelations';
import type { FormGroupRegistration } from './useFormGroupRelations';

export const FormGroupContext = React.createContext<
  FormGroupRelations & {
    controlId?: string;
    register?: FormGroupRegistration;
  }
>({});
