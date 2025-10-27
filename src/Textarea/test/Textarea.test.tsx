import React from 'react';
import Textarea from '../Textarea';

// onChange should be rewritten with the type
<Textarea
  onChange={(value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(value, event);
  }}
/>;
