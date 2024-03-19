import React from 'react';
import CascadeTree from '../CascadeTree';

// Infer value and onChange types from data
const numberValuedData = [{ label: 'One', value: 1 }];

<CascadeTree data={numberValuedData} value={1} />;
// @ts-expect-error should not accept string value
<CascadeTree data={numberValuedData} value="1" />;
<CascadeTree data={numberValuedData} />;

const stringValuedData = [{ label: 'One', value: 'One' }];

<CascadeTree data={stringValuedData} value="1" />;
// @ts-expect-error should not accept number value
<CascadeTree data={stringValuedData} value={1} />;
<CascadeTree data={stringValuedData} />;
