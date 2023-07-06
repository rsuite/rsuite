import React from 'react';
import Uploader from '../Uploader';
import { expectType } from 'ts-expect';

<Uploader appearance="primary" action="#" />;

<Uploader appearance="primary" color="orange" action="#" />;

<Uploader size="lg" action="#" />;

<Uploader
  action="#"
  onError={status => {
    expectType<'timeout' | 'server_error' | 'xhr_error'>(status.type);
  }}
/>;
