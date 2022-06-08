import React from 'react';
import Form, { FormInstance } from '../Form';

const formRef = React.createRef<FormInstance>();

<Form ref={formRef}></Form>;

formRef.current?.check();
