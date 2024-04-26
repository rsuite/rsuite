import React from 'react';
import Form, { FormInstance } from '../';

const formRef = React.createRef<FormInstance>();

<Form ref={formRef}></Form>;

formRef.current?.root;
formRef.current?.check();
formRef.current?.cleanErrors();
formRef.current?.cleanErrorForField('name');
formRef.current?.resetErrors();
formRef.current?.checkForField('name');
formRef.current?.checkAsync();
formRef.current?.checkForFieldAsync('name');
formRef.current?.reset();
formRef.current?.submit();
