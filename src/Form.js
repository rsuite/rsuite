/* @flow */

import setStatic from 'recompose/setStatic';
import { Form, Field, createFormControl } from 'form-lib';

setStatic('Field', Field)(Form);
setStatic('createFormControl', createFormControl)(Form);

export default Form;
